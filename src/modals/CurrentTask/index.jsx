import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stopPropagation } from '../../utils/hooks/usePropagination';
import Dots from '../../images/dots.svg';
import { Dropdown } from '../../components/Dropdown';
import { EditMenu } from '../../components/EditMenu';
import { showModal, closeModal } from '../../store/slices/modalSlice';
import { mainApi } from '../../utils/api/mainApi';
import { AgreementList } from './AgreementList';
import './CurrentTask.scss';
import { updateTask, removeTask } from '../../store/slices/tasksSlice';

export const CurrentTask = () => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const activeTask = useSelector(state => state.activeTask.activeTask);
  const [taskColumn, setTaskColumn] = useState({});
  const activeBoardId = useSelector(state => state.activeBoardId.activeBoardId);
  const boards = useSelector(state => state.boards.boards);
  const activeBoard = boards.find(board => board.id === activeBoardId);

  const TEMP_DATA_FOR_POPUP = [
    {
      label: 'Edit Task',
      color: '#828FA3',
      action: () => dispatch(showModal('UpdateTask'))
    }, 
    {
      label: 'Delete Task',
      color: '#EA5555',
      action: () => handleRemoveTask()
    }
  ];

  // Удаление таски при вызове меню редактирования (передается в элемент EditMenu)
  const handleRemoveTask = e => {
    // Отправляем запрос на бэк
    mainApi
      .deleteTask(activeTask)
      .then(() => {
        // Если удаление прошло успешно на бэке, то удаляем таску из Store
        dispatch(removeTask(activeTask));
        // и закрываем модальное окно
        dispatch(closeModal());
      })
      .catch(err => console.log(err));
  };

  const clickOnModal = () => {
    setShowEdit(false);
    setShowDrop(false);
  };

  const clickOnEditMenu = e => {
    stopPropagation(e);
    setShowEdit(prev => !prev);
  };

  const clickOnDropdown = e => {
    stopPropagation(e);
    setShowDrop(prev => !prev);
  };

  // При изменении колонки мы проверяем совпадает ли новая колонка с текущей колонкой
  // Если колонки изменилась, то изменяем таску (обновляем в ней колонку) и отправляем на бэк
  useEffect(() => {
    // Проверяем объект на пустоту
    if (!taskColumn.columnId) {
      return;
    }
    // Проверяем изменилась ли колонка или нет
    if (taskColumn.columnId !== activeTask.columnId) {
      const newTask = { ...activeTask, status: taskColumn.status, columnId: taskColumn.columnId };
      // Отправляем на бэк новую таску (обновляем)
      mainApi
        .updateTask(newTask)
        .then(res => dispatch(updateTask(res)))
        .catch(err => console.log(err));
    }
  }, [taskColumn]);

  return (
    <div className='edit-task' onClick={clickOnModal}>
      <div className='edit-task__wrapper'>
        <h3 className='edit-task__title'>{activeTask.title}</h3>
        <div className='action-menu'>
          <img className='action-menu__dots' onClick={clickOnEditMenu} src={Dots} alt='action-menu' />
          <EditMenu options={TEMP_DATA_FOR_POPUP} width='200px' show={showEdit} setShowEdit={setShowEdit} />
        </div>
      </div>
      <p className='edit-task__body'>{activeTask.description}</p>
      <AgreementList agreements={activeTask.subtasks} task={activeTask} />
      <p className='edit-task__status'>Current Status</p>
      <Dropdown
        data={activeBoard.columns}
        clickToShow={clickOnDropdown}
        show={showDrop}
        taskColumnId={activeTask.columnId}
        setColumn={setTaskColumn}
      />
    </div>
  );
};

import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/@mixins.scss';
import '../../styles/@variables.scss';
import { Dropdown } from '../../components/Dropdown';
import { closeModal } from '../../store/slices/modalSlice';
import Button from '../../components/Button/index';
import Subtask from '../../components/Subtask';
import './Task.scss';
import { mainApi } from '../../utils/api/mainApi';
import { addNewTask } from '../../store/slices/tasksSlice';

const CreateTask = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    status: '',
    boardId: '',
    columnId: '',
    subtasks: [],
    id: ''
  });

  const [column, setColumn] = useState({});
  const [subtasks, setSubtasks] = useState([]);
  const [subTasksNumbers, setSubTasksNumbers] = useState(1);
  const dispatch = useDispatch();
  const activeBoardId = useSelector(state => state.activeBoardId.activeBoardId);
  const boards = useSelector(state => state.boards.boards);
  const activeBoard = boards.find(board => board.id === activeBoardId);

  const [isDisabled, setIsDisabled] = useState(true);

      useEffect(() => {

        if(!data.title.length) {
            setIsDisabled(true)
        } else setIsDisabled(false)
    }, [data])

  const handelSubTasksAddClick = e => {
    e.preventDefault();
    setSubTasksNumbers(subTasksNumbers + 1);
  };
  //  Отрисовывает неообходимое количество элементов с полями для названий subtasks
  const subtasksFieldsElements = () => {
    const content = [];
    for (let i = 1; i <= subTasksNumbers; i++) {
      content.push(<Subtask key={i} placeholder='e.g. Drink coffee & smile' id={i} setSubtasks={setSubtasks} subtasks={subtasks}/>);
    }
    return content;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setData(oldData => ({ ...oldData, [name]: value }));
    setIsDisabled(false)
  };

 /// ФУНКЦИЯ СОЗДАНИЯ НОВОЙ ЗАДАЧИ
  const handleNewTask = event => {
    event.preventDefault();
    const newTask = {
      status: column.status,
      columnId: column.columnId,
      boardId: activeBoardId,
      title: data.title,
      description: data.description,
      subtasks: subtasks
    };
    mainApi
      .createTask(newTask)
      .then(res => {
        dispatch(addNewTask(res));
      })
      .catch(err => console.log(err));
    dispatch(closeModal());
  };

  return (
    <form className='task-form' onSubmit={handleNewTask }>
      <h2 className='task-form__heading'>Add New Task</h2>
      <label className='task-form__label-container'>
        <p className='task-form__label'>Title</p>
        <input
          className='task-form__input'
          placeholder='e.g. Take coffee break'
          type='text'
          name='title'
          onChange={handleChange}
        />
      </label>
      <label className='task-form__label-container'>
        <p className='task-form__label'>Description</p>
        <textarea
          className='task-form__input task-form__description'
          placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
          type='text'
          name='description'
          onChange={handleChange}
        />
      </label>
      <div className='task-form__subtasks-wrapper'>
        <p className='task-form__subtasks-title'>Subtasks</p>

        <div>{subtasksFieldsElements()}</div>
        <Button fn={handelSubTasksAddClick} type='button' label='+ Add New Subtask' isLarge isSecondary isFullWidth />
      </div>
      <Dropdown data={activeBoard.columns} label='Status' setColumn={setColumn} />
      <Button
        fnSumbit={handleNewTask}
        type='submit'
        label='Create task'
        isLarge
        isSecondary={false}
        isFullWidth
        isDestructive={false}
        disabled={isDisabled}
      />
    </form>
  );
};

export default CreateTask;

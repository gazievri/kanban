/* eslint-disable react/button-has-type */
import './BoardModal.scss';
import {useState, useContext} from 'react';
import { closeModal } from '../../store/slices/modalSlice';
import uniqid from 'uniqid';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { TextField } from '../../components/TextField';
import { mainApi } from '../../utils/api/mainApi';
import { addNewBoard } from '../../store/slices/boardsSlice';
import { setActiveBoardId } from '../../store/slices/activeBoardId';
import { generateRandomColor } from '../../utils/randomColor';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export const AddBoard = () => {
  const [result, setResult] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [columnsFields, setColumnsFields] = useState(1);
  const dispatch = useDispatch();
  const { type } = useSelector(state => state?.modal);
  const boards = useSelector(state => state.boards.boards);
  const currentUser = useContext(CurrentUserContext);
  const columns = [];

  const handelColumnAddClick = e => {
    e.preventDefault();
    setColumnsFields(columnsFields + 1);
  };

  const handelColumnRemoveClick = e =>{
    e.preventDefault();
    setColumnsFields(state => state -1)
    console.log(columnsFields)
    console.log(columns)
  }

  //  Отрисовывает неообходимое количество элементов с полями для названий колонок
  const columnFieldsElements = () => {
    
    for (let i = 1; i <= columnsFields; i++) {
      columns.push(
        <div className='modal-board__column' id={i} key={i}>
          <TextField
            placeholder='Columns'
            type='text'
            style={{ width: '100%' }}
            name={`columnName ${i}`}
            setResult={setResult}
          />
          {/* <div
            className='modal-board__column-field-delete'
            onClick={() => content.filter(el => el.key == i)}
          /> */}
        </div>
      );
    }
    return columns;
  };

  // Создаем объект доски для отправки на бэк
  const createNewBoardObj = data => {
    // Генерируем уникальный id для доски используя библиотеку
    const boardId = boards.length + 1;
    let newBoardObj = {};
    const columnsArray = [];
    // Проверяем на заполненность поля названия колонки
    if (data.length > 1) {
      data.map((item, index) => {
        if (Object.keys(item)[0] !== 'boardName') {
          columnsArray.push({
            name: Object.values(item)[0],
            columnId: `${boardId}_${index}`,
            color: generateRandomColor()
          });
        }
        return;
      });

      newBoardObj = {
        name: data[0].boardName,
        id: boardId,
        ownerId: currentUser.id,
        columns: columnsArray
      };
    } else {
      newBoardObj = {
        name: data.boardName,
        id: boards.length + 1,
        columns: []
      };
    }
    return newBoardObj;
  };

  // Обработчик нажатия на кнопку добавить доску
  function handleNewBoard(e) {
    e.preventDefault();
    // Используем функцию Создания объекта новой доски
    const newBoard = createNewBoardObj(result);
    // Отпправляем на бэк
    mainApi
      .addNewBoard(newBoard)
      .then(res => {
        // Возвращенный объект с бэк добавляем в массив досок в Store
        dispatch(addNewBoard(res));
        dispatch(setActiveBoardId(res.id));
      })
      .catch(err => console.log(err))
      .finally(dispatch(closeModal(type)));
  }

  return (
    <div className='modal-board'>
      <h3 className='modal-board__title'>Add New Board</h3>
      <form className='modal-board__form'>
        <label className='modal-board__board-name'>
          <p className='modal-board__input-title'>Name</p>
          <TextField
            placeholder='Name'
            type='text'
            name='boardName'
            setResult={setResult}
            setIsDisabled={setIsDisabled}
          />
        </label>
        <label className='modal-board__create-column'>
          <p className='modal-board__input-title'>{columnsFields !== 0 ? 'Columns' : 'Columns not set'}</p>
          <div className='modal-board__column-name'>{columnFieldsElements()}</div>
        </label>
        <Button label='+ Add New Column' isFullWidth isSecondary fn={handelColumnAddClick} isLarge />
        {columnsFields !== 0 ? <Button label='Remove Column' isFullWidth isSecondary fn={handelColumnRemoveClick} isLarge /> :
        '' }
        
        {isDisabled ? (
          <Button label='Add board name' isFullWidth disabled isLarge />
        ) : (
          <Button label='Create New Board' isFullWidth fn={handleNewBoard} isLarge />
        )}
      </form>
    </div>
  );
};

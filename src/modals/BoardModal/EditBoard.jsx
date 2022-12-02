import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { mainApi } from '../../utils/api/mainApi';
import { TextField } from '../../components/TextField';
import './BoardModal.scss';
import { updateBoard } from '../../store/slices/boardsSlice';
import { closeModal } from '../../store/slices/modalSlice';

export const EditBoard = () => {
  const [boardName, setBoardName] = useState([]);
  const [columnName, setColumnName] = useState([]);
  const activeBoardId = useSelector(state => state.activeBoardId.activeBoardId);
  const boards = useSelector(state => state.boards.boards);
  const activeBoard = boards.find(board => board.id === activeBoardId);
  const [currentColumns, setCurrentColumns] = useState(activeBoard.columns)
  const dispatch = useDispatch();
  
  const handleSaveClick = e => {
    e.preventDefault();

    const newColumns = currentColumns.map((el) => ({
      ...el,
      name: columnName.find((firstEl) => el.columnId in firstEl ? true : false)[el.columnId] ?? ""
    }))

    const boardData = {
      ...activeBoard, name: boardName[0].name
      , columns: newColumns
    };
    console.log(boardData)
    mainApi
      .updateBoard(boardData)
      .then(res => {
        dispatch(updateBoard(res));
        dispatch(closeModal());
      })
      .catch(err => console.log(err));
  };


  const handleDeleteColumn = columnId => {
    let result = currentColumns.find(element => element.columnId === columnId).columnId
    let newArr = currentColumns.filter((element) => element.columnId !== result);
    setCurrentColumns(newArr)
  }

  return (
    <div className='modal-board'>
      <h3 className='modal-board__title'>Edit Board</h3>
      <form className='modal-board__form' onSubmit={handleSaveClick}>
        <label className='modal-board__board-name'>
          <p className='modal-board__input-title'>Board name</p>
          <TextField
            placeholder='Name'
            type='text'
            style={{ width: '100%' }}
            name='name'
            setResult={setBoardName}
            initialValue={activeBoard.name}
          />
          <p className='modal-board__input-title'>Edit columns</p>
          <div className='modal-board__column-name'>
            {currentColumns.map(column => (
              <div className='modal-board__column'
                key={column.columnId} >
                <TextField
                  placeholder='Columns'
                  type='text'
                  style={{ width: '100%' }}
                  name={column.columnId}
                  columnId={column.columnId}
                  setResult={setColumnName}
                  initialValue={column.name}
                />
                <div
                  className='modal-board__column-field-delete'
                  onClick={() => handleDeleteColumn(column.columnId)}
                />
              </div>
            ))}
          </div>
        </label>
        <Button label='Save Changes' isFullWidth fnSubmit={handleSaveClick} isLarge />
      </form>
    </div>
  );
};

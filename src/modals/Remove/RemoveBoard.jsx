import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showModal, closeModal } from '../../store/slices/modalSlice';
import { mainApi } from '../../utils/api/mainApi';
import './Remove.scss';
import { removeBoard } from '../../store/slices/boardsSlice';

export const RemoveBoard = () => {
  const activeBoardId = useSelector(state => state.activeBoardId.activeBoardId);
  const boards = useSelector(state => state.boards.boards);
  const dispatch = useDispatch();
  const { type } = useSelector(state => state?.modal);
  const [boardName, setBoardName] = useState('')

  const currentBoard = boards.filter(board => board.id == activeBoardId)
  useEffect(() => {
    if (currentBoard.length > 0) {
      setBoardName(currentBoard[0].name)
    }
  }, [currentBoard])

  const handleOnClickDelete = () => {
    mainApi
      .deleteBoard(activeBoardId)
      .then(() => dispatch(removeBoard(activeBoardId)))
      .catch(err => console.error(err))
      .finally(() => dispatch(closeModal()));
  };

  return (
    <div className='remove-modal'>
      <div className='remove-modal__wrapper'>
        <h3 className='remove-modal__title'>Delete this board?</h3>
        <p className='remove-modal__text'>
          Are you sure you want to delete the "{boardName}" board? This action will remove all columns and tasks and
          cannot be reversed.
        </p>
        <div className='remove-modal__buttons'>
          <button className='remove-modal__remove-item' onClick={handleOnClickDelete}>
            Delete
          </button>
          <button className='remove-modal__cancel-remove' onClick={() => dispatch(closeModal(type))}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
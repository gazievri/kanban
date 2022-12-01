import { useSelector, useDispatch } from 'react-redux';
import { CurrentTask } from '../../modals/CurrentTask';
import { closeModal } from '../../store/slices/modalSlice';
import './Modal.scss';
import CreateTask from '../../modals/TaskModal/CreateTask.jsx';
import { AddBoard } from '../../modals/BoardModal/AddBoard';
import AddColumn from '../../modals/AddColumn';
import { EditBoard } from '../../modals/BoardModal/EditBoard.jsx';
import { RemoveBoard } from '../../modals/Remove/RemoveBoard';
import { EditMenu } from '../EditMenu';
import UpdateTask from '../../modals/TaskModal/UpdateTask';
import { Profile } from '../../modals/Profile/Profile';

export function Modal({setIsLogged}) {
  const dispatch = useDispatch();
  const { isVisible, type } = useSelector(state => state?.modal);


  return (
    <div className={`modal ${isVisible && 'active'}`} onMouseDown={() => dispatch(closeModal(type))}>
      <div className={`modal__frame ${isVisible && 'active'}`} onMouseDown={e => e.stopPropagation()}>
        {type === 'none' && <span>content wasn't provided</span>}
        {type === 'CurrentTask' && <CurrentTask />}
        {type === 'RemoveBoard' && <RemoveBoard />}
        {type === 'CreateTask' && <CreateTask />}
        {type === 'UpdateTask' && <UpdateTask />}
        {type === 'AddBoard' && <AddBoard />}
        {type === 'AddColumn' && <AddColumn />}
        {type === 'EditBoard' && <EditBoard />}
        {type === 'EditMenu' && <EditMenu />}
        {type === 'UpdateProfile' && <Profile setIsLogged={setIsLogged}/>}
      </div>
    </div>
  );
}

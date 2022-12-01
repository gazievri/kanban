import React from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import './sideBar.scss';
import { BoardsList } from './BoardsList';
import SideBarStatus from './SideBarStatus';
import { NewBoardBtn } from '../Button/NewBoardBtn';
import { useSelector, useDispatch } from 'react-redux';
import SideBarButton from './SideBarButton';
import useMediaQuery from '../../utils/hooks/useMediaQuery'
import { useEffect } from 'react';
import { hideSideBar } from '../../store/slices/sideBarSlice';

const SideBar = ({ boards, handleClickProperBoard }) => {
  const isMobile = useMediaQuery('(max-width: 558px)');
  const { isHidden } = useSelector(state => state.sideBar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMobile) {
      dispatch(hideSideBar())
    }
  }, [isMobile]);

  const handleCloseSidebar = () => {
    if (isMobile) {
      dispatch(hideSideBar())
    }
  }
  return (
    <>
      <div className={`sidebar ${isHidden && 'hidden'}`} onClick={handleCloseSidebar} >
        <div className='sidebar__container'>
          <BoardsList boards={boards} handleClickProperBoard={handleClickProperBoard} />
          <NewBoardBtn />
          <ThemeSwitcher />
          {isMobile ? '' : <SideBarStatus />}
        </div>
      </div>
      {isMobile ? '' : <SideBarButton />}

    </>
  );
};

export default SideBar;

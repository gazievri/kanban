import React from 'react';
import SideBar from '../../components/SideBar/index';
import Header from '../../components/Header/index';
import Board from '../../components/Board/index';
import './Main.scss';

export function Main({ boards, handleClickProperBoard, setShowEdit, showEdit }) {

  const clickOnEditBordMenu = e => {
    e.preventDefault();
    setShowEdit(prev => !prev);
  };

  const handleCloseEditMenu = () => {
    if (showEdit == true) {
      setShowEdit(false)
    }
  }

  return (
    <main className='main' onClick={handleCloseEditMenu}>
      <Header
        setShowEdit={setShowEdit}
        showEdit={showEdit}
        clickOnEditBordMenu={clickOnEditBordMenu}
      />
      <div className='main__container'>
        <SideBar
          boards={boards}
          handleClickProperBoard={handleClickProperBoard}
        />
        <Board />
      </div>
    </main>
  );
}

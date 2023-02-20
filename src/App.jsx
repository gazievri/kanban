import { Routes, Route, useNavigation } from "react-router-dom";
import { Modal } from "./components/Modal";
import { Main } from "./pages/Main/Main";
import { WelcomePage } from "./pages/WelcomePage/WelcomePage";
import "./styles/@global.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { mainApi } from "./utils/api/mainApi";
import { addAllBoards } from "./store/slices/boardsSlice";
import { addAllTasks } from "./store/slices/tasksSlice";
import { setActiveBoardId } from "./store/slices/activeBoardId";
import { NotFound } from "./pages/NotFound/NotFound";
import { Register } from "./pages/Authorization/Register";
import { Login } from "./pages/Authorization/Login";
import React from "react";
import ProtectedRoute from "./utils/hooks/ProtectedRoute";
import CurrentUserContext from "./contexts/CurrentUserContext";

function App() {
  const [boards, setBoards] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  console.log(isLogged);
  const [currentUser, setCurrentUser] = useState("");
  console.log(currentUser);
  useEffect(() => {
    if (isLogged) {
      getBoards();
      getTasks();
    }
  }, [isLogged]);

  // ***Доски и Store***
  const dispatch = useDispatch();
  // Сохранение всех досок в Store
  const setAllBoards = (boardsAll) => dispatch(addAllBoards(boardsAll));
  // Извлекаем список досок из Store
  const boardsStore = useSelector((state) => state.boards.boards);

  // ***Таски и Store***
  // Сохранение всех досок в Store
  const setAllTasks = (tasksAll) => dispatch(addAllTasks(tasksAll));
  // Извлекаем список досок из Store
  // const tasksStore = useSelector(state => state.tasks.tasks);

  // ***Активная доска и Store***
  // Сохранение активную доску в Store
  const setActiveBoard = (id) => dispatch(setActiveBoardId(id));

  // Запрашиваем все доски из api
  function getBoards() {
    mainApi
      .getBoards()
      .then((boards) => {

        let userBoards = boards.filter(el => el.ownerId == currentUser.id)
        setBoards(userBoards);
        // Сохранение досок в Store (функция описана в "Доски и Store")
        setAllBoards(userBoards);
        // Берем первую доску из списка досок и устанавливаем ее id качестве активной доски
        // чтобы после загрузке досок отображались задачи первой доски
        const firstBoard = userBoards[0];
        setActiveBoard(firstBoard.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getTasks = () => {
    mainApi
      .getTasks()
      .then((tasks) => {
        setAllTasks(tasks);
      })
      .catch((err) => console.log(err));
  };

  // Функция обрабатывает клик по названию конкретной доски и устанавливает id в стейт
  const handleClickProperBoard = (boardId) => {
    setActiveBoard(boardId);
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Modal setIsLogged={setIsLogged} setCurrentUser={setCurrentUser}/>
        <Routes>
          <Route element={<ProtectedRoute isLogged={isLogged} />}>
            <Route
              path="/board"
              element={
                <Main
                  boards={boards}
                  handleClickProperBoard={handleClickProperBoard}
                  setShowEdit={setShowEdit}
                  showEdit={showEdit}
                />
              }
            />
          </Route>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="register" element={<Register  setIsLogged={setIsLogged}
                setCurrentUser={setCurrentUser}/>} />
          <Route
            path="login"
            element={
              <Login
                setIsLogged={setIsLogged}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

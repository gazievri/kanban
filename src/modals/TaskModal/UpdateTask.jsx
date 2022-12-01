import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/@mixins.scss';
import '../../styles/@variables.scss';
import { Dropdown } from '../../components/Dropdown';
import { closeModal } from '../../store/slices/modalSlice';
import Button from '../../components/Button/index';
import Subtask from '../../components/Subtask';
import './Task.scss';
import { mainApi } from '../../utils/api/mainApi';
import { updateTask } from '../../store/slices/tasksSlice';

const UpdateTask = () => {
    const activeBoardId = useSelector(state => state.activeBoardId.activeBoardId);
    const boards = useSelector(state => state.boards.boards);
    const activeBoard = boards.find(board => board.id === activeBoardId);
    const activeTask = useSelector(state => state.activeTask.activeTask);
    const [isDisabled, setIsDisabled] = useState(true);
    console.log(isDisabled)
    const [data, setData] = useState({
        title: activeTask.title,
        description: activeTask.description,
        status: activeTask.status,
        boardId: activeTask.boardId,
        columnId: activeTask.columnId,
        subtasks: activeTask.subtasks,
        id: activeTask.id
    });

    const [column, setColumn] = useState({});
    const [subtasks, setSubtasks] = useState(activeTask.subtasks);
    const [subTasksNumbers, setSubTasksNumbers] = useState(subtasks.length);
    const dispatch = useDispatch();
    // Обрабатываем клик по кнопке добавление еще одной субтаски
    const subtasksFieldsElements = () => {
        const content = [];
        // const subtasksInActiveTask = activeTask.subtasks;
        for (let i = 1; i <= subTasksNumbers; i++) {
            content.push(<Subtask key={i} placeholder='e.g. Drink coffee & smile' id={i} setSubtasks={setSubtasks} subtasks={subtasks} handleDeleteSubtask={handleDeleteSubtask}/>);
        }
        return content;
    };

    // Увеличивается количество отображаемых полей для субтасок
    const handelSubTasksAddClick = e => {
        e.preventDefault();
        setSubTasksNumbers(subTasksNumbers + 1);
    };

    // При изменении в интупатх таски (имя и описание) обновляет объект с таски
    const handleChange = e => {
        const { name, value } = e.target;
        setData(oldData => ({ ...oldData, [name]: value }));
        setIsDisabled(false)
    };

    // При нажатии на сохранить изменения отправляет новую таску на сервер и при 
    // успешном ответе обновляет данные в store
    const handleUpdateTask = e => {
        e.preventDefault();
        mainApi
            .updateTask(data)
            .then(res => dispatch(updateTask(res)))
            .catch(err => console.log(err))
            .finally(dispatch(closeModal()));
    }

    // При любом изменении в subtasks обновляет содержимое ключа subtasks в объекте data (данные таски)
    useEffect(() => {
        setData(oldData => ({ ...oldData, subtasks }))
    }, [subtasks])

    // При изменении column обновляет в таске columnId и status (название колонки)
    useEffect(() => {
        setData(oldData => ({ ...oldData, columnId: column.columnId, status: column.status }))
    }, [column])

    const handleDeleteSubtask = subtaskId => {
        console.log(subtaskId)
        let currentSubtasks = subtasks.find(element => element.id === subtaskId).id
        console.log(currentSubtasks)
        let newSubtasks = subtasks.filter((element) => element.id !== currentSubtasks);
       
        const taskData = {
            ...activeTask,  subtasks: newSubtasks
        };
        mainApi
            .updateTask(taskData)
            .then(res => {
                console.log(res)

            })
            .catch(err => console.log(err));
    }

    return (
        <form className='task-form' onSubmit={handleUpdateTask}>
            <h2 className='task-form__heading'>{'Edit Task'}</h2>
            <label className='task-form__label-container'>
                <p className='task-form__label'>Title</p>
                <input
                    className='task-form__input'
                    placeholder='e.g. Take coffee break'
                    type='text'
                    name='title'
                    onChange={handleChange}
                    value={data.title || activeTask.title}
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
                    value={data.description || activeTask.description}
                />
            </label>
            <div className='task-form__subtasks-wrapper'>
                <p className='task-form__subtasks-title'>Subtasks</p>

                <div>{subtasksFieldsElements()}</div>
                <Button fn={handelSubTasksAddClick} type='button' label='+ Add New Subtask' isLarge isSecondary isFullWidth />
            </div>
            <Dropdown data={activeBoard.columns} label='Status' setColumn={setColumn} />
            <Button
                fnSumbit={handleUpdateTask}
                type='submit'
                label={'Update task'}
                isLarge
                isSecondary={false}
                isFullWidth
                isDestructive={false}
                disabled={isDisabled}
            />
        </form>
    )
}

export default UpdateTask
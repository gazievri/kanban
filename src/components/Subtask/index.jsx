import React from 'react';
import '../../styles/@mixins.scss';
import '../../styles/@variables.scss';
import '../../modals/TaskModal/Task.scss';
import './Subtask.scss';

const Subtask = ({ placeholder, id, setSubtasks, subtasks, handleDeleteSubtask }) => {  
  const handleInput = e => {
    const newSubTs = {
      name: e.target.value,
      done: false,
      id
    };
    if (subtasks.find(item => item.id === newSubTs.id)) {
      setSubtasks(subtasks.map(item => (item.id === newSubTs.id ? newSubTs : item)));
    } else {
      setSubtasks([...subtasks, newSubTs]);
    }
  };

  return (
    <div className='task-form__subtask-frame' key={id}>
      <input
        className='task-form__subtask'
        placeholder={placeholder}
        type='text'
        name={`subtask ${id}`}
        onChange={handleInput}
        autoComplete="off"
        id={subtasks[id - 1]?.id}
        defaultValue={subtasks[id - 1]?.name}
      />
      <button className='task-form__subtask-btn' 
      onClick={() => handleDeleteSubtask(subtasks[id - 1]?.id)}
      >

        <div className='task-form__subtask-btn-picture' />
      </button>
    </div>
  );
};

export default Subtask;

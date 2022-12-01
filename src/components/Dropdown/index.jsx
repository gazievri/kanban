import {useState, useEffect} from 'react';
import './Dropdown.scss';

export const Dropdown = ({ data, label, setColumn = Function.prototype, taskColumnId }) => {
  const [showDrop, setShowDrop] = useState(false);
  const getLabelById = id => data.find(item => item.columnId === id).name;

  const [selectedId, setSelectedId] = useState(taskColumnId ? taskColumnId : data[0].columnId);

  const pickOption = id => {
    setSelectedId(id);
    setShowDrop(false);
  };


  const getDefaultValue = () => {
    const value = data.find(column => column.columnId === selectedId).name;
    return value ? value : 'text';
  };

  useEffect(() => {
    const status = {
      columnId: selectedId,
      status: data.find(item => item.columnId === selectedId).name
    };
    setColumn(status);
  }, [selectedId]);

  const clickOnDropdown = e => {
    setShowDrop(prev => !prev);
  };

  return (
    <label className='dropdown'>
      <select className='dropdown__select' defaultValue={getDefaultValue}>
        {data.map(item => (
          <option key={item.columnId} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <span className='dropdown__label'>{label}</span>

      <div className='dropdown__fake-select' aria-hidden>
        <span className='dropdown__fake-select__picker' onClick={clickOnDropdown}>
          {getLabelById(selectedId)}
        </span>
        <ul className='dropdown__fake-select__options'>
          {data.map((option, index) => (
            <li
              className={`dropdown__fake-select__option option-${index} ${showDrop && 'open'}`}
              onClick={() => pickOption(option.columnId)}
              key={option.columnId}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
};

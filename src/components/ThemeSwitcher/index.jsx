import React, { useState } from 'react';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { useColor } from '../../utils/hooks/useColor';
import './ThemeSwitcher.scss';

export const ThemeSwitcher = () => {
  const [mode, setMode] = useState(!useLocalStorage('mode'));

  const toggleMode = () => {
    setMode(prev => !prev);
    localStorage.setItem('mode', JSON.stringify(mode));
  };

  React.useEffect(() => {
    useColor(mode);
  }, [mode]);

  return (
    <label className='toggle'>
      <input className='toggle__input hidden' type='checkbox' onChange={() => toggleMode()} />
      <span className='toggle__fake-input' aria-hidden>
        <span className='toggle__circle' style={mode ? { left: 3 } : { left: 'calc(100% - 17px)' }} />
      </span>
    </label>
  );
};

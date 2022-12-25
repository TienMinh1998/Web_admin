import React, { KeyboardEvent } from 'react';
import { InputProps } from 'shared/types/interface';
import 'shared/style/index.css';

export const Input: React.FC<InputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  value,
  placeholder,
  type = 'text',
  addonAfter,
  addonBefore,
  disabled = false,
  className = '',
  onChange,
  onPressEnter,
  ...props
}) => {
  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onPressEnter && onPressEnter();
    }
  };

  return (
    <div
      className={`td-input-wrapper ${className}`}
      style={addonAfter || addonBefore ? {} : { borderRadius: '4px' }}>
      {addonBefore && <div className="input-addon before">{addonBefore}</div>}
      <input
        {...props}
        id={id}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        disabled={disabled}
        className="td-input"
        style={addonAfter || addonBefore ? { borderRadius: '0px' } : {}}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          handlePressEnter(e);
        }}
      />
      {addonAfter && <div className="input-addon after">{addonAfter}</div>}
    </div>
  );
};

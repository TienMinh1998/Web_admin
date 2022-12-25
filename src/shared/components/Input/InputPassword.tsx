import React, { KeyboardEvent, useState } from 'react';
import { InputPasswordProps } from 'shared/types/interface';
import { EyeInvisible, EyeVisible } from '../Icons';
import 'shared/style/index.css';

export const InputPassword: React.FC<
  InputPasswordProps & React.InputHTMLAttributes<HTMLInputElement>
> = (
  { id, value, placeholder, className = '', visibilityToggle = false, onChange, onPressEnter },
  ...props
) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onPressEnter && onPressEnter();
    }
  };
  return (
    <div className={`td-input-wrapper ${className}`}>
      <input
        {...props}
        id={id}
        value={value}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        onChange={onChange}
        className="td-input-password"
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          handlePressEnter(e);
        }}
      />
      {visibilityToggle ? (
        <span
          className="cursor-pointer flex items-center px-2"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeInvisible /> : <EyeVisible />}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

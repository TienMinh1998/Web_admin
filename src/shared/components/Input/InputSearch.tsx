import React, { KeyboardEvent } from 'react';
import { IInputSearch } from 'shared/types/interface';
import 'shared/style/index.css';
import { AiOutlineSearch } from 'react-icons/ai';

export const InputSearch: React.FC<IInputSearch & React.InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  value,
  placeholder,
  className = '',
  enterPress = true,
  onChange,
  onSearch,
  ...props
}) => {
  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && enterPress) {
      onSearch && onSearch();
    }
  };

  return (
    <div className={`td-input-wrapper input-search ${className}`}>
      <input
        {...props}
        id={id}
        value={value}
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        className="td-input"
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          handlePressEnter(e);
        }}
      />
      <div
        className="p-2 bg-primary-color text-white font-semibold cursor-pointer"
        onClick={() => {
          onSearch && onSearch();
        }}>
        <AiOutlineSearch className=" text-xl" />
      </div>
    </div>
  );
};

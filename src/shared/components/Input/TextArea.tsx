import React, { KeyboardEvent } from 'react';
import { TextAreaProps } from 'shared/types/interface';
import 'shared/style/index.css';

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  value,
  placeholder,
  disabled = false,
  className = '',
  minRows = 2,
  maxRows = 6,
  showCount = false,
  maxLength,
  bordered = true,
  onChange,
  onPressEnter,
  ...props
}) => {
  const handlePressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      onPressEnter && onPressEnter();
    }
  };
  return (
    <div className={`td-textarea-wrapper ${className}`}>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`td-input ${bordered ? 'border border-[#d9d9d9]' : ''}`}
        onKeyPress={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          handlePressEnter(e);
        }}
        rows={minRows}
        // maxRows={maxRows}
        maxLength={maxLength}
        {...props}
      />
      {showCount ? (
        <div className="flex justify-end">{value?.length || 0 + ' / ' + maxLength}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

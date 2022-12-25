import React from 'react';
import 'shared/style/index.css';
import { InputProps } from 'shared/types/interface';

export const UploadFile: React.FC<InputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  value,
  disabled = false,
  className = '',
  onChange,
  ...props
}) => {
  return (
    <div className={` ${className} my-4 `}>
      <label htmlFor="upload-photo" className="font-bold bg-primary-color p-4 rounded text-white">
        Upload Image
      </label>
      <input type="file" id="upload-photo" {...props} onChange={onChange} disabled={disabled} />
    </div>
  );
};

import React, { useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import { RiImageEditFill } from 'react-icons/ri';
import { ToolTip } from '../Tooltip';
import './style.css';

type UploadProps = {
  loading?: boolean;
  src?: string;
  showClose?: boolean;
  onChangeImage?: (file: any, e: any) => void;
  onClear?: () => void;
};

export const UploadImageButton: React.FC<UploadProps> = ({
  loading,
  src,
  showClose = true,
  onChangeImage,
  onClear
}) => {
  const myRefname = useRef(null);
  const handleClick = (event: any) => {
    event.current?.click();
  };

  const onHandleChange = (e: any) => {
    onChangeImage && onChangeImage(e.target.files[0], e);
  };

  return (
    <div className="td-button-upload-warp cursor-pointer ">
      <div className="td-button-upload bg-white relative">
        {src && !loading ? (
          <img src={src} />
        ) : (
          <BsFillImageFill
            className={`text-4xl text-slate-400 ${loading ? 'animate-spin text-blue-400' : ''}`}
          />
        )}

        <div
          className="btn-change"
          onClick={() => {
            handleClick(myRefname);
          }}>
          <ToolTip title="Change Image">
            <RiImageEditFill className="text-slate-400" />
          </ToolTip>
        </div>
        {/* Close Button */}
        {showClose && (
          <div
            className="btn-close"
            onClick={() => {
              onClear && onClear();
            }}>
            <ToolTip title="Close Image">
              <AiFillCloseCircle className=" text-slate-400" />
            </ToolTip>
          </div>
        )}
      </div>
      <input ref={myRefname} type="file" onChange={onHandleChange} />
    </div>
  );
};

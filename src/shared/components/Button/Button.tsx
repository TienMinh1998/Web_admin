import React from 'react';
import './style.css';

type ButtonProp = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  htmlType?: 'button' | 'submit' | 'reset';
  primary?: boolean;
  ghost?: boolean;
  danger?: boolean;
  type?: 'default' | 'primary' | 'ghost' | 'dashed';
  icon?: React.ReactSVG;
};

const Button: React.FC<ButtonProp> = ({
  children = 'Button',
  className,
  style,
  onClick,
  htmlType = 'button',
  primary,
  ghost,
  danger,
  type = 'default',
  icon
}) => {
  const classTypeButton = () => {
    // return className => define class in css file to display style button

    // ghost => class: td-btn-background-ghost

    // primary => class : td-btn-primary
    // color: #fff;
    // border-color: var(--ant-primary-color);
    // background: var(--ant-primary-color);
    // text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    // box-shadow: 0 2px #0000000b;

    // danger => class : td-btn-danger
    // color: #ff4d4f;
    // border-color: #ff4d4f;
    // background: #fff;

    // dashed => class : td-btn-dashed
    // color: #000000d9;
    // border-color: #d9d9d9;
    // background: #fff;
    // border-style: dashed;
    const mainColor = '#00b0ff';
    const dangerColor = '#ff4d4f';

    const typeButton = {
      primary,
      ghost,
      danger
    };
    console.log('adsafsdf', typeButton);
    return '';
  };
  return (
    <button
      className={`${className}  td-button bg-primary-color min-w-[100px]`}
      style={style}
      onClick={() => {
        onClick && onClick();
      }}
      type={htmlType}>
      {children}
    </button>
  );
};

export default Button;

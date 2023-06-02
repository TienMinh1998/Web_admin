import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const ContainerAuth: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex justify-center bg-[url('/src/assets/images/background/7171197.jpg')] bg-cover">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="max-w-7xl w-full h-full ">{children}</div>
    </div>
  );
};

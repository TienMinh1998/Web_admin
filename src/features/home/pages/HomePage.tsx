import React from 'react';
import { WhiteBoxWrapper } from 'shared/components/common';

const HomePage: React.FC = () => {
  return (
    <div className="m-2">
      <WhiteBoxWrapper>
        <div className="text-xl">Welcome to English Admin! 🎉🎉🎉</div>
        <div>We are happy to see you again. Please continue your great job!</div>
      </WhiteBoxWrapper>
    </div>
  );
};
export default HomePage;

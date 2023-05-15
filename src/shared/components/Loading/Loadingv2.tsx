import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { WhiteBoxWrapper } from '../common';

type Props = {
  loading: boolean;
  children?: React.ReactNode;
};

export const Loadingv2: React.FC<Props> = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <WhiteBoxWrapper>
          <Skeleton style={{ height: '40px', marginTop: '12px' }} />
          <Skeleton style={{ height: '40px', marginTop: '12px' }} />
          <Skeleton style={{ height: '40px', marginTop: '12px' }} />
        </WhiteBoxWrapper>
      ) : (
        children
      )}
    </>
  );
};

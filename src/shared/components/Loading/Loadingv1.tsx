import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { WhiteBoxWrapper } from '../common/WhiteBoxWrapper';

type Props = {
  loading: boolean;
  children?: React.ReactNode;
};
export const Loadingv1: React.FC<Props> = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <WhiteBoxWrapper>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4">
            {Array.from(Array(9).keys()).map((i) => {
              return (
                <div className="col-span-4 text-center" key={i}>
                  <Skeleton style={{ height: '40px' }} className="rounded-md" />
                </div>
              );
            })}
          </div>
        </WhiteBoxWrapper>
      ) : (
        children
      )}
    </>
  );
};

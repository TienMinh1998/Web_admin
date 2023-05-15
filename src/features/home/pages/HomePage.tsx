import { requestPosts } from 'features/news/api/post.api';
import { PostComp } from 'features/news/pages/PostComp';
import React, { useState } from 'react';
import { Loadingv1 } from 'shared/components/Loading';
import { WhiteBoxWrapper } from 'shared/components/common';
import { useTableData } from 'shared/hooks/useTableData';

const HomePage: React.FC = () => {
  const [expandFilter, setExpandFilter] = useState<any>({ columnSort: 'created_on', isDesc: true });
  const { dataSource, loading, fetchDataSource } = useTableData({
    expandFilter,
    fetchList: requestPosts
  });
  return (
    <div className="m-2">
      <WhiteBoxWrapper>
        <div className="text-xl">Welcome to English Admin! 🎉🎉🎉</div>
        <div>We are happy to see you again. Please continue your great job!</div>
      </WhiteBoxWrapper>

      <div className="mt-4">
        <Loadingv1 loading={loading}>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
            {dataSource?.map((item: any) => (
              <PostComp key={item._id} data={item} fetchDataSource={fetchDataSource} />
            ))}
          </div>
        </Loadingv1>
      </div>
    </div>
  );
};
export default HomePage;

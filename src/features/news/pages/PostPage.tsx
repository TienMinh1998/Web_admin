import React, { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Button } from 'shared/components/Button';
import { Loadingv1 } from 'shared/components/Loading';
import { HeaderPage } from 'shared/components/common';
import { useTableData } from 'shared/hooks/useTableData';
import { requestPosts } from '../api/post.api';
import { PostComp } from './PostComp';

export const PostPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<any>({ columnSort: 'created_on', isDesc: true });
  const { dataSource, loading, paging, setPaging, fetchDataSource } = useTableData({
    expandFilter,
    fetchList: requestPosts,
    pageSize: 1000
  });

  const goToCreateProduct = () => {
    navigate(`${PROTECTED_ROUTES_PATH.POST}/add`);
  };

  return (
    <div className="p-2">
      <HeaderPage
        title="Danh sách các bài viết"
        extraButton={
          <div className="flex">
            <Button className="mr-4 flex items-center justify-center" onClick={goToCreateProduct}>
              <BiPlusCircle className="mr-1" />
              Thêm tin tức
            </Button>
          </div>
        }>
        {/* <>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
            <div className="col-span-6">
              <InputSearch
                placeholder="Tìm kiếm khóa học"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onSearch={() => {
                  setExpandFilter({ ...expandFilter, name: searchText, page: 1 });
                }}
              />
            </div>
          </div>
        </> */}
      </HeaderPage>

      <Loadingv1 loading={loading}>
        <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
          {dataSource?.map((item: any) => (
            <PostComp key={item._id} data={item} fetchDataSource={fetchDataSource} />
          ))}
        </div>
      </Loadingv1>
    </div>
  );
};

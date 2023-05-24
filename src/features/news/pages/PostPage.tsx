import React, { useState } from 'react';
import { BiFilterAlt, BiPlusCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Button } from 'shared/components/Button';
import { Loadingv1 } from 'shared/components/Loading';
import { HeaderPage, WhiteBoxWrapper } from 'shared/components/common';
import { useTableData } from 'shared/hooks/useTableData';
import { requestPosts } from '../api/post.api';
import { PostComp } from './PostComp';
import { InputSearch } from 'shared/components/Input';
import FilterPage from 'shared/components/common/FilterPage';
import { DatePicker, Pagination } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
export const PostPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>('');
  const [expandFilter, setExpandFilter] = useState<any>({
    search: { title: undefined, startDate: undefined, endDate: undefined }
  });
  const { dataSource, loading, showFilter, paging, setPaging, fetchDataSource, onToogleFilter } =
    useTableData({
      expandFilter,
      fetchList: requestPosts,
      pageSize: 100
    });
  const formFilter = {
    date: {
      label: 'From Date / To Date',
      className: 'col-span-6',
      component: (
        <RangePicker
          style={{ width: '95%' }}
          allowClear
          format="DD/MM/YYYY"
          placeholder={['From Date', 'To Date']}
          onChange={(date: any, dateString) => {
            setExpandFilter({
              ...expandFilter,
              page: 1,
              search: {
                startDate: date ? moment(date[0]).toDate() : undefined,
                endDate: date ? moment(date[1]).toDate() : undefined
              }
            });
          }}
        />
      )
    }
  };
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
              Thêm bài viết
            </Button>
          </div>
        }>
        <>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
            <div className="col-span-6">
              <InputSearch
                placeholder="Tìm kiếm bài viết"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onSearch={() => {
                  setExpandFilter({ ...expandFilter, page: 1, search: { title: searchText } });
                }}
              />
            </div>
            <Button className="mr-4 flex items-center justify-center" onClick={onToogleFilter}>
              <BiFilterAlt />
              Filter
            </Button>
          </div>
          {showFilter && <FilterPage filters={formFilter} />}
        </>
      </HeaderPage>
      <WhiteBoxWrapper>
        <Pagination
          defaultCurrent={paging.currentPage}
          total={paging.total}
          onChange={(page: number) => {
            setExpandFilter({ ...expandFilter, page });
          }}
        />
      </WhiteBoxWrapper>
      <Loadingv1 loading={loading}>
        <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
          {dataSource.length > 0 ? (
            dataSource?.map((item: any) => (
              <PostComp key={item._id} data={item} fetchDataSource={fetchDataSource} />
            ))
          ) : (
            <>No data</>
          )}
        </div>
      </Loadingv1>
    </div>
  );
};

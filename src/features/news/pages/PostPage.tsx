import { DatePicker, Empty, Input, Pagination, Select } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Loadingv1 } from 'shared/components/Loading';
import { HeaderPage, WhiteBoxWrapper } from 'shared/components/common';
import FilterPage from 'shared/components/common/FilterPage';
import { useTableData } from 'shared/hooks/useTableData';
import { requestPosts } from '../api/post.api';
import { PostComp } from './PostComp';

const { RangePicker } = DatePicker;
const { Search } = Input;

export const PostPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchText, setSearchText] = useState<string>('');
  const [expandFilter, setExpandFilter] = useState<any>({
    search: { title: undefined, startDate: undefined, endDate: undefined }
  });
  const { dataSource, loading, showFilter, paging, setPaging, fetchDataSource, onToogleFilter } =
    useTableData({
      expandFilter,
      fetchList: requestPosts,
      pageSize: 24
    });
  const formFilter = {
    title: {
      label: 'Title',
      className: 'col-span-3',
      component: (
        <Search
          placeholder="Tìm kiếm bài viết"
          value={expandFilter?.search?.tilte}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onSearch={() => {
            setExpandFilter({ ...expandFilter, page: 1, search: { title: searchText } });
          }}
        />
      )
    },
    type: {
      label: 'Type',
      className: 'col-span-3',
      component: (
        <Select
          style={{ width: '95%' }}
          allowClear
          placeholder="Chọn loại"
          value={expandFilter?.search?.type}
          options={[
            { value: '1', label: 'Writing' },
            { value: '2', label: 'Listening' },
            { value: '3', label: 'Reading' },
            { value: '4', label: 'Different' }
          ]}
          onChange={(value: any) => {
            setExpandFilter({ ...expandFilter, page: 1, search: { type: value } });
          }}
        />
      )
    },
    date: {
      label: 'From Date / To Date',
      className: 'col-span-4',
      component: (
        <RangePicker
          style={{ width: '95%' }}
          allowClear
          format="DD/MM/YYYY"
          value={[expandFilter?.search?.startDate, expandFilter?.search?.endDate]}
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

  useEffect(() => {
    setExpandFilter({ search: location.state });
  }, []);

  const goToCreateProduct = () => {
    navigate(`${PROTECTED_ROUTES_PATH.POST}/add`);
  };

  const goToDetail = (id: number) => {
    navigate(`${PROTECTED_ROUTES_PATH.POST}/detail/${id}`, {
      state: { ...expandFilter.search }
    });
  };

  const setSearchParams = (objSearch: any) => {
    let searchParams = '';
    Object.keys(objSearch).forEach((key: any, index: number) => {
      if (objSearch['key'] === undefined || objSearch['key'] == null) return;
      if (index === 0) {
        searchParams += `?${key}=${objSearch['key']}`;
      } else {
        searchParams += `&${key}=${objSearch['key']}`;
      }
    });
    return searchParams;
  };

  return (
    <div className="p-2 flex flex-col h-full">
      <HeaderPage title="" extraButton={<div className="flex"></div>}>
        <FilterPage filters={formFilter} goToCreateProduct={goToCreateProduct} />
      </HeaderPage>

      <div className="flex-1">
        <Loadingv1 loading={loading}>
          {dataSource.length > 0 ? (
            <div className="grid grid-cols-12 gap-x-2 gap-y-4">
              {dataSource?.map((item: any) => (
                <PostComp
                  key={item._id}
                  data={item}
                  fetchDataSource={fetchDataSource}
                  goToDetail={goToDetail}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-4 flex justify-center items-center w-full">
              <Empty />
            </div>
          )}
        </Loadingv1>
      </div>
      <WhiteBoxWrapper className="p-2 mt-4 flex justify-end">
        <Pagination
          defaultCurrent={paging.currentPage}
          pageSize={paging.pageSize}
          total={paging.total}
          onChange={(page: number) => {
            setExpandFilter({ ...expandFilter, pageIndex: page, pageNumber: page });
          }}
        />
      </WhiteBoxWrapper>
    </div>
  );
};

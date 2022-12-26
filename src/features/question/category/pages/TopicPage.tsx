import { DatePicker } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { BiFilterAlt, BiPlusCircle } from 'react-icons/bi';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Button, ButtonIcon } from 'shared/components/Button';
import { HeaderPage, WhiteBoxWrapper } from 'shared/components/common';
import FilterPage from 'shared/components/common/FilterPage';
import { EditIcon } from 'shared/components/Icons';
import { InputSearch } from 'shared/components/Input';
import { Table } from 'shared/components/Table/Table';
import { useTableData } from 'shared/hooks/useTableData';
import { BaseSelect } from 'shared/styled-components';
import { ORDER_STATUS } from 'shared/utils/filterData';
import { requestAllTopicByCourseId } from '../api/topic.api';

const { RangePicker } = DatePicker;

export const TopicPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<any>({ userId: '' });
  const [searchText, setSearchText] = useState<string>('');
  const { dataSource, loading, paging, setPaging, showFilter, fetchDataSource, onToogleFilter } =
    useTableData({
      expandFilter,
      fetchList: requestAllTopicByCourseId
    });
  const columns = [
    {
      title: 'Mã KH',
      keyData: 'code',
      render: (value: string, index: number, record: any) => (
        <div
          className="font-semibold cursor-pointer text-primary-color"
          onClick={() => {
            goToDetail(record.pk_coursId);
          }}>
          {value}
        </div>
      )
    },
    {
      title: 'Tên KH',
      keyData: 'title',
      render: (value: string) => <div className="font-semibold">{value}</div>
    },
    {
      title: 'Mục tiêu',
      keyData: 'target',
      width: 250
    },
    {
      title: 'Nội dung',
      keyData: 'content',
      width: 250
    },
    {
      title: 'Created At',
      keyData: 'createdAt',
      render: (value: any) => <div>{moment(value).format('DD/MM/YYYY')}</div>
    },
    {
      title: 'Action',
      keyData: 'id',
      render: (value: any, index: number, record: any) => (
        <div className="flex">
          <ButtonIcon className="mr-2">
            <EditIcon
              className="text-xl cursor-pointer hover:text-green-500 "
              onClick={() => {
                goToDetail(record.pk_coursId);
              }}
            />
          </ButtonIcon>
          {/* <ButtonIcon className="mr-2">
            <Popconfirm
              placement="bottom"
              title="Bạn chắc chắn muốn xóa khóa học?"
              onConfirm={() => {
                handleClickDelete(record.pk_coursId);
              }}
              okText="Xóa"
              cancelText="Thoát"
              okButtonProps={{ type: 'primary', danger: true }}>
              <DeleteIcon className="hover:text-red-500  cursor-pointer text-xl" />
            </Popconfirm>
          </ButtonIcon> */}
        </div>
      )
    }
  ];

  const goToCreate = () => {
    navigate(`${PROTECTED_ROUTES_PATH.TOPIC_QUESTION}/add`);
  };

  const goToDetail = (id: number) => {
    navigate(`${PROTECTED_ROUTES_PATH.TOPIC_QUESTION}/${id}`);
  };
  const formFilter = {
    status: {
      label: 'Status',
      className: 'col-span-3',
      component: (
        <BaseSelect
          style={{ width: '95%' }}
          placeholder="Select Status"
          options={ORDER_STATUS}
          allowClear
          onChange={(value: any) => {
            setExpandFilter({ ...expandFilter, status: value });
          }}
        />
      )
    },
    date: {
      label: 'From Date / To Date',
      className: 'col-span-6',
      component: (
        <RangePicker
          style={{ width: '95%' }}
          allowClear
          format="DD/MM/YYYY"
          placeholder={['From Date', 'To Date']}
          onChange={(value: any) => {
            setExpandFilter({ ...expandFilter });
          }}
        />
      )
    }
  };

  return (
    <div className="p-2 ">
      <HeaderPage
        title="Topic question"
        extraButton={
          <div className="flex">
            <Button className="mr-4 flex items-center justify-center" onClick={goToCreate}>
              <BiPlusCircle />
              Create
            </Button>
          </div>
        }>
        <>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
            <div className="col-span-6">
              <InputSearch
                placeholder="Search by Topic Name"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onSearch={() => {
                  setExpandFilter({ ...expandFilter, userId: searchText, page: 1 });
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
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          paging={{
            ...paging,
            onChangePage: (page: number) => {
              setPaging({ ...paging, currentPage: page });
            }
          }}
        />
      </WhiteBoxWrapper>
    </div>
  );
};
import { Popconfirm } from 'antd';
import R from 'assets';
import moment from 'moment';
import React, { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Button, ButtonIcon } from 'shared/components/Button';
import { HeaderPage, WhiteBoxWrapper } from 'shared/components/common';
import { DeleteIcon, EditIcon } from 'shared/components/Icons';
import { Table } from 'shared/components/Table/Table';
import { useTableData } from 'shared/hooks/useTableData';
import { requestCourseList, requestDeleteCourse } from '../api/course.api';

export const CoursePage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<any>({ columnSort: 'created_on', isDesc: true });
  const [searchText, setSearchText] = useState<string>('');
  const { dataSource, loading, paging, setPaging, fetchDataSource } = useTableData({
    expandFilter,
    fetchList: requestCourseList
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
      title: 'Ảnh',
      keyData: 'coursImage',
      render: (value: string) => (
        <div className="w-[80px] h-[80px] flex justify-center items-center ">
          <img
            src={value}
            alt="img_product"
            className="rounded object-contain max-w-full max-h-full"
          />
        </div>
      )
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
      keyData: 'created_on',
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
          <ButtonIcon className="mr-2">
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
          </ButtonIcon>
        </div>
      )
    }
  ];

  const goToCreateProduct = () => {
    navigate(`${PROTECTED_ROUTES_PATH.COURSE}/add`);
  };

  const goToDetail = (id: number) => {
    navigate(`${PROTECTED_ROUTES_PATH.COURSE}/${id}`);
  };

  const handleClickDelete = async (id: number) => {
    try {
      await requestDeleteCourse(id);
      toast.success('Xóa khóa học thành công!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  return (
    <div className="p-2">
      <HeaderPage
        title="Khóa học"
        extraButton={
          <div className="flex">
            <Button className="mr-4 flex items-center justify-center" onClick={goToCreateProduct}>
              <BiPlusCircle className="mr-1" />
              Thêm khóa học
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

      {/* {visibleModal && (
        <AddQuestionToTopicModal
          visible={visibleModal}
          onCancel={toogleModal}
          dataUpdate={dataUpdate}
          fetchDataSource={fetchDataSource}
        />
      )} */}
    </div>
  );
};

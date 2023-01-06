import { DatePicker, Popconfirm } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiFilterAlt, BiPlusCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Button, ButtonIcon } from 'shared/components/Button';
import { HeaderPage, WhiteBoxWrapper } from 'shared/components/common';
import FilterPage from 'shared/components/common/FilterPage';
import { DeleteIcon, EditIcon, SwitchIcon } from 'shared/components/Icons';
import { InputSearch } from 'shared/components/Input';
import { Table } from 'shared/components/Table/Table';
import { useTableData } from 'shared/hooks/useTableData';
import { requestAllQuestion, requestDeleteQuestion } from '../api/question.api';
import { AddQuestionToTopicModal } from '../components/AddQuestionToTopicModal';

export const ProductStorePage: React.FC = () => {
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<any>({
    columnSort: 'created_on',
    isDesc: true,
    date: ''
  });
  const [searchText, setSearchText] = useState<string>('');
  const { dataSource, loading, paging, showFilter, setPaging, fetchDataSource, onToogleFilter } =
    useTableData({
      expandFilter,
      fetchList: requestAllQuestion
    });
  const [dataUpdate, setDataUpdate] = useState({
    topicID: '',
    questionID: ''
  });
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const columns = [
    {
      title: 'Từ vựng',
      keyData: 'english',
      width: 200,
      render: (value: string, index: number, record: any) => (
        <div
          className="font-semibold cursor-pointer text-primary-color flex items-center"
          onClick={() => {
            goToDetailProduct(record.pk_QuestionStandard_Id);
          }}>
          {record.added ? (
            <div className="mr-1">
              <AiOutlineCheckCircle className="font-semibold text-green-500  text-xl" />
            </div>
          ) : (
            <></>
          )}
          {value}
        </div>
      )
    },
    {
      title: 'Phiên âm',
      keyData: 'phonetic',
      render: (value: string) => <div className="font-semibold">{value}</div>
    },
    {
      title: 'Nghĩa Tiếng Anh',
      keyData: 'meaningEnglish',
      width: 250
    },
    {
      title: 'Nghĩa Tiếng Việt',
      keyData: 'meaningVietNam',
      width: 250
    },
    {
      title: 'Ghi chú',
      keyData: 'note',
      width: 250,
      render: (value: string) => <div>{value}</div>
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
                goToDetailProduct(record.pk_QuestionStandard_Id);
              }}
            />
          </ButtonIcon>
          <ButtonIcon className="mr-2">
            <SwitchIcon
              className="text-xl cursor-pointer hover:text-green-500 "
              onClick={() => {
                openModalUpdate(record);
              }}
            />
          </ButtonIcon>
          <ButtonIcon className="mr-2">
            <Popconfirm
              placement="bottom"
              title="Bạn chắc chắn muốn xóa từ vựng?"
              onConfirm={() => {
                handleClickDelete(record.pk_QuestionStandard_Id);
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

  const handleClickDelete = async (id: number) => {
    try {
      await requestDeleteQuestion(id);
      toast.success('Xóa từ vựng thành công!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const goToCreateProduct = () => {
    navigate(`${PROTECTED_ROUTES_PATH.QUESTION}/add`);
  };

  const goToDetailProduct = (id: number) => {
    navigate(`${PROTECTED_ROUTES_PATH.QUESTION}/${id}`);
  };

  const toogleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const openModalUpdate = (data: any) => {
    setVisibleModal(true);
    setDataUpdate(data);
  };

  const formFilter = {
    date: {
      label: 'Ngày tạo',
      className: 'col-span-6',
      component: (
        <DatePicker
          style={{ width: '95%' }}
          allowClear
          format="YYYY-MM-DD"
          placeholder="Ngày tạo"
          onChange={(date, dateString) => {
            setExpandFilter({ ...expandFilter, date: dateString || undefined });
          }}
        />
      )
    }
  };

  return (
    <div className="p-2">
      <HeaderPage
        title="Từ vựng"
        extraButton={
          <div className="flex">
            <Button className="mr-4 flex items-center justify-center" onClick={goToCreateProduct}>
              <BiPlusCircle className="mr-1" />
              Thêm từ
            </Button>
          </div>
        }>
        <>
          <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
            <div className="col-span-6">
              <InputSearch
                placeholder="Tìm kiếm từ mới"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onSearch={() => {
                  setExpandFilter({ ...expandFilter, searchKey: searchText || undefined, page: 1 });
                }}
              />
            </div>
            <Button className="mr-4 flex items-center justify-center" onClick={onToogleFilter}>
              <BiFilterAlt />
              Filter
            </Button>
          </div>
        </>

        {showFilter && <FilterPage filters={formFilter} />}
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

      {visibleModal && (
        <AddQuestionToTopicModal
          visible={visibleModal}
          onCancel={toogleModal}
          dataUpdate={dataUpdate}
          fetchDataSource={fetchDataSource}
        />
      )}
    </div>
  );
};

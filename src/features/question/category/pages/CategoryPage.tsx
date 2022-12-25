import { DatePicker } from 'antd';
import React, { useState } from 'react';
import { BiFilterAlt, BiPlusCircle } from 'react-icons/bi';
import { Button } from 'shared/components/Button';
import { HeaderPage } from 'shared/components/common';
import FilterPage from 'shared/components/common/FilterPage';
import { InputSearch } from 'shared/components/Input';
import { Loadingv1 } from 'shared/components/Loading';
import { useTableData } from 'shared/hooks/useTableData';
import { BaseSelect } from 'shared/styled-components';
import { ORDER_STATUS } from 'shared/utils/filterData';
import { requestCategoryStore } from '../api/product-category.api';
import { CategoryBox } from '../components/CategoryBox';
import { UpdateCategoryModal } from '../components/UpdateCategoryModal';

const { RangePicker } = DatePicker;

export const CategoryPage: React.FC = () => {
  const [expandFilter, setExpandFilter] = useState<any>({ userId: '' });
  const [searchText, setSearchText] = useState<string>('');
  const [dataUpdate, setDataUpdate] = useState({
    name: '',
    image: ''
  });
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const { dataSource, loading, paging, setPaging, showFilter, fetchDataSource, onToogleFilter } =
    useTableData({
      expandFilter,
      fetchList: requestCategoryStore
    });

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

  const toogleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const openModalUpdate = (id: string, data: any) => {
    setVisibleModal(true);
    setDataUpdate(data);
  };

  return (
    <div className="p-2 ">
      <HeaderPage
        title="Topic question"
        extraButton={
          <div className="flex">
            <Button className="mr-4 flex items-center justify-center" onClick={toogleModal}>
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

      <Loadingv1 loading={loading}>
        <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4 ">
          {dataSource?.map((item: any) => (
            <CategoryBox
              key={item._id}
              data={item}
              openModalUpdate={openModalUpdate}
              fetchDataSource={fetchDataSource}
            />
          ))}
        </div>
      </Loadingv1>

      {visibleModal && (
        <UpdateCategoryModal
          visible={visibleModal}
          onCancel={toogleModal}
          dataUpdate={dataUpdate}
          fetchDataSource={fetchDataSource}
        />
      )}
    </div>
  );
};

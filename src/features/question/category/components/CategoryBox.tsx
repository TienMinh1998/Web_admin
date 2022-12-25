import { Popconfirm } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';
import { ButtonIcon } from 'shared/components/Button';
import { DeleteIcon, EditIcon } from 'shared/components/Icons';
import { ToolTip } from 'shared/components/Tooltip';
import { deleteCategoryStore } from '../api/product-category.api';

type Props = { data: any; openModalUpdate: (id: string, data: any) => void; fetchDataSource: any };

export const CategoryBox: React.FC<Props> = ({ data, openModalUpdate, fetchDataSource }) => {
  const handleClickDelete = async () => {
    try {
      await deleteCategoryStore(data._id);
      toast.success('Delete food category success!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  return (
    <div className="col-span-4 bg-white shadow-xl flex justify-between items-center p-3 rounded-md">
      <div className=" flex justify-between items-center">
        <span>{data?.name}</span>
      </div>

      <div className="flex">
        <ToolTip title="Edit">
          <ButtonIcon className="mr-2">
            <EditIcon
              className="text-xl cursor-pointer hover:text-green-500 "
              onClick={() => {
                openModalUpdate(data?._id, data);
              }}
            />
          </ButtonIcon>
        </ToolTip>
        <ToolTip title="Delete">
          <ButtonIcon className="mr-2">
            <Popconfirm
              placement="bottom"
              title="Do you want delete this food category?"
              onConfirm={handleClickDelete}
              okText="Delete"
              cancelText="Quit"
              okButtonProps={{ type: 'primary', danger: true }}>
              <DeleteIcon className="hover:text-red-500  cursor-pointer text-xl" />
            </Popconfirm>
          </ButtonIcon>
        </ToolTip>
      </div>
    </div>
  );
};

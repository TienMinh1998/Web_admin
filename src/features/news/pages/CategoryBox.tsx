import { Popconfirm } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';
import { ButtonIcon } from 'shared/components/Button';
import { ActiveDot, DeleteIcon, EditIcon, InactiveDot, SwitchIcon } from 'shared/components/Icons';
import { ToolTip } from 'shared/components/Tooltip';
import { requestDeletePost, requestUpdatePost } from '../api/post.api';

type Props = { data: any; openModalUpdate: (id: string) => void; fetchDataSource: any };
export const CategoryBox: React.FC<Props> = ({ data, openModalUpdate, fetchDataSource }) => {
  const handleClickDelete = async () => {
    try {
      await requestDeletePost(data._id);
      toast.success('Delete food category success!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const handleChangeStatus = async () => {
    try {
      await requestUpdatePost(data._id);
      toast.success('Update status food category success!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };
  return (
    <div className="col-span-4 bg-white shadow-xl flex justify-between items-center p-3 rounded-md">
      <div className=" flex justify-between items-center">
        {data?.status === 'Active' ? <ActiveDot /> : <InactiveDot />}

        <div>{data?.name}</div>
      </div>

      <div className="flex">
        <ToolTip title="Update Status">
          <ButtonIcon className="mr-2">
            <Popconfirm
              placement="bottom"
              title="Do you want change status this food category?"
              onConfirm={handleChangeStatus}
              okText="Update"
              cancelText="Quit">
              <SwitchIcon className="text-xl cursor-pointer hover:text-sky-500 " />
            </Popconfirm>
          </ButtonIcon>
        </ToolTip>
        <ToolTip title="Edit">
          <ButtonIcon className="mr-2">
            <EditIcon
              className="text-xl cursor-pointer hover:text-green-500 "
              onClick={() => {
                openModalUpdate(data?._id);
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

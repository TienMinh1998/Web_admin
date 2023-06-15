import { Popconfirm, Rate, Tag, Tooltip } from 'antd';
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GrCircleInformation } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { requestDeletePost } from '../api/post.api';
import '../style.css';

type Props = { data: any; goToDetail?: any; fetchDataSource: any };

export const PostComp: React.FC<Props> = ({ data, goToDetail, fetchDataSource }) => {
  const handleClickDelete = async () => {
    try {
      await requestDeletePost(data.id);
      toast.success('Delete post success!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  return (
    <div
      className="col-span-12 tablet:col-span-4 laptop:col-span-3 desktop:col-span-2 bg-white shadow-xl flex flex-col justify-between rounded-md text-base"
      onClick={() => {
        goToDetail & goToDetail(data?.id);
      }}>
      <div className="w-full aspect-square cursor-pointer relative wrap-img">
        <img src={data?.image} className="object-cover view-img" />
        <div className="above-img">
          <Tag color="blue">
            <span style={{ padding: 5 }}>Brand {data?.band * 2}</span>
          </Tag>
          <Popconfirm
            placement="bottom"
            title="Bạn có muốn xóa bài biết này?"
            onConfirm={handleClickDelete}
            cancelText="Quay lại"
            okText="Xác nhận"
            okButtonProps={{ type: 'primary', danger: true }}>
            <AiOutlineCloseCircle className="cursor-pointer text-red-500 absolute top-1 right-1" />
          </Popconfirm>
        </div>

        <span
          className="font-semibold block-ellipsis title-item p-1 absolute bottom-0 text-white"
          title={data?.title}>
          {data?.title}
        </span>
      </div>

      <div className="p-2 flex items-center justify-between">
        <Rate disabled defaultValue={data?.band ? data?.band : 0} />
        <Tooltip title={data?.definetion}>
          <GrCircleInformation className="text-primary-color cursor-pointer" />
        </Tooltip>
      </div>
    </div>
  );
};

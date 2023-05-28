import { Button, Popconfirm, Rate, Tag, Tooltip } from 'antd';
import React from 'react';
import { GrCircleInformation } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { requestDeletePost } from '../api/post.api';
import '../style.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = { data: any; openModalUpdate?: (id: string) => void; fetchDataSource: any };

export const PostComp: React.FC<Props> = ({ data, openModalUpdate, fetchDataSource }) => {
  const navigate = useNavigate();

  const handleClickDelete = async () => {
    try {
      await requestDeletePost(data.id);
      toast.success('Delete post success!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const goToDetail = (id: number) => {
    navigate(`${PROTECTED_ROUTES_PATH.POST}/detail/${id}`);
  };

  return (
    <div className="col-span-12 tablet:col-span-4 laptop:col-span-3 desktop:col-span-2 bg-white shadow-xl flex flex-col justify-between rounded-md text-base">
      <div className="w-full aspect-square cursor-pointer relative wrap-img">
        <img src={data?.image} className="object-cover view-img" />
        <div className="above-img">
          <Tag color="blue">Brand {data?.band}</Tag>
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
          title={data?.title}
          onClick={() => {
            goToDetail(data?.id);
          }}>
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

import { Button, Popconfirm, Rate, Tag, Tooltip } from 'antd';
import React from 'react';
import { GrCircleInformation } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { requestDeletePost } from '../api/post.api';
import '../style.css';

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
      <div
        className="w-full aspect-square p-1 cursor-pointer"
        onClick={() => {
          goToDetail(data?.id);
        }}>
        <img src={data?.image} className="w-full h-full aspect-square object-cover rounded-lg" />
      </div>

      <div
        className="py-1 px-2 h-full title-item cursor-pointer"
        onClick={() => {
          goToDetail(data?.id);
        }}>
        <span className="font-bold block-ellipsis" title={data?.title}>
          {data?.title}
        </span>
      </div>

      <div className="p-2 flex items-center justify-between mt-2">
        <Rate disabled defaultValue={data?.band ? data?.band : 0} />
        {/* <Tag color="blue">{data?.band}</Tag> */}
        <Tooltip title={data?.definetion}>
          <GrCircleInformation className="text-primary-color cursor-pointer" />
        </Tooltip>
      </div>
      <div className="flex justify-center border-t p-3 w-full">
        <Button className="delete-button">
          <Popconfirm
            placement="bottom"
            title="Bạn có muốn xóa bài biết này?"
            onConfirm={handleClickDelete}
            cancelText="Quay lại"
            okText="Xác nhận"
            okButtonProps={{ type: 'primary', danger: true }}>
            Xóa
          </Popconfirm>
        </Button>
      </div>
    </div>
  );
};

import { Button, Popconfirm } from 'antd';
import React from 'react';
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
    <div className="col-span-3 bg-white shadow-xl flex flex-col justify-between rounded-md text-base">
      <div className="w-full aspect-square p-1">
        <img src={data?.image} className="w-full h-full aspect-square object-contain rounded image-item" />
      </div>

      <div className="py-1 px-2 h-full title-item" >
        <span className="font-bold block-ellipsis" title={data?.title}>
          {data?.title}
        </span>
      </div>

      <div className="py-1 px-2 h-full sub-title">
        <span className=" block-ellipsis" title={data?.definetion}>
          {data?.definetion}
        </span>
      </div>
      <div className="flex justify-center border-t p-3 w-full">
        <Button
          className="default_button"
          onClick={() => {
            goToDetail(data?.id);
          }}>
          Xem
        </Button>

        <Button className="delete-button" >
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

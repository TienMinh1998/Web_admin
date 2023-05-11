import { Button, Popconfirm } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';
import { requestDeletePost } from '../api/post.api';
import { urlApiServices } from 'config/configuration';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { useNavigate } from 'react-router-dom';
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
    navigate(`${PROTECTED_ROUTES_PATH.POST}/${id}`);
  };

  return (
    <div className="col-span-3 bg-white shadow-xl flex flex-col justify-between rounded-md text-base">
      <div className="w-full aspect-square">
        <img
          src={`${urlApiServices}${data?.image}`}
          className="w-full h-full aspect-square object-contain rounded"
        />
      </div>
      <div className="py-1 px-2 h-full">
        <span className=" block-ellipsis" title={data?.definetion}>
          {data?.definetion}
        </span>
      </div>
      <div className="py-1 px-2 h-full">
        <span className="font-bold block-ellipsis" title={data?.title}>
          {data?.title}
        </span>
      </div>

      <div className="flex justify-center border-t p-3 w-full">
        <Button
          className="mr-2 w-full"
          onClick={() => {
            goToDetail(data?.id);
          }}>
          Xem
        </Button>

        <Button className="mr-2 w-full" danger>
          <Popconfirm
            placement="bottom"
            title="Do you want delete this post?"
            onConfirm={handleClickDelete}
            okText="Delete"
            cancelText="Quit"
            okButtonProps={{ type: 'primary', danger: true }}>
            Xóa
          </Popconfirm>
        </Button>
      </div>
    </div>
  );
};

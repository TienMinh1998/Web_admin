import { Modal, Upload } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import React, { useState } from 'react';
import { AiOutlineInbox } from 'react-icons/ai';
import { toast } from 'react-toastify';

type Props = {
  title: string;
  isModalOpen: boolean;
  handleOk?: any;
  handleCancel?: any;
};
const { Dragger } = Upload;

export const ImportModal: React.FC<Props> = ({ title, isModalOpen, handleOk, handleCancel }) => {
  const [info, setInfor] = useState<any>(null);

  const importProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      setInfor(info.file);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    }
  };
  return (
    <div>
      <Modal
        destroyOnClose
        title={title}
        open={isModalOpen}
        onOk={() => {
          handleOk && handleOk(info);
        }}
        onCancel={handleCancel}>
        <Dragger {...importProps}>
          <p className="flex justify-center">
            <AiOutlineInbox className="text-4xl" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or
            other banned files.
          </p>
        </Dragger>
      </Modal>
    </div>
  );
};

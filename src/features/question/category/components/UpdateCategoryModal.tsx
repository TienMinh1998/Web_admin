import { Modal } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'shared/components/Button';
import { UploadImageButton } from 'shared/components/Button/UploadImageButton';
import { Input } from 'shared/components/Input';
import {
  requestCreateCategoryStore,
  requestUpdateCategoryStore
} from '../api/product-category.api';

type Props = {
  visible: boolean;
  onCancel: () => void;
  dataUpdate: any;
  fetchDataSource: any;
};

export const UpdateCategoryModal: React.FC<Props> = ({
  visible,
  onCancel,
  dataUpdate,
  fetchDataSource
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...dataUpdate
    },
    onSubmit: async (values) => {
      try {
        console.log('values: ', values);
        if (allowEdit()) {
          onUpdateCategoryFood(values);
        } else {
          onCreateCategoryFood(values);
        }
      } catch (error) {
        console.error('Exception ' + error);
      } finally {
        onCancel();
      }
    }
  });

  const onCreateCategoryFood = async (values: any) => {
    try {
      await requestCreateCategoryStore(values);
      toast.success('Create category store success!');
      fetchDataSource();
    } catch (error) {
      console.log('error', error);
    }
  };

  const onUpdateCategoryFood = async (values: any) => {
    try {
      await requestUpdateCategoryStore(dataUpdate._id, values);
      toast.success('Update category store success!');
      fetchDataSource();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChangeImage: any = async (file: any) => {
    try {
      setLoading(true);
      //upload image
      // const formData = new FormData();
      // formData.append('file', file as RcFile);
      // const imageUrl = await requestUploadMediaStore(formData);
      // formik.setFieldValue('image', imageUrl.data.Location);
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const onCloseImage = () => {
    formik.setFieldValue('image', '');
  };

  const allowEdit = () => {
    return dataUpdate._id ? true : false;
  };

  return (
    <Modal
      visible={visible}
      title={`${allowEdit() ? 'Update Topic' : 'Create Topic'} `}
      onCancel={() => {
        onCancel && onCancel();
      }}
      footer={null}>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <div className="text-medium-grey font-medium mb-2">
            <span className="text-red-500">*</span> Topic Name
          </div>
          <Input
            placeholder="Press Topic Name"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <div className="text-red-500 mt-1">
            {formik.errors.name && formik.touched.name && <p>{formik.errors.name}</p>}
          </div>
        </div>
        <div className="mb-2">
          <div className="text-medium-grey font-medium mb-2">
            <span className="text-red-500">*</span> Image Topic
          </div>
          <div className="flex justify-center my-4">
            <UploadImageButton
              loading={loading}
              onChangeImage={handleChangeImage}
              src={formik.values.image}
              onClear={onCloseImage}
            />
          </div>
          <div className="text-center text-gray-500 font-semibold">
            <div>Set the product thumbnail image.</div>
            <div>Only *.png, *jpg and *jpeg image files are accepted</div>
          </div>
          <div className="text-red-500 mt-1">
            {formik.errors.image && formik.touched.image && <p>{formik.errors.image}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="w-full p-4 bg-danger-color mr-4"
            onClick={() => {
              onCancel && onCancel();
            }}>
            Cancel
          </Button>
          <Button className="w-full p-4 bg-primary-color" htmlType="submit">
            {allowEdit() ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

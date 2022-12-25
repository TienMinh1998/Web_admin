import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { requestCategoryStore } from 'features/question/category/api/product-category.api';

import { Form, Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';

import { Button } from 'shared/components/Button';
import { UploadImageButton } from 'shared/components/Button/UploadImageButton';
import { WhiteBoxWrapper } from 'shared/components/common';
import { FormFieldComponent } from 'shared/components/Form';
import { TField } from 'shared/components/Form/interface';
import { BaseSelect } from 'shared/styled-components';

import * as Yup from 'yup';
import {
  requestCreateQuestion,
  requestDetailQuestion,
  requestUpdateQuestion
} from '../api/question.api';

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const validateSchema = {
  english: Yup.string().required('Hãy nhập từ vựng')
};
export const UpdateProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [valueFormField, setValueFormField] = useState({
    english: '',
    phonetic: '',
    meaningEnglish: '',
    meaningVietNam: '',
    note: ''
  });

  const [formField, setFormField] = useState<Record<string, TField>>({
    english: {
      nameField: 'english',
      className: 'col-span-6',
      label: '<span style="color:red">*</span> Từ vựng',
      component: 'Input',
      placeholder: 'Nhập từ vựng'
    },
    phonetic: {
      nameField: 'phonetic',
      className: 'col-span-6',
      label: 'Phiên âm',
      component: 'TextArea',
      placeholder: 'Nhập phiên âm'
    },
    meaningEnglish: {
      nameField: 'meaningEnglish',
      className: 'col-span-6',
      label: ' Nghĩa Tiếng Anh',
      component: 'TextArea',
      placeholder: 'Nhập nghĩa Tiếng Anh'
    },
    meaningVietNam: {
      nameField: 'meaningVietNam',
      className: 'col-span-6',
      label: 'Nghĩa Tiếng Việt',
      component: 'TextArea',
      placeholder: 'Nhập nghĩa Tiếng Việt'
    },
    note: {
      nameField: 'note',
      className: 'col-span-12',
      label: 'Ghi chú',
      component: 'TextArea',
      placeholder: 'Nhập ghi chú'
    }
  });

  useEffect(() => {
    if (id) {
      getDetailData();
    }
  }, []);

  const onHandleSubmit = async (values: any) => {
    try {
      const dataPush = { ...values, id };
      if (id) {
        requestUpdateQuestion(dataPush);
        toast.success('Cập nhật từ vựng thành công!');
        navigate(PROTECTED_ROUTES_PATH.QUESTION);
      } else {
        requestCreateQuestion(dataPush);
        toast.success('Thêm từ vựng thành công!');
        navigate(PROTECTED_ROUTES_PATH.QUESTION);
      }
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const getDetailData = async () => {
    try {
      const res = await requestDetailQuestion(id);

      setValueFormField(res.data);
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const pageTitle = () => {
    if (id) return 'Cập nhật';
    return 'Thêm';
  };

  return (
    <div className=" p-2">
      <Formik
        enableReinitialize
        initialValues={{ ...valueFormField }}
        validationSchema={Yup.object(validateSchema)}
        onSubmit={onHandleSubmit}>
        {(formik: FormikProps<any>) => {
          return (
            <Form>
              <WhiteBoxWrapper className="relative bottom-0 flex justify-between items-center flex-1">
                <span className="text-lg font-bold">{pageTitle()} từ vựng</span>
                <Button className="w-full p-4 bg-primary-color" htmlType="submit">
                  Lưu
                </Button>
              </WhiteBoxWrapper>

              <WhiteBoxWrapper>
                <div className="text-lg font-bold">Thông tin từ vựng</div>
                <FormFieldComponent formField={formField} formik={formik} />
              </WhiteBoxWrapper>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

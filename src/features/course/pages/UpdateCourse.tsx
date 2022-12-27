import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { Form, Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Button, UploadImageButton } from 'shared/components/Button';
import { WhiteBoxWrapper } from 'shared/components/common';
import { FormFieldComponent } from 'shared/components/Form';
import { TField } from 'shared/components/Form/interface';
import * as Yup from 'yup';
import { requestCreateCourse, requestDetailCourse, requestUpdateCourse } from '../api/course.api';

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
  code: Yup.string().required('Hãy nhập từ vựng')
};
export const UpdateCourse: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [valueFormField, setValueFormField] = useState({
    code: '',
    title: '',
    content: '',
    target: ''
  });

  const [formField, setFormField] = useState<Record<string, TField>>({
    code: {
      nameField: 'code',
      className: 'col-span-6',
      label: '<span style="color:red">*</span> Mã khóa học',
      component: 'Input',
      placeholder: 'Nhập mã khóa học',
      disabled: id ? true : false
    },
    title: {
      nameField: 'title',
      className: 'col-span-6',
      label: 'Tên khóa học',
      component: 'Input',
      placeholder: 'Nhập tên khóa học'
    },
    target: {
      nameField: 'target',
      className: 'col-span-6',
      label: ' Mục tiêu',
      component: 'TextArea',
      placeholder: 'Nhập mục tiêu khóa học'
    },
    content: {
      nameField: 'content',
      className: 'col-span-6',
      label: 'Nội dung khóa học',
      component: 'TextArea',
      placeholder: 'Nhập nội dung khóa học'
    }
  });

  useEffect(() => {
    if (id) {
      getDetailData();
    }
  }, []);

  const onHandleSubmit = async (values: any) => {
    try {
      const dataPush = { ...values };

      const formData = new FormData();
      Object.keys(dataPush).map((key: any) => {
        if (!dataPush[key]) return;
        if (key === 'coursImage') {
          formData.append('file', dataPush[key]);
          return;
        }
        formData.append(key, dataPush[key]);
      });

      if (id) {
        await requestUpdateCourse(formData);
        toast.success('Cập nhật khóa học thành công!');
        navigate(PROTECTED_ROUTES_PATH.COURSE);
      } else {
        await requestCreateCourse(formData);
        toast.success('Thêm khóa học thành công!');
        navigate(PROTECTED_ROUTES_PATH.COURSE);
      }
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const getDetailData = async () => {
    try {
      const res = await requestDetailCourse(id);

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
          const handleChangeImage = async (file: any) => {
            try {
              setLoading(true);

              formik.setFieldValue('coursImage', file);
            } catch (error) {
              console.error('Exception ' + error);
            } finally {
              setLoading(false);
            }
          };

          const onCloseImage = () => {
            formik.setFieldValue('coursImage', '');
          };
          return (
            <Form>
              <WhiteBoxWrapper className="relative bottom-0 flex justify-between items-center flex-1">
                <span className="text-lg font-bold">{pageTitle()} từ vựng</span>
                <Button className="w-full p-4 bg-primary-color" htmlType="submit">
                  Lưu
                </Button>
              </WhiteBoxWrapper>

              <div className="grid grid-rows-1 grid-cols-4 gap-4 mt-2 ">
                <div className="col-span-3">
                  <WhiteBoxWrapper>
                    <div className="text-lg font-bold">Thông tin khóa học</div>
                    <FormFieldComponent formField={formField} formik={formik} />
                  </WhiteBoxWrapper>
                </div>

                <div className="col-span-1">
                  <WhiteBoxWrapper>
                    <div className="font-bold">Ảnh chủ đề</div>

                    <div className="flex justify-center my-4">
                      <UploadImageButton
                        loading={loading}
                        src={formik.values.coursImage}
                        onChangeImage={handleChangeImage}
                        onClear={onCloseImage}
                      />
                    </div>
                    <div className="text-center text-gray-500 font-semibold">
                      <div>Chọn ảnh bìa cho course</div>
                      <div>Chỉ ảnh *.png, *jpg and *jpeg được chấp nhận</div>
                    </div>
                  </WhiteBoxWrapper>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

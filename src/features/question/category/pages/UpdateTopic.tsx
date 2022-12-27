import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { requestAllCourse } from 'features/course/api/course.api';
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
import {
  requestCreateTopic,
  requestDetailTopic,
  requestUpdateTopic,
  requestUploadImage
} from '../api/topic.api';

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

const validateSchema = { fK_Course_Id: Yup.number().required('Hãy chọn khóa học') };
export const UpdateTopic: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [valueFormField, setValueFormField] = useState({
    englishContent: '',
    vietNamContent: '',
    fileForUpdate: null
  });

  const [formField, setFormField] = useState<Record<string, TField>>({
    fK_Course_Id: {
      nameField: 'fK_Course_Id',
      className: 'col-span-6',
      label: '<span style="color:red">*</span> Khóa học',
      component: 'BaseSelect',
      placeholder: 'Chọn khóa học',
      options: []
    },
    englishContent: {
      nameField: 'englishContent',
      className: 'col-span-6',
      label: ' Nội dung tiếng Anh ',
      component: 'TextArea',
      placeholder: 'Nhập mục tiêu tiếng Anh '
    },
    vietNamContent: {
      nameField: 'vietNamContent',
      className: 'col-span-6',
      label: 'Nội dung tiếng Việt',
      component: 'TextArea',
      placeholder: 'Nhập nội dung tiếng Việt'
    }
  });

  useEffect(() => {
    getCourse();
    if (id) {
      getDetailData();
    }
  }, []);

  const getCourse = async () => {
    try {
      const res = await requestAllCourse();
      const list = res.data.map((item: any) => ({
        value: item.pk_coursId,
        label: item.title
      }));

      setFormField({
        ...formField,
        fK_Course_Id: { ...formField.fK_Course_Id, options: list }
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const onHandleSubmit = async (values: any) => {
    try {
      const dataPush = { ...values };
      if (id) {
        const formData = new FormData();
        delete dataPush.create_on;
        Object.keys(dataPush).map((key: string) => {
          formData.append(key, dataPush[key]);
          if (key === 'fileForUpdate') {
            formData.append('file', dataPush[key]);
            return;
          }
        });
        await requestUpdateTopic(formData);
        toast.success('Cập nhật chủ đề thành công!');
        navigate(PROTECTED_ROUTES_PATH.TOPIC_QUESTION);
      } else {
        await requestCreateTopic(dataPush);
        toast.success('Thêm chủ đề thành công!');
        navigate(PROTECTED_ROUTES_PATH.TOPIC_QUESTION);
      }
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const getDetailData = async () => {
    try {
      const res = await requestDetailTopic(id);

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
              //upload image
              const formData = new FormData();
              formData.append('inputFiles', file as RcFile);
              formik.setFieldValue('fileForUpdate', file);
              const imageUrl = await requestUploadImage(formData);
              formik.setFieldValue('image', imageUrl.data);
            } catch (error) {
              console.error('Exception ' + error);
            } finally {
              setLoading(false);
            }
          };

          const onCloseImage = () => {
            formik.setFieldValue('image', '');
          };
          return (
            <Form>
              <WhiteBoxWrapper className="relative bottom-0 flex justify-between items-center flex-1">
                <span className="text-lg font-bold">{pageTitle()} chủ đề</span>
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
                        src={formik.values.image}
                        onChangeImage={handleChangeImage}
                        onClear={onCloseImage}
                      />
                    </div>
                    <div className="text-center text-gray-500 font-semibold">
                      <div>Chọn ảnh bìa cho topic</div>
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

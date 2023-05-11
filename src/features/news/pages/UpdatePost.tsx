import { Form, Formik, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Button, UploadImageButton } from 'shared/components/Button';
import { FormFieldComponent } from 'shared/components/Form';
import { TField } from 'shared/components/Form/interface';
import { WhiteBoxWrapper } from 'shared/components/common';
import * as Yup from 'yup';
import { requestCreatePost, requestDetailPost, requestUpdatePost } from '../api/post.api';

const validateSchema = {
  title: Yup.string().required('Hãy nhập tiêu đề'),
  definetion: Yup.string().required('Hãy nhập định nghĩa')
};
export const UpdatePost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [valueFormField, setValueFormField] = useState({
    title: '',
    content: '',
    target: ''
  });

  const [formField, setFormField] = useState<Record<string, TField>>({
    title: {
      nameField: 'title',
      className: 'col-span-6',
      label: '<span style="color:red">*</span> Tiêu đề',
      component: 'Input',
      placeholder: 'Nhập tiêu đề'
    },
    definetion: {
      nameField: 'definetion',
      className: 'col-span-6',
      label: '<span style="color:red">*</span> Định nghĩa',
      component: 'Input',
      placeholder: 'Nhập định nghĩa'
    },
    content: {
      nameField: 'content',
      className: 'col-span-12',
      label: 'Nội dung',
      component: 'TextArea',
      placeholder: 'Nhập nội dung bài viết'
    },
    translate: {
      nameField: 'translate',
      className: 'col-span-12',
      label: 'Bản dịch',
      component: 'TextArea',
      placeholder: 'Nhập nội dung bản dịch'
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
      console.log('dataPush: ', dataPush);
      const formData = new FormData();
      Object.keys(dataPush).map((key: any) => {
        if (!dataPush[key]) return;
        if (key === 'imageFile' && dataPush[key]) {
          formData.append('file', dataPush[key]);
          return;
        }
        formData.append(key, dataPush[key]);
      });

      if (id) {
        await requestUpdatePost(formData);
        toast.success('Cập nhật bài viết thành công!');
        navigate(PROTECTED_ROUTES_PATH.POST);
      } else {
        await requestCreatePost(formData);
        toast.success('Thêm bài viết thành công!');
        navigate(PROTECTED_ROUTES_PATH.POST);
      }
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const getDetailData = async () => {
    try {
      const res = await requestDetailPost(id);
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
              if (!file) return;
              formik.setFieldValue('imageFile', file);
              const FR = new FileReader();
              FR.addEventListener('load', function (evt: any) {
                formik.setFieldValue('image', evt.target.result);
              });
              FR.readAsDataURL(file);
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
                <span className="text-lg font-bold">{pageTitle()} bài viết</span>
                <Button className="w-full p-4 bg-primary-color" htmlType="submit">
                  Lưu
                </Button>
              </WhiteBoxWrapper>

              <div className="grid grid-rows-1 grid-cols-4 gap-4 mt-2 ">
                <div className="col-span-3">
                  <WhiteBoxWrapper>
                    <div className="text-lg font-bold">Thông tin bài viết</div>
                    <FormFieldComponent formField={formField} formik={formik} />
                  </WhiteBoxWrapper>
                </div>

                <div className="col-span-1">
                  <WhiteBoxWrapper>
                    <div className="font-bold">Ảnh bài viết</div>

                    <div className="flex justify-center my-4">
                      <UploadImageButton
                        loading={loading}
                        src={formik.values.image}
                        onChangeImage={handleChangeImage}
                        onClear={onCloseImage}
                      />
                    </div>
                    <div className="text-center text-gray-500 font-semibold">
                      <div>Chọn ảnh cho bài viết</div>
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

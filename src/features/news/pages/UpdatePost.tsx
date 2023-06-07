import { Button } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { UploadImageButton } from 'shared/components/Button';
import { FormFieldComponent } from 'shared/components/Form';
import { TField } from 'shared/components/Form/interface';
import { Loadingv2 } from 'shared/components/Loading';
import { WhiteBoxWrapper } from 'shared/components/common';
import * as Yup from 'yup';
import { requestCreatePost, requestDetailPost, requestUpdatePost } from '../api/post.api';
import { PhraseComp } from './PhraseComp';
import EditorComponent from 'shared/components/editor/EditorComponent';

const validateSchema = {
  title: Yup.string().required('Hãy nhập tiêu đề'),
  definetion: Yup.string().required('Hãy nhập định nghĩa')
};
export const UpdatePost: React.FC = () => {
  const { id, mode } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [valueFormField, setValueFormField] = useState({
    title: '',
    content: '',
    taskName: '',
    type: '',
    band: 0,
    definetion: '',
    translate: '',
    createdDate: '',
    image: ''
  });
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);

  const allowEdit = useMemo(() => {
    return ['edit', 'add'].includes(mode?.toString() || 'add');
  }, [mode]);

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
      label: '<span style="color:red">*</span> Dịch tiêu đề',
      component: 'Input',
      placeholder: 'Nhập định nghĩa'
    },
    taskName: {
      nameField: 'taskName',
      className: 'col-span-6',
      label: '<span style="color:red">*</span> Đề bài',
      component: 'Input',
      placeholder: 'Nhập đề bài'
    },
    type: {
      nameField: 'type',
      className: 'col-span-6',
      label: '<span style="color:red">*</span> Loại',
      component: 'Select',
      placeholder: 'Chọn loại',
      options: [
        { value: 1, label: 'Writing' },
        { value: 2, label: 'Listening' },
        { value: 3, label: 'Reading' },
        { value: 4, label: 'Different' }
      ]
    },
    band: {
      nameField: 'band',
      className: 'col-span-6',
      label: '<span style="color:red">*</span> Thang điểm',
      component: 'InputNumber',
      placeholder: 'Nhập thang điểm'
    },
    content: {
      nameField: 'content',
      className: 'col-span-12',
      label: `<div className="font-semibold underline text-second-color italic">Nội dung:</div>`,
      component: 'EditorComponent',
      placeholder: 'Nhập nội dung bài viết',
      minRows: 14
    },
    translate: {
      nameField: 'translate',
      className: 'col-span-12',
      label: `<div className="font-semibold underline text-second-color italic">Bản dịch:</div>`,
      component: 'EditorComponent',
      placeholder: 'Nhập nội dung bản dịch',
      minRows: 14
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
        if (key === 'imageFile' && dataPush[key]) {
          formData.append('file', dataPush[key]);
          return;
        }
        formData.append(key, dataPush[key]);
      });

      if (id) {
        await requestUpdatePost(dataPush);
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
      setLoadingPage(true);
      const res = await requestDetailPost(id);
      setValueFormField(res.data);
    } catch (error) {
      console.error('Exception ' + error);
    } finally {
      setLoadingPage(false);
    }
  };

  const pageTitle = () => {
    if (id) return 'Cập nhật';
    return 'Thêm';
  };

  const goToEdit = () => {
    navigate(`${PROTECTED_ROUTES_PATH.POST}/edit/${id}`);
  };

  return (
    <div className="p-2">
      <Loadingv2 loading={loadingPage}>
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
                  <span className="text-lg font-bold">{pageTitle() + ' bài viết'}</span>
                  <div>
                    {allowEdit && (
                      <Button type="primary" htmlType="submit" className="bg-[#1677ff]">
                        Lưu
                      </Button>
                    )}
                    {!allowEdit && (
                      <Button type="primary" onClick={goToEdit} className="bg-[#1677ff]">
                        Sửa
                      </Button>
                    )}
                  </div>
                </WhiteBoxWrapper>
                {allowEdit ? (
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
                          <div>Chọn ảnh</div>
                          <div>Chỉ ảnh *.png, *jpg and *jpeg được chấp nhận</div>
                        </div>
                      </WhiteBoxWrapper>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white py-10 px-6 text-lg">
                    <div className="line-task-name">
                      <span className="task-name italic">
                        <span className="font-semibold">Đề bài:</span> {valueFormField?.taskName}
                      </span>
                    </div>
                    <div className="text-center font-semibold text-3xl mt-6">
                      {valueFormField?.title}
                    </div>
                    <div className="text-center">({valueFormField?.definetion})</div>
                    <div className="w-full text-end text-zinc-400 mb-3 italic">
                      {moment(valueFormField?.createdDate).format('HH:mm DD/MM/YYYY')}
                    </div>
                    <div className="flex justify-center">
                      <img src={valueFormField?.image} className="object-contain max-w-[360px]" />
                    </div>
                    <div className="grid grid-rows-1 grid-cols-6 gap-4 mt-4">
                      <div
                        className={`${
                          showTranslate ? 'col-span-3' : 'col-span-6'
                        } rounded-xl p-3 shadow-2xl`}>
                        <div className="font-semibold underline text-second-color italic">
                          English:
                        </div>
                        <div
                          className="mb-2"
                          dangerouslySetInnerHTML={{ __html: valueFormField?.content || '' }}></div>
                        <div className="flex justify-center mt-2">
                          <span
                            className={`cursor-pointer underline text-color-border-2 ${
                              showTranslate ? '' : 'animate-bounce'
                            }`}
                            onClick={() => setShowTranslate(!showTranslate)}>
                            {showTranslate ? (
                              <div>
                                {/* <SiGoogletranslate /> */}
                                Thu gọn bản dịch
                              </div>
                            ) : (
                              'Xem bản dịch'
                            )}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`${
                          showTranslate ? 'col-span-3' : 'hidden'
                        } rounded-xl p-3 shadow-2xl`}>
                        <div className="font-semibold underline text-second-color italic">
                          Vietnamese:
                        </div>
                        <div
                          className="mb-2"
                          dangerouslySetInnerHTML={{
                            __html: valueFormField?.translate || ''
                          }}></div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <PhraseComp id={id ? id : ''} />
                    </div>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </Loadingv2>
    </div>
  );
};

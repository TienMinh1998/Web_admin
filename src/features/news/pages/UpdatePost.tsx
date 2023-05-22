import { Button, Popconfirm } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { ButtonIcon, UploadImageButton } from 'shared/components/Button';
import { FormFieldComponent } from 'shared/components/Form';
import { TField } from 'shared/components/Form/interface';
import { DeleteIcon, EditIcon } from 'shared/components/Icons';
import { Loadingv2 } from 'shared/components/Loading';
import { Table } from 'shared/components/Table/Table';
import { WhiteBoxWrapper } from 'shared/components/common';
import { useTableData } from 'shared/hooks/useTableData';
import * as Yup from 'yup';
import { requestDeletePhrase, requestPhrases } from '../api/phase.api';
import { requestCreatePost, requestDetailPost, requestUpdatePost } from '../api/post.api';

const validateSchema = {
  title: Yup.string().required('Hãy nhập tiêu đề'),
  definetion: Yup.string().required('Hãy nhập định nghĩa')
};
export const UpdatePost: React.FC = () => {
  const { id, mode } = useParams();
  const navigate = useNavigate();
  const [expandFilter, setExpandFilter] = useState<any>({
    columnSort: 'created_on',
    isDesc: true,
    date: ''
  });
  const { dataSource, paging, showFilter, setPaging, fetchDataSource, onToogleFilter } =
    useTableData({
      expandFilter,
      fetchList: requestPhrases
    });
  const [loading, setLoading] = useState<boolean>(false);
  const [valueFormField, setValueFormField] = useState({
    title: '',
    content: '',
    definetion: '',
    translate: '',
    createdDate: ''
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
    content: {
      nameField: 'content',
      className: 'col-span-12',
      label: 'Nội dung',
      component: 'TextArea',
      placeholder: 'Nhập nội dung bài viết',
      minRows: 14
    },
    translate: {
      nameField: 'translate',
      className: 'col-span-12',
      label: 'Bản dịch',
      component: 'TextArea',
      placeholder: 'Nhập nội dung bản dịch',
      minRows: 14
    }
  });

  const columns = [
    {
      title: 'Cụm từ',
      keyData: 'english',
      render: (value: string, index: number, record: any) => (
        <div className="font-semibold cursor-pointer text-primary-color flex items-center">
          {record.added ? (
            <div className="mr-1">
              <AiOutlineCheckCircle className="font-semibold text-green-500  text-xl" />
            </div>
          ) : (
            <></>
          )}
          {value}
        </div>
      )
    },
    {
      title: 'Ý nghĩa',
      keyData: 'phonetic',
      render: (value: string) => <div className="font-semibold">{value}</div>
    },
    {
      title: 'Action',
      keyData: 'id',
      render: (value: any, index: number, record: any) => (
        <div className="flex">
          <ButtonIcon className="mr-2">
            <EditIcon
              className="text-xl cursor-pointer hover:text-green-500 "
              onClick={() => {
                console.log('hihih');
              }}
            />
          </ButtonIcon>

          <ButtonIcon className="mr-2">
            <Popconfirm
              placement="bottom"
              title="Bạn chắc chắn muốn xóa từ vựng?"
              onConfirm={() => {
                handleClickDeletePhase(record.pk_QuestionStandard_Id);
              }}
              okText="Xóa"
              cancelText="Thoát"
              okButtonProps={{ type: 'primary', danger: true }}>
              <DeleteIcon className="hover:text-red-500  cursor-pointer text-xl" />
            </Popconfirm>
          </ButtonIcon>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (id) {
      getDetailData();
    }
  }, []);

  const handleClickDeletePhase = async (id: number) => {
    try {
      await requestDeletePhrase(id);
      toast.success('Xóa từ vựng thành công!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

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
                  <span className="text-lg font-bold">{pageTitle()} bài viết</span>
                  <div>
                    {allowEdit && (
                      <Button type="primary" htmlType="submit">
                        Lưu
                      </Button>
                    )}
                    {!allowEdit && (
                      <Button type="primary" onClick={goToEdit}>
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
                    <div className="text-center font-semibold text-3xl">
                      {valueFormField?.title}
                    </div>
                    <div className="text-center">({valueFormField?.definetion})</div>
                    <div className="w-full text-end text-zinc-400 font-semibold mb-3">
                      {moment(valueFormField?.createdDate).format('HH:mm DD/MM/YYYY')}
                    </div>
                    <div className="font-semibold underline">English:</div>
                    <div className="mb-2">{valueFormField?.content}</div>
                    <div className="flex justify-center">
                      <span
                        className={`cursor-pointer underline text-color-border-2 ${
                          showTranslate ? '' : 'animate-bounce'
                        }`}
                        onClick={() => setShowTranslate(!showTranslate)}>
                        {showTranslate ? 'Thu gọn bản dịch' : 'Xem bản dịch'}
                      </span>
                    </div>

                    {showTranslate && (
                      <div>
                        <div className="font-semibold underline">Vietnamese:</div>
                        <div className="mb-2">{valueFormField?.translate}</div>
                      </div>
                    )}

                    <div className="mt-4">
                      <Table
                        columns={columns}
                        dataSource={dataSource}
                        loading={loading}
                        paging={{
                          ...paging,
                          onChangePage: (page: number) => {
                            setPaging({ ...paging, currentPage: page });
                          }
                        }}
                      />
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
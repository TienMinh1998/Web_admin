import { Modal, Select } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'shared/components/Button';
import { requestAllCourse } from '../../../course/api/course.api';
import { requestAddQuestionToTopic } from '../api/question.api';
import { requestAllTopicByCourseId } from '../../category/api/topic.api';

type Props = {
  visible: boolean;
  onCancel: () => void;
  dataUpdate: any;
  fetchDataSource: any;
};

const { Option } = Select;

export const AddQuestionToTopicModal: React.FC<Props> = ({
  visible,
  onCancel,
  dataUpdate,
  fetchDataSource
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [courseSelected, setCourseSelected] = useState<number | null>(null);

  useEffect(() => {
    getAllCourse();
  }, []);

  useEffect(() => {
    if (courseSelected) getAllTopicByCourse();
  }, [courseSelected]);

  const getAllCourse = async () => {
    try {
      const { data } = await requestAllCourse();

      const convertData = data.map((item: any) => ({ label: item.title, value: item.pk_coursId }));
      setCourses(data);
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const getAllTopicByCourse = async () => {
    try {
      const { data } = await requestAllTopicByCourseId({ coursId: courseSelected });

      const convertData = data.map((item: any) => ({
        label: item.vietNamContent,
        value: item.pK_Topic_Id
      }));

      setTopics(convertData);
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...dataUpdate
    },
    onSubmit: async (values: any) => {
      setLoading(true);
      try {
        const dataPush = {
          topicID: values.topicID,
          questionID: values.pk_QuestionStandard_Id
        };
        await requestAddQuestionToTopic(dataPush);
        toast.success('Thêm chủ đề thành công!');
        fetchDataSource();
      } catch (error) {
        console.error('Exception ' + error);
      } finally {
        onCancel();
        setLoading(false);
      }
    }
  });
  const onChangeCouse = (value: number) => {
    setCourseSelected(value);
  };
  const onChangeTopic = (value: string) => {
    formik.setFieldValue('topicID', value);
  };
  return (
    <Modal
      visible={visible}
      title="Chọn chủ đề"
      onCancel={() => {
        onCancel && onCancel();
      }}
      footer={null}>
      <form onSubmit={formik.handleSubmit}>
        <div className="col-span-12 mt-2">
          <div className="text-sm mb-2 font-semibold">Khóa học</div>
          <div className="grid col-span-6">
            <Select
              placeholder="Chọn khóa học"
              optionLabelProp="label"
              onChange={(value: number) => {
                onChangeCouse(value);
              }}>
              {courses?.map((cource: any) => (
                <Option value={cource?.pk_coursId} label={cource?.title} key={cource?.pk_coursId}>
                  <div className="flex ">
                    <img
                      src={cource?.coursImage}
                      alt="img_product"
                      className="rounded object-contain w-[50px] h-[50px]"
                    />
                    <span>{cource?.title}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="col-span-12 mt-2">
          <div className="text-sm mb-2 font-semibold">Chủ đề</div>
          <div className="grid col-span-6">
            <Select
              placeholder="Chọn chủ đề"
              options={topics}
              onChange={(value: string) => {
                onChangeTopic(value);
              }}
              disabled={!courseSelected}></Select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            className="w-full p-4 bg-danger-color mr-4"
            onClick={() => {
              onCancel && onCancel();
            }}>
            Cancel
          </Button>
          <Button className="w-full p-4 bg-primary-color" htmlType="submit">
            Xác nhận
          </Button>
        </div>
      </form>
    </Modal>
  );
};

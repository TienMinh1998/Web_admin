import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonIcon } from 'shared/components/Button';
import { DeleteIcon, EditIcon } from 'shared/components/Icons';
import { ImportModal } from 'shared/components/ImportModal';
import { useTableData } from 'shared/hooks/useTableData';
import {
  importPhrases,
  requestCreatePhrases,
  requestDeletePhrase,
  requestPhrases,
  requestUpdatePhrases
} from '../api/phase.api';
import { EditableCellProps } from '../interface';
import '../style.css';
type Props = { id: string };

interface Item {
  id: string;
  word: string;
  definition: number;
  isNewWord?: boolean;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input placeholder="Nhập thông tin" />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const PhraseComp: React.FC<Props> = ({ id }) => {
  const [expandFilter, setExpandFilter] = useState<any>({
    search: {
      readingId: id
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dataSource, paging, setPaging, fetchDataSource, setDataSource, onToogleFilter } =
    useTableData({
      expandFilter,
      fetchList: requestPhrases
    });

  const handleClickDelete = async (id: string) => {
    try {
      await requestDeletePhrase(id);
      toast.success('Xóa cụm từ thành công!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null>(null);

  const isEditing = (index: number) => {
    return index === editingKey;
  };

  const edit = (record: any, index: number) => {
    form.setFieldsValue({ word: '', definition: '', ...record });
    setEditingKey(index);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const handleSave = async (record: Item) => {
    try {
      const row = (await form.validateFields()) as Item;

      if (record.isNewWord) {
        const dataPush = {
          readingId: parseInt(id),
          meaning: row.definition,
          word: row.word
        };
        createPhrase(dataPush);
      } else {
        const dataPush = {
          id: record.id,
          definition: row.definition,
          word: row.word
        };
        editPhrase(dataPush);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    } finally {
      setEditingKey(null);
    }
  };

  const createPhrase = async (data: any) => {
    try {
      await requestCreatePhrases(data);
      toast.success('Tạo cụm từ thành công!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const editPhrase = async (data: any) => {
    try {
      await requestUpdatePhrases(data);
      toast.success('Cập nhật cụm từ thành công!');
      fetchDataSource();
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const columns = [
    {
      title: 'Cụm từ',
      dataIndex: 'word',
      width: '35%',
      editable: true,
      render: (value: string | number) => {
        return <div className="text-blue-950 font-semibold">{value}</div>;
      }
    },
    {
      title: 'Ý nghĩa',
      dataIndex: 'definition',
      width: '45%',
      editable: true
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: Item, index: number) => {
        const editable = isEditing(index);
        return editable ? (
          <>
            <Button
              onClick={() => handleSave(record)}
              type="primary"
              style={{ marginBottom: 16, backgroundColor: '#1677ff', marginRight: 8 }}>
              Save
            </Button>

            {!record.isNewWord ? (
              <span onClick={cancel} className="cursor-pointer">
                Cancel
              </span>
            ) : (
              ''
            )}
          </>
        ) : (
          <div className="flex">
            <ButtonIcon className="mr-2">
              <EditIcon
                className="text-xl cursor-pointer hover:text-green-500 "
                onClick={() => edit(record, index)}
              />
            </ButtonIcon>
            <ButtonIcon className="mr-2">
              <Popconfirm
                placement="bottom"
                title="Bạn chắc chắn muốn xóa cụm từ?"
                onConfirm={() => {
                  handleClickDelete(record.id);
                }}
                okText="Xóa"
                cancelText="Thoát"
                okButtonProps={{ type: 'primary', danger: true }}>
                <DeleteIcon className="hover:text-red-500  cursor-pointer text-xl" />
              </Popconfirm>
            </ButtonIcon>
          </div>
        );
      }
    }
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item, rowIndex: any) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(rowIndex)
      })
    };
  });
  const handleAdd = () => {
    if (editingKey != null) {
      toast.error('Còn cụm từ chưa được lưu!');
      return;
    }
    form.setFieldsValue({ word: '', definition: '' });
    const newData = [
      {
        key: dataSource.length,
        word: '',
        definition: '',
        isNewWord: true
      },
      ...dataSource
    ];

    setDataSource(newData);
    setEditingKey(0);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const importFile = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file.originFileObj);
      formData.append('readingId', id);
      const res: any = await importPhrases(formData);
      if (res?.status === 200) {
        toast.success('Cập nhật thành công');
        fetchDataSource();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={handleAdd}
          type="primary"
          className="mr-4 mb-4"
          style={{ backgroundColor: '#1677ff' }}>
          Thêm từ
        </Button>
        <Button
          onClick={toggleModal}
          type="primary"
          className="mr-4 mb-4"
          style={{ marginBottom: 16, backgroundColor: '#1677ff' }}>
          Import
        </Button>
      </div>
      <ImportModal
        isModalOpen={isModalOpen}
        title="Import Phrase"
        handleCancel={toggleModal}
        handleOk={importFile}
      />
      <Form form={form} component={false}>
        <Table
          className="custom-table"
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            ...paging,
            onChange: (page: any) => {
              setExpandFilter({ ...expandFilter, pageIndex: page });
            }
          }}
        />
      </Form>
    </div>
  );
};

import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonIcon } from 'shared/components/Button';
import { DeleteIcon, EditIcon } from 'shared/components/Icons';
import { useTableData } from 'shared/hooks/useTableData';
import {
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
  const inputNode = <Input />;

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
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({ word: '', definition: '', ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
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
      setEditingKey('');
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
        return <div className="text-orange-400 font-semibold">{value}</div>;
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
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button
              onClick={() => handleSave(record)}
              type="primary"
              style={{ marginBottom: 16, backgroundColor: '#1677ff', marginRight: 8 }}>
              Save
            </Button>

            {!record.isNewWord ? (
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            ) : (
              ''
            )}
          </>
        ) : (
          <div className="flex">
            <ButtonIcon className="mr-2">
              <EditIcon
                className="text-xl cursor-pointer hover:text-green-500 "
                onClick={() => edit(record)}
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
      onCell: (record: Item) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });
  const handleAdd = () => {
    const newData = {
      key: dataSource.length,
      word: 'new word',
      definition: 'new word',
      isNewWord: true
    };
    setDataSource([...dataSource, newData]);
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
          onClick={handleAdd}
          type="primary"
          className="mr-4 mb-4"
          style={{ marginBottom: 16, backgroundColor: '#1677ff' }}>
          Import
        </Button>
      </div>
      <Form form={form} component={false}>
        <Table
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
            onChange: cancel
          }}
        />
      </Form>
    </div>
  );
};

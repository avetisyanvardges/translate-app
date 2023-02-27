import {Button, Form, Popconfirm, Table, Typography} from 'antd';
import { useState } from 'react';
import EditableCell from "./EditableCell";
import './style.scss';
import {PlusOutlined} from "@ant-design/icons";
import useContainer from "./hook";

const originData = [];
// for (let i = 0; i < 100; i++) {
//     originData.push({
//         id: i.toString(),
//         keyName: 'key name',
//         en: 'english',
//         ru: 'russian',
//         ge: 'georgian',
//         hy: 'armenian',
//     });
// }

const  LanguageDetails = () => {
    const [data, setData] = useState(originData);
    const {id,handleTranslate} = useContainer({data, setData})
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;
    const [count, setCount] = useState(1)


    const edit = (record) => {
        console.log(record)
        form.setFieldsValue({
            keyName: '',
            en: '',
            ru: '',
            ge: '',
            hy: '',
            ...record,
        });
        setEditingKey(String(record.id));
    };
    const cancel = () => {
        setEditingKey('');
    };

    const handleAddRow = () => {
        edit(count + 1)
        const newData = {
            id: count.toString(),
            keyName: '',
            en: '',
            ru: '',
            ge: '',
            hy: '',
        }
        setEditingKey(String(count));
        setData([...data, newData])
        setCount(count + 1)
    }
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'Key',
            dataIndex: 'keyName',
            width: '18%',
            editable: true,
        },
        {
            title: 'En',
            dataIndex: 'en',
            width: '18%',
            editable: true,
        },
        {
            title: 'Hy',
            dataIndex: 'hy',
            width: '18%',
            editable: true,
        },
        {
            title: 'Ru',
            dataIndex: 'ru',
            width: '18%',
            editable: true,
        },
        {
            title: 'Ge',
            dataIndex: 'ge',
            width: '18%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{body: {cell: (props) => <EditableCell {...props} handleTranslate={handleTranslate} data={data} setData={setData} />}}}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowKey='id'
                rowClassName="editable-row"
                pagination={{onChange: cancel}}
            />
            <Form.Item className="bottom-content">
                <Button
                    className="add-row-button"
                    onClick={handleAddRow}
                    icon={<PlusOutlined />}
                >
                    Add option
                </Button>
                <Button
                    className="save-button"
                    onClick={() => {
                        const newData = data.reduce((acc, item, index) => {
                            let newObj = {}
                            Object.keys(item).map((key) => {
                                if (key !== 'id' || key !== 'keyName') {
                                    newObj[key] = { [`${id}.${item.keyName}`]: item[key] }
                                }
                            })
                            acc = newObj

                            return acc
                        }, {})
                        console.log(newData)
                    }}
                >
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LanguageDetails;

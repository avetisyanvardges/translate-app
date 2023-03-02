import {Button, Col, Form, Popconfirm, Row, Table, Typography} from 'antd';
import {useCallback, useEffect, useState} from 'react';
import EditableCell from "./EditableCell";
import './style.scss';
import {DownloadOutlined, PlusOutlined, TranslationOutlined} from "@ant-design/icons";
import useContainer from "./hook";
import {isEmpty, uniqueId} from "lodash";
import {child, get, getDatabase, ref, update} from "firebase/database";
import Wrapper from "../Wrapper";


// figd_M9c7hURQw6u4DiX3pfiEWnkBbGFWDZN7JTnEkYzz



const  LanguageDetails = () => {
    const [data, setData] = useState([]);
    const {id,handleTranslate,form} = useContainer({data, setData})
    const [editingKey, setEditingKey] = useState('');
    const [count, setCount] = useState(1)
    const isEditing = (record) => String(record.id) === editingKey;



    useEffect(()=>{
        setData([])
        fetchData()
    }, [id])

    const fetchData = useCallback(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `screens/${id.replaceAll('_', ' ')}`)).then((snapshot) => {
            if (snapshot.exists() && String(snapshot.val()) !== '{}') {
                const res = JSON.parse(snapshot.val())
                const keys = Object.keys(res.en).reduce((acc, item, index)=>{
                    const key = item.split('.')
                    acc.push(key[1])
                    return acc
                },[])
                const newData = keys.reduce((acc, keyName, index)=>{
                    const obj = { en: res.en[`${id.trim().replaceAll(' ', '_').toLowerCase()}.${keyName}`],ru: res.ru[`${id.trim().replaceAll(' ', '_').toLowerCase()}.${keyName}`], hy: res.hy[`${id.trim().replaceAll(' ', '_').toLowerCase()}.${keyName}`], ge: res.ge[`${id.trim().replaceAll(' ', '_').toLowerCase()}.${keyName}`], keyName: keyName,id:index}
                    acc.push(obj);
                    return acc
                },[])
                setData([...newData])
                setCount(newData.length+1)
            } else {
                console.log("No data available");
                setData([])
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [id])


    const edit = (record) => {
        console.log(record.id)
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

    const remove = (record) => {
        const newData = data.filter(item => item.id !== record.id)
        let mutationData = {};
        newData.map((item, index)=>{
            Object.keys(item).map((key)=>{
                if(key !== 'id' && key !== 'keyName'){
                    mutationData[key] = !isEmpty(mutationData[key]) ? {...mutationData[key], [`${id.trim().replaceAll(' ', '_').toLowerCase()}.${item.keyName}`]: item[key]} : {[`${id.trim().replaceAll(' ', '_').toLowerCase()}.${item.keyName}`]: item[key]}
                }
            })
        })


        const dbRef = ref(getDatabase());

        const updates = {
            [`screens/${id.replaceAll('_', ' ')}`]:JSON.stringify(mutationData)
        }
        update(dbRef, updates);
        setData(newData);
        setCount(count+1)
    }

    const handleAddRow = () => {
        const newData = {
            id: count+1,
            keyName: '',
            en: '',
            ru: '',
            ge: '',
            hy: '',
        }
        edit(newData)
        setEditingKey(String(count+1));
        setData([...data, newData])
        setCount(count + 1)
    }
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.id);
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
            let newObj = {};
            newData.map((item, index)=>{
               Object.keys(item).map((key)=>{
                   if(key !== 'id' && key !== 'keyName'){
                       newObj[key] = !isEmpty(newObj[key]) ? {...newObj[key], [`${id.trim().replaceAll(' ', '_').toLowerCase()}.${item.keyName}`]: item[key]} : {[`${id.trim().replaceAll(' ', '_').toLowerCase()}.${item.keyName}`]: item[key]}
                   }
               })
            })

            console.log(newObj)

            const dbRef = ref(getDatabase());

            const updates = {
                [`screens/${id.replaceAll('_', ' ')}`]:JSON.stringify(newObj)
            }

            update(dbRef, updates);

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const downloadJSON = (lang) => {
        let mutationData = {}

        data.map((item, index) => {
            Object.keys(item).map((key) => {
                if (key !== 'id' && key !== 'keyName' && key === lang) {
                    mutationData[key] = !isEmpty(mutationData[key]) ? {
                        ...mutationData[key],
                        [`${id.trim().replaceAll(' ', '_').toLowerCase()}.${item.keyName}`]: item[key]
                    } : {[`${id.trim().replaceAll(' ', '_').toLowerCase()}.${item.keyName}`]: item[key]}
                }
            })
        })
        if(!isEmpty(mutationData[lang])) {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(mutationData[lang])
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = `${id.trim().replaceAll(' ', '_').toLowerCase()}_${lang}.json`;

            link.click();
        }
    };

    const columns = [
        {
            title: () => {
                return (
                    <Row style={{alignItems: 'center'}}>
                        <Col span={12}>
                        <span>
                            EN
                        </span>
                        </Col>
                        <Col span={12}>
                            <Button
                                className="add-row-button"
                                onClick={() => downloadJSON('en')}
                                icon={<DownloadOutlined color={'#fdfeff'}/>}
                                style={{backgroundColor: '#1E3045', color: '#fdfeff'}}
                            >
                                Download JSON
                            </Button>
                        </Col>
                    </Row>
                );



            },
            dataIndex: 'en',
            width: '22%',
            editable: true,
        },
        {
            title: () => {
                return (
                    <Row style={{alignItems: 'center'}}>
                        <Col span={12}>
                        <span>
                            HY
                        </span>
                        </Col>
                        <Col span={12}>
                            <Button
                                className="add-row-button"
                                onClick={() => downloadJSON('hy')}
                                icon={<DownloadOutlined color={'#fdfeff'}/>}
                                style={{backgroundColor: '#1E3045', color: '#fdfeff'}}
                            >
                                Download JSON
                            </Button>
                        </Col>
                    </Row>
                );

            },
            dataIndex: 'hy',
            width: '22%',
            editable: true,
        },
        {
            title: () => {
                return (
                    <Row style={{alignItems: 'center'}}>
                        <Col span={12}>
                        <span>
                            RU
                        </span>
                        </Col>
                        <Col span={12}>
                            <Button
                                className="add-row-button"
                                onClick={() => downloadJSON('ru')}
                                icon={<DownloadOutlined color={'#fdfeff'}/>}
                                style={{backgroundColor: '#1E3045', color: '#fdfeff'}}
                            >
                                Download JSON
                            </Button>
                        </Col>
                    </Row>
                );

            },
            dataIndex: 'ru',
            width: '22%',
            editable: true,
        },
        {
            title: () => {
                return (
                    <Row style={{alignItems: 'center'}}>
                        <Col span={12}>
                        <span>
                            GE
                        </span>
                        </Col>
                        <Col span={12}>
                            <Button
                                className="add-row-button"
                                onClick={() => downloadJSON('ge')}
                                icon={<DownloadOutlined color={'#fdfeff'}/>}
                                style={{backgroundColor: '#1E3045', color: '#fdfeff'}}
                            >
                                Download JSON
                            </Button>
                        </Col>
                    </Row>
                );

            },
            dataIndex: 'ge',
            width: '22%',
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
                onClick={() => save(record.id)}
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
                    <span>
                    <Typography.Link style={{
                        marginRight: 8,
                    }} disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                    <Popconfirm  title="Sure to delete?" onConfirm={() => remove(record)}>
                      <a style={{color: 'red'}}>Remove</a>
                    </Popconfirm>
                    </span>
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
       <Wrapper>
           <Form form={form} component={false}>
               <Table
                   components={{body: {cell: (props) => <EditableCell {...props} handleTranslate={handleTranslate} data={data} setData={setData} form={form} />}}}
                   bordered
                   dataSource={data}
                   columns={mergedColumns}
                   rowKey={obj => obj.en}
                   rowClassName="editable-row"
                   pagination={false}
               />
               <Form.Item className="bottom-content" style={{padding: 10}}>
                   <Button
                       className="add-row-button"
                       onClick={handleAddRow}
                       icon={<PlusOutlined color={'#fdfeff'} />}
                       style={{backgroundColor:'#1E3045',color: '#fdfeff'}}
                   >
                       Add option
                   </Button>
                   {/* <Button */}
                   {/*     className="save-button" */}
                   {/*     onClick={() => { */}
                   {/*         const newData = data.reduce((acc, item, index) => { */}
                   {/*             let newObj = {} */}
                   {/*             Object.keys(item).map((key) => { */}
                   {/*                 if (key !== 'id' || key !== 'keyName') { */}
                   {/*                     newObj[key] = { [`${id}.${item.keyName}`]: item[key] } */}
                   {/*                 } */}
                   {/*             }) */}
                   {/*             acc = newObj */}

                   {/*             return acc */}
                   {/*         }, {}) */}
                   {/*     }} */}
                   {/* > */}
                   {/*     Save */}
                   {/* </Button> */}
               </Form.Item>
           </Form>
       </Wrapper>
    );
}

export default LanguageDetails;

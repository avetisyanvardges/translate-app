import React from 'react';
import {RollbackOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Space} from "antd";
import {Link} from "react-router-dom";
import {uniqueId} from "lodash";
import useContainer from "./hook";
import './style.scss';

const LanguageDetails = () => {
    const {onChange, form, initialRowData} = useContainer();
    return (
        <div className='language-details-page'>
            <div className='top-content'>
                <Link to='/'>
                    <Button icon={<RollbackOutlined />}>
                        Back home
                    </Button>
                </Link>
            </div>
            <Form name="dynamic_form_nest_item" onFinish={onChange} autoComplete="off" form={form}>
                <Form.List name="data">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} className='row' style={{ display: 'flex', marginBottom: 8, alignItems: 'flex-start' }} align="baseline">
                                    {Object.keys(initialRowData).map(item => (
                                        <Form.Item
                                            {...restField}
                                            key={uniqueId(item)}
                                            name={[name, item]}
                                            className='formItemOption'
                                            rules={[{ required: true, message: 'Required field' }]}
                                        >
                                            <Input style={{width: 220}} placeholder="Option" />
                                        </Form.Item>
                                    ))}
                                    <MinusCircleOutlined onClick={() => remove(name)} className='minusCircleOutlined'/>
                                </Space>
                            ))}
                            <Form.Item className='bottom-content'>
                                <Button className='add-row-button' onClick={() => add()} icon={<PlusOutlined />}>
                                    Add option
                                </Button>
                                <Button className='save-button' htmlType='submit'>Save</Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </div>
    );
};

export default LanguageDetails;
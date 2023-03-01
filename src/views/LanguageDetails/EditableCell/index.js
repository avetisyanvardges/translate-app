import {Col, Form, Input, Row} from "antd";
import {memo, useRef} from "react";
import {TranslationOutlined} from "@ant-design/icons";

const EditableCell = memo(({
                               editing,
                               dataIndex,
                               title,
                               inputType,
                               record,
                               index,
                               children,
                               data,
                               setData,
                               handleTranslate,
                               form,
                               ...restProps
                           }) => {
    return (
        <td {...restProps}>
            {editing ? (
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Form.Item
                        name={dataIndex}
                        style={{margin: 0}}
                        rules={[{required: true, message: `Please Input ${dataIndex}!`}]}>
                        <Input/>
                    </Form.Item>
                    <div style={{padding: 10, cursor: 'pointer'}} onClick={(e) => {
                        setData(
                            data.map((item) =>
                                item.id === record.id
                                    ? {...item, [dataIndex]: form.getFieldsValue()[dataIndex]}
                                    : item
                            )
                        )
                        handleTranslate({
                            text: form.getFieldsValue()[dataIndex],
                            language: dataIndex,
                        })
                    }}>
                        <TranslationOutlined style={{fontSize: '20px', color: '#1E3045'}}/>
                    </div>
                </div>
            ) : (
                children
            )}
        </td>
    );
});

export default EditableCell;

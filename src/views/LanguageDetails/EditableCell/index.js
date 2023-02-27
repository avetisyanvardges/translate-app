import {Form, Input} from "antd";

const EditableCell = ({
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
                          ...restProps
                      }) => {
    console.log(record)
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[{required: true, message: `Please Input ${title}!`}]}
                >
                    <Input
                        value={record[dataIndex]}
                        onChange={(e) => {
                            setData(
                                data.map((item) =>
                                    item.id === record.id
                                        ? {...item, [e.target.id]: e.target.value}
                                        : item
                                )
                            )
                        }
                        }
                        onBlur={(e) => {
                            if (dataIndex === 'en') {
                                handleTranslate({
                                    text: e.nativeEvent.target.value,
                                    data: data,
                                    setData: setData,
                                })
                            }
                        }}/>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );


};

export default EditableCell;

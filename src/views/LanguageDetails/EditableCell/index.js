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
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[{required: true, message: `Please Input ${title}!`}]}
                >
                    <Input
                        onBlur={(e) => {
                            if (dataIndex === 'en') {
                                setData(
                                    data.map((item) =>
                                        item.id === record.id
                                            ? {...item, [dataIndex]: e.nativeEvent.target.value}
                                            : item
                                    )
                                )
                                handleTranslate({
                                    text: e.nativeEvent.target.value,
                                    data: data,
                                    setData: setData,
                                })
                            }
                        }}
                    />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );



};

export default EditableCell;

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
                            setData(
                                data.map((item) =>
                                    item.id === record.id
                                        ? {...item, [dataIndex]: e.nativeEvent.target.value}
                                        : item
                                )
                            )
                            handleTranslate({
                                text: e.nativeEvent.target.value,
                                language: dataIndex,
                            })
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

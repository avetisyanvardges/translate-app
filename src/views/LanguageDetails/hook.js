import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Form} from "antd";
import {isEmpty} from "lodash";

const data = [
    {
        key: 'Poxos',
        hy: 'Poxos',
        en: 'Poxos',
        ru: 'Poxos',
        ge: 'Poxos'
    },
    {
        key: 'Martisros',
        hy: 'Martisros',
        en: 'Martisros',
        ru: 'Martisros',
        ge: 'Martisros'
    }
];

const initialRowData = {key: '', en: {}, hy: {}, ru: {}, ge: {}};

function useContainer() {
    const {id} = useParams();
    const [form] = Form.useForm();

    const onChange = (values) => {
        console.log('onchange', values)
    }

    useEffect(() => {
        if(isEmpty(data)) {
            form.setFieldsValue({
                data: [initialRowData]
            })
            return;
        }
        form.setFieldsValue({data})
    }, [data]);

    return {
        form,
        initialRowData,
        onChange,
        id
    }
}

export default useContainer;

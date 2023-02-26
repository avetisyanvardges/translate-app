import yup from '../index';

const validationSchema = yup.object().shape({
    key: yup.string().required(),
    hy: yup.string().required(),
    en: yup.string().required(),
    ru: yup.string().required(),
    ge: yup.string().required(),
});

export default validationSchema;

import React from 'react'
import { Form, Input } from 'antd'
import { useField } from 'formik'

const InputFiled = ({
  label,
  name,
  placeholder,
  formItemClassName,
  labelClassName,
  hasFeedback,
  asComponent: Component,
  ...props
}) => {
  const [field, meta, helpers] = useField(name)
  const hasError = meta.touched && meta.error
  const Error = hasError ? (
    <div
      className="error"
      style={{ color: 'red', marginLeft: 10, marginBottom: 10 }}
    >
      {meta.error}
    </div>
  ) : undefined
  const { setValue } = helpers

  const onChangeHandler = (event) => setValue(event.target.value)

  return (
    <Form.Item
      style={{ margin: '2px 0 12px' }}
      className={formItemClassName}
      label={<span className={labelClassName}>{label}</span>}
      htmlFor={name}
      validateStatus={hasError}
      help={Error}
    >
      <Component
        id={name}
        placeholder={placeholder}
        {...field}
        {...props}
        onChange={onChangeHandler}
      />
    </Form.Item>
  )
}

InputFiled.defaultProps = {
  asComponent: Input,
  formItemClassName: '',
  labelClassName: '',
  placeholder: '',
  label: '',
}

export default InputFiled

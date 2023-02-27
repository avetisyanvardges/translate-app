import React, { useState } from 'react'
import {
  MinusCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
import { uniqueId } from 'lodash'
import useContainer from './hook'
import './style.scss'

const initialData = [
  {
    id: 1,
    keyName: '',
    en: '',
    ru: '',
    ge: '',
    hy: '',
  },
]

function EditableCell({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) {
  const inputNode = <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

function LanguageDetails() {
  const { onChange, form, initialRowData, id } = useContainer()
  const [editingId, setEditingId] = useState(0)

  const isEditing = (record) => record.id === editingId
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(initialRowData.en)
    )}`
    const link = document.createElement('a')
    link.href = jsonString
    link.download = 'data.json'

    link.click()
  }

  const [data, setData] = useState(initialData)
  const [count, setCount] = useState(2) // keep track of number of rows

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

    setData([...data, newData])
    setCount(count + 1)
  }
  const save = async (key) => {
    try {
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.id)
      console.log(index)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
        })
        setData(newData)
        setEditingId(0)
      } else {
        setData(newData)
        setEditingId(0)
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }

    console.log(data)
  }

  const columns = [
    {
      title: 'Key',
      dataIndex: 'keyName',
      key: 'keyName',
      render: (text, record) => (
        <input
          value={text}
          onChange={(e) =>
            setData(
              data.map((item) =>
                item.id === record.id
                  ? { ...item, keyName: e.target.value }
                  : item
              )
            )
          }
        />
      ),
    },
    {
      title: 'Value(EN)',
      dataIndex: 'en',
      key: 'en',
      render: (text, record) => (
        <input
          value={text}
          onChange={(e) =>
            setData(
              data.map((item) =>
                item.id === record.id ? { ...item, en: e.target.value } : item
              )
            )
          }
        />
      ),
    },
    {
      title: 'Value(RU)',
      dataIndex: 'ru',
      key: 'ru',
      render: (text, record) => (
        <input
          value={text}
          onChange={(e) =>
            setData(
              data.map((item) =>
                item.id === record.id ? { ...item, ru: e.target.value } : item
              )
            )
          }
        />
      ),
    },
    {
      title: 'Value(GE)',
      dataIndex: 'ge',
      key: 'ge',
      render: (text, record) => (
        <input
          value={text}
          onChange={(e) =>
            setData(
              data.map((item) =>
                item.id === record.id ? { ...item, ge: e.target.value } : item
              )
            )
          }
        />
      ),
    },
    {
      title: 'Value(HY)',
      dataIndex: 'hy',
      key: 'hy',
      render: (text, record) => (
        <input
          value={text}
          onChange={(e) =>
            setData(
              data.map((item) =>
                item.id === record.id ? { ...item, hy: e.target.value } : item
              )
            )
          }
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={save}>
            Save
          </Button>
          <Button type="link" danger onClick={() => handleDeleteRow(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const edit = (record) => {
    setEditingId(record)
  }

  const handleDeleteRow = (id) => {
    setData(data.filter((item) => item.id !== id))
  }
  return (
    <div className="language-details-page">
      <div className="top-content">
        <Link to="/">
          <Button icon={<RollbackOutlined />}>Back home</Button>
        </Link>
      </div>
      {/* <div className="row" style={{ backgroundColor: '#5DBA2F' }}> */}
      {/*   <span style={{ width: 220 }}>Key</span> */}
      {/*   <span style={{ width: 220 }}>Value(EN)</span> */}
      {/*   <span style={{ width: 220 }}>Value(HY)</span> */}
      {/*   <span style={{ width: 220 }}>Value(RU)</span> */}
      {/*   <span style={{ width: 220 }}>Value(GE)</span> */}
      {/* </div> */}
      {/* <Form */}
      {/*   name="dynamic_form_nest_item" */}
      {/*   onFinish={onChange} */}
      {/*   autoComplete="off" */}
      {/*   form={form} */}
      {/* > */}
      {/*   <Form.List name="data"> */}
      {/*     {(fields, { add, remove }) => ( */}
      {/*       <> */}
      {/*         {fields.map(({ key, name, ...restField }) => ( */}
      {/*           <Space */}
      {/*             key={key} */}
      {/*             className="row" */}
      {/*             style={{ */}
      {/*               display: 'flex', */}
      {/*               marginBottom: 8, */}
      {/*               alignItems: 'flex-start', */}
      {/*             }} */}
      {/*             align="baseline" */}
      {/*           > */}
      {/*             {Object.keys(initialRowData).map((item) => ( */}
      {/*               <Form.Item */}
      {/*                 {...restField} */}
      {/*                 key={uniqueId(item)} */}
      {/*                 name={[name, item]} */}
      {/*                 className="formItemOption" */}
      {/*                 rules={[{ required: true, message: 'Required field' }]} */}
      {/*               > */}
      {/*                 <Input */}
      {/*                   style={{ width: 220 }} */}
      {/*                   // disabled={item !== 'key' && isEmpty(initialRowData.key)} */}
      {/*                   onBlur={({ */}
      {/*                     nativeEvent: { */}
      {/*                       target: { placeholder, value }, */}
      {/*                     }, */}
      {/*                   }) => { */}
      {/*                     if (placeholder === 'key') { */}
      {/*                       initialRowData.key = value */}
      {/*                       Object.keys(initialRowData).map((it) => { */}
      {/*                         if (typeof initialRowData[it] !== 'string') { */}
      {/*                           initialRowData[it][`${id}.${value}`] = '' */}
      {/*                         } */}
      {/*                       }) */}
      {/*                     } else { */}
      {/*                       initialRowData[item][ */}
      {/*                         `${id}.${initialRowData.key}` */}
      {/*                       ] = value */}
      {/*                     } */}
      {/*                     console.log(initialRowData) */}
      {/*                   }} */}
      {/*                   placeholder={item} */}
      {/*                 /> */}
      {/*               </Form.Item> */}
      {/*             ))} */}
      {/*             <MinusCircleOutlined */}
      {/*               onClick={() => remove(name)} */}
      {/*               className="minusCircleOutlined" */}
      {/*             /> */}
      {/*           </Space> */}
      {/*         ))} */}
      {/*         <Form.Item className="bottom-content"> */}
      {/*           <Button */}
      {/*             className="add-row-button" */}
      {/*             onClick={() => add()} */}
      {/*             icon={<PlusOutlined />} */}
      {/*           > */}
      {/*             Add option */}
      {/*           </Button> */}
      {/*           <Button className="save-button" htmlType="submit"> */}
      {/*             Save */}
      {/*           </Button> */}
      {/*         </Form.Item> */}
      {/*       </> */}
      {/*     )} */}
      {/*   </Form.List> */}
      {/* </Form> */}
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        pagination={false}
        rowClassName="editable-row"
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
                console.log(key, item)
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
    </div>
  )
}

export default LanguageDetails

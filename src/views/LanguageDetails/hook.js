import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { isEmpty } from 'lodash'
import translateText from '../../utils/translate'
const initialRowData = { key: '', en: {}, hy: {}, ru: {}, ge: {} }

function useContainer({ setData, data }) {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [trData, setTrData] = useState({
    en: '',
    hy: '',
    ru: '',
    ge: '',
  })

  const onChange = (values) => {
    console.log('onchange', values)
  }

  useEffect(() => {
    if (isEmpty(data)) {
      form.setFieldsValue({
        data: [initialRowData],
      })
      return
    }
    form.setFieldsValue({ data })
  }, [data])

  useEffect(() => {
    console.log(trData)
    const newData = data.map((item) => {
      console.log(item.en)
      if (item.en === trData.en) {
        return {
          ...item,
          ...trData,
        }
      } else {
        return item
      }
    })
    console.log(newData)
    setData(newData)
  }, [trData])

  useEffect(() => {
    console.log(data)
  }, [data])

  const handleTranslate = async ({ text, data, setData }) => {
    console.log(text)
    let ruText, amText, geText
    if (!isEmpty(text)) {
      await translateText(text, 'ru')
        .then((translations) => {
          console.log(translations[0])

          ruText = translations[0]
        })
        .catch((err) => console.error(err))
      await translateText(text, 'ka')
        .then((translations) => {
          console.log(translations[0])

          geText = translations[0]
        })
        .catch((err) => console.error(err))
      await translateText(text, 'hy')
        .then((translations) => {
          console.log(translations[0])

          amText = translations[0]
        })
        .catch((err) => console.error(err))
    }
    await setTrData({ ...trData, en: text, ru: ruText, ge: geText, hy: amText })
  }

  return {
    form,
    initialRowData,
    onChange,
    id,
    handleTranslate,
  }
}

export default useContainer

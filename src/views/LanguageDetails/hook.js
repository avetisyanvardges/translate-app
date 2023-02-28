import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form } from 'antd'
import {concat, isEmpty, uniq} from 'lodash'
import translateText from '../../utils/translate'
import {child, get, getDatabase, ref} from "firebase/database";

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
  }
  function processText(text) {
    // remove apostrophes
    text = text.replaceAll("'", "");

    // remove all syllables (assumes syllables are separated by hyphens)
    text = text.replaceAll(/[-][^aeiouy]*[aeiouy]+[^aeiouy]*[-]/gi, '');

    // replace all indents with underscores
    text = text.replaceAll(/\s+/g, '_');

    // generate maximum of 3 words
    const words = text.split('_').slice(0, 4);

    // remove trailing underscore, if any
    if (words[words.length - 1] === '') {
      words.pop();
    }

    // join the words and return
    return words.join('_').toLowerCase();
  }


  useEffect(() => {
    const newData = data.map((item) => {
      if (item.en === trData.en) {
        return {
          ...item,
          ...trData,
        }
      } else {
        return item
      }
    })
    setData(newData)
    form.setFieldsValue({...form.getFieldsValue(), ...trData})
  }, [trData])


  const handleTranslate = async ({ text, data, setData }) => {
    let ruText, amText, geText
    if (!isEmpty(text)) {
      await translateText(text, 'ru')
        .then((translations) => {
          ruText = translations[0]
        })
        .catch((err) => console.error(err))
      await translateText(text, 'ka')
        .then((translations) => {
          geText = translations[0]
        })
        .catch((err) => console.error(err))
      await translateText(text, 'hy')
        .then((translations) => {
          amText = translations[0]
        })
        .catch((err) => console.error(err))
    }
    await setTrData({ ...trData, en: text, ru: ruText, ge: geText, hy: amText, keyName: processText(text) })
  }





  return {
    form,
    onChange,
    id,
    handleTranslate,
  }
}

export default useContainer

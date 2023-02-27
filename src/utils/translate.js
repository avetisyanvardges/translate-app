import axios from 'axios'

const API_KEY = 'AIzaSyAc8S6sawB7WRuI0iXlkn9Jl_ydVg0jKb0'

async function translateText(text, targetLanguages) {
  const response = await axios.post(
    `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
    {
      q: text,
      target: targetLanguages,
    }
  )

  const translations = response.data.data.translations.map(
    (t) => t.translatedText
  )
  return translations
}

export default translateText

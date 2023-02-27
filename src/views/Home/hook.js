import { useState } from 'react'

function useContainer() {
  const [screenList, setScreenList] = useState([])
  const [addScreenVisible, setAddScreenVisible] = useState(true)
  const [addInputValue, setAddInputValue] = useState('')

  const onChangeInputValue = ({ target: { value } }) => {
    setAddInputValue(value)
  }

  const saveNewScreen = () => {
    setAddScreenVisible(true)
    if (!addInputValue) return

    setScreenList([
      ...screenList,
      {
        name: addInputValue,
        id: addInputValue.toLowerCase(),
      },
    ])
    setAddInputValue('')
  }

  return {
    screenList,
    addScreenVisible,
    setAddScreenVisible,
    addInputValue,
    onChangeInputValue,
    saveNewScreen,
  }
}

export default useContainer

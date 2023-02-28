import {useEffect, useState} from 'react'
import {child, get, getDatabase, ref, set} from "firebase/database";
import * as Figma from "figma-js";

function useContainer() {
  const [screenList, setScreenList] = useState([])
  const [addScreenVisible, setAddScreenVisible] = useState(true)
  const [addInputValue, setAddInputValue] = useState('')

  const onChangeInputValue = ({ target: { value } }) => {
    setAddInputValue(value)
  }

  useEffect(()=>{
    // const client = Figma.Client({
    //   personalAccessToken: 'figd_M9c7hURQw6u4DiX3pfiEWnkBbGFWDZN7JTnEkYzz'
    // });
    //
    // const fileId = '3SsLAlhOk76djhXKsc5B4w';
    //
    // function getTextNodes(node) {
    //   if (node.type === 'TEXT') {
    //     return [node];
    //   } else if ('children' in node) {
    //     const childNodes = node.children.flatMap(getTextNodes);
    //     return childNodes.filter((node) => node.type === 'TEXT');
    //   } else {
    //     return [];
    //   }
    // }
    //
    // client.file(fileId).then((file) => {
    //
    //   const [screen] = file.data.document.children.filter((item) => item.id === '176:2471')
    //   const textNodes = screen.children.flatMap(getTextNodes);
    //
    //   const textContent = textNodes.map((node) => node.characters).join('');
    //
    // });
  }, [])

  useEffect(()=>{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `screens`)).then((snapshot) => {
      if (snapshot.exists()) {
        let newScreenData = []
        Object.keys(snapshot.val()).map(async (item)=>{
          newScreenData.push({
            name: item,
            id: item.toLowerCase(),
          })
        });
        setScreenList([
          ...screenList,
            ...newScreenData
        ])
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  },[])

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
    const db = getDatabase();
    set(ref(db, `translate/${addInputValue.toLowerCase()}`),'');
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

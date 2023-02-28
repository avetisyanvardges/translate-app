import {useState, useEffect, useCallback, useMemo} from "react";
import {child, get, getDatabase, ref, set} from "firebase/database";
import {Link, useLocation} from "react-router-dom";

function useContainer() {
    const [screenList, setScreenList] = useState([]);
    const [addScreenVisible, setAddScreenVisible] = useState(true);
    const [addInputValue, setAddInputValue] = useState('');
    const {pathname} = useLocation();

    const onChangeInputValue = useCallback(({ target: { value } }) => {
        setAddInputValue(value);
    }, []);

    const menuItems = useMemo(() => screenList.map(item => {
        item = {
            label: <Link className='item-link' to={`/screen/${item.name}`}>{item.name}</Link>,
            key: `/screen/${item.name}`,
        }
        return item;
    }), [screenList]);

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
        pathname,
        menuItems: [
            {
                label: <Link className='item-link' to={`/`}>Home</Link>,
                key: '/',
            },
            ...menuItems
        ],
    }
}

export default useContainer;
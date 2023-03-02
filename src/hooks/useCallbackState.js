import React, {useEffect, useState} from 'react';

export default function useCallbackState(initialState) {
  const [state, setState] = useState({
    val: initialState,
    callback: () => {},
  });
  useEffect(() => {
    const {callback} = state;
    callback && callback(state.val);
  }, [state]);

  return [state, setState];
}

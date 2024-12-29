import React, { createContext, useReducer } from "react";

const initialState = {
    // count: 0
  }
let AppContext = createContext(initialState);



let reducer = (state: any, action: { type: string; payload: string; }) => {
  switch(action.type) {
    case "setCount": {
      return { ...state, count: action.payload }
    }
  }
  return state;
};

function AppContextProvider(props: { children: React.ReactNode; }) {
  const fullInitialState = {
    ...initialState,
  }

  let [state, dispatch] = useReducer(reducer, fullInitialState);
  let value = { state, dispatch };


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
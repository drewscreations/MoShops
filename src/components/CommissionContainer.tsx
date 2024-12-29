import React, { useReducer } from 'react';
import { IonList, IonContent, IonItem, IonInput, IonItemDivider } from '@ionic/react';
import firebase from '../Firebase';


interface ContainerProps {
  pageName: string;
}

interface Commission {
  itemName: String
  user: String
  message: String
};


const initialState: Commission = {
  itemName: 'doll',
  user: 'guest user',
  message: 'default message'
};
const reducer = (state: any, action: any) =>{
  switch (action.type) {
    case 'user':
      return {
        ...state,
        [action.type]:[action.payload]
      }
    default:
      return {
        ...state,
        [action.type]:[action.payload]
      }
  }
}

const CommissionContainer: React.FC<ContainerProps> = ({pageName}) => {
  const [state, dispatch] = useReducer(reducer, initialState )
  //let {name, user, message} = state;
  const onChangeHandler = (e: any) => {
    dispatch({
      type:e.target.name,
      payload:e.detail.value
    })
  }
  return (

  <IonContent>
    {/*-- List of Text Items --*/}
    <IonItem>Page - {pageName}{firebase.name}</IonItem>
    <IonList>
      <IonItemDivider>User: {state.user}</IonItemDivider>
      <IonItem>
        <IonInput value={state.user} name='user' placeholder={state.user} onIonChange={e => onChangeHandler(e!)}></IonInput>
      </IonItem>
      <IonItemDivider>A brief description: {state.itemName}</IonItemDivider>
      <IonItem>
        <IonInput value={state.itemName} name='itemName' placeholder={state.itemName} onIonChange={e => onChangeHandler(e!)}></IonInput>
      </IonItem>
      <IonItemDivider>Your Contact Info: {state.itemName}</IonItemDivider>
        <IonItem>
          <IonInput value={state.itemName} name='itemName' placeholder={state.itemName} onIonChange={e => onChangeHandler(e!)}></IonInput>
        </IonItem>
    </IonList>
  </IonContent>
  )
};
export default CommissionContainer
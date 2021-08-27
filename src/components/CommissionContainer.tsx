import React, { useReducer, useState } from 'react';
import { IonList, IonContent, IonItem, IonInput, IonItemDivider, IonText, IonButton } from '@ionic/react';
import firebase from '../Firebase';


interface ContainerProps {
  pageName: string;
}

interface Commission {
  description: String
  special: String
  contact: String
};


const initialState: Commission = {
  description: '',
  special: '',
  contact: ''
};
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        [action.type]: [action.payload]
      }
    default:
      return {
        ...state,
        [action.type]: [action.payload]
      }
  }
}

const CommissionContainer: React.FC<ContainerProps> = ({ pageName }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [description, setDescription] = useState<string>();
  const [special, setSpecial] = useState<string>();
  const [contact, setContact] = useState<string>();
  //let {name, user, message} = state;
  const onChangeHandler = (e: any) => {
    dispatch({
      type: e.target.name,
      payload: e.detail.value
    })
  }
  const onClickHandler = (e:any) => {
    console.log('sate'+description)
  }
  return (

    <IonContent>

      <IonItem>Please fill out the following:</IonItem>
      <IonList>
        <IonItemDivider>A short description of the doll</IonItemDivider>
        <IonItem>
          <IonInput value={description} name='description' placeholder={''} onIonChange={e => setDescription(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItemDivider>Specicial details or customizations{state.itemName}</IonItemDivider>
        <IonItem>
          <IonInput value={special} name='special' placeholder={''} onIonChange={e => setSpecial(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItemDivider>Your Contact Info: {state.itemName}</IonItemDivider>
        <IonItem>
          <IonInput value={contact} name='contact' placeholder={''} onIonChange={e => setContact(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonButton onClick={e=>onClickHandler(e)} >
            Next: Payment
          </IonButton>
        </IonItem>
      </IonList>
    </IonContent>
  )
};
export default CommissionContainer

/*

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
    */
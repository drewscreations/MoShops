import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useReducer, useEffect } from 'react';
import ComissionContainer from '../components/CommissionContainer';
import './Page.css';
import firebase from '../Firebase';


const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'default':
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

const Page: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {})

  let mything;
  firebase.fbApp.auth().onAuthStateChanged(function (user) {

    if (user != null) {


      //[TODO] make an index signature for user
      console.log('[Comissions]: auth state changed, hello', user.displayName)
      mything = user.displayName
    } else {
      // No user is signed in.
      console.log('[Comissions]:auth state changed, no valid user object')
    }
  });
  //@ts-ignore
  let userName = mything ? mything : "unknown"
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem routerLink="/Home">
            <IonTitle>Moevil - Comisssions</IonTitle>

          </IonItem>

        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        
        <ComissionContainer pageName={'commissions'} />

      </IonContent>
    </IonPage>
  );
};

export default Page;

//<IonItem>username:{userName}</IonItem>
//<IonItem>mything:{mything}</IonItem>



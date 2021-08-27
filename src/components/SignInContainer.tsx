//import firebase from 'firebase';

import 'firebaseui/dist/firebaseui.css';
import React, {useEffect} from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonButton } from '@ionic/react';
import firebase from '../Firebase'



interface ContainerProps {
  pageName: string;
}
//136503459016-om5piob4ocm0et7ijtgar26m1k4fvpo6.apps.googleusercontent.com
//Kvur_GLTWNQswe_FpnF-HSUg
//const project = firebase.fbApp
const {ui, uiConfig} = firebase

const logoutHandler = (e:any) => {
  e.preventDefault()
  firebase.fbApp.auth().signOut().then(function() {
    console.log("you  signed out")
  }).catch(function(error) {
    console.log("logout failed")
    console.log(error)
  })
}
// Get a reference to the database service
const SignInContainer: React.FC<ContainerProps> = ({ pageName }) => {

    useEffect(() => {
        ui.start('#firebaseui-auth-container', uiConfig)
    },[])
    return (

      <IonContent>
         <IonCard>


          <IonCardContent>
          {<div>
                <div id="firebaseui-auth-container"></div>

            </div>}
      </IonCardContent>
        </IonCard>
        <IonCard>
          <IonButton onClick={(e)=>logoutHandler(e)}>Logout</IonButton>

        </IonCard>
      </IonContent>

    );
};

export default SignInContainer;


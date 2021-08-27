import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import SignInContainer from '../components/SignInContainer';
import './Page.css';



const SignIn: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem routerLink = "/Home">
            <IonTitle>Moevil - Sign In</IonTitle>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <SignInContainer pageName={'sign in'}/>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import AboutContainer from '../components/AboutContainer';
import './Page.css';



const Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem routerLink = "/Home">
            <IonTitle>Moevil - About</IonTitle>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <AboutContainer pageName={'About Morgan'}/>
      </IonContent>
    </IonPage>
  );
};

export default Page;

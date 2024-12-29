import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ContactContainer from '../components/ContactContainer';
import './Page.css';



const Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem routerLink = "/Home">
            <IonTitle>MoShops - Contact</IonTitle>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <ContactContainer pageName={'contact'}/>
      </IonContent>
    </IonPage>
  );
};

export default Page;

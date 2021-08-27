import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import CRUDcontainer from '../components/CRUDcontainer';
import './Page.css';



const Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem routerLink = "/Home">
            <IonTitle>Moevil - CRUD operations</IonTitle>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <CRUDcontainer pageName={'CRUD'}/>
      </IonContent>
    </IonPage>
  );
};

export default Page;

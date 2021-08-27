import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import PortfolioContainer from '../components/PortfolioContainer';
import './Page.css';



const Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem routerLink = "/Home">
            <IonTitle>Moevil - Portfolio</IonTitle>
          </IonItem>
          
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        
      </IonContent>
    </IonPage>
  );
};

export default Page;
//<PortfolioContainer pageName={'portfolio'}/>
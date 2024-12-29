import React from 'react';
import { IonContent, IonList, IonLabel, IonItem, IonCardContent, IonCard } from '@ionic/react';
import './centerContent.css';
import firebase from '../Firebase';
const HomeContainer: React.FC = () => {
let name;
    if(firebase){
        name = firebase.name
    } else {
        name = 'fdsagdfsga'
    }

  return (
    <IonContent >
        <IonItem routerLink = "/Signin" lines='full'>
                <IonLabel class="center-content" color="primary">Morgan Richards</IonLabel>
            </IonItem>
        {/*-- List of Text Items --*/}

        <IonList >
            
            <IonItem  routerLink = "/About" lines="none">
                <IonLabel class="center-content" color="secondary">About</IonLabel>
            </IonItem>
            <IonItem routerLink = "/Portfolio" lines="none">
                <IonLabel class="center-content" color="secondary">Portfolio</IonLabel>
            </IonItem>
            <IonItem  routerLink = "/Commissions" lines="none">
                <IonLabel class="center-content" color="secondary">Comissions</IonLabel>
            </IonItem>
            <IonItem routerLink = "/Contact" lines="none">
                <IonLabel class="center-content" color="secondary">Contact</IonLabel>
            </IonItem>
            <IonItem routerLink = "/CRUD"  lines='none'>
                <IonLabel class="center-content" color="secondary">CRUD</IonLabel>
            </IonItem>
        </IonList>

    </IonContent>
  );
};

export default HomeContainer;
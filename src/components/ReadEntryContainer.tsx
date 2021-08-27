import React from 'react';
import './ExploreContainer.css';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';

interface ContainerProps {
  name: string;
}

const ReadEntryContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonContent>
       <IonCard>
        <IonCardHeader>
          <IonCardTitle>Read Entry</IonCardTitle>
          <IonCardSubtitle>Select an image to upload</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>Contetnt</IonCardContent>
        </IonCard>
      </IonContent>
  );
};

export default ReadEntryContainer;

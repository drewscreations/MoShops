import React from 'react';
import './ExploreContainer.css';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonContent>
       <IonCard>
        <IonCardHeader>
          <IonCardTitle>Upload</IonCardTitle>
          <IonCardSubtitle>Select an image to upload</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>Contetnt</IonCardContent>
        </IonCard>
      </IonContent>
  );
};

export default ExploreContainer;

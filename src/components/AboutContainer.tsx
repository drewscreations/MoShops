import firebase from 'firebase';
import React from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';


interface ContainerProps {
  pageName: string;
}


// Get a reference to the database service
const AboutContainer: React.FC<ContainerProps> = ({ pageName }) => {
    
    return (

      <IonContent>
         <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>A brief bio</IonCardSubtitle>
            <IonCardTitle>{pageName}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          Hi my name is Mo. I’m a sculpture/illustration artist residing in Seattle WA.

          Shipments are made within 3-5 business days.

          Please feel free to email me if you have any questions regarding returns, commissions/special orders, or other inquiries thank you!!
      </IonCardContent>
        </IonCard>
      </IonContent>

    );
};

export default AboutContainer;



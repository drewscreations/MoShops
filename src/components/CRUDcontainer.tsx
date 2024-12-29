import firebase from 'firebase';
// import firebase from 'firebase/app';
// import 'firebase/database';
import React, { useReducer, useRef, useEffect, MutableRefObject, useState } from 'react';
import { IonList, IonContent, IonItem, IonInput, IonItemDivider, IonButton, IonLabel, IonProgressBar, IonImg, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import CreateGroupEntryCard from './CRUDcards/CreateGroupEntryCard';
import CreatePictureEntryCard from './CRUDcards/CreatePictureEntryCard';
import CreatePortfolioEntryCard from './CRUDcards/CreatePortfolioEntryCard';
import ReadEntryCard from "./CRUDcards/ReadEntryCard";
import EditEntryCard from "./CRUDcards/EditEntryCard";
import DeleteEntryCard from "./CRUDcards/DeleteEntryCard";
import UploadImageCard from './CRUDcards/UploadImageCard';


interface ContainerProps {
    pageName: string;
}


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'default':
            return {
                ...state,
                [action.type]: [action.payload]
            }
        default:
            return {
                ...state,
                [action.type]: [action.payload]
            }
    }
}

// Get a reference to the database service
const CRUDcontainer: React.FC<ContainerProps> = ({ pageName }) => {
       
    const storageRef = firebase.storage().ref();
    var listRef = storageRef.child('pictures');

    // Find all the prefixes and items.

    
    return (
        <IonContent>
            <IonItem>Page - {pageName}</IonItem>
            <UploadImageCard pageName="test"/>
            <CreatePortfolioEntryCard name="test"/>
            
            <ReadEntryCard name="Read entry card"/>
            <EditEntryCard name="Edit entry card" />
            <DeleteEntryCard name="Delete entry card" />
            
        </IonContent>
    );
};

export default CRUDcontainer;



import React, { useReducer, useState } from 'react';

import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItemDivider, IonItem, IonInput, IonLabel, IonSelect, IonImg, IonSelectOption } from '@ionic/react';

interface ContainerProps {
  name: string;
}
interface PortfolioItem {
    itemName: String
    itemDescription: String
    imgLocation: String
  };
const initialState: PortfolioItem = {
  itemName: 'default name',
  itemDescription: 'default description',
  imgLocation: "default location"
};
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
const DeleteEntryCard: React.FC<ContainerProps> = ({ name }) => {
    //blueprint for database entries for reference
    const dbSettings = {
        "Pictures": {
            "imageKey" : {
                "imageLocation" : "location on google firebased",
                "name" : "Name of the image"
            }
        },
        "Picture Groups": {
            "groupKey" : {
                "imageKey" : true
            }
        },
        "Portfolio" : {
            "itemKey" : {
                "name" : "item name",
                "description" : "item description",
                "creationDate" : "date item was created",
                "refToPictures" : "reference to Pictures db entry",
                "refToPictureGroups" : "reference to Picture Groups db entry"
            }
        },
        "Inventory" : {
            "itemKey" : {
                "name" : "item name",
                "description" : "item description",
                "refToPictures" : "reference to Pictures db entry",
                "refToPictureGroups" : "reference to Picture Groups db entry",
                "price" : "price of the item in $"
            }
        }
    }
    //declaring multiple state variables
    const [state, dispatch] = useReducer(reducer, initialState)
    const [allImgs, updateImgs] = useReducer(reducer, {})
    const [selectedImg, updateSelectedImg] = useState<string>()
    const [selectedGroup, updateSelectedGroup] = useState<string>()
    const imageOptions = Object.entries(allImgs).map((key, value) => {
        //console.log(`key: ${key}`)
        //@ts-ignore
        //console.log(key[1][0])
        //@ts-ignore
        return <IonSelectOption value={key[1][0]}>{key[0]}</IonSelectOption>
      })
    const portfolioOptions = Object.entries(dbSettings["Portfolio"]["itemKey"]).map((key, value) => {
        return (
            <IonItem>
                <IonItemDivider>
                    {key[0]}{key[1]}{value}
                </IonItemDivider>
                <IonItem>
                    <IonInput value={value} name={key[0]} placeholder="..." onIonChange={e => onChangeHandler(e!)}></IonInput>
                </IonItem> 
            </IonItem>
        )
    })
    const onChangeHandler = (e: any) => {
        dispatch({
          type: e.target.name,
          payload: e.detail.value
        })
    }
    const onSelectDropdownImg = (e: any) => {
        console.log("[onSelectDropdownImg]")
        console.log(e)
        updateImgs("changed")
    }
    const onSelectDropdownGroup = (e: any) => {
        console.log("[onSelectDropdownGroup]")
        console.log(e)
        updateImgs("changed")
    }       
  return (

       <IonCard>
        <IonCardHeader>
          <IonCardTitle>Delete Entry</IonCardTitle>
          <IonCardSubtitle>for Portfolio</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
            <IonItem>
                <IonList>
                    <IonItemDivider>
                        Name:
                    </IonItemDivider>
                    <IonItem>
                        <IonInput value="" name='name' placeholder="..."></IonInput>
                    </IonItem>
                    <IonItemDivider>
                        Description:</IonItemDivider>
                    <IonItem>
                        <IonInput value="" name='description' placeholder="..."></IonInput>
                    </IonItem>
                    <IonItemDivider>
                        Creation Date: 
                    </IonItemDivider>
                    <IonItem>
                        <IonInput value="" name='creationDate' placeholder="..."></IonInput>
                    </IonItem>
                    <IonItemDivider>
                        Ref to Pictures: 
                    </IonItemDivider>
                    <IonItem>
                        <IonLabel>Pick the image</IonLabel>
                        <IonSelect value={selectedImg} okText="Okay" cancelText="Dismiss" onIonChange={e => onSelectDropdownImg(e)}>
                        {imageOptions}
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonImg src={selectedImg} />
                    </IonItem>
                    <IonItemDivider>
                        Ref to Picture Group: 
                    </IonItemDivider>
                    <IonItem>
                        <IonLabel>Pick the group</IonLabel>
                        <IonSelect value={selectedGroup} okText="Okay" cancelText="Dismiss" onIonChange={e => onSelectDropdownGroup(e)}>
                        {imageOptions}
                        </IonSelect>
                    </IonItem>
                </IonList>
            </IonItem>
        </IonCardContent>
        </IonCard>

  );
};

export default DeleteEntryCard;

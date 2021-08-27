import React, { useReducer, useState, useEffect } from 'react';

import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItemDivider, IonItem, IonInput, IonLabel, IonSelect, IonImg, IonSelectOption, IonButton, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import firebase from '../../Firebase';

interface ContainerProps {
    name: string;
}
interface PortfolioItem {
    itemName: String
    itemDescription: String
    imgLocation: String
    groupLocation: String
    creationDate: String
};
interface StoreItem {
    itemName: String
    itemDescription: String
    imgLocation: String
    groupLocation: String
    price: String
};
interface ImageItem {
    imageName: String
    imageFullPath: String
    imageDescription: String
    imageUrl: String

}
interface PictureGroup {
    //might need to be array of strings
    imageId: String
};
const imageStateInitial: ImageItem = {
    imageName: "",
    imageFullPath: "",
    imageDescription: "test",
    imageUrl: ""
}
const portfolioStateInitial: PortfolioItem = {
    itemName: '',
    itemDescription: '',
    creationDate: '',
    imgLocation: "",
    groupLocation: ""
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'spread':
            return {
                ...action.payload
            }
        case 'dbReplace':
            return {
                ...action.payload
            }
        case 'selectedImages':
            return {
                ...state,
                'selectedImages': [
                    ...state.selectedImages,
                    action.payload
                ],
            }
        default:
            return {
                ...state,
                [action.type]: action.payload
            }
    }
}

const CreatePortfolioEntryCard: React.FC<ContainerProps> = ({ name }) => {
    //blueprint for database entries for reference

    //declaring multiple state variables
    //state has portfolioId, pictureGroupId, inventoryId
    const [portfolioState, portfolioDispatch] = useReducer(reducer, portfolioStateInitial)
    const [imageState, imageDispatch] = useReducer(reducer, imageStateInitial)
    const [allStorageImgs, updateAllStorageImgs] = useReducer(reducer, {})
    const [allDbImages, updateDbImages] = useReducer(reducer, {})
    const [selectedImg, updateSelectedImg] = useState<string>("")
    //const [imgBank, updateImgBank] = useReducer(reducer, {selectedImages:[]})
    const [imgBank, updateImgBank] = useState<Array<string>>([])
    const [selectedGroup, updateSelectedGroup] = useState<string>()
    const storageRef = firebase.fbApp.storage().ref();
    const database = firebase.fbApp.database()
    var listRef = storageRef.child('pictures');



    const onChangeHandlerPortfolio = (event: any) => {
        portfolioDispatch({
            type: event.target.name,
            payload: event.detail.value,
        })
    }
    useEffect(() => {
        listRef.listAll().then(function (res) {
            res.items.forEach(function (itemRef) {
                itemRef.getDownloadURL().then(function (url) {
                    updateAllStorageImgs({
                        type: itemRef.name,
                        //@ts-ignore
                        payload: {
                            imageUrl: url,
                            imageName: itemRef.name,
                            imageFullPath: itemRef.fullPath
                        }
                    });
                })

            });
        }).catch(function (error) {
            console.log('error getting pictures references')
        });
        database.ref('images/').once('value').then(function (snapshot) {
            updateDbImages({
                type: "dbReplace",
                payload: snapshot.val()
            });
        })
    }, [])

    const pushNewPortfolioEntry = (event: any) => {
        database.ref('portfolio/').push({
            itemName: portfolioState.itemName,
            itemDescription: portfolioState.itemDescription,
            imgArr: imgBank,
            creationDate: portfolioState.creationDate
        })
    }

    const onSelectDropdownImgPortfolio = (event: any) => {
        if (event.detail.value) {
            console.log(`[onSelectDropdownImgPortfolio]: ${event.detail.value}`)
            //console.log(allDbImages)
            const imageRef = allDbImages[event.detail.value]
            const newImgBank = [...imgBank, event.detail.value]
            updateImgBank(newImgBank)
        }
    }
    const removeImageHandler = (event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>, index: number) => {
        if(imgBank[index]){
        console.log(`removing ${imgBank[index]}`);
        const removedImage = imgBank.splice(index, 1);
        updateImgBank(imgBank);
        }
    }
    const imageOptions = Object.entries(allStorageImgs).map((key, value) => {
        //@ts-ignore
        return <IonSelectOption value={key[0]}>{key[1].imageName}</IonSelectOption>
    })
    //console.log(dbImages)
    const dbImageOptions = Object.entries(allDbImages).map((key, value) => {
        //console.log(key[0])
        //@ts-ignore
        return <IonSelectOption value={key[0]}>{key[1].imageDescription}</IonSelectOption>
    })
    //const selectedImages = false
    const selectedImages = imgBank.map((selectedImg: string | number, index: number) => {
        console.log(`[selectedImages]: selected image: ${selectedImg}`)
        if (selectedImg) {
            console.log(allDbImages[selectedImg].imageName)
            console.log(allStorageImgs)
            return <IonRow>
                <IonCol size="2">
                    <IonImg src={allStorageImgs[allDbImages[selectedImg].imageName] ? allStorageImgs[allDbImages[selectedImg].imageName].imageUrl : false} />
                </IonCol>
                <IonCol className="ion-align-self-end">
                    <IonButton color="danger" onClick={(e) => removeImageHandler(e, index)}>
                        <IonIcon name="close-circle" />
                    </IonButton>

                </IonCol>

            </IonRow>
        }
    });

    return (
        <IonItem>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Create Entry</IonCardTitle>
                    <IonCardSubtitle>for Portfolio</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonList>
                            <IonItemDivider color="secondary">
                                Details
                </IonItemDivider>
                            <IonItem>
                                <IonLabel>Name: </IonLabel>
                                <IonInput value={portfolioState.itemName} name='itemName' placeholder="..." onIonChange={e => onChangeHandlerPortfolio(e!)}></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel>Description: </IonLabel>
                                <IonInput value={portfolioState.itemDescription} name='itemDescription' placeholder="..." onIonChange={e => onChangeHandlerPortfolio(e!)}></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel>Creation Date: </IonLabel>
                                <IonInput value={portfolioState.creationDate} name='creationDate' placeholder="..." onIonChange={e => onChangeHandlerPortfolio(e!)}></IonInput>
                            </IonItem>
                            <IonItemDivider color="secondary">
                                Link to Pictures / Groups
                        </IonItemDivider>
                            <IonItem>Image Location: {portfolioState.imgLocation}</IonItem>
                            <IonItem>
                                <IonLabel>Selected Images:</IonLabel>
                                <IonSelect value={selectedImg} okText="Okay" cancelText="Dismiss" onIonChange={e => onSelectDropdownImgPortfolio(e!)}>
                                    {dbImageOptions}
                                </IonSelect>
                            </IonItem>

                            <IonItem>
                                <IonGrid fixed>
                                    <IonRow>
                                        {selectedImages ? selectedImages : 'not loaded'}
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            <IonItem>
                                <IonButton
                                    color="seccondary" onClick={(e) => pushNewPortfolioEntry(e!)}>
                                    Create!
                            </IonButton>
                            </IonItem>
                        </IonList>
                    </IonItem>
                </IonCardContent>
            </IonCard>

        </IonItem>
    )
};

export default CreatePortfolioEntryCard;

import React, { useReducer, useState, useEffect } from 'react';

import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItemDivider, IonItem, IonInput, IonLabel, IonSelect, IonImg, IonSelectOption, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import firebase from '../../Firebase';




interface ContainerProps {
    name: string;
}

interface ImageItem {
    imageName: String
    imageFullPath: String
    imageDescription: String
    imageUrl: String

}


const imageStateInitial: ImageItem = {
    imageName: "",
    imageFullPath: "",
    imageDescription: "test",
    imageUrl: ""
}

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
        default:
            return {
                ...state,
                [action.type]: action.payload
            }
    }
}

const CreatePictureEntryCard: React.FC<ContainerProps> = ({ name }) => {

    const [imageState, imageDispatch] = useReducer(reducer, imageStateInitial)

    const [allImgs, updateImgs] = useReducer(reducer, {})
    const [dbImages, updateDbImages] = useReducer(reducer, {})
    const [selectedImg, updateSelectedImg] = useState<string>("")

    const storageRef = firebase.fbApp.storage().ref();
    const database = firebase.fbApp.database()

    var listRef = storageRef.child('pictures');
    

    useEffect(() => {
        listRef.listAll().then(function (res) {
            // res.prefixes.forEach(function(folderRef) {
            //   console.log(`folderref`)
            //   console.log(folderRef)
            // });
            res.items.forEach(function (itemRef) {
                //console.log(`item`)
                //console.log(itemRef)
                itemRef.getDownloadURL().then(function (url) {
                    updateImgs({
                        type: itemRef.name,
                        //@ts-ignore
                        payload: {
                            imageUrl:url,
                            imageName: itemRef.name,
                            imageFullPath: itemRef.fullPath
                        }
                    });
                })

            });
        }).catch(function (error) {
            console.log('error getting pictures references')
            // Uh-oh, an error occurred!
        });
        database.ref('images/').once('value').then(function(snapshot){
            //console.log('[imagesDb] snapshot val;')
            //console.log(snapshot.val())
            updateDbImages({
                type: "dbReplace",
                payload: snapshot.val()
            }); 
        })
    }, [])

    const imageOptions = Object.entries(allImgs).map((key, value) => {
        //console.log(`key: ${key}`)
        //@ts-ignore
        //console.log(key[1][0])
        //@ts-ignore
        //console.log(key)
        //@ts-ignore
        return <IonSelectOption key={key[0]} value={key[0]}>{key[1].imageName}</IonSelectOption>
    })


    const onChangeHandlerImage = (event: any) => {
        imageDispatch({
            type: event.target.name,
            payload: event.detail.value,
        })
    }

    const onSelectDropdownImg = (event: any) => {
        // console.log("[onSelectDropdownImg]")
        // console.log(event);
        // console.log(allImgs);
        // console.log(event.target.name)
        // console.log(event.detail.value)
        updateSelectedImg(event.detail.value)
        imageDispatch({
            type: 'spread',
            payload: allImgs[event.detail.value],
        })
        console.log(imageState)
    }


    const pushNewImageEntry = () => {
        database.ref('images/').push({
            imageDescription: imageState.imageDescription,
            imageName: imageState.imageName,
            imageFullPath: imageState.imageFullPath
        }, function (error) {
            if (error) {
                console.log('[createNewPortfolioEntry]')
                console.log(error)
            } else {
                console.log('[pushNewImageEntry] created entry successfully')
            }
        })
    }
    return (
        <IonItem>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Create Entry</IonCardTitle>
                    <IonCardSubtitle>for Picture</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonList>
                            <IonItemDivider>
                                Details
                            </IonItemDivider>
                            <IonItem>
                                <IonLabel>Description: </IonLabel>
                                <IonInput value={imageState.imageDescription} name='imageDescription' placeholder="..." onIonChange={e => onChangeHandlerImage(e!)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Pick the image</IonLabel>
                                <IonSelect value={selectedImg} okText="Okay" cancelText="Dismiss" onIonChange={e => onSelectDropdownImg(e)}>
                                    {imageOptions}
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Url: {imageState.imageUrl}</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>FullPath: {imageState.imageFullPath}</IonLabel>

                            </IonItem>
                            <IonItem>
                                <IonGrid fixed>
                                    <IonRow>
                                        <IonCol size="2">
                                            <IonImg src={allImgs[selectedImg]?allImgs[selectedImg].imageUrl:false} />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            <IonButton
                                    color="seccondary" onClick={(e) => pushNewImageEntry()}>
                                    Create!
                                </IonButton>
                        </IonList>
                    </IonItem>
                </IonCardContent>
            </IonCard>
           
            
        </IonItem>
    );
};

export default CreatePictureEntryCard;

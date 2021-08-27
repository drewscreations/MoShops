import React, { useReducer, useState, useEffect } from 'react';

import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItemDivider, IonItem, IonInput, IonLabel, IonSelect, IonImg, IonSelectOption, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import firebase from 'firebase';




interface ContainerProps {
    name: string;
}

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
const groupStateInitial: PictureGroup = {
    imageId: "defauilt image"
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

const CreateGroupEntryCard: React.FC<ContainerProps> = ({ name }) => {
    //blueprint for database entries for reference
    
    //declaring multiple state variables
    //state has portfolioId, pictureGroupId, inventoryId


    const [groupState, groupDispatch] = useReducer(reducer, groupStateInitial)

    const [imageState, imageDispatch] = useReducer(reducer, imageStateInitial)

    const [allImgs, updateImgs] = useReducer(reducer, {})
    const [dbImages, updateDbImages] = useReducer(reducer, {})

    const [selectedImg, updateSelectedImg] = useState<string>("")

    const storageRef = firebase.storage().ref();
    const database = firebase.database()

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
    // const portraitImageOptions =  Object.entries(dbImages).map((key, value) => {

    //     //@ts-ignore
    //     return <IonSelectOption value={key[0]}>{key[1].imageName}</IonSelectOption>
    // })

    //console.log(dbImages)
    const dbImageOptions = Object.entries(dbImages).map((key, value) => {
        //console.log(`key: ${key}`)
        //@ts-ignore
        //console.log(key[1][0])
        //@ts-ignore
        //console.log(key[1])
        //@ts-ignore
        return <IonSelectOption value={key[1].imageName}>{key[1].imageDescription}</IonSelectOption>
    })


    const onChangeHandlerGroup = (event: any) => {
        groupDispatch({
            type: event.target.name,
            payload: event.detail.value,
        })
    }

    const onSelectDropdownGroupImg = (event: any) => {
        console.log("[onSelectDropdownImg]")
        console.log(event);
        console.log(allImgs);
        console.log(event.target.name)
        console.log(event.detail.value)
        updateSelectedImg(event.detail.value)
        groupDispatch({
            type: allImgs[event.detail.value].imageName,
            payload: allImgs[event.detail.value],
        })
        console.log(imageState)
    }


    const pushNewGroupEntry = () => {
        //group state:
            //group name:
            //images in group:
                //img01:true
                //img05:true
        //create an object of the images selected
        
        const selectedImages = groupState.allImages
        database.ref('imageGroup/').push({
            groupName: groupState.groupName,
            groupImages: groupState.groupImages
        })
    }
    
    return (
        <IonItem>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Create Entry</IonCardTitle>
                    <IonCardSubtitle>for group</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonList>
                            <IonItemDivider>
                                Details
                            </IonItemDivider>
                            <IonItem>
                                <IonLabel>Group Name: </IonLabel>
                                <IonInput value={groupState.groupName} name='groupName' placeholder="..." onIonChange={e => onChangeHandlerGroup(e!)}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Pick the image</IonLabel>
                                <IonSelect value={selectedImg} okText="Okay" cancelText="Dismiss" onIonChange={e => onSelectDropdownGroupImg(e)}>
                                    {dbImageOptions}
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Added Images</IonLabel>
                            </IonItem>
                            
                            <IonButton
                                    color="seccondary" onClick={(e) => pushNewGroupEntry()}>
                                    Create!
                                </IonButton>
                        </IonList>
                    </IonItem>
                </IonCardContent>
            </IonCard>
        </IonItem>
    );
};

export default CreateGroupEntryCard;

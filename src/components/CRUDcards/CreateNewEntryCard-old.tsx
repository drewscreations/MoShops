import React, { useReducer, useState, useEffect } from 'react';

import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItemDivider, IonItem, IonInput, IonLabel, IonSelect, IonImg, IonSelectOption, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import firebase from '../../Firebase';




interface ContainerProps {
    name: string;
}
interface PortfolioItem {
    itemName: String
    itemDescription: String
    primaryImgLocation: String
    secondaryImg: [String]
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
const portfolioStateInitial: PortfolioItem = {
    itemName: "",
    itemDescription: "",
    creationDate: "",
    primaryImgLocation: "",
    secondaryImg: [""],
    groupLocation: ""
};
const storeStateInitial: StoreItem = {
    itemName: 'default name',
    itemDescription: 'default description',
    price: '$0.00',
    imgLocation: "default location",
    groupLocation: "default gorup"
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
const allImagesStateInitial: { entry: ImageItem } = {
    entry: {
        imageName: "",
        imageFullPath: "",
        imageDescription: "",
        imageUrl: ""
    }
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
const dbSettings = {
    "Pictures": {
        "imageKey": {
            "imageLocation": "location on google firebased",
            "name": "Name of the image"
        }
    },
    "Picture Groups": {
        "groupKey": {
            "imageKey": true
        }
    },
    "Portfolio": {
        "itemKey": {
            "name": "item name",
            "description": "item description",
            "creationDate": "date item was created",
            "refToPictures": "reference to Pictures db entry",
            "refToPictureGroups": "reference to Picture Groups db entry"
        }
    },
    "Inventory": {
        "itemKey": {
            "name": "item name",
            "description": "item description",
            "refToPictures": "reference to Pictures db entry",
            "refToPictureGroups": "reference to Picture Groups db entry",
            "price": "price of the item in $"
        }
    }
}
const CreateNewEntryCard: React.FC<ContainerProps> = ({ name }) => {
    //blueprint for database entries for reference

    //declaring multiple state variables
    //state has portfolioId, pictureGroupId, inventoryId
    const [portfolioState, portfolioDispatch] = useReducer(reducer, portfolioStateInitial)
    const [storeState, storeDispatch] = useReducer(reducer, storeStateInitial)
    const [groupState, groupDispatch] = useReducer(reducer, groupStateInitial)
    //updated on dropdown select
    const [imageState, imageDispatch] = useReducer(reducer, imageStateInitial)
    //updated with useEffect
    const [allImgs, updateImgs] = useReducer(reducer, {})
    const [dbImages, updateDbImages] = useReducer(reducer, {})
    const [newPortfolio, updateNewPortfolio] = useReducer(reducer, allImagesStateInitial)
    const [selectedImg, updateSelectedImg] = useState<string>("")
    const [selectedGroup, updateSelectedGroup] = useState<string>()
    const project = firebase.fbApp
    // project.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       // User is signed in.
    //       console.log("you're a user harry");
    //       console.log(user)
    //     } else {
    //       // No user is signed in.
    //       console.log("you're not a user hjarry")
    //     }
    //   });
    const storageRef = project.storage().ref();
    const database = project.database()
    //const portfolioRef = databaseRef.child("portfolio");
    //portfolioRef.set({item})
    const listRef = storageRef.child('pictures');

    /*
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
    */
    // Find all the prefixes and items.
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
                            imageUrl: url,
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
        database.ref('images/').once('value').then(function (snapshot) {
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
    const imageOptions = Object.entries(allImgs).map((key, value) => {
        //console.log(`key: ${key}`)
        //@ts-ignore
        //console.log(key[1][0])
        //@ts-ignore
        //console.log(key)
        //@ts-ignore
        return <IonSelectOption value={key[0]}>{key[1].imageName}</IonSelectOption>
    })
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
    const addedImages = Object.entries(groupState).map((key, value) => {
        console.log(key)
        //@ts-ignore
        return (<IonItem>
            <IonLabel>FullPath: {key}</IonLabel>

        </IonItem>
        )
    })
    const onChangeHandlerPortfolio = (event: any) => {
        portfolioDispatch({
            type: event.target.name,
            payload: event.detail.value,
        })
    }
    const onChangeHandlerImage = (event: any) => {
        imageDispatch({
            type: event.target.name,
            payload: event.detail.value,
        })
    }
    const onChangeHandlerGroup = (event: any) => {
        groupDispatch({
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
    const onSelectDropdownImgPortfolio = (event: any) => {
        console.log("[onSelectDropdownImgPortfolio]")
        //show selected image
        console.log(allImgs)
        console.log(event.detail.value)
        console.log(event);
        updateSelectedImg(allImgs[event.detail.value].imageName)
        //update portfolio image state

        console.log(allImgs);
    }
    const onSelectDropdownGroup = (event: any) => {
        console.log("[onSelectDropdownGroup]")
        console.log(event)
        updateSelectedGroup(event.detail.vale)
    }
    const onClickHandlerCreate = (event: any) => {
        pushNewPortfolioEntry()
        //const portfolio = portfolioState

        //createNewPortfolioEntry(1324, portfolio.itemName, portfolio.itemDescription, portfolio.imgLocation, portfolio.groupLocation, portfolio.creationDate)
    }
    const pushNewPortfolioEntry = () => {
        database.ref('portfolio/').push({
            itemName: portfolioState.itemName,
            itemDescription: portfolioState.itemDescription,
            imgLocation: portfolioState.imgLocation,
            groupLocation: portfolioState.groupLocation,
            creationDate: portfolioState.creationDate
        })
    }
    const createNewPortfolioEntry = (portfolioId: number, itemName: string, itemDescription: string, imgLocation: string, groupLocation: string, creationDate: string) => {
        database.ref('portfolio/' + portfolioId).set({
            itemName: itemName,
            itemDescription: itemDescription,
            imgLocation: imgLocation,
            groupLocation: groupLocation,
            creationDate: creationDate
        }, function (error) {
            if (error) {
                console.log('[createNewPortfolioEntry]')
                console.log(error)
            } else {
                console.log('[createNewPortfolioEntry] created entry successfully')
            }
        })
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
                    <IonCardSubtitle>for Image</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent hidden>
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
                            <IonButton
                                color="seccondary" onClick={(e) => pushNewImageEntry()}>
                                Create!
                                </IonButton>
                        </IonList>
                    </IonItem>
                </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Create Entry</IonCardTitle>
                    <IonCardSubtitle>for Portfolio</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonList>
                            <IonItemDivider>
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
                            <IonItemDivider>
                                Link to Pictures / Groups
                            </IonItemDivider>
                            <IonItem>Image Location: {portfolioState.imgLocation}</IonItem>
                            <IonItem>
                                <IonLabel>Pick the image</IonLabel>
                                <IonSelect value={selectedImg} okText="Okay" cancelText="Dismiss" onIonChange={e => onSelectDropdownImgPortfolio(e!)}>
                                    {dbImageOptions}
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonGrid fixed>
                                    <IonRow>
                                        <IonCol size="2">
                                            <IonImg src={allImgs[selectedImg] ? allImgs[selectedImg].imageUrl : false} />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Pick the group</IonLabel>
                                <IonSelect value={selectedGroup} okText="Okay" cancelText="Dismiss" onIonChange={e => onSelectDropdownGroup(e)}>
                                    {imageOptions}
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonButton
                                    color="seccondary" onClick={(e) => onClickHandlerCreate(e!)}>
                                    Create!
                                </IonButton>
                            </IonItem>
                        </IonList>
                    </IonItem>
                </IonCardContent>
            </IonCard>
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

export default CreateNewEntryCard;

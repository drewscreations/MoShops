import firebase from 'firebase';
// import firebase from 'firebase/app';
// import 'firebase/database';
import React, { useReducer, useRef, useEffect, MutableRefObject, useState } from 'react';
import { IonList, IonContent, IonItem, IonInput, IonItemDivider, IonButton, IonLabel, IonProgressBar, IonImg, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import useFirebaseUpload from "../hooks/useFirebaseUpload";
import { State } from 'ionicons/dist/types/stencil-public-runtime';


interface ContainerProps {
  pageName: string;
}

interface PortfolioItem {
  itemName: String
  itemDescription: String
  imgLocation: String
};

const defaultFile = new File([], "")
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

// Get a reference to the database service
const UploadImageContainer: React.FC<ContainerProps> = ({ pageName }) => {
  const [
    { dataResponse, isLoading, isError, progress },
    setFileData,
    clearError
  ] = useFirebaseUpload();
  const [state, dispatch] = useReducer(reducer, initialState)
  const [allImgs, updateImgs] = useReducer(reducer, {})
  const [selectedImg, updateSelectedImg] = useState<string>()
  const storageRef = firebase.storage().ref();
  var listRef = storageRef.child('pictures');

  // Find all the prefixes and items.
  useEffect(() => {
    listRef.listAll().then(function (res) {
      // res.prefixes.forEach(function(folderRef) {
      //   console.log(`folderref`)
      //   console.log(folderRef)
      // });
      res.items.forEach(function (itemRef) {
        console.log(`item`)
        console.log(itemRef)
        itemRef.getDownloadURL().then(function (url) {
          updateImgs({
            type: itemRef.name,
            //@ts-ignore
            payload: url
          });
        })

      });
    }).catch(function (error) {
      console.log('error getting pictures references')
      // Uh-oh, an error occurred!
    });
  }, [])
  const onChangeHandler = (e: any) => {
    dispatch({
      type: e.target.name,
      payload: e.detail.value
    })
  }
  const onSubmitHandler = (event: any) => {
    //event.persist();
    console.log(`state.imgLocatoin: ${state.imgLocation}, name: ${state.imgLocation.name}`)
    console.log(state.imgLocation)
    if (state.imgLocation instanceof File) {
      console.log(`sending file to the firebase hook`)
      setFileData(state.imgLocation);
      console.log(`is error, data response, progreass`)
      console.log(isError)
      console.log(dataResponse)
      console.log(progress)
    } else {
      console.log(`state.imgLocation is not a file`)
    }
  }
  const onSelectDropdown = (event: any) => {
    console.log(`event`)
    console.log(event.detail.value)
    updateSelectedImg(event.detail.value)
  }
  const onSelectFile = (event: any, inputRef: MutableRefObject<null>) => {
    event.persist();
    console.log(event)
    //@ts-ignore
    if (inputRef != null && inputRef.current.files[0] instanceof File) {
      console.log('bypassing stuff here')
      //@ts-ignore
      setFileData(inputRef.current.files[0]);
      //@ts-ignore
      console.log(`setting state.imgLocation: ${inputRef.current.files[0]}, name is ${inputRef.current.files[0].name}`)
      dispatch({
        type: "imgLocation",
        //@ts-ignore
        //payload:"whohdiofns"
        payload: inputRef.current.files[0]
      })
    } else {
      console.log('no file found')
    }
  }
  const fileRef = useRef(null)

  const imageOptions = Object.entries(allImgs).map((key, value) => {
    //console.log(`key: ${key}`)
    //@ts-ignore
    //console.log(key[1][0])
    //@ts-ignore
    return <IonSelectOption value={key[1][0]}>{key[0]}</IonSelectOption>
  })
  return (
    <IonContent>
      <IonItem>Page - {pageName}</IonItem>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Upload</IonCardTitle>
          <IonCardSubtitle>Select an image to upload</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <input ref={fileRef} hidden type="file" accept="image/*" onChange={(e) => onSelectFile(e, fileRef)} onClick={() => { console.log('opening file selector') }} />
            <IonButton
              color="primary" onClick={
                () => {
                  //@ts-ignore
                  fileRef ?.current ?.click();
                }
              }>
              Image
            </IonButton>
            <IonButton
              color="seccondary" onClick={onSubmitHandler}>
              Submit
            </IonButton>
          </IonItem>
          <IonItem>
            {/* get loading information from hook and display progress if necessary */}
            {isLoading && progress && (
              <IonProgressBar value={progress.value}></IonProgressBar>
            )}
          </IonItem>
        </IonCardContent>
      </IonCard>
      <IonCard>
      <IonCardHeader>
          <IonCardTitle>Assign</IonCardTitle>
          <IonCardSubtitle>Assign the image to portfolio or product entry</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
      
        <IonList>
          <IonItemDivider>Image Name: {state.itemName}</IonItemDivider>
          <IonItem>
            <IonInput value={state.itemName} name='itemName' placeholder={state.itemName} onIonChange={e => onChangeHandler(e!)}></IonInput>
          </IonItem>
          <IonItemDivider>Image Description: {state.itemDescription}</IonItemDivider>
          <IonItem>
            <IonInput value={state.itemDescription} name='itemDescription' placeholder={state.itemDescription} onIonChange={e => onChangeHandler(e!)}></IonInput>
          </IonItem>
          <IonItemDivider>File Location:
            <IonInput value={state.imgLocation.name}></IonInput>
          </IonItemDivider>

          <IonItem>
            <IonLabel>Pick the image</IonLabel>
            <IonSelect value={selectedImg} okText="Okay" cancelText="Dismiss" onIonChange={e => onSelectDropdown(e)}>
              {imageOptions}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonImg src={selectedImg} />
          </IonItem>
        </IonList>
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default UploadImageContainer;



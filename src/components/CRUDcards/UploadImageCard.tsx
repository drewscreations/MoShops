
// import firebase from 'firebase/app';
// import 'firebase/database';
import React, { useReducer, useRef, MutableRefObject, useState } from 'react';
import { IonItem, IonInput, IonButton, IonLabel, IonProgressBar, IonImg, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import useFirebaseUpload from "../../hooks/useFirebaseUpload";
import firebase from '../../Firebase';



interface ContainerProps {
    pageName: string;
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

const UploadImageCard: React.FC<ContainerProps> = ({ pageName }) => {
    const [
        { dataResponse, isLoading, isError, progress },
        setFileData,
        clearError,
        uploadImage,
        setFileName
    ] = useFirebaseUpload();
    const [imageState, imageDispatch] = useReducer(reducer, imageStateInitial)
    const [imgName, setImgName] = useState<string>();
    const [imgDescription, setImgDescription] = useState<string>();
    const [imgPreview, setImgPreview] = useState<string>('');
    const [showToastSuccess, setToastSuccess] = useState(false);
    const [showToastError, setToastError] = useState(false);
    const [errorToastText, setErrorToastText] = useState('');    
    const database = firebase.fbApp.database()
    const onSubmitHandler = (event: any) => {
        setFileName(imgName);
        const img = new Image();
        img.src = imgPreview
        if(img.height!=0 && img.width!=0){
            uploadImage();
            pushNewImageEntry(img);
        } else {
                setToastError(true)
                setErrorToastText('Please pick a picture first')
                
            }
        
    }
    const onSelectFile = (event: any, inputRef: MutableRefObject<null>) => {
        //@ts-ignore
        const image = inputRef.current.files[0]
        console.log(image)

        if (inputRef != null && image instanceof File) {
            console.log('[onSelectFile]: inputref is a file')
            //@ts-ignore
            const imgBlob = URL.createObjectURL(image)
            setFileData(image);
            setImgPreview(imgBlob);
            setImgName(image.name);
            setImgDescription(`An image of ${image.name}`)
        } else {
            console.log('[onSelectFile]: inputref is not a file, no file found')
        }
    }
    const onNameChangeHandler = (event:any) => {
        console.log(`updating name`);
        setImgName(event.detail.value)
    }
    const onDescChangeHandler = (event:any) => {
        console.log(`updating desc`);
        setImgDescription(event.detail.value)
    }
    const pushNewImageEntry = (img:HTMLImageElement) => {
       
            img.src = imgPreview || ''
            database.ref('images/').push({
                imageDescription: imgDescription,
                imageName: imgName,
                imageFullPath: `pictures/${imgName}`,
                imageWidth: img.width,
                imageHeight: img.height
            }, function (error) {
                if (error) {
                    console.log('[pushNewImageEntry] Upload Failed')
                    console.log(error)
                    console.log(error.name)
                    console.log(error.message)
                    setToastError(true)
                    setErrorToastText(error.message)
                } else {
                    console.log('[pushNewImageEntry] created entry successfully')
                    setToastSuccess(true)
                    setErrorToastText('success!!!')
                }
            })
        } 
    const fileRef = useRef(null)
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Upload</IonCardTitle>
                <IonCardSubtitle>Select an image to upload</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonItem>
                    <IonImg src={imgPreview} />
                </IonItem>
                <IonItem>
                    <input ref={fileRef} hidden type="file" accept="image/*" onChange={(e) => onSelectFile(e, fileRef)} onClick={() => { console.log('opening file selector') }} />
                    <IonButton color="primary"
                        onClick={
                            () => {
                                //@ts-ignore
                                fileRef?.current?.click();
                            }
                    }>
                    Select Image
                    </IonButton>
                </IonItem>
                <IonItem>
                    <IonLabel>Image Name: </IonLabel>
                    <IonInput value={imgName} onIonChange={onNameChangeHandler}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Image Description: </IonLabel>
                    <IonInput value={imgDescription} onIonChange={onDescChangeHandler}></IonInput>
                </IonItem>
                <IonItem>
                    <IonButton
                        color="seccondary" onClick={onSubmitHandler}>
                        Submit
                        </IonButton>
                    {/* get loading information from hook and display progress if necessary */}
                    {isLoading && progress && (
                        <IonProgressBar value={progress.value}></IonProgressBar>
                    )}
                </IonItem>
                //@ts-ignore
                <IonToast
                    isOpen={showToastSuccess}
                    onDidDismiss={() => setToastSuccess(false)}
                    message="Success!"
                    duration={1200}
                />
                 <IonToast
                    isOpen={showToastError}
                    onDidDismiss={() => setToastError(false)}
                    message={errorToastText}
                    position="top"
                    duration={1200}
                    buttons={[
                    
                    {
                        //@ts-ignore
                        text: 'Done',
                        role: 'cancel',
                        handler: () => {
                        console.log('Cancel clicked');
                        setErrorToastText('none')
                        }
                    }
                    ]}
                />
            </IonCardContent>
        </IonCard>
    )
}
export default UploadImageCard;
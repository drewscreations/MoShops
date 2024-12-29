import React, { useReducer, useEffect, useState, ReactChild } from 'react';
import firebase from '../Firebase'
import { IonItem, IonImg, IonCol, IonRow, IonGrid } from '@ionic/react';


interface ContainerProps {
  pageName: string;
}

interface PortfolioItem {
  imgUrl: string;
  width: number;
  height: number;
  date: string;
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

const PortfolioContainer: React.FC<ContainerProps> = ({ pageName }) => {
  const [allStorageImgs, updateAllStorageImgs] = useReducer(reducer, {})
  const [allPortfolioEntries, updateAllPortfolioEntries] = useReducer(reducer, {})
  const [allDbImages, updateDbImages] = useReducer(reducer, {})
  const [localImgs, updateLocalImgs] = useReducer(reducer, {})
  const [err, updateErr] = useState<string>();
  const [portfolioItems, updatePortfolioItems] = useReducer(reducer, {})
  const storageRef = firebase.fbApp.storage().ref();
  const database = firebase.fbApp.database()
  var listRef = storageRef.child('pictures');
  useEffect(() => {
    console.log(`[useEffect] entering use effect`)
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
      updateErr('error getting pictures references')
    });
    database.ref('images/').once('value').then(function (snapshot) {
      updateDbImages({
        type: "dbReplace",
        payload: snapshot.val()
      });
    })
    database.ref('portfolio/').once('value').then(function (snapshot) {
      //console.log('[imagesDb] snapshot val;')
      //console.log(snapshot.val())
      updateAllPortfolioEntries({
        type: "dbReplace",
        payload: snapshot.val()
      });
    });
    //console.log('[PortfolioContainer]: all entries:', allPortfolioEntries)
    console.log(`[useEffect] all portfolio entries`, allPortfolioEntries)
    
  }, []);
  //Trying to create the portfolio matrix to transpose on teh responsive grid. Only need to update on completion of updateAllPortfolioEntreies
  useEffect(()=> {
    const allPortfolioItems = Object.entries(allPortfolioEntries).map((key, value) => {
      //@ts-ignore
      let { itemName, creationDate, itemDescription, imgArr } = key[1]

      if (allStorageImgs[allDbImages[imgArr[0]].imageName]) {
        const imgUrl = allStorageImgs[allDbImages[imgArr[0]].imageName].imageUrl;
        const width = allStorageImgs[allDbImages[imgArr[0]].imageName].imageWidth;
        const height = allStorageImgs[allDbImages[imgArr[0]].imageName].imageHeight;
        const date = allDbImages[imgArr[0]].creationDate;
        const newItem: PortfolioItem = {
          imgUrl: imgUrl,
          width: width,
          height: height,
          date: date
        }
        return newItem
      }
    })
    console.log(`[useEffect2] all portfolio items`, allPortfolioItems)
    updatePortfolioItems({
      type: 'myArr',
      payload: allPortfolioItems
    })
    buildPortfolioMatrix()
  }, [allPortfolioEntries])
  let colWidth = 0;
  const maxWidth = 1000
  const buildPortfolioMatrix = () => {
    //start with row
    //add image column
    //add dimensions to colWidth
    //if max width break
    //end with row
    let sortedArr = portfolioItems.myArr || []
    for (const item of sortedArr){
      console.log(`[buildMatrix]: item width ${item.width}`)
    }
  }
  
  const gridItems = () => {
    //@ts-ignore
    let returnArr: [ReactChild] = [<IonItem></IonItem>];
    //console.log(portfolioItems)
    if (portfolioItems.myArr) {
      for (const item of portfolioItems.myArr) {
        if (item && item.imgUrl!=undefined) {
          //console.log('entering thing')
          if (colWidth == 0) {
            //console.log(`[gridItems] creating item`)
            returnArr.push(<IonRow>
              <IonCol size='3' >
                <IonItem>
                  <IonImg src={item.imgUrl} />
                </IonItem>
              </IonCol>
            </IonRow>)
          }
          
        }
      }
      return returnArr
    }
  }

  return (
    <IonGrid>
  
        {gridItems()}
      
      <IonRow><IonItem>Error Code: {err?err:'none'}</IonItem></IonRow>
    </IonGrid>
  );
};

export default PortfolioContainer;

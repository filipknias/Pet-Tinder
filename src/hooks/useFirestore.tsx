import { useState } from "react";
import { Firestore } from "../utilities/firebase";
import { 
  query as firebaseQuery, 
  getDocs, 
  DocumentData, 
  QueryConstraint, 
  addDoc,
  collection,
} from "firebase/firestore";

const useFirestore = (defaultFirestore: Firestore) => {
  const [firestore, setFirestore] = useState<Firestore|null>(defaultFirestore);

  const getQueriedItems = async (collectionName: string, query: QueryConstraint) => {
    if (firestore === null) return;
    const q = firebaseQuery(collection(firestore, collectionName), query); 
    const querySnap = await getDocs(q);
    const items: DocumentData[] = [];
    querySnap.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
  };

  const saveItem = async (collectionName: string, item: object) => {
    if (firestore === null) return;
    const docRef = await addDoc(collection(firestore, collectionName), item);
    return docRef.id;
  };

  return { getQueriedItems, saveItem };
};

export default useFirestore;
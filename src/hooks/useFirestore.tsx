import { useState } from "react";
import { Firestore } from "../utilities/firebase";
import { 
  query as firebaseQuery, 
  getDocs, 
  DocumentData, 
  QueryConstraint, 
  CollectionReference,
} from "firebase/firestore";

const useFirestore = (defaultFirestore: Firestore) => {
  const [firestore, setFirestore] = useState<Firestore|null>(defaultFirestore);

  const getQueriedItems = async (collectionRef: CollectionReference, query: QueryConstraint) => {
    const q = firebaseQuery(collectionRef, query); 
    const querySnap = await getDocs(q);
    const items: DocumentData[] = [];
    querySnap.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
  };

  return { getQueriedItems };
};

export default useFirestore;
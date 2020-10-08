import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getCollection = (collection) => {

  const documents = ref(null)
  const error = ref(null)

  // register the firestore collection reference
  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

  collectionRef.onSnapshot(snap => {
    let results = [];
    snap.docs.forEach(doc => {
      // must wait for the server to create the timestamp & send it back
      // we don't want to edit data until it has done this
      doc.data().createdAt && results.push({...doc.data(), id: doc.id})
    });
    
    // update values
    documents.value = results;
    error.value = null;
  }, err => {
    console.log(err.message)
    documents.value = null
    error.value = 'could not fetch the data'
  })

  return { error, documents }
}

export default getCollection

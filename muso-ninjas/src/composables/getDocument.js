import { watchEffect, ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {

  let document = ref(null)
  let error = ref(null)

  // register the firestore collection reference
  let documentRef = projectFirestore.collection(collection).doc(id)

  const unsub = documentRef.onSnapshot(doc => {
    // need to make sure the doc exists & has data
    if(doc.data()) {
      document.value = {...doc.data(), id: doc.id}
      error.value = null
    }
    else {
      error.value = 'that document does not exist'
    }
  }, err => {
    console.log(err.message)
    error.value = 'problem fetching the document'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  });

  return { error, document }

}

export default getDocument
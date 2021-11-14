<template>
  <div class="home">
    <ul>
      <li v-for="book in books" :key="book.id">
        <div class="details">
          <h3 @click="handleDelete(book)">{{ book.title }}</h3>
          <p>By {{ book.author }}</p>
        </div>
        <div :class="{ icon: true, fav: book.isFav }" @click="handleUpdate(book)">
          <span class="material-icons">favorite</span>
        </div>
      </li>
    </ul>
    <CreateBookForm />
  </div>
</template>

<script>
import CreateBookForm from '@/components/CreateBookForm'
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'

// firebase imports
import { db } from '../firebase/config'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

export default {
  name: 'Home',
  components: { CreateBookForm },
  setup() {
    const { user } = getUser()
    const { documents: books } = getCollection(
      'books',
      ['userUid', '==', user.value.uid]
    )

    // delete docs
    const handleDelete = (book) => {
      const docRef = doc(db, 'books', book.id)

      deleteDoc(docRef)
    }

    // update doc
    const handleUpdate = (book) => {
      const docRef = doc(db, 'books', book.id)

      updateDoc(docRef, { 
        isFav: !book.isFav
      })
    }

    return { books, handleDelete, handleUpdate }
  }
}
</script>

<style>
.home ul {
  padding: 0;
}
.home li {
  list-style-type: none;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
}
.home li .details {
  margin-right: auto;
}
.home li h3 {
  margin: 0;
  margin-bottom: 4px;
}
.home li h3:hover {
  cursor: pointer;
  text-decoration: line-through;
}
.home li p {
  margin: 0;
}
.icon {
  color: #bbbbbb;
  cursor: pointer;
}
.icon.fav {
  color: #f83f5e;
}
</style>
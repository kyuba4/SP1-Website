<template>
   <div>
      <Loader v-show="loading" />
      <GoBackButton :link="'Panel'" />
      <div v-show="modalOpen" class="modal">
         <div class="modal-content">
            <p style="font-size: 16px">Czy na pewno chcesz usunąć ten post?</p>
            <div class="btn-wrap">
               <button
                  @click="
                     deletePost(postId, imagePath);
                     loading = true;
                  "
                  id="delete-post"
               >
                  Usuń
               </button>
               <button id="close" @click="modalOpen = false">Zamknij</button>
            </div>
         </div>
      </div>
      <h2 v-show="!posts.length && !loading" class="no-posts">Nie ma jeszcze żadnych postów</h2>
      <ul>
         <li v-for="post in posts" :key="post.id">
            <Post
               :post="post"
               @openModal="
                  modalOpen = true;
                  postId = post.id;
                  imagePath = post.imagePath;
               "
            />
         </li>
      </ul>
   </div>
</template>
<script>
import { database as db } from "../components/firebaseInit";
import { getStorage, ref, deleteObject } from "../components/firebaseInit";
import Loader from "../components/Loader.vue";
import Post from "../components/Post.vue";
import GoBackButton from "../components/GoBackButton.vue";

export default {
   name: "Delete",
   components: {
      Loader,
      Post,
      GoBackButton,
   },
   data() {
      return {
         posts: [],
         loading: false,
         postId: "",
         imagePath: null,
         modalOpen: false,
      };
   },
   methods: {
      async getPosts() {
         this.loading = true;

         const response = await db.collection("posts").orderBy("added", "desc").get();

         if (!response.empty) {
            response.docs.forEach((doc) => {
               const { title, desc, added, img, imgPath } = doc.data();

               const post = {
                  id: doc.id,
                  title: title,
                  desc: desc,
                  added: added,
                  image: img,
                  imagePath: imgPath,
                  editPage: true,
               };
               this.posts.push(post);
            });
            this.loading = false;
         } else {
            this.loading = false;
         }
      },
      async deleteImg(imgPath) {
         const storage = getStorage();

         // Create a reference to the file to delete
         const desertRef = ref(storage, imgPath);

         // Delete the file
         deleteObject(desertRef).catch((error) => {
            console.log(error.message);
         });
      },
      async deletePost(id, imgPath) {
         try {
            await db.collection("posts").doc(id).delete();
            imgPath ? await this.deleteImg(imgPath) : null;
            this.modalOpen = false;
            this.loading = false;
            this.posts = this.posts.filter((post) => post.id !== id);
         } catch (err) {
            console.log(err.message);
         }
      },
   },
   created() {
      this.getPosts();
   },
};
</script>

<style lang="scss" scoped>
ul {
   list-style: none;
   margin: 0 15px;
}

#delete-post {
   background: rgb(212, 0, 0);
   color: white;
}

ul {
   margin: 0 15px;
   list-style: none;
}

p {
   font-size: 12px;
   margin-bottom: 10px;
}

.modal-content {
   width: 500px;
   max-width: 90%;
}

#close {
   background: transparent;
}
</style>
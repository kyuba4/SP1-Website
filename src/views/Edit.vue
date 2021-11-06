<template>
   <div>
      <Loader v-show="loading" />
      <GoBackButton :link="'Panel'" />
      <h2 v-show="!posts.length && !loading" class="no-posts">Nie ma jeszcze żadnych postów</h2>
      <ul>
         <li v-for="post in posts" :key="post.id">
            <div>
               <Post :post="post" />
            </div>
         </li>
      </ul>
   </div>
</template>
<script>
import { database as db } from "../components/firebaseInit";
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
      };
   },
   methods: {
      async getPosts() {
         this.loading = true;

         const response = await db.collection("posts").orderBy("added", "desc").get();

         if (!response.empty) {
            response.docs.forEach((doc) => {
               const { title, desc, added, img } = doc.data();

               const post = {
                  id: doc.id,
                  title: title,
                  desc: desc,
                  added: added,
                  image: img,
                  editPage: true,
               };
               this.posts.push(post);
            });
            this.loading = false;
         } else {
            this.loading = false;
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
</style>
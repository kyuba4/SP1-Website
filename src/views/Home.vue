<template>
   <div>
      <Loader v-show="loading" />
      <ImageSlider />
      <div v-show="loadingError" class="loading-error">
         <span>
            Błąd wczytywania z bazy danych <br />
            Odśwież stronę lub spróbuj ponownie później</span
         >
      </div>
      <div class="content">
         <Posts :posts="posts" :allPostsLoaded="allPostsLoaded" @loadMore="getPosts" />
         <Sidebar />
      </div>
   </div>
</template>

<script>
import ImageSlider from "../components/ImageSlider";
import Posts from "../components/Posts.vue";
import Sidebar from "../components/Sidenav.vue";
import Loader from "../components/Loader.vue";
import { database as db } from "../components/firebaseInit";

export default {
   name: "Home",
   data() {
      return {
         posts: [],
         loading: false,
         loadingError: null,
         latestDoc: "",
         allPostsLoaded: false,
      };
   },
   components: {
      ImageSlider,
      Posts,
      Sidebar,
      Loader,
   },
   methods: {
      async getPosts() {
         this.loading = true;

         try {
            const ref = db
               .collection("posts")
               .orderBy("added", "desc")
               .startAfter(this.latestDoc || "")
               .limit(8);

            const data = await ref.get();

            if (!data.empty) {
               data.docs.forEach((doc) => {
                  const { title, desc, added, img } = doc.data();

                  const post = {
                     id: doc.id,
                     title: title,
                     desc: desc,
                     added: added,
                     image: img,
                  };
                  this.latestDoc = doc;

                  this.posts = [...this.posts, post];
               });
               this.loading = false;
            } else {
               this.loading = false;
               this.allPostsLoaded = true;
            }
         } catch (err) {
            console.log(err.message);
            this.loading = false;
            this.loadingError = true;
         }
      },
   },
   created() {
      this.getPosts();
   },
};
</script>

<style lang="scss">
.content {
   display: flex;
   margin-top: 40px;
   padding: 10px 25px;
   min-height: 850px;
   position: relative;
   overflow-x: hidden;
}

.btn-back {
   margin: 20px;
   border: 0;
   outline: 0;
   background: transparent;
   cursor: pointer;

   &:hover {
      text-decoration: underline;
   }
}

.loading-error {
   position: fixed;
   top: 0;
   width: 100%;
   height: 100%;
   background: #00000080;
   z-index: 999;
   display: flex;
   align-items: center;
   justify-content: center;
   color: white;
   font-size: 30px;

   span {
      text-align: center;
   }
}
</style>
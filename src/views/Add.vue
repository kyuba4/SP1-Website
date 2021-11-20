<template>
   <div>
      <Loader v-show="loading" />
      <div class="banner" :class="showBanner ? 'visible' : null">Post został dodany!</div>
      <GoBackButton :link="'Panel'" />
      <VueEditor :data="post" :addFile="true" :showCheckbox="false" @save="updatePostData" />
   </div>
</template>

<script>
import { database as db } from "../components/firebaseInit";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "../components/firebaseInit";
import Loader from "../components/Loader.vue";
import VueEditor from "../components/VueEditor.vue";
import GoBackButton from "../components/GoBackButton.vue";

export default {
   name: "AddPost",
   components: {
      Loader,
      VueEditor,
      GoBackButton,
   },
   data() {
      return {
         showBanner: false,
         post: {
            title: null,
            desc: null,
            added: null,
            img: null,
            imgPath: null,
         },
         loading: false,
      };
   },
   methods: {
      updatePostData(data) {
         // Update post data in data()
         this.post.title = data.title;
         this.post.desc = data.desc;
         data.img ? (this.post.img = data.img) : (this.post.img = null);
         data.img ? (this.post.imgPath = `images/${data.img.name}`) : (this.post.imgPath = null);
         this.post.added = new Date();

         this.addPost();
      },
      async saveImgInStorage(callback) {
         // Save img in firebase storage
         const storage = getStorage();
         const imageRef = ref(storage, this.post.imgPath);

         uploadBytesResumable(imageRef, this.post.img).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
               this.post.img = url;
               callback();
            });
         });
      },
      async savePostData() {
         // Save post in firebase database
         try {
            await db.collection("posts").add(this.post);

            this.showBanner = true;
            setTimeout(() => {
               this.showBanner = false;
            }, 5000);
         } catch (err) {
            console.log(err.message);
         }

         // Clear post data
         this.post.title = "";
         this.post.desc = "";
         this.post.img = "";
         this.post.imgPath = "";

         this.loading = false;
      },
      addPost() {
         this.loading = true;

         if (this.post.img) {
            this.saveImgInStorage(this.savePostData);
         } else {
            this.savePostData();
         }
      },
   },
};
</script>

<style lang="scss">
</style>

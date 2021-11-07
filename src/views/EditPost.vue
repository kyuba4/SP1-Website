<template>
   <div id="editPost">
      <div class="banner" :class="showBanner ? 'visible' : null">
         {{ bannerText }}
      </div>
      <Loader v-show="loading" />
      <GoBackButton :link="'Edit'" />
      <VueEditor :data="postData" :addFile="false" @save="updatePost" />
   </div>
</template>
<script>
import { database as db } from "../components/firebaseInit";
import Loader from "../components/Loader.vue";
import VueEditor from "../components/VueEditor.vue";
import GoBackButton from "../components/GoBackButton.vue";

export default {
   name: "EditPost",
   components: {
      Loader,
      VueEditor,
      GoBackButton,
   },
   data() {
      return {
         loading: false,
         postID: null,
         postData: null,
         showBanner: false,
         bannerText: "Post Edytowany!",
      };
   },
   methods: {
      async updatePost(post) {
         this.loading = true;

         try {
            await db.collection("posts").doc(this.postID).update({
               title: post.title,
               desc: post.desc,
            });

            this.bannerText = "Post Edytowany!";
            this.showBanner = true;
            setTimeout(() => {
               this.showBanner = false;
            }, 5000);
         } catch (error) {
            this.bannerText = error.message;
            console.log(error.message);
         }

         this.loading = false;
      },
   },
   created() {
      this.postID = this.$attrs.postID;
      this.postData = this.$route.params.postData;
   },
};
</script>
<style lang="scss">
</style>
<template>
   <div class="post-wrap">
      <h1 class="post-wrap__title">Aktualności</h1>
      <Post :key="post.id" v-for="post in posts" :post="post" />
      <div class="more-posts" @click="$emit('loadMore')" v-show="posts.length > 0 && !allPostsLoaded">
         Załaduj więcej
         <i class="fas fa-sync"></i>
      </div>
      <div class="more-posts" style="cursor: text" v-show="allPostsLoaded"><span>To już wszystkie aktualności</span></div>
   </div>
</template>
<script>
import Post from "./Post";

export default {
   name: "Posts",
   props: ["posts", "allPostsLoaded"],
   components: {
      Post,
   },
};
</script>
<style lang="scss">
.post-wrap {
   display: flex;
   flex-direction: column;
   flex: 3;

   &__title {
      text-align: center;
      text-decoration: underline;
   }

   .more-posts {
      text-align: center;
      cursor: pointer;
      margin-bottom: 15px;

      i {
         margin-left: 5px;
         transition: 800ms;
      }

      &:hover i {
         transform: rotate(720deg);
      }
   }
}
</style>
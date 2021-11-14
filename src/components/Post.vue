<template>
   <div class="post">
      <router-link v-show="post.editPage" class="delete-edit-btn" :to="{ name: 'EditPost', params: { postData: post, postID: post.id } }">
         <i class="fas fa-edit"></i>
      </router-link>
      <button v-show="post.editPage" @click="$emit('openModal')" class="delete-edit-btn delete">
         <i class="fas fa-ban"></i>
      </button>
      <h2>{{ post.title }}</h2>
      <p id="added">Dodano: {{ date }}</p>
      <div class="description" :style="readMore ? `max-height: ${textHeight}px` : 'max-height: 100px'">
         <div ref="descText" v-html="post.desc"></div>
      </div>
      <div v-show="textHeight > 100" class="read-more" @click="readMore = !readMore">
         {{ readMore ? "Zwiń" : "Rozwiń" }}
      </div>
      <div class="skelet" v-show="!imgLoad && post.image"></div>
      <img v-show="post.image" :src="post.image" alt="img" :id="post.image ? post.id : null" />
   </div>
</template>
<script>
export default {
   Name: "Post",
   props: ["post"],
   data() {
      return {
         date: "",
         readMore: false,
         imgSize: 0,
         textHeight: 0,
         imgID: this.post.image ? this.post.id : null,
      };
   },
   methods: {
      formatDate() {
         const date = new Date(this.post.added.toDate().toString());

         const y = date.getFullYear();
         const m = date.getMonth() + 1 < 10 ? `${"0" + (date.getMonth() + 1)}` : date.getMonth() + 1;
         const d = date.getDate() < 10 ? `${"0" + date.getDate()}` : date.getDate();

         this.date = `${d}.${m}.${y}`;
      },
      runInterval(image) {
         setInterval(() => {
            if (!this.imgLoad && this.imgID) {
               this.imgSize = image.width;
            }
         });
      },
   },
   created() {
      this.formatDate();
   },
   mounted() {
      const image = document.getElementById(this.imgID);

      this.runInterval(image);

      this.textHeight = this.$refs.descText.offsetHeight;
   },
   computed: {
      imgLoad() {
         return this.imgSize > 0;
      },
   },
};
</script>
<style lang="scss">
.post {
   background-color: white;
   width: 100%;
   max-width: 600px;
   min-width: 230px;
   margin: 35px auto;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
   border-radius: 15px;
   padding: 25px;
   position: relative;

   h2 {
      font-size: 32px;
      font-weight: 500;
      letter-spacing: 0.9;
   }

   #added {
      margin-bottom: 10px;
      font-size: 0.75rem;
      margin-top: -5px;
   }

   .description {
      font-size: 16px;
      max-height: 100px;
      overflow-y: hidden;
      overflow-x: visible;
      transition: max-height 800ms ease;

      @media (max-width: 600px) {
         font-size: 14px;
      }

      div {
         height: 100%;
      }

      .ql-video {
         width: 550px;
         max-width: 100% !important;
         height: 300px;
         display: flex;
         margin: 20px auto 15px auto;
         border-radius: 10px;
      }

      &.expanded {
         max-height: fit-content;
      }
   }

   .read-more {
      text-align: center;
      cursor: pointer;
      color: rgb(112, 182, 255);
      margin-top: 10px;
      user-select: none;
   }

   img {
      margin: 20px auto 0 auto;
      max-width: 90%;
      height: auto;
      border-radius: 15px;
      box-shadow: 0 0 5px 0 #909090;
      display: flex;
   }

   .delete-edit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 20px;
      right: 10px;
      font-size: 1.5rem;
      transition: transform 300ms;
      border: 0;
      outline: 0;
      background: white;
      cursor: pointer;
      z-index: 2;

      &.delete {
         color: red;
         right: 60px;
      }
   }

   .skelet {
      margin-top: 15px;
      width: 100%;
      height: 250px;
      border-radius: 15px;
      background-image: linear-gradient(90deg, #e2e2e2 0px, #efefef 30px, #e2e2e2 60px);
      background-size: calc(100% + 100%);
      animation: refresh 1.5s infinite ease-out;

      @media (max-width: 600px) {
         height: 170px;
      }
   }

   @keyframes refresh {
      0% {
         background-position: calc(100%);
      }
      60%,
      100% {
         background-position: -100%;
      }
   }
}
</style>
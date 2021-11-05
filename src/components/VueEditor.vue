<template>
   <div id="edit-post">
      <div class="container">
         <div>Tytuł</div>
         <textarea v-model="post.title" id="editPostTitle" placeholder="Dodaj tytuł"></textarea>
         <div>Opis</div>
         <VueEditor v-model="post.desc" ref="description" />
      </div>
      <!-- Add Post Section-->
      <div class="button-wrap" v-show="addPanel">
         <div class="input-wrap">
            <span
               >Dodaj zdjęcie
               <i class="fas fa-arrow-right" v-show="screenSize > 500"></i>
               <i class="fas fa-arrow-down" v-show="screenSize <= 500"></i>
            </span>
            <form ref="input" id="input">
               <input type="file" name="image" id="image" @change="postImg" accept=".jpeg, .jpg, .png" />
            </form>
         </div>
         <button
            class="btn-add-edit"
            @click="
               $emit('addPost', post);
               clearInputs();
            "
            :disabled="!btnEnabled"
         >
            Dodaj
         </button>
      </div>
      <!-- Edit Post Section-->
      <div class="button-wrap">
         <button class="btn-add-edit" v-show="!addPanel" :disabled="!btnEnabled" @click="$emit('editPost', post)">Edytuj</button>
      </div>
   </div>
</template>
<script>
import { VueEditor } from "vue2-editor";

export default {
   name: "AddEditPost",
   props: ["postData", "addPanel", "postSection"],
   components: {
      VueEditor,
   },
   data() {
      return {
         screenSize: null,
         post: {
            title: "",
            desc: "",
            img: "",
         },
      };
   },
   computed: {
      btnEnabled() {
         return this.post.title > "" && this.post.desc > "";
      },
   },
   methods: {
      postImg(e) {
         this.post.img = e.target.files[0];
      },
      refresh() {
         window.location.reload();
      },
      clearInputs() {
         this.post.title = "";
         this.post.desc = "";
         this.post.img = "";
         document.getElementById("input").reset();
      },
   },
   created() {
      // Input file arrow
      this.screenSize = window.innerWidth;

      window.addEventListener("resize", () => {
         this.screenSize = window.innerWidth;
      });

      this.post.title = this.postData.title;
      this.post.desc = this.postData.desc;

      if ((!this.post.title || !this.post.desc) && this.$route.name === "EditPost") {
         this.$router.push({ name: "Edit" });
      }
   },
};
</script>
<style lang="scss">
#edit-post {
   margin: 0 15px;
   position: relative;

   .container {
      max-width: 1100px;
      margin: 30px auto;

      #editPostTitle {
         display: flex;
         height: 50px;
         max-width: 400px;
         width: 100%;
         resize: none;
         line-height: 50px;
         overflow: hidden;
         padding-left: 10px;
         margin-bottom: 20px;
         border: 1px solid #ccc;
         outline: 0;
         font-size: 1rem;
      }

      &__button {
         padding: 15px 25px;
         border-radius: 999px;
         outline: 0;
         border: 0;
         display: flex;
         margin: 25px auto;
         cursor: pointer;
         background: #323232;
         color: white;
         transition: 350ms;

         &:hover {
            background: #696969;
         }
      }
   }

   .ql-formats {
      button {
         &.ql-link,
         &.ql-blockquote,
         &.ql-list,
         &.ql-code-block {
            display: none !important;
         }
      }
   }
}

.button-wrap {
   display: flex;
   max-width: 1100px;
   justify-content: space-around;
   flex-direction: column;
   align-items: center;
   margin: 20px auto;

   .input-wrap {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      border: 1px solid #ccc;
      padding: 10px;

      input[type="file"]::file-selector-button {
         margin-right: 15px;
         transition: 300ms;
         background: white;
         border: 1px solid #323232;
         border-radius: 999px;
         outline: 0;
         cursor: pointer;
         padding: 10px 20px;
         z-index: 999;

         &:hover {
            transform: scale(0.97);
         }
      }

      @media (max-width: 500px) {
         flex-direction: column;
         margin-top: 10px;
         margin-bottom: 0;

         input[type="file"] {
            margin: 20px 0;
         }

         span {
            margin-top: 20px;
         }
      }

      span {
         font-size: 14px;
         text-align: center;
         display: flex;
         align-items: center;

         i {
            margin-left: 10px;
         }
      }
   }
}

.btn-add-edit {
   padding: 15px 30px;
   width: fit-content;
   border: 0;
   outline: 0;
   margin: 40px auto;
   box-shadow: 0 0 5px 0 #666666;
   border-radius: 999px;
   background: #323232;
   color: white;
   cursor: pointer;
   transition: 300ms;

   &:hover {
      background: #696969;
   }
}
</style>
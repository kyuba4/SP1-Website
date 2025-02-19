<template>
   <div id="edit-post">
      <div v-show="modalOpen && routeName == 'SubpageEditor'" class="modal">
         <div class="modal-content" style="width: 500px; max-width: 100%">
            <p style="font-size: 16px">Czy na pewno chcesz usunąć tą podstronę?</p>
            <div class="btn-wrap">
               <button @click="$emit('deletePage', data.docID)" id="delete-post">Usuń</button>
               <button id="close" @click="modalOpen = false">Zamknij</button>
            </div>
         </div>
      </div>
      <div class="container">
         <div>{{ headingOne }}</div>
         <div style="display: flex; justify-content: space-between">
            <textarea v-model="title" id="editPostTitle" placeholder="Dodaj tytuł"></textarea>
            <button @click="modalOpen = true" class="delete-btn" v-show="routeName == 'SubpageEditor'">Usuń Podstronę</button>
         </div>
         <div>{{ headingTwo }}</div>
         <VueEditor v-model="desc" placeholder="Dodaj opis" :editorOptions="editorSettings" />
      </div>
      <div class="button-wrap">
         <!-- Add Image (Add Post Section Only) -->
         <div class="input-wrap" v-show="addFile">
            <span
               >Dodaj zdjęcie
               <i class="fas fa-arrow-right" v-show="screenSize > 500"></i>
               <i class="fas fa-arrow-down" v-show="screenSize <= 500"></i>
            </span>
            <form ref="input" id="input">
               <input type="file" name="image" id="image" @change="postImg" accept=".jpeg, .jpg, .png" />
            </form>
         </div>
         <!-- Subpages checkbox container -->
         <div class="checkbox-container" v-show="showCheckbox">
            <div>Miejsce docelowe <i class="fas fa-arrow-right"></i></div>
            <div class="wrapper">
               <span :class="!checkboxValue ? 'bold' : null">Header</span>
               <label class="check-1">
                  <input type="checkbox" v-model="checkboxValue" />
                  <div class="inner"></div>
                  <div class="bullet"></div>
               </label>
               <span :class="checkboxValue ? 'bold' : null">Sidebar</span>
            </div>
         </div>
         <!-- Save Button -->
         <button
            class="btn-save"
            @click="
               $emit('save', post);
               clearInputs();
            "
            :disabled="!btnEnabled"
         >
            Zapisz
         </button>
      </div>
   </div>
</template>
<script>
import { VueEditor, Quill } from "vue2-editor";
import ImageResize from "quill-image-resize";

Quill.register("modules/imageResize", ImageResize);

export default {
   name: "AddEditPost",
   props: ["data", "addFile", "showCheckbox"],
   components: {
      VueEditor,
   },
   data() {
      return {
         screenSize: null,
         title: "",
         desc: "",
         img: "",
         checkboxValue: true,
         modalOpen: false,

         editorSettings: {
            modules: {
               imageResize: {},
            },
         },
      };
   },
   computed: {
      btnEnabled() {
         return this.title > "" && this.desc > "";
      },
      post() {
         const data = {
            title: this.title,
            desc: this.desc,
            img: this.img,
            place: this.checkboxValue,
            path: this.title,
         };

         return data;
      },
      headingOne() {
         return this.$route.name == "Add" || this.$route.name == "EditPost" ? "Tytuł" : "Nazwa Linku/Podstrony";
      },
      headingTwo() {
         return this.$route.name == "Add" || this.$route.name == "EditPost" ? "Opis" : "Zawartość strony";
      },
      routeName() {
         return this.$route.name;
      },
   },
   methods: {
      postImg(e) {
         this.img = e.target.files[0];
      },
      refresh() {
         window.location.reload();
      },
      clearInputs() {
         if (this.$route.name == "Add" || this.$route.name == "AddSubpage") {
            this.title = "";
            this.desc = "";
            this.img = "";
            document.getElementById("input").reset();
         }
      },
   },
   created() {
      // Input file arrow
      this.screenSize = window.innerWidth;

      window.addEventListener("resize", () => {
         this.screenSize = window.innerWidth;
      });

      this.title = this.data.title;
      this.desc = this.data.desc;

      if (this.$route.name == "SubpageEditor") {
         this.checkboxValue = this.data.place == "header" ? false : true;
         this.data.path = this.data.title;
      }

      if ((!this.title || !this.desc) && this.$route.name == "EditPost") {
         this.$router.push({ name: "Edit" });
      }
   },
};
</script>
<style lang="scss">
#edit-post {
   margin: 0 15px;
   position: relative;

   #delete-post {
      background: #d40000;
      color: white;
   }

   .container {
      max-width: 1100px;
      margin: 30px auto;

      .delete-btn {
         width: 150px;
         height: 50px;
         margin: auto 0;
         border-radius: 5000px;
         border: 0;
         outline: 0;
         background: #323232;
         color: white;
         transition: 300ms;
         cursor: pointer;

         &:hover {
            color: rgb(255, 68, 68);
         }
      }

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
         &.ql-blockquote,
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

// Checkbox styling
label {
   display: block;
   cursor: pointer;
}

label > input[type="checkbox"] {
   display: none;
}

.check-1 {
   width: 50px;
   height: 30px;
   border-radius: 50px;
   position: relative;
}

.check-1 .inner {
   position: absolute;
   width: 100%;
   height: 100%;
   border-radius: 50px;
   border: 2px solid #ccc;
   background: #f9f9f9;
   transition: all 0.2s ease;
}

.check-1 .bullet {
   position: relative;
   width: 26px;
   height: 26px;
   background: #323232;
   border-radius: 50%;
   transition: all 0.3s ease;
   top: 2px;
   left: 2px;
   box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15);
}

.check-1 input:checked ~ .inner {
   transition: all 0.2s linear;
}

.check-1 input:checked ~ .bullet {
   left: 22px;
   transition: all 0.3s ease;
   animation: 0.2s bullet;
}

.checkbox-container {
   display: flex;
   width: 100%;
   align-items: center;
   justify-content: space-around;
   border: 1px solid #ccc;
   padding: 10px;

   @media (max-width: 550px) {
      i {
         display: none;
      }
   }

   .wrapper {
      display: flex;
      align-items: center;

      span {
         margin: 0 15px;

         &.bold {
            font-weight: bold;
            margin: 0 14px;
         }
      }
   }
}

@keyframes bullet {
   0%,
   100% {
      width: 25px;
   }
   40% {
      width: 30px;
   }
}

// Save Button
.btn-save {
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
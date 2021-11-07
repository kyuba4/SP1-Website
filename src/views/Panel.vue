<template>
   <div>
      <GoBackButton :link="'Home'" />
      <div class="panel">
         <div class="panel__header"><h1>Panel Sterowania</h1></div>
         <div class="panel__cards">
            <PanelCard :data="card" v-for="(card, index) in cards" :key="index" />
            <router-view />
         </div>
      </div>
   </div>
</template>

<script>
import GoBackButton from "../components/GoBackButton.vue";
import PanelCard from "../components/PanelCard.vue";

export default {
   name: "AddPost",
   components: {
      GoBackButton,
      PanelCard,
   },
   data() {
      return {
         cards: [
            {
               link: "Add",
               img: "add",
               text: "Dodaj Post",
            },
            {
               link: "Edit",
               img: "edit",
               text: "Edytuj Posty",
            },
            {
               link: "Subpages",
               img: "edit",
               text: "Edytuj Podstrony",
            },
         ],
      };
   },
};
</script>

<style lang="scss">
.panel {
   margin: 0 50px 50px 50px;
   display: flex;
   flex-flow: column;

   &__header {
      height: 80px;

      h1 {
         text-align: center;
         font-weight: 500;
         height: 100%;
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }

   &__cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 230px));
      gap: 50px;
      place-content: center;
      margin-top: 80px;
      height: 100%;
   }
}

.post {
   position: relative;
}

.no-posts {
   text-align: center;
   font-weight: 500;
   margin-top: 50px;
}

.btn {
   border: 0;
   outline: 0;
   position: absolute;
   top: 20px;
   right: 10px;
   background: transparent;
   cursor: pointer;
   transition: 300ms;

   &:hover {
      transform: scale(1.2);
   }

   i {
      font-size: 1.5rem;
   }

   &__delete {
      color: red;
   }

   &__edit {
      color: #323232;
   }
}

.modal {
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   background: #00000090;
   z-index: 999;

   .modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 60px 30px;
      border-radius: 20px;

      p {
         text-align: center;
         margin-bottom: 20px;
      }

      .btn-wrap {
         display: flex;
         justify-content: center;
         margin-top: 30px;
         gap: 15px;

         button {
            width: 100px;
            height: 50px;
            border-radius: 100px;
            border: 2px solid #323232;
            outline: 0;
            cursor: pointer;
            transition: 350ms;

            &:hover {
               transform: scale(0.9);
            }
         }
      }
   }
}

.banner {
   position: fixed;
   top: -300px;
   left: 50%;
   transform: translateX(-50%);
   text-align: center;
   padding: 50px 100px;
   background: #4bb543ee;
   color: rgb(22, 22, 22);
   z-index: 999;
   font-size: 20px;
   border-radius: 20px;
   box-shadow: 0 0 10px 0 #616161;
   transition: 800ms;
   white-space: nowrap;
   pointer-events: none;

   @media (max-width: 800px) {
      font-size: 1rem;
      padding: 33px 66px;
   }

   &.visible {
      top: 30px;
   }
}
</style>

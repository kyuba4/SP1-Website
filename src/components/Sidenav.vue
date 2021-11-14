<template>
   <div class="sidebar" :class="!open ? 'hidden' : null">
      <button @click="open = !open" class="sidebar__btn" :class="open ? 'btn-move' : null">
         {{ open ? "Ukryj" : "Pokaż" }}
      </button>
      <p class="sidebar__header" v-show="!loading">Nasza Szkoła</p>
      <ul v-show="!loading">
         <li v-for="(link, index) in links" :key="index">
            <router-link :to="{ name: 'Subpage', params: { subpage: link.path } }">{{ link.title }}</router-link>
         </li>
      </ul>
   </div>
</template>
<script>
import { database as db } from "@/components/firebaseInit";

export default {
   Name: "Sidenav",
   data() {
      return {
         open: false,
         links: [],
         loading: true,
      };
   },
   methods: {
      async getData() {
         this.loading = true;

         try {
            const data = await db.collection("subpages").where("place", "==", "sidebar").get();

            data.forEach((doc) => {
               this.links = [...this.links, doc.data()];
            });
         } catch (error) {
            console.log(error.message);
         }

         this.loading = false;
      },
   },
   created() {
      if (window.screen.width <= 1000) {
         this.open = false;
      }

      this.getData();
   },
};
</script>
<style lang="scss">
.sidebar {
   display: flex;
   flex-direction: column;
   flex: 1;
   background: white;
   width: 320px;
   min-width: 320px;
   height: fit-content;
   margin-left: 30px;
   border-radius: 20px;
   box-shadow: 0 2px 8px 0 #909090;
   transition: 500ms;
   z-index: 2;

   @media (max-width: 1000px) {
      position: absolute;
      right: 15px;
   }

   @media (max-width: 500px) {
      right: 0;
      left: 0;
      margin: auto;
      width: 90%;
   }

   &__btn {
      position: absolute;
      width: 60px;
      text-align: center;
      font-size: 16px;
      padding: 5px 10px;
      left: -60px;
      top: 20px;
      border-radius: 10px 0 0 10px;
      outline: 0;
      border: 0;
      box-shadow: -2px 0 5px 0 #909090;
      color: white;
      background: #808080;
      cursor: pointer;
      transition: 300ms;

      &:hover {
         background: #535353;
      }
   }

   &__header {
      text-align: center;
      font-weight: 500;
      font-size: 1.5rem;
      margin: 15px 0;
   }

   ul {
      list-style: none;
      margin-left: 15px;
      margin-bottom: 15px;

      li {
         padding: 5px 0;
         cursor: pointer;
         border-bottom: 3px solid transparent;

         &:hover {
            text-decoration: underline;
         }
      }
   }
}

.hidden {
   @media (max-width: 1000px) {
      right: -310px;
   }

   @media (max-width: 500px) {
      right: -100%;
      transform: translateX(50%);
   }
}

.btn-move {
   @media (max-width: 500px) {
      left: 0;
      border-radius: 0 10px 10px 0;
   }
}
</style>
<template>
   <div class="card">
      <router-link class="link" :to="{ name: data.link }">
         <img :src="require(`../assets/${data.img}.png`)" />
         <div class="text">
            {{ data.text }}
         </div>
      </router-link>
   </div>
</template>
<script>
export default {
   name: "PanelCard",
   props: ["data"],
};
</script>
<style lang="scss" scoped>
.card {
   box-shadow: 0 0 10px 0 #909090;
   border-radius: 25px;
   transition: 300ms;
   width: 230px;
   height: 230px;
   display: flex;

   &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 1px 0 #909090;
   }

   img {
      max-width: 100px;
      margin-bottom: 15px;
   }

   .link {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      gap: 10px;

      .text {
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         max-width: 220px;
      }
   }

   @media (max-width: 768px) {
      margin: 20px auto;
   }
}
</style>
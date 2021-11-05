<template>
   <footer>
      <span>Oficjalna witryna Szkoły Podstawowej nr. 1 w Chodzieży</span>
   </footer>
</template>
<script>
export default {
   name: "Footer",
};
</script>
<style lang="scss">
footer {
   display: flex;
   justify-content: center;
   align-items: center;
   box-shadow: 0 2px 10px 0 #646464;
   padding: 3px 0;
   background: #d5f6ff;

   @media (max-width: 1000px) {
      font-size: 12px;
   }
}
</style>
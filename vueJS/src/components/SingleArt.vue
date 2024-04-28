<template>
  <div>

    <div class="art">
      
      <ul>
        <li>Author: {{ product.title }}</li>
        <li>Highlight: {{ product.summary }}</li>
        <li>Year acquired: {{ product.price }}</li>
      </ul>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'SingleArt',

    props: {
      product: Object
    }
  }

</script>

<style scoped>

  img {
    max-width: 600px;
    max-height: 600px;
  }

  .art {
    border-bottom-style: solid;
    margin-bottom: 10px;
  }

</style>
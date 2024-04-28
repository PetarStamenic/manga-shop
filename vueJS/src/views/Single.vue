<template>
  <div>
    <Header :subtitle="subtitle"/>
    <SingleArt v-if="product" :product="product" />
    <Comments v-if="product" :product="product" />
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import SingleArt from '@/components/SingleArt.vue';
  import Comments from '@/components/Comments.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Single',

    components: {
      Header,
      SingleArt,
      Comments
    },

    data() {
      return {
        product: null,
        subtitle: ''
      }
    },
    
    methods: {
      ...mapActions([
        'getItem'
      ])
    },

    mounted() {
      console.log(this.$route.params.id);
      this.getItem(this.$route.params.id).then( res => {
        this.product = res;
        this.subtitle = this.image.title;
      });
    }
  }

</script>
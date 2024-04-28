<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <ImageList />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import ImageList from '@/components/ImageList.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Category',
    
    components: {
      Header,
      ImageList
    },

    data() {
        return {
            subtitle: '',
            id: null
        }
    },

    watch: {
      $route() {
        this.subtitle = this.$route.params.name;
        this.depID = this.$route.params.id;

        this.fetchIDsByCategories(this.depID);
      }
    },

    mounted() {
        this.subtitle = this.$route.params.name;
        this.depID = this.$route.params.id;

        this.fetchIDsByCategories(this.depID);
    },

    methods: {
      ...mapActions([
        'fetchIDsByCategories'
      ])
    }
  }
</script>

<style scoped>

</style>

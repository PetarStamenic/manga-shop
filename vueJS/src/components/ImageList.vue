<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="productIds.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
    <b-table
      id="image-table"
      hover
      fixed
      :items="items"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
      <template #cell(isHighlight)="data">
        <b-icon v-if="data.value" icon="check-square" variant="success" scale="2"></b-icon>
        <b-icon v-else icon="x-circle" variant="danger" scale="2"></b-icon>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="productIds.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'ImageList',

    data() {
      return {
        fields: ['title', 'summary', 'price', { key: 'discount', tdClass: 'align-middle' }],
        items: [],
        currentPage: 1,
        perPage: 5
      }
    },

    computed: {
      ...mapState([
        'productIds'
      ])
    },

    watch: {
      currentPage(nVal, oVal) {
        this.productIds.slice((this.currentPage-1) * this.perPage, this.currentPage * this.perPage).map( id => {
          this.getItem(id).then( obj => this.items.push(obj) );
        });
      },

      productIds(nVal, oVal) {
        this.currentPage = 1;
        this.items = [];

        nVal.slice((this.currentPage-1) * this.perPage, this.currentPage * this.perPage).map( id => {
          this.getItem(id).then( obj => this.items.push(obj) );
        });
      }
    },

    mounted() {
      this.productIds.slice((this.currentPage-1) * this.perPage, this.currentPage * this.perPage).map( id => {
        this.getItem(id).then( obj => this.items.push(obj) );
      });
    },

    methods: {
      ...mapActions([
        'getItem'
      ]),

      rowClicked(record, index) {
        console.log(record.id);
        console.log("________________________")
        console.log(this.$store[index]);
        this.$router.push({ name: 'Single', params: { id: record.id } });
      }
    }
  }

</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
</style>
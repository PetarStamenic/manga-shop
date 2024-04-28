<template>
  <div id="app">
    <Header subtitle="Create account"/>

    <b-form @submit="onSubmit">

      <b-form-group label="First Name:" label-for="firstName">
        <b-form-input id="firstName" v-model="form.firstName" placeholder="Enter first name" required ></b-form-input>
      </b-form-group>

      <b-form-group label="Last Name:" label-for="lastName">
        <b-form-input id="lastName" v-model="form.lastName" placeholder="Enter last name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Phone number:" label-for="mobile">
        <b-form-input id="mobile" v-model="form.mobile" placeholder="Enter phone number" required></b-form-input>
      </b-form-group>

      <b-form-checkbox id="admin" v-model="form.admin" :value="true" :unchecked-value="false">Vendor</b-form-checkbox>
      
      <br>
      <div v-if="form.firstName.length>2 && form.lastName>2 && form.password.length>=8 && form.email.includes(`@`) && form.mobile.length>8 && form.mobile.length<15">
      <b-button  type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Register',
    
    components: {
      Header
    },

    data() {
      return {
        form: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          admin: false,
          mobile: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'register'
      ]),

      onSubmit(e) {
        e.preventDefault();

        this.register(this.form);
        this.$router.push({ name: 'Home' });
      }
    }
  }
</script>

<style scoped>

</style>


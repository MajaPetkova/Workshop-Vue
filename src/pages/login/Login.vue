<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { loginUser } from '../../services/auth';
import FormFields from '../register/components/FormFields.vue';

export default {
  components: {
    FormFields,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        username: 'emilys',
        password: 'emilyspass',
      },
    };
  },
  validations() {
    return {
      form: {
        username: { required },
        password: { required },
      },
    };
  },
  methods: {
    async onLogin() {
      const isValid = await this.v$.$validate();
      if (!isValid)
        return;
      await loginUser(this.form);
    //   console.log(this.form);
    },
  },
};
</script>

<template>
  <div class="formContainer">
    <article>
      <form @submit.prevent="onLogin">
        <FormFields title="Username" :errors="v$.form.username.$errors">
          <input v-model="v$.form.username.$model" type="text" placeholder="Enter username">
        </FormFields>
        <FormFields title="Password" :errors="v$.form.password.$errors">
          <input v-model="v$.form.password.$model" type="password" placeholder="Enter password">
        </FormFields>
        <button type="submit" class="primary">
          Submit
        </button>
      </form>
    </article>
  </div>
</template>

<style scoped>
.formContainer{
padding: 1rem;
display: flex;
justify-content: center;
align-items: center;
}
.formContainer article{
max-width: 640px;
width: 100%;
}
</style>

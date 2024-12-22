<script setup>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, onMounted, ref } from 'vue';
// import { loginUser } from '../../services/auth';
import { useUserStore } from '../../stores/useUserStore';
import FormFields from '../register/components/FormFields.vue';

const userStore = useUserStore();

const form = ref({
  username: 'emilys',
  password: 'emilyspass',
});

const rules = computed(() => ({
  form: {
    username: { required },
    password: { required },
  },
}));
const v$ = useVuelidate(rules, { form });

async function onLogin() {
  const isValid = await v$.value.$validate();
  if (!isValid)
    return;
  await userStore.loginUser(form.value);
  //   console.log(this.form);
}
onMounted(() => {
  userStore.reAuthUser();
});
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

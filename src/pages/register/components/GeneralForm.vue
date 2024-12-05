<script>
import useVuelidate from '@vuelidate/core';
import { alphaNum, helpers, maxLength, minLength, required } from '@vuelidate/validators';
import DoubleRow from './DoubleRow.vue';
import FormFields from './FormFields.vue';

const separateNames = helpers.regex(/^[A-Z][a-z]+ [A-Z][a-z]+$/);

export default {
  components: {
    FormFields,
    DoubleRow,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      formData: {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
      },
    };
  },
  validations() {
    return {
      formData: {
        name: { required, separateNames: helpers.withMessage('Field must contain 2 names separate with white space and start with capital letter', separateNames) },
        password: { required, minLength: minLength(3), maxLength: maxLength(16), alphaNum },
        // confirmPassword: '',
        // email: '',
        // phone: '',
        gender: { required },
        // dateOfBirth: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      const isValid = await this.v$.$validate();
    },
  },
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormFields title="Name" :errors="v$.formData.name.$errors">
      <input v-model="formData.name" type="text" placeholder="John Doe" @blur="v$.formData.name.$touch">
    </FormFields>
    <DoubleRow>
      <FormFields title="Password" :errors="v$.formData.password.$errors">
        <input v-model="v$.formData.password.$model" type="password" placeholder="Strong Password">
      </FormFields>
      <FormFields title="Confirm">
        <input type="text" placeholder="Confirm Password">
      </FormFields>
    </DoubleRow>
    <DoubleRow>
      <FormFields title="Email">
        <input type="email" placeholder="johnDoe@gmail.com">
      </FormFields>
      <FormFields title="Phone Number">
        <input type="text" placeholder="+49 898999999">
      </FormFields>
    </DoubleRow>
    <DoubleRow>
      <FormFields title="Gender" :errors="v$.formData.gender.$errors">
        <select v-model="v$.formData.gender.$model">
          <option value="">
            Select Gender
          </option>
          <option value="male">
            Male
          </option>
          <option value="female">
            Female
          </option>
          <option value="other">
            Other
          </option>
        </select>
      </FormFields>
      <FormFields title="Date of Birth">
        <input type="date" placeholder="+49 898999999">
      </FormFields>
    </DoubleRow>
    <button type="submit" class="primary">
      NEXT
    </button>
  </form>
</template>

<style scoped>
form {
    display: grid;
    gap: 1rem
}

input,
select {
    margin: 0
}
</style>

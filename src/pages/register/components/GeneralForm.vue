<script setup>
import useVuelidate from '@vuelidate/core';
import { alphaNum, email, helpers, maxLength, minLength, numeric, required, sameAs } from '@vuelidate/validators';
import { computed, ref, watch } from 'vue';
import DoubleRow from './DoubleRow.vue';
import FormFields from './FormFields.vue';

//   const age = new Date(new Date() - new Date(value)).getUTCFullYear();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['next']);

const separateNames = helpers.regex(/^[A-Z][a-z]+ [A-Z][a-z]+$/);

function minimalAge(minAge) {
  return helpers.withParams(
    { minAge },
    (value) => {
      const age = new Date(new Date() - new Date(value)).getFullYear() - 1970;
      return age > minAge;
    },
  );
}

const formData = ref({
  name: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  gender: '',
  dateOfBirth: '',

});

const rules = computed(() => {
  return {
    formData: {
      name: { required, separateNames: helpers.withMessage('Field must contain 2 names separate with white space and start with capital letter', separateNames) },
      password: { required, minLength: minLength(3), maxLength: maxLength(16), alphaNum },
      confirmPassword: {
        sameAsPassword: sameAs(formData.value.password),
      },
      email: { required, email },
      phone: { required, numeric, minLength: minLength(9), maxLength: maxLength(9) },
      gender: { required },
      dateOfBirth: { required, minimalAge: helpers.withMessage(({ $params }) => `You must be ${$params.minAge}+ years old`, minimalAge(13)) },
    },
  };
});

const v$ = useVuelidate(rules, { formData });

watch(
  () => props.data,
  (newVal, oldVal) => {
    const areSame = oldVal && JSON.stringify(Object.entries(newVal).sort()) === JSON.stringify(Object.entries(oldVal).sort());
    if (!areSame) {
      initState(newVal);
    }
  },
  { deep: true, immediate: true },
);

async function onSubmit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    emit('next', formData.value);
  }
}
function initState(dataPropValue) {
  formData.value = {
    name: dataPropValue.name,
    password: dataPropValue.password,
    confirmPassword: dataPropValue.confirmPassword,
    email: dataPropValue.email,
    phone: dataPropValue.phone,
    gender: dataPropValue.gender,
    dateOfBirth: dataPropValue.dateOfBirth,
  };
}
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
      <FormFields title="Confirm" :errors="v$.formData.confirmPassword.$errors">
        <input v-model="v$.formData.confirmPassword.$model" type="text" placeholder="Confirm Password">
      </FormFields>
    </DoubleRow>
    <DoubleRow>
      <FormFields title="Email" :errors="v$.formData.email.$errors">
        <input v-model="v$.formData.email.$model" type="email" placeholder="johnDoe@gmail.com">
      </FormFields>
      <FormFields title="Phone Number" :errors="v$.formData.phone.$errors">
        <input v-model.number="v$.formData.phone.$model" type="text" placeholder="+49 898999999">
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
      <FormFields title="Date of Birth" :errors="v$.formData.dateOfBirth.$errors">
        <input v-model="v$.formData.dateOfBirth.$model" type="date" placeholder="+49 898999999">
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

<script setup>
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { computed, ref, watch } from 'vue';
import DoubleRow from './DoubleRow.vue';
import FormFields from './FormFields.vue';
// import DoubleRow from './DoubleRow.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['previous', 'submit']);

const formData = ref({
  address1: '',
  address2: '',
  city: '',
  zip: null,
  country: '',
  payment: '',
  note: '',
});

const rules = computed(() => {
  return {
    formData: {
      address1: { required, minLength: minLength(5) },
      address2: '',
      city: '',
      zip: '',
      country: '',
      payment: '',
      note: '',
    },
  };
});
const v$ = useVuelidate(rules, { formData });

// destructuring props
// const { data } = toRefs(props);
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
    emit('submit', formData.value);
  }
}
function initState(dataPropValue) {
  formData.value = {
    address1: dataPropValue.address1,
    address2: dataPropValue.address2,
    city: dataPropValue.city,
    zip: dataPropValue.zip,
    country: dataPropValue.country,
    payment: dataPropValue.payment,
    note: dataPropValue.note,
  };
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormFields title="Address Line 1" :errors="v$.formData.address1.$errors">
      <input
        v-model="v$.formData.address1.$model"
        type="text" placeholder="John Doe"
        @blur="v$.formData.address1.$touch"
      >
    </FormFields>
    <FormFields title="Address Line 2" :errors="[]">
      <input v-model="formData.address2" type="text" placeholder="John Doe">
    </FormFields>
    <DoubleRow>
      <button type="button" class="secondary" @click="$emit('previous', formData)">
        Previous
      </button><button type="submit" class="primary">
        Submit
      </button>
    </DoubleRow>
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

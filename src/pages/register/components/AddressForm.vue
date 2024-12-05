<script>
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import DoubleRow from './DoubleRow.vue';
import FormFields from './FormFields.vue';
// import DoubleRow from './DoubleRow.vue';

export default {
  components: {
    FormFields,
    DoubleRow,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  emits: ['previous', 'submit'],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      formData: {
        address1: '',
        address2: '',
        city: '',
        zip: null,
        country: '',
        payment: '',
        note: '',
      },
    };
  },
  validations() {
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
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        const areSame = oldVal && JSON.stringify(Object.entries(newVal).sort()) === JSON.stringify(Object.entries(oldVal).sort());
        if (!areSame) {
          this.initState(newVal);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async onSubmit() {
      const isValid = await this.v$.$validate();
      if (isValid) {
        this.$emit('submit', this.formData);
      }
    },
    initState(dataPropValue) {
      this.formData = {
        address1: dataPropValue.address1,
        address2: dataPropValue.address2,
        city: dataPropValue.city,
        zip: dataPropValue.zip,
        country: dataPropValue.country,
        payment: dataPropValue.payment,
        note: dataPropValue.note,
      };
    },
  },
};
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

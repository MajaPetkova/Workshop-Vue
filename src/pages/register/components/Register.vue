<script>
import GeneralForm from './GeneralForm.vue';

export default {
  components: {
    GeneralForm,
  },
  data() {
    return {
      userInformation: {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        address1: '',
        address2: '',
        city: '',
        ZIP: null,
        country: '',
        payment: '',
        note: '',
      },
    };
  },
  methods: {
    onNextStep(generalData) {
      console.log(generalData);
      this.userInformation = {
        ...this.userInformation,
        ...generalData,
      };
    },
  },
};
</script>

<template>
  <section>
    <article>
      <header>
        <h2>Step 1: General Information</h2>
      </header>
      <GeneralForm @next="onNextStep" />
    </article>
  </section>
</template>

<style scoped>
section{
  padding: 1rem;
}
article{
  max-width: 800px;
  margin:auto
}
</style>

<script>
import AddressForm from './AddressForm.vue';
import GeneralForm from './GeneralForm.vue';

function initUserInfo() {
  return {
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
    zip: '',
    country: '',
    payment: '',
    note: '',
  };
}
export default {
  components: {
    GeneralForm,
    AddressForm,
  },
  data() {
    return {
      userInformation: initUserInfo(),
      activeStep: 'general',
    };
  },
  methods: {
    onNextStep(generalData) {
      console.log(generalData);
      this.userInformation = {
        ...this.userInformation,
        ...generalData,
      };
      this.goNext();
    },
    goNext() {
      this.activeStep = 'address';
    },
    goPrevious() {
      this.activeStep = 'general';
    },
    handlePrevious(generalData) {
      this.userInformation = {
        ...this.userInformation,
        ...generalData,
      };
      this.goPrevious();
    },
    onSubmit(generalData) {
      this.userInformation = {
        ...this.userInformation,
        ...generalData,
      };
      console.log('submited', this.userInformation);
      this.resetForms();
    },
    resetForms() {
      this.userInformation = initUserInfo();
      this.activeStep = 'general';
    },
  },
};
</script>

<template>
  <section>
    <article>
      <header>
        <h2>{{ activeStep === "general" ? "Step 1: General Information" : "Step 2: Address Information" }}</h2>
      </header>
      <GeneralForm v-if="activeStep === 'general'" :data="userInformation" @next="onNextStep" />
      <AddressForm v-else :data="userInformation" @previous="handlePrevious" @submit="onSubmit" />
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

<script>
import DoubleRow from './DoubleRow.vue';
import FormFields from './FormFields.vue';

export default {

  components: {
    FormFields,
    DoubleRow,
  },
};
</script>

<template>
  <form>
    <FormFields title="Name">
      <input type="text" placeholder="John Doe">
    </FormFields>
    <DoubleRow>
      <FormFields title="Password">
        <input type="password" placeholder="Strong Password">
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
  </form>
</template>

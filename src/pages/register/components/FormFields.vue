<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    required: Boolean,
    disabled: Boolean,
  },
};
</script>

<template>
  <fieldset :disabled="disabled">
    <label>
      <span>
        {{ title }} <i v-if="required">*</i>
      </span>
      <slot />
    </label>
  </fieldset>
</template>

<style scoped>
span{
    display: block;
    i{
color: red;
    }
}
</style>

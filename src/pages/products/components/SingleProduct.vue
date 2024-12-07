<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<template>
  <h2>Single Product {{ id }}</h2>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, magni numquam. Magnam iste dolorum corporis perspiciatis saepe ex, odit libero accusantium perferendis, similique amet.</p>
</template>

<template>
  <div id="app">
    <header>
      <!-- Your header content here -->
      <h1>Contact Manager</h1>
    </header>
    <div class="main-container">
    <contact-form />
    <contact-list />
  </div>
  </div>
</template>

<script>
import ContactForm from './components/ContactForm.vue';
import ContactList from './components/ContactList.vue';

export default {
  name: 'App',
  components: {
    ContactForm,
    ContactList
  }
};
</script>

<style>

</style>

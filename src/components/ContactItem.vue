<template>
  <div class="contact-item">
    <div class="contact-details">
      <div class="contact-name">{{ contact.firstName }} {{ contact.lastName }}</div>
      <div class="contact-email">Email: {{ contact.email }}</div>
      <div class="contact-phone">Phone: {{ contact.phoneNumber }}</div>
      <!-- Address details -->
      <div class="contact-address" v-if="contact.address">
        <div>Street: {{ contact.address.street }}</div>
        <div>City: {{ contact.address.city }}</div>
        <div>State: {{ contact.address.state }}</div>
        <div>Zip: {{ contact.address.zipCode }}</div>
        <div>Country: {{ contact.address.country }}</div>
      </div>
    </div>
    <button @click="handleEdit">Edit</button>
    <button @click="handleDelete">Delete</button>
  </div>
</template>

<script>
import store from '../store/store';

export default {
  props: {
    contact: Object,
  },
  methods: {
    handleEdit() {
      store.setCurrentContact(this.contact);
    },
    async handleDelete() {
      if (confirm('Are you sure you want to delete this contact?')) {
        await store.deleteContact(this.contact._id);
        store.setCurrentContact(null);
      }
    },
  },
};
</script>

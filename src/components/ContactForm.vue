<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-row">
      <fieldset class="form-column">
        <legend>Contact Details</legend>
        <input type="text" id="firstName" name="firstName" v-model="contact.firstName" placeholder="First Name"
          required />
        <input type="text" id="lastName" name="lastName" v-model="contact.lastName" placeholder="Last Name" required />
        <input type="email" id="email" name="email" v-model="contact.email" placeholder="Email" required />
        <input type="tel" id="phoneNumber" name="phoneNumber" v-model="contact.phoneNumber" placeholder="Phone Number"
          required />
      </fieldset>

      <fieldset class="form-column">
        <legend>Address</legend>
        <input type="text" id="street" name="address.street" v-model="contact.address.street" placeholder="Street" />
        <input type="text" id="city" name="address.city" v-model="contact.address.city" placeholder="City" />
        <input type="text" id="state" name="address.state" v-model="contact.address.state" placeholder="State" />
        <input type="text" id="zipCode" name="address.zipCode" v-model="contact.address.zipCode" placeholder="Zip Code" />
        <input type="text" id="country" name="address.country" v-model="contact.address.country" placeholder="Country" />
      </fieldset>
    </div>

    <button type="submit">Submit</button>
    <button type="button" @click="handleCancel" v-if="currentContact">Cancel</button>
  </form>
</template>

<script>
import store from '../store/store';

export default {
  data() {
    return {
      contact: this.initialContactState(),
    };
  },
  computed: {
    currentContact() {
      return store.state.currentContact;
    },
  },
  watch: {
    currentContact: {
      immediate: true,
      handler(newVal) {
        this.contact = newVal ? { ...newVal } : this.initialContactState();
      }
    }
  },
  methods: {
    initialContactState() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      };
    },
    async handleSubmit() {
      try {
        if (this.contact._id) {
          await store.updateContact(this.contact._id, this.contact);
        } else {
          await store.addContact(this.contact);
        }
        store.setCurrentContact(null);
        this.contact = this.initialContactState();
      } catch (error) {
        console.error('Failed to submit contact:', error);
      }
    },
    handleCancel() {
      store.setCurrentContact(null);
    },
  },
};
</script>
// src/store.js
import { reactive } from 'vue';
import { getAllContacts, addContact, updateContact, deleteContact } from '../services/api';

const state = reactive({
  contacts: [],
  currentContact: null
});

export default {
  state,
  async fetchContacts() {
    state.contacts = await getAllContacts();
  },
  setCurrentContact(contact) {
    state.currentContact = contact;
  },
  async addContact(contactData) {
    await addContact(contactData);
    await this.fetchContacts();
    console.log(contactData)
  },
  async updateContact(id, contactData) {
    await updateContact(id, contactData);
    await this.fetchContacts();
  },
  async deleteContact(id) {
    await deleteContact(id);
    await this.fetchContacts();
  }
};

<template>
  <div class="contact-list">
    <contact-item v-for="contact in visibleContacts" :key="contact._id" :contact="contact" />
    <div class="sentinel" ref="sentinel"></div>
  </div>
</template>

<script>
import ContactItem from './ContactItem.vue';
import store from '../store/store';

export default {
  components: { ContactItem },
  data() {
    return {
      visibleCount: 10,
    };
  },
  computed: {
    contacts() {
      return store.state.contacts;
    },
    visibleContacts() {
      return this.contacts.slice(0, this.visibleCount);
    },
    moreContactsAvailable() {
      return this.contacts.length > this.visibleCount;
    },
  },
  mounted() {
    store.fetchContacts();
    this.initIntersectionObserver();
  },
  methods: {
    initIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };

      const observer = new IntersectionObserver(this.handleIntersection, options);

      if (this.$refs.sentinel) {
        observer.observe(this.$refs.sentinel);
      }
    },
    handleIntersection(entries) {
      if (entries[0].isIntersecting && this.moreContactsAvailable) {
        this.visibleCount += 10;
      }
    },
  },
};
</script>
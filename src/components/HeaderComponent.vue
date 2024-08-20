<template>
  <header class="d-flex justify-content-between align-items-center p-3 border-bottom">
    <div v-if="isMobile" @click="toggleMenu" :class="{ 'menu-open': menuOpen }">
      <div>Menu</div>
      <nav class="mobile-menu">
        <ul class="nav-menu">
          <li v-for="item in links" :key="item" @click="this.$router.push({path: item.redirect })">{{ item.title }}</li>
        </ul>
      </nav>
    </div>
    <div v-else>
      <nav>
        <ul class="nav-list">
          <li v-for="item in links" :key="item" @click="this.$router.push({path: item.redirect })">{{ item.title }}</li>
        </ul>
      </nav>
    </div>
  </header>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderComponent',
  data() {
    return {
      isMobile: false,
      menuOpen: false,
      links: [
        {
          title: 'Users',
          redirect: '/users'
        },
        {
          title: 'Authors',
          redirect: '/authors'
        },
        {
          title: 'Genres',
          redirect: '/genres'
        },
        {
          title: 'Books',
          redirect: '/books'
        },
        {
          title: 'Borrows',
          redirect: '/borrows'
        },
        {
          title: 'Reports',
          redirect: '/reports'
        },
      ]
    };
  },
  methods: {
    checkMobile() {
      this.isMobile = window.matchMedia('(max-width: 768px)').matches;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  }
});
</script>

<style scoped>
.nav-menu {
  list-style: none;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-menu li {
  margin-right: 10px;
}

.mobile-menu {
  background-color: #c7c7c7;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.5s;
  z-index: 10000;
}

.menu-open .mobile-menu {
  transform: translateX(0);
}
</style>

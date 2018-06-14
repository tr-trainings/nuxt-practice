<template lang="pug">
  div
    nav.navbar.is-primary.has-shadow.is-spaced.is-fixed-top
      div.container
        div.navbar-brand
          a.nav-item.is-size-3.has-text-light </> Blog Posts
        div.navbar-menu
          div.navbar-start.m-l-2
            nuxt-link.navbar-item.button.is-primary.control(to="/") Home
            nuxt-link.navbar-item.button.is-primary.control(to="/posts") Posts
            nuxt-link.navbar-item.button.is-primary.control(to="/basic-routes") Basic Routes
            nuxt-link.navbar-item.button.is-primary.control(to="/dynamic-routes") Dynamic Routes
            nuxt-link.navbar-item.button.is-primary.control(to="/nested-routes/users") Nested Routes
    nav.navbar.is-primary.has-shadow.is-spaced.push-down
      div.container
        div.navbar-brand
          a.nav-item.is-size-3.has-text-light </> Blog Posts
</template>

<style lang="scss">
.m-l-2 {
	margin-left: 2rem;
}
.push-down {
  z-index: -1;
}
</style>




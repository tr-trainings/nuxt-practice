import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _56c82bec = () => import('../pages/posts/index.vue' /* webpackChunkName: "pages/posts/index" */).then(m => m.default || m)
const _76b33a57 = () => import('../pages/dynamic-routes/index.vue' /* webpackChunkName: "pages/dynamic-routes/index" */).then(m => m.default || m)
const _0d8d1b48 = () => import('../pages/basic-routes/index.vue' /* webpackChunkName: "pages/basic-routes/index" */).then(m => m.default || m)
const _df4f25e6 = () => import('../pages/nested-routes/users.vue' /* webpackChunkName: "pages/nested-routes/users" */).then(m => m.default || m)
const _8ddf9460 = () => import('../pages/nested-routes/users/index.vue' /* webpackChunkName: "pages/nested-routes/users/index" */).then(m => m.default || m)
const _37d16c38 = () => import('../pages/nested-routes/users/_id.vue' /* webpackChunkName: "pages/nested-routes/users/_id" */).then(m => m.default || m)
const _6c99baf4 = () => import('../pages/basic-routes/other.vue' /* webpackChunkName: "pages/basic-routes/other" */).then(m => m.default || m)
const _c7df3508 = () => import('../pages/dynamic-routes/folder/index.vue' /* webpackChunkName: "pages/dynamic-routes/folder/index" */).then(m => m.default || m)
const _12ca4546 = () => import('../pages/dynamic-routes/folder/_dynamic.vue' /* webpackChunkName: "pages/dynamic-routes/folder/_dynamic" */).then(m => m.default || m)
const _97ba9e64 = () => import('../pages/dynamic-routes/_dynamic/index.vue' /* webpackChunkName: "pages/dynamic-routes/_dynamic/index" */).then(m => m.default || m)
const _955e321c = () => import('../pages/posts/_id.vue' /* webpackChunkName: "pages/posts/_id" */).then(m => m.default || m)
const _9b532b74 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/posts",
			component: _56c82bec,
			name: "posts"
		},
		{
			path: "/dynamic-routes",
			component: _76b33a57,
			name: "dynamic-routes"
		},
		{
			path: "/basic-routes",
			component: _0d8d1b48,
			name: "basic-routes"
		},
		{
			path: "/nested-routes/users",
			component: _df4f25e6,
			children: [
				{
					path: "",
					component: _8ddf9460,
					name: "nested-routes-users"
				},
				{
					path: ":id",
					component: _37d16c38,
					name: "nested-routes-users-id"
				}
			]
		},
		{
			path: "/basic-routes/other",
			component: _6c99baf4,
			name: "basic-routes-other"
		},
		{
			path: "/dynamic-routes/folder",
			component: _c7df3508,
			name: "dynamic-routes-folder"
		},
		{
			path: "/dynamic-routes/folder/:dynamic",
			component: _12ca4546,
			name: "dynamic-routes-folder-dynamic"
		},
		{
			path: "/dynamic-routes/:dynamic?",
			component: _97ba9e64,
			name: "dynamic-routes-dynamic"
		},
		{
			path: "/posts/:id",
			component: _955e321c,
			name: "posts-id"
		},
		{
			path: "/",
			component: _9b532b74,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}

import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4bf17b5e = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _1de12e2a = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _bcc5be10 = () => interopDefault(import('../pages/auth/vr_code.vue' /* webpackChunkName: "pages/auth/vr_code" */))
const _6e8f5cac = () => interopDefault(import('../pages/profile/admin.vue' /* webpackChunkName: "pages/profile/admin" */))
const _61d6f140 = () => interopDefault(import('../pages/profile/user.vue' /* webpackChunkName: "pages/profile/user" */))
const _33fb2793 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/abf/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/auth/login",
    component: _4bf17b5e,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _1de12e2a,
    name: "auth-register"
  }, {
    path: "/auth/vr_code",
    component: _bcc5be10,
    name: "auth-vr_code"
  }, {
    path: "/profile/admin",
    component: _6e8f5cac,
    name: "profile-admin"
  }, {
    path: "/profile/user",
    component: _61d6f140,
    name: "profile-user"
  }, {
    path: "/",
    component: _33fb2793,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

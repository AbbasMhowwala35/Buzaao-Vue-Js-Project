import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('./views/app'),
    redirect: '/app/dashboards',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/dashboards',
        component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards'),
        redirect: '/app/dashboards/default',
        children: [
          { path: 'default', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Default') }
        ]
      },
      {
        path: 'app/pages',
        component: () => import(/* webpackChunkName: "pages" */ './views/app/pages'),
        redirect: '/app/pages/service',
        children: [
          { path: 'service', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/ServiceList') },
          { path: 'service-details/:service_id', component: () => import('./views/app/pages/service-details') },
          { path: 'service-stage', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/service-stage') },
          { path: 'service-stage-task', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/service-stage-task') },
          { path: 'service-milestones', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/service-milestones') },
          // { path: 'details', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/Details') },
          // { path: 'search', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/Search') },
          // { path: 'mailing', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/Mailing') },
          { path: 'invoice', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/Invoice') }
        ]
      },
      // {
      //   path: 'app/applications',
      //   component: () => import(/* webpackChunkName: "applications" */ './views/app/applications'),
      //   redirect: '/app/applications/todo',
      //   children: [
      //     { path: 'todo', component: () => import(/* webpackChunkName: "applications" */ './views/app/applications/Todo') },
      //     { path: 'survey', component: () => import(/* webpackChunkName: "applications" */ './views/app/applications/Survey') },
      //     { path: 'survey/:id', component: () => import(/* webpackChunkName: "applications" */ './views/app/applications/SurveyDetail'), props: true },
      //     { path: 'chat', component: () => import(/* webpackChunkName: "applications" */ './views/app/applications/Chat') }
      //   ]
      // },
      {
        path: 'app/orders',
        component: () => import('./views/app/orders'),
        redirect: '/app/orders/Orders',
        children: [
          { path: 'orders', component: () => import('./views/app/orders/Orders') },
          { path: 'order-milestones', component: () => import('./views/app/orders/order-milestones') },
          { path: 'order-stages', component: () => import('./views/app/orders/order-stages') },
          { path: 'order-stages-task', component: () => import('./views/app/orders/order-stages-task') },
          { path: 'order-articles', component: () => import('./views/app/orders/order-articles') },
          { path: 'client-management', component: () => import('./views/app/orders/client-management') },
          { path: 'order-details/:order_id', component: () => import('./views/app/orders/order-details') },
          { path: 'client-detail/:client_id', component: () => import('./views/app/orders/client-detail') },
          { path: 'staff-details/:staff_id', component: () => import('./views/app/orders/staff-details') },
          { path: 'staff-management', component: () => import('./views/app/orders/staff-management') },
          { path: 'user-role', component: () => import('./views/app/orders/user-role') },
          { path: 'organization-management', component: () => import('./views/app/orders/organization-management') },
        ]
      }
    ]
  },
  { path: '/error', component: () => import('./views/Error') },
  {
    path: '/user',
    component: () => import('./views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import('./views/user/Login') },
      { path: 'register', component: () => import('./views/user/Register') },
      { path: 'forgot-password', component: () => import('./views/user/ForgotPassword') },
    ]
  },
  { path: '*', component: () => import('./views/Error') }
]

const router = new Router({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router 
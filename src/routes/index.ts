import addPrefix from "./withParentPrefix";

const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  SETTINGS: '/settings',
  TRANSACTION: '/transactions',
  MESSAGES: '/messages',
  PROFILE: '/profile',
  ACCOUNT: '/account',
  ADD_TRANSACTION: addPrefix('/transactions', {
    ADD: '/add',
  }),
  ADD_ACCOUNT: addPrefix('/account', {
    ADD: '/add',
  }),
}

export default ROUTES;

import addPrefix from "./withParentPrefix";

const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  SETTINGS: '/settings',
  MESSAGES: '/messages',
  ASSETS: addPrefix('/assets', {
    ADD: '/add',
    EDIT: '/edit',
    ID: '/[id]',
  }),
  TRANSACTIONS: addPrefix('/transactions', {
    ADD: '/add',
  }),
  ACCOUNT: addPrefix('/account', {
    ADD: '/add',
  }),
}

export default ROUTES;

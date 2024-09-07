// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    vehicle: path(ROOTS_DASHBOARD, '/vehicle'),
    transporter: path(ROOTS_DASHBOARD, '/transporter'),
    customer: path(ROOTS_DASHBOARD, '/customer'),
    driver: path(ROOTS_DASHBOARD, '/driver'),
  },

  trip: {
    root: path(ROOTS_DASHBOARD, '/trip'),
    new: path(ROOTS_DASHBOARD, '/trip/new'),
    list: path(ROOTS_DASHBOARD, '/trip/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/trip/${name}/edit`),
    detail: (name) => path(ROOTS_DASHBOARD, `/trip/${name}`),
    demoDetail: path(ROOTS_DASHBOARD, `/trip/665e0156caf0402edec2ff0f/`),
    demoEdit: path(ROOTS_DASHBOARD, `/trip/abc/edit`),
  },

  subtrip: {
    root: path(ROOTS_DASHBOARD, '/subtrip'),
    // new: path(ROOTS_DASHBOARD, '/subtrip/new'),
    new: (name) => path(ROOTS_DASHBOARD, `/subtrip/${name}/new`),
    list: path(ROOTS_DASHBOARD, '/subtrip/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/subtrip/${name}/edit`),
    detail: (name) => path(ROOTS_DASHBOARD, `/subtrip/${name}`),
    demoDetail: path(ROOTS_DASHBOARD, `/subtrip/665e0156caf0402edec2ff0f/`),
    demoEdit: path(ROOTS_DASHBOARD, `/subtrip/abc/edit`),
  },

  expense: {
    root: path(ROOTS_DASHBOARD, '/expense'),
    new: path(ROOTS_DASHBOARD, '/expense/new'),
    list: path(ROOTS_DASHBOARD, '/expense/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/expense/${name}/edit`),
    detail: (name) => path(ROOTS_DASHBOARD, `/expense/${name}`),
    demoEdit: path(ROOTS_DASHBOARD, `/expense/abc/edit`),
  },

  vehicle: {
    root: path(ROOTS_DASHBOARD, '/vehicle'),
    new: path(ROOTS_DASHBOARD, '/vehicle/new'),
    list: path(ROOTS_DASHBOARD, '/vehicle/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/vehicle/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/vehicle/abc/edit`),
  },

  transporter: {
    root: path(ROOTS_DASHBOARD, '/transporter'),
    new: path(ROOTS_DASHBOARD, '/transporter/new'),
    list: path(ROOTS_DASHBOARD, '/transporter/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/transporter/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/transporter/abc/edit`),
  },

  customer: {
    root: path(ROOTS_DASHBOARD, '/customer'),
    new: path(ROOTS_DASHBOARD, '/customer/new'),
    list: path(ROOTS_DASHBOARD, '/customer/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/customer/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/customer/abc/edit`),
  },

  driver: {
    root: path(ROOTS_DASHBOARD, '/driver'),
    new: path(ROOTS_DASHBOARD, '/driver/new'),
    list: path(ROOTS_DASHBOARD, '/driver/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/driver/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/driver/abc/edit`),
  },

  pump: {
    root: path(ROOTS_DASHBOARD, '/pump'),
    new: path(ROOTS_DASHBOARD, '/pump/new'),
    list: path(ROOTS_DASHBOARD, '/pump/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/pump/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/pump/abc/edit`),
  },

  route: {
    root: path(ROOTS_DASHBOARD, '/route'),
    new: path(ROOTS_DASHBOARD, '/route/new'),
    list: path(ROOTS_DASHBOARD, '/route/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/route/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/route/abc/edit`),
  },

  bank: {
    root: path(ROOTS_DASHBOARD, '/bank'),
    new: path(ROOTS_DASHBOARD, '/bank/new'),
    list: path(ROOTS_DASHBOARD, '/bank/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/bank/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/bank/abc/edit`),
  },

  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },

  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
};

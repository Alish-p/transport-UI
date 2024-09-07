// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  vehicle: icon('ic_vehicle'),
  driver: icon('ic_person'),
  transporter: icon('ic_transporter'),
  customer: icon('ic_customer'),
  route: icon('ic_map'),
  bank: icon('ic_bank'),
  pump: icon('ic_pump'),
  expense: icon('ic_expense'),
  trip: icon('ic_trip'),
  subtrip: icon('ic_reciept'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'main',
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: <Iconify icon="heroicons:home" width={24} />,
      },
    ],
  },
  {
    subheader: 'general',
    items: [
      {
        title: 'Create Trip',
        path: PATH_DASHBOARD.trip.new,
        icon: ICONS.trip,
        info: <Iconify icon="material-symbols-light:star" width={24} />,
      },
      {
        title: 'Add Subtrip',
        path: PATH_DASHBOARD.subtrip.new(),
        icon: ICONS.subtrip,
        info: <Iconify icon="material-symbols-light:star" width={24} />,
      },
      {
        title: 'Add Expense',
        path: PATH_DASHBOARD.expense.new,
        icon: ICONS.expense,
        info: <Iconify icon="material-symbols-light:star" width={24} />,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Transport',
    items: [
      // Trip
      {
        title: 'Trip',
        path: PATH_DASHBOARD.trip.root,
        icon: ICONS.trip,
        children: [
          { title: 'list', path: PATH_DASHBOARD.trip.list },
          { title: 'create', path: PATH_DASHBOARD.trip.new },
          // { title: 'edit', path: PATH_DASHBOARD.trip.demoEdit },
          // { title: 'view', path: PATH_DASHBOARD.trip.demoDetail },
        ],
      },

      // subtrip
      {
        title: 'Subtrip',
        path: PATH_DASHBOARD.subtrip.root,
        icon: ICONS.subtrip,
        children: [
          { title: 'list', path: PATH_DASHBOARD.subtrip.list },
          { title: 'create', path: PATH_DASHBOARD.subtrip.new() },
          // { title: 'edit', path: PATH_DASHBOARD.subtrip.demoEdit },
        ],
      },

      // expense
      {
        title: 'expense',
        path: PATH_DASHBOARD.expense.root,
        icon: ICONS.expense,
        children: [
          { title: 'list', path: PATH_DASHBOARD.expense.list },
          { title: 'create', path: PATH_DASHBOARD.expense.new },
          // { title: 'edit', path: PATH_DASHBOARD.expense.demoEdit },
        ],
      },

      // Vehicle
      {
        title: 'vehicle',
        path: PATH_DASHBOARD.vehicle.root,
        icon: ICONS.vehicle,
        children: [
          { title: 'list', path: PATH_DASHBOARD.vehicle.list },
          { title: 'create', path: PATH_DASHBOARD.vehicle.new },
          // { title: 'edit', path: PATH_DASHBOARD.vehicle.demoEdit },
        ],
      },

      // Transporter
      {
        title: 'transporter',
        path: PATH_DASHBOARD.transporter.root,
        icon: ICONS.transporter,
        children: [
          { title: 'list', path: PATH_DASHBOARD.transporter.list },
          { title: 'create', path: PATH_DASHBOARD.transporter.new },
          // { title: 'edit', path: PATH_DASHBOARD.transporter.demoEdit },
        ],
      },

      // Customer
      {
        title: 'customer',
        path: PATH_DASHBOARD.customer.root,
        icon: ICONS.customer,
        children: [
          { title: 'list', path: PATH_DASHBOARD.customer.list },
          { title: 'create', path: PATH_DASHBOARD.customer.new },
          // { title: 'edit', path: PATH_DASHBOARD.transporter.demoEdit },
        ],
      },

      // Driver
      {
        title: 'driver',
        path: PATH_DASHBOARD.driver.root,
        icon: ICONS.driver,
        children: [
          { title: 'list', path: PATH_DASHBOARD.driver.list },
          { title: 'create', path: PATH_DASHBOARD.driver.new },
          // { title: 'edit', path: PATH_DASHBOARD.driver.demoEdit },
        ],
      },
      // route
      {
        title: 'route',
        path: PATH_DASHBOARD.route.root,
        icon: ICONS.route,
        children: [
          { title: 'list', path: PATH_DASHBOARD.route.list },
          { title: 'create', path: PATH_DASHBOARD.route.new },
          // { title: 'edit', path: PATH_DASHBOARD.route.demoEdit },
        ],
      },
      // pump
      {
        title: 'pump',
        path: PATH_DASHBOARD.pump.root,
        icon: ICONS.pump,
        children: [
          { title: 'list', path: PATH_DASHBOARD.pump.list },
          { title: 'create', path: PATH_DASHBOARD.pump.new },
          // { title: 'edit', path: PATH_DASHBOARD.pump.demoEdit },
        ],
      },
      // bank
      {
        title: 'bank',
        path: PATH_DASHBOARD.bank.root,
        icon: ICONS.bank,
        children: [
          { title: 'list', path: PATH_DASHBOARD.bank.list },
          { title: 'create', path: PATH_DASHBOARD.bank.new },
          // { title: 'edit', path: PATH_DASHBOARD.bank.demoEdit },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'Billing',

    items: [
      {
        title: 'invoice',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        roles: ['admin'],

        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },

      //
    ],
  },
];

export default navConfig;

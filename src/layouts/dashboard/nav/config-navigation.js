// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
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
      // { title: 'Create LR', path: PATH_DASHBOARD.subtrip.new, icon: ICONS.subtrip },
      // { title: 'Add Expenses', path: PATH_DASHBOARD.expense.new, icon: ICONS.expense },

      // { title: 'account', path: PATH_DASHBOARD.user.account, icon: ICONS.dashboard },
      // { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      // { title: 'file', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Transport',
    items: [
      // USER
      // {
      //   title: 'user',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Transport Wise LR', path: PATH_DASHBOARD.user.profile },
      //     { title: 'LR Status', path: PATH_DASHBOARD.user.cards },
      //     { title: 'list', path: PATH_DASHBOARD.user.list },
      //     { title: 'create', path: PATH_DASHBOARD.user.new },
      //     { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
      //   ],
      // },

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
          { title: 'create', path: PATH_DASHBOARD.subtrip.new('123') },
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

      // // E-COMMERCE
      // {
      //   title: 'ecommerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //   ],
      // },

      // INVOICE

      // // BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.blog.new },
      //   ],
      // },
      // {
      //   title: 'File manager',
      //   path: PATH_DASHBOARD.fileManager,
      //   icon: ICONS.folder,
      // },
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

  // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_DASHBOARD.permissionDenied,
  //       icon: ICONS.lock,
  //       roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //     {
  //       title: 'menu_level',
  //       path: '#/dashboard/menu_level',
  //       icon: ICONS.menuItem,
  //       children: [
  //         {
  //           title: 'menu_level_2a',
  //           path: '#/dashboard/menu_level/menu_level_2a',
  //         },
  //         {
  //           title: 'menu_level_2b',
  //           path: '#/dashboard/menu_level/menu_level_2b',
  //           children: [
  //             {
  //               title: 'menu_level_3a',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
  //             },
  //             {
  //               title: 'menu_level_3b',
  //               path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
  //               children: [
  //                 {
  //                   title: 'menu_level_4a',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
  //                 },
  //                 {
  //                   title: 'menu_level_4b',
  //                   path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: 'item_disabled',
  //       path: '#disabled',
  //       icon: ICONS.disabled,
  //       disabled: true,
  //     },

  //     {
  //       title: 'item_label',
  //       path: '#label',
  //       icon: ICONS.label,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'item_caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     {
  //       title: 'item_external_link',
  //       path: 'https://www.google.com/',
  //       icon: ICONS.external,
  //     },
  //     {
  //       title: 'blank',
  //       path: PATH_DASHBOARD.blank,
  //       icon: ICONS.blank,
  //     },
  //   ],
  // },
];

export default navConfig;

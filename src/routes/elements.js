import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD: GENERAL
export const GeneralAppPage = Loadable(lazy(() => import('../pages/dashboard/GeneralAppPage')));

// DASHBOARD: ECOMMERCE

// DASHBOARD: Vehicle
export const VehicleListPage = Loadable(
  lazy(() => import('../sections/@dashboard/vehicle/views/vehicle-list-view'))
);
export const VehicleCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/vehicle/views/vehicle-create-view'))
);
export const VehicleEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/vehicle/views/vehicle-edit-view'))
);

// DASHBOARD: Transporter
export const TransporterListPage = Loadable(
  lazy(() => import('../sections/@dashboard/transporter/views/transporter-list-view'))
);
export const TransporterCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/transporter/views/transporter-create-view'))
);
export const TransporterEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/transporter/views/transporter-edit-view'))
);

// DASHBOARD: Customer
export const CustomerListPage = Loadable(
  lazy(() => import('../sections/@dashboard/customer/views/customer-list-view'))
);
export const CustomerCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/customer/views/customer-create-view'))
);
export const CustomerEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/customer/views/customer-edit-view'))
);

// DASHBOARD: Driver
export const DriverListPage = Loadable(
  lazy(() => import('../sections/@dashboard/driver/views/driver-list-view'))
);
export const DriverCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/driver/views/driver-create-view'))
);
export const DriverEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/driver/views/driver-edit-view'))
);

// DASHBOARD: Route
export const RouteListPage = Loadable(
  lazy(() => import('../sections/@dashboard/route/views/route-list-view'))
);
export const RouteCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/route/views/route-create-view'))
);
export const RouteEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/route/views/route-edit-view'))
);

// DASHBOARD: Pump
export const PumpListPage = Loadable(
  lazy(() => import('../sections/@dashboard/pump/views/pump-list-view'))
);
export const PumpCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/pump/views/pump-create-view'))
);
export const PumpEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/pump/views/pump-edit-view'))
);

// DASHBOARD: Invoice
export const InvoiceListPage = Loadable(
  lazy(() => import('../sections/@dashboard/invoice/views/invoice-list-view'))
);
export const InvoiceCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/invoice/views/invoice-create-view'))
);
export const InvoiceEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/invoice/views/invoice-edit-view'))
);
export const InvoiceDetailPage = Loadable(
  lazy(() => import('../sections/@dashboard/invoice/views/invoice-details-view'))
);

// DASHBOARD: Trip
export const TripDetailPage = Loadable(
  lazy(() => import('../sections/@dashboard/trip/views/trip-details-view'))
);
export const TripListPage = Loadable(
  lazy(() => import('../sections/@dashboard/trip/views/trip-list-view'))
);
export const TripCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/trip/views/trip-create-view'))
);
export const TripEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/trip/views/trip-edit-view'))
);

// DASHBOARD: Subtrip
export const SubtripDetailPage = Loadable(
  lazy(() => import('../sections/@dashboard/subtrip/views/subtrip-detail-view'))
);
export const SubtripListPage = Loadable(
  lazy(() => import('../sections/@dashboard/subtrip/views/subtrip-list-view'))
);
export const SubtripCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/subtrip/views/subtrip-create-view'))
);
export const SubtripEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/subtrip/views/subtrip-edit-view'))
);

// DASHBOARD: Expense

export const ExpenseListPage = Loadable(
  lazy(() => import('../sections/@dashboard/expense/views/expense-list-view'))
);
export const ExpenseCreatePage = Loadable(
  lazy(() => import('../sections/@dashboard/expense/views/expense-create-view'))
);
export const ExpenseEditPage = Loadable(
  lazy(() => import('../sections/@dashboard/expense/views/expense-edit-view'))
);

// BLANK PAGE
export const BlankPage = Loadable(lazy(() => import('../pages/dashboard/BlankPage')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));

// DEMO COMPONENTS
// ----------------------------------------------------------------------

export const ComponentsOverviewPage = Loadable(
  lazy(() => import('../pages/components/ComponentsOverviewPage'))
);

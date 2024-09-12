import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';

//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: General
  GeneralAppPage,

  // Dashboard:Trip
  TripListPage,
  TripCreatePage,
  TripDetailPage,
  TripEditPage,

  // Dashboard:Subtrip
  SubtripListPage,
  SubtripDetailPage,
  SubtripCreatePage,
  SubtripEditPage,

  // Dashboard:Expense
  ExpenseListPage,
  ExpenseCreatePage,
  ExpenseEditPage,

  // Dashboard:Vehicle
  VehicleListPage,
  VehicleCreatePage,
  VehicleEditPage,

  // Dashboard:Transporter
  TransporterListPage,
  TransporterCreatePage,
  TransporterEditPage,

  // Dashboard:Customer
  CustomerListPage,
  CustomerCreatePage,
  CustomerEditPage,

  // Dashboard:Driver
  DriverListPage,
  DriverCreatePage,
  DriverEditPage,

  // Dashboard:Route
  RouteListPage,
  RouteCreatePage,
  RouteEditPage,

  // Dashboard:Pump
  PumpListPage,
  PumpCreatePage,
  PumpEditPage,

  // Dashboard:Bank
  BankListPage,
  BankCreatePage,
  BankEditPage,

  // Dashboard: Invoice
  InvoiceDetailPage,
  InvoiceListPage,
  InvoiceCreatePage,
  InvoiceEditPage,
  BlankPage,
  Page500,
  Page403,
  Page404,
  ComingSoonPage,
  MaintenancePage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },

        {
          path: 'trip',
          children: [
            { element: <Navigate to="/dashboard/trip/list" replace />, index: true },
            { path: 'list', element: <TripListPage /> },
            { path: ':id', element: <TripDetailPage /> },
            { path: 'new', element: <TripCreatePage /> },
            { path: ':id/edit', element: <TripEditPage /> },
          ],
        },
        {
          path: 'subtrip',
          children: [
            { element: <Navigate to="/dashboard/subtrip/list" replace />, index: true },
            { path: 'list', element: <SubtripListPage /> },
            { path: ':id', element: <SubtripDetailPage /> },
            { path: ':id/new', element: <SubtripCreatePage /> },
            { path: ':id/edit', element: <SubtripEditPage /> },
          ],
        },
        {
          path: 'expense',
          children: [
            { element: <Navigate to="/dashboard/expense/list" replace />, index: true },
            { path: 'list', element: <ExpenseListPage /> },
            { path: 'new', element: <ExpenseCreatePage /> },
            { path: ':id/edit', element: <ExpenseEditPage /> },
          ],
        },
        {
          path: 'vehicle',
          children: [
            { element: <Navigate to="/dashboard/vehicle/list" replace />, index: true },
            { path: 'list', element: <VehicleListPage /> },
            { path: 'new', element: <VehicleCreatePage /> },
            { path: ':id/edit', element: <VehicleEditPage /> },
          ],
        },
        {
          path: 'transporter',
          children: [
            { element: <Navigate to="/dashboard/transporter/list" replace />, index: true },
            { path: 'list', element: <TransporterListPage /> },
            { path: 'new', element: <TransporterCreatePage /> },
            { path: ':id/edit', element: <TransporterEditPage /> },
          ],
        },
        {
          path: 'customer',
          children: [
            { element: <Navigate to="/dashboard/customer/list" replace />, index: true },
            { path: 'list', element: <CustomerListPage /> },
            { path: 'new', element: <CustomerCreatePage /> },
            { path: ':id/edit', element: <CustomerEditPage /> },
          ],
        },
        {
          path: 'driver',
          children: [
            { element: <Navigate to="/dashboard/driver/list" replace />, index: true },
            { path: 'list', element: <DriverListPage /> },
            { path: 'new', element: <DriverCreatePage /> },
            { path: ':id/edit', element: <DriverEditPage /> },
          ],
        },
        {
          path: 'route',
          children: [
            { element: <Navigate to="/dashboard/route/list" replace />, index: true },
            { path: 'list', element: <RouteListPage /> },
            { path: 'new', element: <RouteCreatePage /> },
            { path: ':id/edit', element: <RouteEditPage /> },
          ],
        },
        {
          path: 'pump',
          children: [
            { element: <Navigate to="/dashboard/pump/list" replace />, index: true },
            { path: 'list', element: <PumpListPage /> },
            { path: 'new', element: <PumpCreatePage /> },
            { path: ':id/edit', element: <PumpEditPage /> },
          ],
        },
        {
          path: 'bank',
          children: [
            { element: <Navigate to="/dashboard/bank/list" replace />, index: true },
            { path: 'list', element: <BankListPage /> },
            { path: 'new', element: <BankCreatePage /> },
            { path: ':id/edit', element: <BankEditPage /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceListPage /> },
            { path: ':id', element: <InvoiceDetailPage /> },
            { path: ':id/edit', element: <InvoiceEditPage /> },
            { path: 'new', element: <InvoiceCreatePage /> },
          ],
        },

        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // Main Routes
    {
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace />, index: true },
        // { path: 'about-us', element: <AboutPage /> },
        // { path: 'contact-us', element: <Contact /> },
        // { path: 'faqs', element: <FaqsPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        // { path: 'pricing', element: <PricingPage /> },
        // { path: 'payment', element: <PaymentPage /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import vehicleReducer from './slices/vehicle';
import transporterReducer from './slices/transporter';
import driverReducer from './slices/driver';
import pumpReducer from './slices/pump';
import routeReducer from './slices/route';
import bankReducer from './slices/bank';
import tripReducer from './slices/trip';
import subtripReducer from './slices/subtrip';
import expenseReducer from './slices/expense';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  vehicle: vehicleReducer,
  transporter: transporterReducer,
  driver: driverReducer,
  pump: pumpReducer,
  bank: bankReducer,
  route: routeReducer,
  trip: tripReducer,
  subtrip: subtripReducer,
  expense: expenseReducer,
});

export default rootReducer;

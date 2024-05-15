import {
  engineType,
  modelType,
  transportCompany,
  vehicleCompany,
  vehicleTypes,
} from '../../../../assets/data';

export const vehicleConfig = [
  { id: 'vehicleNo', name: 'vehicleNo', label: 'Vehicle No', type: 'text' },
  {
    id: 'vehicleType',
    name: 'vehicleType',
    label: 'Vehicle Type',
    type: 'select',
    options: vehicleTypes,
  },
  { id: 'modelType', name: 'modelType', label: 'Model Type', type: 'select', options: modelType },
  {
    id: 'vehicleCompany',
    name: 'vehicleCompany',
    label: 'Vehicle Company',
    type: 'select',
    options: vehicleCompany,
  },
  { id: 'noOfTyres', name: 'noOfTyres', label: 'No Of Tyres', type: 'number' },
  { id: 'chasisNo', name: 'chasisNo', label: 'Chasis No', type: 'text' },
  { id: 'engineNo', name: 'engineNo', label: 'Engine No', type: 'text' },
  {
    id: 'manufacturingYear',
    name: 'manufacturingYear',
    label: 'Manufacturing Year',
    type: 'number',
  },
  { id: 'loadingCapacity', name: 'loadingCapacity', label: 'Loading Capacity', type: 'number' },
  {
    id: 'engineType',
    name: 'engineType',
    label: 'Engine Type',
    type: 'select',
    options: engineType,
  },
  { id: 'fuelTankCapacity', name: 'fuelTankCapacity', label: 'Fuel Tank Capacity', type: 'number' },
  { id: 'fromDate', name: 'fromDate', label: 'From Date', type: 'date' },
  { id: 'toDate', name: 'toDate', label: 'To Date', type: 'date' },
  {
    id: 'transportCompany',
    name: 'transportCompany',
    label: 'Transport Company',
    type: 'select',
    options: transportCompany,
  },
];

export const tripConfig = [
  { id: '_id', label: 'ID', align: 'left', type: 'string' },
  { id: 'driverName', label: 'Driver Name', type: 'string' },
  { id: 'vehicleNo', label: 'Vehicle Number', type: 'string' },
  { id: 'tripStatus', label: 'Trip Status', type: 'string' },
  { id: 'fromDate', label: 'From Date', type: 'date' },
];

export const tripStatus = [
  { key: 'billed', value: 'Billed' },
  { key: 'pending', value: 'Pending' },
];

export const subtripStatus = [
  { key: 'billed', value: 'Billed' },
  { key: 'clear', value: 'Clear' },
  { key: 'pending', value: 'Pending' },
  { key: 'received', value: 'Received' },
];

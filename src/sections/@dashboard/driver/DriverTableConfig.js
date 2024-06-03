export const driverLicenseTypes = [
  { key: 'car', value: 'Car' },
  { key: 'motorcycle', value: 'Motorcycle' },
  { key: 'truck', value: 'Truck' },
];

export const driverConfig = [
  { id: 'driverName', name: 'driverName', label: 'Driver Name', type: 'text', align: 'center' },
  {
    id: 'permanentAddress',
    name: 'permanentAddress',
    label: 'Address',
    type: 'text',
    align: 'center',
  },
  { id: 'driverCellNo', name: 'driverCellNo', label: 'Phone No', type: 'text', align: 'center' },
  {
    id: 'driverLicenceNo',
    name: 'driverLicenceNo',
    label: 'License No',
    type: 'text',
    align: 'center',
  },
  // { id: 'licenseFrom', name: 'licenseFrom', label: 'Issue Date', type: 'date', align: 'center' },
  // { id: 'licenseTo', name: 'licenseTo', label: 'Expiry Date', type: 'date', align: 'center' },
  { id: 'dob', name: 'dob', label: 'Date of Birth', type: 'date', align: 'center' },
];

import { useState } from 'react';
// @mui
import { Grid, Button, Card } from '@mui/material';

import {
  vehicleTypes,
  modelType,
  engineType,
  transportCompany,
  vehicleCompany,
} from '../../../assets/data';
import { _vehicleList } from '../../../_mock/arrays';
import { VehicleDialog } from './VehicleForm';
import VehicleList from './VehicleList';

// ----------------------------------------------------------------------

const formFields = [
  { name: 'vehicleNo', label: 'Vehicle No', type: 'text' },
  {
    name: 'vehicleType',
    label: 'Vehicle Type',
    type: 'select',
    options: vehicleTypes,
  },
  {
    name: 'modelType',
    label: 'Model Type',
    type: 'select',
    options: modelType,
  },
  {
    name: 'vehicleCompany',
    label: 'Vehicle Company',
    type: 'select',
    options: vehicleCompany,
  },
  { name: 'noOfTyres', label: 'No Of Tyres', type: 'number' },
  { name: 'chasisNo', label: 'Chasis No', type: 'text' },
  { name: 'engineNo', label: 'Engine No', type: 'text' },
  { name: 'manufacturingYear', label: 'Manufacturing Year', type: 'number' },
  { name: 'loadingCapacity', label: 'Loading Capacity', type: 'number' },
  {
    name: 'engineType',
    label: 'Engine Type',
    type: 'select',
    options: engineType,
  },
  { name: 'fuelTankCapacity', label: 'Fuel Tank Capacity', type: 'number' },
  { name: 'fromDate', label: 'From Date', type: 'date' },
  { name: 'toDate', label: 'To Date', type: 'date' },
  {
    name: 'transportCompany',
    label: 'Transport Company',
    type: 'select',
    options: transportCompany,
  },
];

export default function VehicleGeneral() {
  const [showDialog, setShowDialog] = useState(false);

  // using for passing it to edit form
  const [vehicleData, setVehicleData] = useState({});

  const handleEdit = (rowData) => {
    setVehicleData(rowData);
    setShowDialog(true);
  };

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Add Vehicle
      </Button>
      <VehicleDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        vehicleData={vehicleData}
      />

      <Grid>
        <VehicleList
          onEdit={handleEdit}
          tableHead={formFields.map(({ name, label }) => ({ id: name, label }))}
        />
      </Grid>
    </>
  );
}

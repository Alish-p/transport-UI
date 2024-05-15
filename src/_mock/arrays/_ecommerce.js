import _mock from '../_mock';

// ----------------------------------------------------------------------

const COUNTRY = ['de', 'en', 'fr', 'kr', 'us'];

const CATEGORY = ['CAP', 'Branded Shoes', 'Headphone', 'Cell Phone', 'Earings'];

const PRODUCT_NAME = [
  'Small Granite Computer',
  'Small Rubber Mouse',
  'Awesome Rubber Hat',
  'Sleek Cotton Sausages',
  'Rustic Wooden Chicken',
];

export const _ecommerceSalesOverview = [...Array(3)].map((_, index) => ({
  label: ['Total Profit', 'Total Income', 'Total Expenses'][index],
  amount: _mock.number.price(index) * 100,
  value: _mock.number.percent(index),
}));

export const _ecommerceBestSalesman = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  avatar: _mock.image.avatar(index + 8),
  category: CATEGORY[index],
  flag: `/assets/icons/flags/ic_flag_${COUNTRY[index]}.svg`,
  total: _mock.number.price(index),
  rank: `Top ${index + 1}`,
}));

export const _vehicleList = [
  {
    vehicleNo: 'KA21AA1234',
    vehicleType: 'SUV',
    vehicleCompany: 'Toyota',
    modelType: 'Fortuner',
    noOfTyres: 4,
    chasisNo: 'CH123456',
    engineNo: 'EN123456',
    manufacturingYear: 2020,
    loadingCapacity: 500,
    engineType: 'Petrol',
    fuelTankCapacity: 65,
    fromDate: new Date('2022-01-01'),
    toDate: new Date('2023-01-01'),
    transportCompany: 'XYZ Transport',
  },
  {
    vehicleNo: 'MH14BB5678',
    vehicleType: 'Sedan',
    vehicleCompany: 'Honda',
    modelType: 'City',
    noOfTyres: 4,
    chasisNo: 'CH234567',
    engineNo: 'EN234567',
    manufacturingYear: 2021,
    loadingCapacity: 450,
    engineType: 'Diesel',
    fuelTankCapacity: 45,
    fromDate: new Date('2022-02-15'),
    toDate: new Date('2023-02-15'),
    transportCompany: 'ABC Transport',
  },
  {
    vehicleNo: 'TN18CC9876',
    vehicleType: 'Hatchback',
    vehicleCompany: 'Maruti Suzuki',
    modelType: 'Swift',
    noOfTyres: 4,
    chasisNo: 'CH345678',
    engineNo: 'EN345678',
    manufacturingYear: 2020,
    loadingCapacity: 400,
    engineType: 'Petrol',
    fuelTankCapacity: 42,
    fromDate: new Date('2022-03-20'),
    toDate: new Date('2023-03-20'),
    transportCompany: 'PQR Transport',
  },
  {
    vehicleNo: 'GJ07DD5432',
    vehicleType: 'Truck',
    vehicleCompany: 'Tata',
    modelType: 'LPT 3718',
    noOfTyres: 10,
    chasisNo: 'CH456789',
    engineNo: 'EN456789',
    manufacturingYear: 2019,
    loadingCapacity: 2000,
    engineType: 'Diesel',
    fuelTankCapacity: 300,
    fromDate: new Date('2022-04-10'),
    toDate: new Date('2023-04-10'),
    transportCompany: 'LMN Transport',
  },
  {
    vehicleNo: 'AP03EE2345',
    vehicleType: 'Motorcycle',
    vehicleCompany: 'Bajaj',
    modelType: 'Pulsar 150',
    noOfTyres: 2,
    chasisNo: 'CH567890',
    engineNo: 'EN567890',
    manufacturingYear: 2020,
    loadingCapacity: 0,
    engineType: 'Petrol',
    fuelTankCapacity: 15,
    fromDate: new Date('2022-05-05'),
    toDate: new Date('2023-05-05'),
    transportCompany: 'XYZ Transport',
  },
];

export const _ecommerceLatestProducts = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: PRODUCT_NAME[index],
  image: _mock.image.product(index),
  price: _mock.number.price(index),
  priceSale: index === 0 || index === 3 ? 0 : _mock.number.price(index),
  colors: (index === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (index === 1 && ['#92140C', '#FFCF99']) ||
    (index === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (index === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'],
}));

export const _ecommerceNewProducts = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: [
    'Nike Air Max 97',
    'Nike Zoom Gravity',
    'Nike DBreak-Type',
    'Kyrie Flytrap 3 EP Basketball Shoe',
    'Nike Air Max Fusion Men',
  ][index],
  image: _mock.image.product(index),
}));

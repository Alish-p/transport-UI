import PropTypes from 'prop-types';
import { Card, CardHeader } from '@mui/material';
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

ChartColumnMultiple.propTypes = {
  subtrips: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
};

export default function ChartColumnMultiple({ subtrips, title, subheader }) {
  // Calculate profit and expenses for each subtrip
  const series = [
    {
      name: 'Profit',
      data: subtrips.map((subtrip) => subtrip.loadingWeight * subtrip.rate),
    },
    {
      name: 'Expenses',
      data: subtrips.map((subtrip) =>
        subtrip.expenses.reduce((total, expense) => total + expense.amount, 0)
      ),
    },
  ];

  const chartOptions = useChart({
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent'],
    },
    xaxis: {
      categories: subtrips.map((subtrip) => subtrip._id),
    },
    tooltip: {
      y: {
        formatter: (value) => `₹ ${value}`,
      },
    },
    plotOptions: { bar: { columnWidth: '36%' } },
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <Chart type="bar" series={series} options={chartOptions} height={320} />
    </Card>
  );
}

export const mapExpensesToChartData = (expenses) => {
  const expenseTypes = ['fuel', 'repair', 'toll', 'puncher', 'police', 'other'];

  const expenseData = expenseTypes.map((type) => {
    const total = expenses
      .filter((expense) => expense.expenseType === type)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return { label: type, value: total };
  });

  return expenseData;
};

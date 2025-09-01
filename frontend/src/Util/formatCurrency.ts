const formatCurrency = (value: number) => {
  if (!value) return '';
  const formattedValue = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  return formattedValue;
};

export default formatCurrency;
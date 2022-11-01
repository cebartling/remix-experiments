function renderCents(amount: number): string {
  return amount < 10 ? `0${amount}` : `${amount}`;
}

function renderCurrency(amount: number): string {
  const dollars = Math.floor(amount / 100);
  const cents = amount % 100;
  return `${dollars}.${renderCents(cents)}`;
}

export default renderCurrency;

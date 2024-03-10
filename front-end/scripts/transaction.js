const form = document.getElementById('form');
const type = document.getElementById('type');
const amount = document.getElementById('amount');
const curren = document.getElementById('currency');
const submit = document.getElementById('submit');
const balance = document.getElementById('balance');
const transactions = document.getElementById('transactions');
const filter = document.getElementById('filter');
const filterType = document.getElementById('filter-type');
const filterAmountFrom = document.getElementById('filter-amount-from');
const filterAmountTo = document.getElementById('filter-amount-to');
const filterCurrency = document.getElementById('filter-currency');
const apply = document.getElementById('apply');

let currencies = [];
let transactionsData = [];
let balanceData = 0;
let filterData = {};

const formatAmount = (amount) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const convertAmount = async (from, to, amount) => {
  if (from === to) return amount;

  try {
    const response = await axios.post("https://ivory-ostrich-yoke.cyclic.app/students/convert", {
      from,
      to,
      amount,
    });

    
    return response.data.converted;
  } catch (error) {
    console.error("Error converting amount:", error);
    throw error;
  }
};

const updateBalance = () => {
  balance.textContent = `Balance: $${formatAmount(balanceData)}`;
};

const createTransaction = (transaction) => {
  const div = document.createElement('div');
  div.classList.add('transaction');
  div.classList.add(transaction.type);

  const span = document.createElement('span');
  span.textContent = `${transaction.currency.symbol}${formatAmount(transaction.amount)}`;

  const button = document.createElement('button');
  button.classList.add('delete');
  button.innerHTML = '<i class="fas fa-trash-alt"></i>';
  button.addEventListener('click', () => {
    transactionsData = transactionsData.filter((t) => t.id !== transaction.id);
    updateBalance();
    localStorage.setItem('transactions', JSON.stringify(transactionsData));
    renderTransactions();
  });

  div.appendChild(span);
  div.appendChild(button);

  return div;
};

const renderTransactions = () => {
  transactions.innerHTML = '';

  const filteredTransactions = transactionsData.filter((transaction) => {
    if (
      filterData.type &&
      filterData.type !== 'all' &&
      filterData.type !== transaction.type
    )
      return false;

    if (filterData.amountFrom && filterData.amountFrom > transaction.amount)
      return false;

    if (filterData.amountTo && filterData.amountTo < transaction.amount)
      return false;

    if (
      filterData.currency &&
      filterData.currency !== 'all' &&
      filterData.currency !== transaction.currency.code
    )
      return false;

    return true;
  });

  for (const transaction of filteredTransactions) {
    const transactionElement = createTransaction(transaction);
    transactions.appendChild(transactionElement);
  }
};

const fetchCurrencies = async () => {
  try {
    const response = await axios.get("https://crowded-cyan-wildebeest.cyclic.app/students/available");
    currencies = response.data;

    for (const currency of currencies) {
      const option = document.createElement('option');
      option.value = currency.code;


      option.textContent = `${currency.code} - ${currency.name}`;
      curren.appendChild(option);

      const filterOption = document.createElement('option');
      filterOption.value = currency.code;
      filterOption.textContent = `${currency.code} - ${currency.name}`;
      filterCurrency.appendChild(filterOption);
    }
  } catch (error) {
    console.error("Error fetching currencies:", error);
  }
};

const init = async () => {
  await fetchCurrencies();

  const storedTransactions = localStorage.getItem('transactions');
  if (storedTransactions) {
    transactionsData = JSON.parse(storedTransactions);
  }

  for (const transaction of transactionsData) {
    const amountInUSD = await convertAmount(
      transaction.currency.code,
   
      'USD',
      transaction.amount
    );  

    if (transaction.type === 'income') {
      balanceData += amountInUSD;
    } else {
      balanceData -= amountInUSD;
    }
  } 

  updateBalance();
  renderTransactions();
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const typeValue = type.value;
  const amountValue = parseFloat(amount.value);
  const currencyValue = currency.value;

  if (!typeValue || !amountValue || !currencyValue) {
    alert('Please fill in all the fields');
    return;
  }

  const currencyObject = currencies.find((c) => c.code === currencyValue);

  const transaction = {
    id: Math.random().toString(36).substr(2, 9),
    type: typeValue,
    amount: amountValue,
    currency: currencyObject,
  };

  const amountInUSD = await convertAmount(
    transaction.currency.code,
    'USD',
    transaction.amount
  );

  if (transaction.type === 'income') {
    balanceData += amountInUSD;
  } else {
    balanceData -= amountInUSD;
  }

  updateBalance();
  transactionsData.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactionsData));
  renderTransactions();

  type.value = '';
  amount.value = '';
  currency.value = '';
});

filter.addEventListener('click', () => {
  filter.classList.toggle('active');
});

apply.addEventListener('click', () => {
  const filterTypeValue = filterType.value;
  const filterAmountFromValue = parseFloat(filterAmountFrom.value);
  const filterAmountToValue = parseFloat(filterAmountTo.value);
  const filterCurrencyValue = filterCurrency.value;

  filterData = {
    type: filterTypeValue,
    amountFrom: filterAmountFromValue,
    amountTo: filterAmountToValue,
    currency: filterCurrencyValue,
  };

  renderTransactions();
  filter.classList.remove('active');
});

init();

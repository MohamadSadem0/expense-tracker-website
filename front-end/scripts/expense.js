const form = document.getElementById('form');
const type = document.getElementById('type');
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
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

const baseUrl="https://crowded-cyan-wildebeest.cyclic.app/students/available"
const convertUrl="https://ivory-ostrich-yoke.cyclic.app/students/convert"

const formatAmount = (amount) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

    // Fetch currencies from the provided API
    fetch('https://ivory-ostrich-yoke.cyclic.app/students/available')
      .then(response => response.json())
      .then(data => {
        const currencySelect = document.getElementById('currency');
        data.forEach(currency => {
          const option = document.createElement('option');
          option.value = currency.code;
          option.text = `${currency.name} (${currency.symbol})`;
          currencySelect.appendChild(option);
        });
      });

    // Initialize transactions from local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Display transactions
    const transactionList = document.getElementById('transactionList');
    transactions.forEach(transaction => {
      const li = document.createElement('li');
      li.textContent = `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: ${transaction.amount} ${transaction.currency}`;
      transactionList.appendChild(li);
    });

    // Update total balance
    const totalBalance = document.getElementById('totalBalance');
    const usdRate = 1; // Assume 1:1 conversion for simplicity

    function updateTotalBalance() {
      const balance = transactions.reduce((acc, transaction) => {
        const amountInUSD = transaction.amount * (transaction.currency === 'USD' ? 1 : usdRate);
        return transaction.type === 'income' ? acc + amountInUSD : acc - amountInUSD;
      }, 0);

      totalBalance.textContent = `$${balance.toFixed(2)}`;
    }

    // Function to add a transaction
    function addTransaction() {
      const type = document.getElementById('type').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const currency = document.getElementById('currency').value;

      if (isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
      }

      const newTransaction = {
        type,
        amount,
        currency,
      };

      // Update transactions array
      transactions.push(newTransaction);

      // Update local storage
      localStorage.setItem('transactions', JSON.stringify(transactions));

      // Update UI
      const li = document.createElement('li');
      li.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${amount} ${currency}`;
      transactionList.appendChild(li);

      // Update total balance
      updateTotalBalance();
    }
  

    
        var options = {
          series: [
            {
              data: data,
            },
          ],
          chart: {
            id: "chart2",
            type: "line",
            height: 230,
            toolbar: {
              autoSelected: "pan",
              show: false,
            },
          },
          colors: ["#546E7A"],
          stroke: {
            width: 3,
          },
          dataLabels: {
            enabled: false,
          },
          fill: {
            opacity: 1,
          },
          markers: {
            size: 0,
          },
          xaxis: {
            type: "datetime",
          },
        };

        var chart = new ApexCharts(
          document.querySelector("#chart-line2"),
          options
        );
        chart.render();

        var optionsLine = {
          series: [
            {
              data: data,
            },
          ],
          chart: {
            id: "chart1",
            height: 130,
            type: "area",
            brush: {
              target: "chart2",
              enabled: true,
            },
            selection: {
              enabled: true,
              xaxis: {
                min: new Date("19 Jun 2017").getTime(),
                max: new Date("14 Aug 2017").getTime(),
              },
            },
          },
          colors: ["#008FFB"],
          fill: {
            type: "gradient",
            gradient: {
              opacityFrom: 0.91,
              opacityTo: 0.1,
            },
          },
          xaxis: {
            type: "datetime",
            tooltip: {
              enabled: false,
            },
          },
          yaxis: {
            tickAmount: 2,
          },
        };

        var chartLine = new ApexCharts(
          document.querySelector("#chart-line"),
          optionsLine
        );
        chartLine.render();
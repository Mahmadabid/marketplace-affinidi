const fs = require('fs');

const fetchCurrencyInfo = async () => {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const currencies = await response.json();

    const processedData = currencies.rates;
    processedData['KPW'] = 899.968;


    fs.writeFileSync('Currencies.ts', 'export const currencies = '+ JSON.stringify(processedData, null, 2));

  } catch (error) {
    console.error('Error fetching and processing currency information:', error);
  }
};

fetchCurrencyInfo();

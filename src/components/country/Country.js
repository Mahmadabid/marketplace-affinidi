const fs = require('fs');

const fetchCountryInfo = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const countries = await response.json();

    const processedData = countries.map((country) => {
      const currencies = country.currencies;

      if (currencies && typeof currencies === 'object') {
        const currencyCode = Object.keys(currencies)[0];
        const currencyData = currencies[currencyCode];

        return {
          name: country.name.common,
          currencySymbol: currencyData?.symbol || 'N/A',
          abbreviation: country.cca3 || 'N/A',
        };
      } else {
        return {
          name: country.name.common,
          currencySymbol: 'N/A',
          abbreviation: country.cca3 || 'N/A',
        };
      }
    });

    fs.writeFileSync('countries.ts', JSON.stringify(processedData, null, 2));

  } catch (error) {
    console.error('Error fetching and processing country information:', error);
  }
};

fetchCountryInfo();

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

      if (country.name.common === 'Sudan') {
        return {
          name: country.name.common,
          currencySymbol: '£',
          abbreviation: 'SDG',
        }
      } else if (country.name.common === "Heard Island and McDonald Islands") {
        return {
          name: country.name.common,
          currencySymbol: "$",
          abbreviation: "AUD"
        }
      } else if (country.name.common === "Cuba") {
        return {
          name: country.name.common,
          currencySymbol: "$",
          abbreviation: "CUP"
        }
      } else if (country.name.common === "Antarctica") {
        return {
          name: country.name.common,
          currencySymbol: "$",
          abbreviation: "USD"
        }
      } else if (country.name.common === "Cook Islands") {
        return {
          name: country.name.common,
          currencySymbol: "$",
          abbreviation: "NZD"
        }
      } else if (country.name.common === "Bosnia and Herzegovina") {
        return {
          name: country.name.common,
          currencySymbol: "KM",
          abbreviation: "BAM"
        }
      } else if (country.name.common === "Bouvet Island") {
        return {
          name: country.name.common,
          currencySymbol: "kr",
          abbreviation: "NOK"
        }
      } else if (currencies && typeof currencies === 'object') {
        const currencyCode = Object.keys(currencies)[0];
        const currencyData = currencies[currencyCode];

        return {
          name: country.name.common,
          currencySymbol: currencyData?.symbol || 'N/A',
          abbreviation: currencyCode || 'N/A',
        };
      } else {
        return {
          name: country.name.common,
          currencySymbol: 'N/A',
          abbreviation: 'N/A',
        };
      }
    });

    fs.writeFileSync('CountryList.ts', 'export const countries = ' + JSON.stringify(processedData, null, 2));

  } catch (error) {
    console.error('Error fetching and processing country information:', error);
  }
};

fetchCountryInfo();

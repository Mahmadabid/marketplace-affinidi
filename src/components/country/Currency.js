const fs = require('fs');

const countries = [
    {
        "name": "Andorra",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "French Southern and Antarctic Lands",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Laos",
        "currencySymbol": "₭",
        "abbreviation": "LAK"
    },
    {
        "name": "Canada",
        "currencySymbol": "$",
        "abbreviation": "CAD"
    },
    {
        "name": "Nigeria",
        "currencySymbol": "₦",
        "abbreviation": "NGN"
    },
    {
        "name": "Vanuatu",
        "currencySymbol": "Vt",
        "abbreviation": "VUV"
    },
    {
        "name": "Czechia",
        "currencySymbol": "Kč",
        "abbreviation": "CZK"
    },
    {
        "name": "Malawi",
        "currencySymbol": "MK",
        "abbreviation": "MWK"
    },
    {
        "name": "Mali",
        "currencySymbol": "Fr",
        "abbreviation": "XOF"
    },
    {
        "name": "Iceland",
        "currencySymbol": "kr",
        "abbreviation": "ISK"
    },
    {
        "name": "Norway",
        "currencySymbol": "kr",
        "abbreviation": "NOK"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "currencySymbol": "$",
        "abbreviation": "XCD"
    },
    {
        "name": "Guadeloupe",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Chile",
        "currencySymbol": "$",
        "abbreviation": "CLP"
    },
    {
        "name": "Bermuda",
        "currencySymbol": "$",
        "abbreviation": "BMD"
    },
    {
        "name": "Kuwait",
        "currencySymbol": "د.ك",
        "abbreviation": "KWD"
    },
    {
        "name": "Dominica",
        "currencySymbol": "$",
        "abbreviation": "XCD"
    },
    {
        "name": "Montenegro",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "United States Virgin Islands",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Cameroon",
        "currencySymbol": "Fr",
        "abbreviation": "XAF"
    },
    {
        "name": "Sri Lanka",
        "currencySymbol": "Rs  රු",
        "abbreviation": "LKR"
    },
    {
        "name": "China",
        "currencySymbol": "¥",
        "abbreviation": "CNY"
    },
    {
        "name": "Bangladesh",
        "currencySymbol": "৳",
        "abbreviation": "BDT"
    },
    {
        "name": "Sweden",
        "currencySymbol": "kr",
        "abbreviation": "SEK"
    },
    {
        "name": "Grenada",
        "currencySymbol": "$",
        "abbreviation": "XCD"
    },
    {
        "name": "Turkey",
        "currencySymbol": "₺",
        "abbreviation": "TRY"
    },
    {
        "name": "Guinea",
        "currencySymbol": "Fr",
        "abbreviation": "GNF"
    },
    {
        "name": "Tanzania",
        "currencySymbol": "Sh",
        "abbreviation": "TZS"
    },
    {
        "name": "Rwanda",
        "currencySymbol": "Fr",
        "abbreviation": "RWF"
    },
    {
        "name": "Singapore",
        "currencySymbol": "$",
        "abbreviation": "SGD"
    },
    {
        "name": "Morocco",
        "currencySymbol": "د.م.",
        "abbreviation": "MAD"
    },
    {
        "name": "Saint Barthélemy",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Iraq",
        "currencySymbol": "ع.د",
        "abbreviation": "IQD"
    },
    {
        "name": "Brunei",
        "currencySymbol": "$",
        "abbreviation": "BND"
    },
    {
        "name": "Isle of Man",
        "currencySymbol": "£",
        "abbreviation": "GBP"
    },
    {
        "name": "North Korea",
        "currencySymbol": "₩",
        "abbreviation": "KPW"
    },
    {
        "name": "Iran",
        "currencySymbol": "﷼",
        "abbreviation": "IRR"
    },
    {
        "name": "Curaçao",
        "currencySymbol": "ƒ",
        "abbreviation": "ANG"
    },
    {
        "name": "Paraguay",
        "currencySymbol": "₲",
        "abbreviation": "PYG"
    },
    {
        "name": "Albania",
        "currencySymbol": "L",
        "abbreviation": "ALL"
    },
    {
        "name": "Tajikistan",
        "currencySymbol": "ЅМ",
        "abbreviation": "TJS"
    },
    {
        "name": "Bolivia",
        "currencySymbol": "Bs.",
        "abbreviation": "BOB"
    },
    {
        "name": "Austria",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Saint Kitts and Nevis",
        "currencySymbol": "$",
        "abbreviation": "XCD"
    },
    {
        "name": "United States Minor Outlying Islands",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Colombia",
        "currencySymbol": "$",
        "abbreviation": "COP"
    },
    {
        "name": "Kosovo",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Belize",
        "currencySymbol": "$",
        "abbreviation": "BZD"
    },
    {
        "name": "Guinea-Bissau",
        "currencySymbol": "Fr",
        "abbreviation": "XOF"
    },
    {
        "name": "Marshall Islands",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Myanmar",
        "currencySymbol": "Ks",
        "abbreviation": "MMK"
    },
    {
        "name": "French Polynesia",
        "currencySymbol": "₣",
        "abbreviation": "XPF"
    },
    {
        "name": "Brazil",
        "currencySymbol": "R$",
        "abbreviation": "BRL"
    },
    {
        "name": "Croatia",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Somalia",
        "currencySymbol": "Sh",
        "abbreviation": "SOS"
    },
    {
        "name": "Afghanistan",
        "currencySymbol": "؋",
        "abbreviation": "AFN"
    },
    {
        "name": "Anguilla",
        "currencySymbol": "$",
        "abbreviation": "XCD"
    },
    {
        "name": "Cook Islands",
        "currencySymbol": "$",
        "abbreviation": "NZD"
    },
    {
        "name": "Western Sahara",
        "currencySymbol": "دج",
        "abbreviation": "DZD"
    },
    {
        "name": "New Zealand",
        "currencySymbol": "$",
        "abbreviation": "NZD"
    },
    {
        "name": "Eritrea",
        "currencySymbol": "Nfk",
        "abbreviation": "ERN"
    },
    {
        "name": "Cambodia",
        "currencySymbol": "៛",
        "abbreviation": "KHR"
    },
    {
        "name": "Bahamas",
        "currencySymbol": "$",
        "abbreviation": "BSD"
    },
    {
        "name": "Belarus",
        "currencySymbol": "Br",
        "abbreviation": "BYN"
    },
    {
        "name": "Norfolk Island",
        "currencySymbol": "$",
        "abbreviation": "AUD"
    },
    {
        "name": "Tuvalu",
        "currencySymbol": "$",
        "abbreviation": "AUD"
    },
    {
        "name": "South Georgia",
        "currencySymbol": "£",
        "abbreviation": "SHP"
    },
    {
        "name": "Mauritania",
        "currencySymbol": "UM",
        "abbreviation": "MRU"
    },
    {
        "name": "New Caledonia",
        "currencySymbol": "₣",
        "abbreviation": "XPF"
    },
    {
        "name": "Bulgaria",
        "currencySymbol": "лв",
        "abbreviation": "BGN"
    },
    {
        "name": "Mozambique",
        "currencySymbol": "MT",
        "abbreviation": "MZN"
    },
    {
        "name": "Niue",
        "currencySymbol": "$",
        "abbreviation": "NZD"
    },
    {
        "name": "Estonia",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Italy",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Malta",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Slovenia",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "India",
        "currencySymbol": "₹",
        "abbreviation": "INR"
    },
    {
        "name": "Peru",
        "currencySymbol": "S/ ",
        "abbreviation": "PEN"
    },
    {
        "name": "Burundi",
        "currencySymbol": "Fr",
        "abbreviation": "BIF"
    },
    {
        "name": "Lithuania",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "United States",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Honduras",
        "currencySymbol": "L",
        "abbreviation": "HNL"
    },
    {
        "name": "Tonga",
        "currencySymbol": "T$",
        "abbreviation": "TOP"
    },
    {
        "name": "Saudi Arabia",
        "currencySymbol": "ر.س",
        "abbreviation": "SAR"
    },
    {
        "name": "Suriname",
        "currencySymbol": "$",
        "abbreviation": "SRD"
    },
    {
        "name": "Qatar",
        "currencySymbol": "ر.ق",
        "abbreviation": "QAR"
    },
    {
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "currencySymbol": "£",
        "abbreviation": "GBP"
    },
    {
        "name": "Gibraltar",
        "currencySymbol": "£",
        "abbreviation": "GIP"
    },
    {
        "name": "Northern Mariana Islands",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Mauritius",
        "currencySymbol": "₨",
        "abbreviation": "MUR"
    },
    {
        "name": "Barbados",
        "currencySymbol": "$",
        "abbreviation": "BBD"
    },
    {
        "name": "Réunion",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "British Indian Ocean Territory",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Syria",
        "currencySymbol": "£",
        "abbreviation": "SYP"
    },
    {
        "name": "Egypt",
        "currencySymbol": "£",
        "abbreviation": "EGP"
    },
    {
        "name": "São Tomé and Príncipe",
        "currencySymbol": "Db",
        "abbreviation": "STN"
    },
    {
        "name": "Kiribati",
        "currencySymbol": "$",
        "abbreviation": "AUD"
    },
    {
        "name": "Timor-Leste",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Lesotho",
        "currencySymbol": "L",
        "abbreviation": "LSL"
    },
    {
        "name": "Solomon Islands",
        "currencySymbol": "$",
        "abbreviation": "SBD"
    },
    {
        "name": "Libya",
        "currencySymbol": "ل.د",
        "abbreviation": "LYD"
    },
    {
        "name": "South Korea",
        "currencySymbol": "₩",
        "abbreviation": "KRW"
    },
    {
        "name": "Liechtenstein",
        "currencySymbol": "Fr",
        "abbreviation": "CHF"
    },
    {
        "name": "Nicaragua",
        "currencySymbol": "C$",
        "abbreviation": "NIO"
    },
    {
        "name": "Ecuador",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Maldives",
        "currencySymbol": ".ރ",
        "abbreviation": "MVR"
    },
    {
        "name": "Algeria",
        "currencySymbol": "د.ج",
        "abbreviation": "DZD"
    },
    {
        "name": "Kyrgyzstan",
        "currencySymbol": "с",
        "abbreviation": "KGS"
    },
    {
        "name": "Finland",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Antarctica",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Kenya",
        "currencySymbol": "Sh",
        "abbreviation": "KES"
    },
    {
        "name": "Cuba",
        "currencySymbol": "$",
        "abbreviation": "CUP"
    },
    {
        "name": "Montserrat",
        "currencySymbol": "$",
        "abbreviation": "XCD"
    },
    {
        "name": "Poland",
        "currencySymbol": "zł",
        "abbreviation": "PLN"
    },
    {
        "name": "Åland Islands",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Ethiopia",
        "currencySymbol": "Br",
        "abbreviation": "ETB"
    },
    {
        "name": "Togo",
        "currencySymbol": "Fr",
        "abbreviation": "XOF"
    },
    {
        "name": "Bosnia and Herzegovina",
        "currencySymbol": "KM",
        "abbreviation": "BAM"
    },
    {
        "name": "Uruguay",
        "currencySymbol": "$",
        "abbreviation": "UYU"
    },
    {
        "name": "Guam",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Cape Verde",
        "currencySymbol": "Esc",
        "abbreviation": "CVE"
    },
    {
        "name": "Chad",
        "currencySymbol": "Fr",
        "abbreviation": "XAF"
    },
    {
        "name": "Vatican City",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Palau",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Haiti",
        "currencySymbol": "G",
        "abbreviation": "HTG"
    },
    {
        "name": "Yemen",
        "currencySymbol": "﷼",
        "abbreviation": "YER"
    },
    {
        "name": "Eswatini",
        "currencySymbol": "L",
        "abbreviation": "SZL"
    },
    {
        "name": "Zimbabwe",
        "currencySymbol": "$",
        "abbreviation": "ZWL"
    },
    {
        "name": "Greece",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Israel",
        "currencySymbol": "₪",
        "abbreviation": "ILS"
    },
    {
        "name": "Saint Martin",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Antigua and Barbuda",
        "currencySymbol": "$",
        "abbreviation": "XCD"
    },
    {
        "name": "Cyprus",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Sint Maarten",
        "currencySymbol": "ƒ",
        "abbreviation": "ANG"
    },
    {
        "name": "Monaco",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Fiji",
        "currencySymbol": "$",
        "abbreviation": "FJD"
    },
    {
        "name": "Ukraine",
        "currencySymbol": "₴",
        "abbreviation": "UAH"
    },
    {
        "name": "Martinique",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Hong Kong",
        "currencySymbol": "$",
        "abbreviation": "HKD"
    },
    {
        "name": "Portugal",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Bhutan",
        "currencySymbol": "Nu.",
        "abbreviation": "BTN"
    },
    {
        "name": "Nepal",
        "currencySymbol": "₨",
        "abbreviation": "NPR"
    },
    {
        "name": "France",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Ireland",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "United Arab Emirates",
        "currencySymbol": "د.إ",
        "abbreviation": "AED"
    },
    {
        "name": "Guernsey",
        "currencySymbol": "£",
        "abbreviation": "GBP"
    },
    {
        "name": "Saint Lucia",
        "currencySymbol": "$",
        "abbreviation": "XCD"
    },
    {
        "name": "Dominican Republic",
        "currencySymbol": "$",
        "abbreviation": "DOP"
    },
    {
        "name": "Serbia",
        "currencySymbol": "дин.",
        "abbreviation": "RSD"
    },
    {
        "name": "Botswana",
        "currencySymbol": "P",
        "abbreviation": "BWP"
    },
    {
        "name": "Ivory Coast",
        "currencySymbol": "Fr",
        "abbreviation": "XOF"
    },
    {
        "name": "Ghana",
        "currencySymbol": "₵",
        "abbreviation": "GHS"
    },
    {
        "name": "Comoros",
        "currencySymbol": "Fr",
        "abbreviation": "KMF"
    },
    {
        "name": "Azerbaijan",
        "currencySymbol": "₼",
        "abbreviation": "AZN"
    },
    {
        "name": "United Kingdom",
        "currencySymbol": "£",
        "abbreviation": "GBP"
    },
    {
        "name": "Central African Republic",
        "currencySymbol": "Fr",
        "abbreviation": "XAF"
    },
    {
        "name": "Palestine",
        "currencySymbol": "E£",
        "abbreviation": "EGP"
    },
    {
        "name": "Caribbean Netherlands",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Taiwan",
        "currencySymbol": "$",
        "abbreviation": "TWD"
    },
    {
        "name": "Pitcairn Islands",
        "currencySymbol": "$",
        "abbreviation": "NZD"
    },
    {
        "name": "San Marino",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Svalbard and Jan Mayen",
        "currencySymbol": "kr",
        "abbreviation": "NOK"
    },
    {
        "name": "Djibouti",
        "currencySymbol": "Fr",
        "abbreviation": "DJF"
    },
    {
        "name": "Wallis and Futuna",
        "currencySymbol": "₣",
        "abbreviation": "XPF"
    },
    {
        "name": "Denmark",
        "currencySymbol": "kr",
        "abbreviation": "DKK"
    },
    {
        "name": "Papua New Guinea",
        "currencySymbol": "K",
        "abbreviation": "PGK"
    },
    {
        "name": "Madagascar",
        "currencySymbol": "Ar",
        "abbreviation": "MGA"
    },
    {
        "name": "Bouvet Island",
        "currencySymbol": "kr",
        "abbreviation": "NOK"
    },
    {
        "name": "Hungary",
        "currencySymbol": "Ft",
        "abbreviation": "HUF"
    },
    {
        "name": "Tokelau",
        "currencySymbol": "$",
        "abbreviation": "NZD"
    },
    {
        "name": "Trinidad and Tobago",
        "currencySymbol": "$",
        "abbreviation": "TTD"
    },
    {
        "name": "Gambia",
        "currencySymbol": "D",
        "abbreviation": "GMD"
    },
    {
        "name": "Luxembourg",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Cocos (Keeling) Islands",
        "currencySymbol": "$",
        "abbreviation": "AUD"
    },
    {
        "name": "Republic of the Congo",
        "currencySymbol": "Fr",
        "abbreviation": "XAF"
    },
    {
        "name": "Argentina",
        "currencySymbol": "$",
        "abbreviation": "ARS"
    },
    {
        "name": "DR Congo",
        "currencySymbol": "FC",
        "abbreviation": "CDF"
    },
    {
        "name": "Greenland",
        "currencySymbol": "kr.",
        "abbreviation": "DKK"
    },
    {
        "name": "Jordan",
        "currencySymbol": "د.ا",
        "abbreviation": "JOD"
    },
    {
        "name": "Belgium",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Switzerland",
        "currencySymbol": "Fr.",
        "abbreviation": "CHF"
    },
    {
        "name": "Indonesia",
        "currencySymbol": "Rp",
        "abbreviation": "IDR"
    },
    {
        "name": "Lebanon",
        "currencySymbol": "ل.ل",
        "abbreviation": "LBP"
    },
    {
        "name": "Malaysia",
        "currencySymbol": "RM",
        "abbreviation": "MYR"
    },
    {
        "name": "Cayman Islands",
        "currencySymbol": "$",
        "abbreviation": "KYD"
    },
    {
        "name": "Slovakia",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Armenia",
        "currencySymbol": "֏",
        "abbreviation": "AMD"
    },
    {
        "name": "Christmas Island",
        "currencySymbol": "$",
        "abbreviation": "AUD"
    },
    {
        "name": "Mongolia",
        "currencySymbol": "₮",
        "abbreviation": "MNT"
    },
    {
        "name": "Saint Pierre and Miquelon",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Japan",
        "currencySymbol": "¥",
        "abbreviation": "JPY"
    },
    {
        "name": "South Africa",
        "currencySymbol": "R",
        "abbreviation": "ZAR"
    },
    {
        "name": "Philippines",
        "currencySymbol": "₱",
        "abbreviation": "PHP"
    },
    {
        "name": "Micronesia",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Germany",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Latvia",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Jamaica",
        "currencySymbol": "$",
        "abbreviation": "JMD"
    },
    {
        "name": "Macau",
        "currencySymbol": "P",
        "abbreviation": "MOP"
    },
    {
        "name": "Nauru",
        "currencySymbol": "$",
        "abbreviation": "AUD"
    },
    {
        "name": "Faroe Islands",
        "currencySymbol": "kr",
        "abbreviation": "DKK"
    },
    {
        "name": "Guyana",
        "currencySymbol": "$",
        "abbreviation": "GYD"
    },
    {
        "name": "Burkina Faso",
        "currencySymbol": "Fr",
        "abbreviation": "XOF"
    },
    {
        "name": "Sudan",
        "currencySymbol": "£",
        "abbreviation": "SDG"
    },
    {
        "name": "Russia",
        "currencySymbol": "₽",
        "abbreviation": "RUB"
    },
    {
        "name": "Mayotte",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Australia",
        "currencySymbol": "$",
        "abbreviation": "AUD"
    },
    {
        "name": "Liberia",
        "currencySymbol": "$",
        "abbreviation": "LRD"
    },
    {
        "name": "Mexico",
        "currencySymbol": "$",
        "abbreviation": "MXN"
    },
    {
        "name": "Tunisia",
        "currencySymbol": "د.ت",
        "abbreviation": "TND"
    },
    {
        "name": "Aruba",
        "currencySymbol": "ƒ",
        "abbreviation": "AWG"
    },
    {
        "name": "Kazakhstan",
        "currencySymbol": "₸",
        "abbreviation": "KZT"
    },
    {
        "name": "Oman",
        "currencySymbol": "ر.ع.",
        "abbreviation": "OMR"
    },
    {
        "name": "French Guiana",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Niger",
        "currencySymbol": "Fr",
        "abbreviation": "XOF"
    },
    {
        "name": "Turkmenistan",
        "currencySymbol": "m",
        "abbreviation": "TMT"
    },
    {
        "name": "Sierra Leone",
        "currencySymbol": "Le",
        "abbreviation": "SLL"
    },
    {
        "name": "Samoa",
        "currencySymbol": "T",
        "abbreviation": "WST"
    },
    {
        "name": "Senegal",
        "currencySymbol": "Fr",
        "abbreviation": "XOF"
    },
    {
        "name": "Georgia",
        "currencySymbol": "₾",
        "abbreviation": "GEL"
    },
    {
        "name": "Namibia",
        "currencySymbol": "$",
        "abbreviation": "NAD"
    },
    {
        "name": "South Sudan",
        "currencySymbol": "£",
        "abbreviation": "SSP"
    },
    {
        "name": "Thailand",
        "currencySymbol": "฿",
        "abbreviation": "THB"
    },
    {
        "name": "Bahrain",
        "currencySymbol": ".د.ب",
        "abbreviation": "BHD"
    },
    {
        "name": "Heard Island and McDonald Islands",
        "currencySymbol": "$",
        "abbreviation": "AUD"
    },
    {
        "name": "Falkland Islands",
        "currencySymbol": "£",
        "abbreviation": "FKP"
    },
    {
        "name": "Jersey",
        "currencySymbol": "£",
        "abbreviation": "GBP"
    },
    {
        "name": "Vietnam",
        "currencySymbol": "₫",
        "abbreviation": "VND"
    },
    {
        "name": "Guatemala",
        "currencySymbol": "Q",
        "abbreviation": "GTQ"
    },
    {
        "name": "Moldova",
        "currencySymbol": "L",
        "abbreviation": "MDL"
    },
    {
        "name": "North Macedonia",
        "currencySymbol": "den",
        "abbreviation": "MKD"
    },
    {
        "name": "Uzbekistan",
        "currencySymbol": "so'm",
        "abbreviation": "UZS"
    },
    {
        "name": "Romania",
        "currencySymbol": "lei",
        "abbreviation": "RON"
    },
    {
        "name": "Uganda",
        "currencySymbol": "Sh",
        "abbreviation": "UGX"
    },
    {
        "name": "El Salvador",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Zambia",
        "currencySymbol": "ZK",
        "abbreviation": "ZMW"
    },
    {
        "name": "Gabon",
        "currencySymbol": "Fr",
        "abbreviation": "XAF"
    },
    {
        "name": "Equatorial Guinea",
        "currencySymbol": "Fr",
        "abbreviation": "XAF"
    },
    {
        "name": "Spain",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "Netherlands",
        "currencySymbol": "€",
        "abbreviation": "EUR"
    },
    {
        "name": "British Virgin Islands",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Benin",
        "currencySymbol": "Fr",
        "abbreviation": "XOF"
    },
    {
        "name": "Pakistan",
        "currencySymbol": "₨",
        "abbreviation": "PKR"
    },
    {
        "name": "Panama",
        "currencySymbol": "B/.",
        "abbreviation": "PAB"
    },
    {
        "name": "Turks and Caicos Islands",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Angola",
        "currencySymbol": "Kz",
        "abbreviation": "AOA"
    },
    {
        "name": "American Samoa",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Venezuela",
        "currencySymbol": "Bs.S.",
        "abbreviation": "VES"
    },
    {
        "name": "Costa Rica",
        "currencySymbol": "₡",
        "abbreviation": "CRC"
    },
    {
        "name": "Puerto Rico",
        "currencySymbol": "$",
        "abbreviation": "USD"
    },
    {
        "name": "Seychelles",
        "currencySymbol": "₨",
        "abbreviation": "SCR"
    }
]

const Currencies = {
    "USD": 1,
    "AED": 3.6725,
    "AFN": 74.49522,
    "ALL": 96.111704,
    "AMD": 404.630053,
    "ANG": 1.79,
    "AOA": 843.504683,
    "ARS": 827.35,
    "AUD": 1.53093,
    "AWG": 1.79,
    "AZN": 1.699978,
    "BAM": 1.808584,
    "BBD": 2,
    "BDT": 109.737034,
    "BGN": 1.808216,
    "BHD": 0.376,
    "BIF": 2842.877671,
    "BMD": 1,
    "BND": 1.339917,
    "BOB": 6.926649,
    "BRL": 4.920194,
    "BSD": 1,
    "BTN": 82.983621,
    "BWP": 13.629653,
    "BYN": 3.23814,
    "BZD": 2,
    "CAD": 1.343915,
    "CDF": 2716.067932,
    "CHF": 0.863956,
    "CLP": 932.016194,
    "CNY": 7.193988,
    "COP": 3904.92565,
    "CRC": 513.161407,
    "CUP": 24,
    "CVE": 101.963614,
    "CZK": 22.972539,
    "DJF": 177.721,
    "DKK": 6.898427,
    "DOP": 58.807613,
    "DZD": 134.789127,
    "EGP": 30.89626,
    "ERN": 15,
    "ETB": 56.677303,
    "EUR": 0.924729,
    "FJD": 2.234387,
    "FKP": 0.789226,
    "FOK": 6.898426,
    "GBP": 0.78924,
    "GEL": 2.671304,
    "GGP": 0.789226,
    "GHS": 12.378624,
    "GIP": 0.789226,
    "GMD": 65.408644,
    "GNF": 8585.043287,
    "GTQ": 7.811715,
    "GYD": 209.275733,
    "HKD": 7.820273,
    "HNL": 24.666837,
    "HRK": 6.967259,
    "HTG": 131.640887,
    "HUF": 354.033764,
    "IDR": 15695.419403,
    "ILS": 3.658939,
    "IMP": 0.789226,
    "INR": 82.983687,
    "IQD": 1309.01141,
    "IRR": 42015.045475,
    "ISK": 136.197628,
    "JEP": 0.789226,
    "JMD": 155.554206,
    "JOD": 0.709,
    "JPY": 147.547441,
    "KES": 160.459341,
    "KGS": 89.374692,
    "KHR": 4093.436206,
    "KID": 1.530895,
    "KMF": 454.929575,
    "KRW": 1330.809455,
    "KWD": 0.307563,
    "KYD": 0.833333,
    "KZT": 449.687033,
    "LAK": 20609.678114,
    "LBP": 15000,
    "LKR": 312.811657,
    "LRD": 192.027991,
    "LSL": 18.775587,
    "LYD": 4.826999,
    "MAD": 9.999135,
    "MDL": 17.804384,
    "MGA": 4526.019482,
    "MKD": 56.714424,
    "MMK": 2102.995175,
    "MNT": 3429.255984,
    "MOP": 8.055251,
    "MRU": 39.991002,
    "MUR": 45.550202,
    "MVR": 15.449795,
    "MWK": 1692.682111,
    "MXN": 17.13839,
    "MYR": 4.724922,
    "MZN": 63.888957,
    "NAD": 18.775587,
    "NGN": 1315.717806,
    "NIO": 36.629487,
    "NOK": 10.595574,
    "NPR": 132.773794,
    "NZD": 1.64655,
    "OMR": 0.384497,
    "PAB": 1,
    "PEN": 3.810766,
    "PGK": 3.760074,
    "PHP": 56.071503,
    "PKR": 276.553543,
    "PLN": 3.986062,
    "PYG": 7297.159968,
    "QAR": 3.64,
    "RON": 4.5949,
    "RSD": 108.520849,
    "RUB": 91.03317,
    "RWF": 1288.746337,
    "SAR": 3.75,
    "SBD": 8.454977,
    "SCR": 13.244945,
    "SDG": 509.048931,
    "SEK": 10.484326,
    "SGD": 1.33955,
    "SHP": 0.789226,
    "SLE": 22.547279,
    "SLL": 22547.278774,
    "SOS": 571.512624,
    "SRD": 36.742073,
    "SSP": 1105.242374,
    "STN": 22.655498,
    "SYP": 12907.606861,
    "SZL": 18.775587,
    "THB": 35.551349,
    "TJS": 10.947858,
    "TMT": 3.499807,
    "TND": 3.120525,
    "TOP": 2.344362,
    "TRY": 30.501551,
    "TTD": 6.758038,
    "TVD": 1.530895,
    "TWD": 31.304965,
    "TZS": 2524.240935,
    "UAH": 37.575061,
    "UGX": 3814.118813,
    "UYU": 39.07725,
    "UZS": 12384.16266,
    "VES": 36.2859,
    "VND": 24373.588866,
    "VUV": 120.039341,
    "WST": 2.731668,
    "XAF": 606.572767,
    "XCD": 2.7,
    "XDR": 0.748958,
    "XOF": 606.572767,
    "XPF": 110.347998,
    "YER": 250.21445,
    "ZAR": 18.77637,
    "ZMW": 27.197906,
    "ZWL": 10402.106266,
    "KPW": 899.968
}

const findMatchingCountries = () => {
    const matchingCountries = [];

    countries.forEach((country) => {
        const currencyRate = Currencies[country.abbreviation];

        matchingCountries.push({
            name: country.name,
            currencySymbol: country.currencySymbol,
            abbreviation: country.abbreviation,
            currencyRate: currencyRate !== undefined ? currencyRate : -10
        });
    });

    return matchingCountries;
};

const matchingCountries = findMatchingCountries();

const resultJSON = JSON.stringify(matchingCountries, null, 2);

fs.writeFileSync('Countries.ts', 'export const countries = ' + resultJSON);
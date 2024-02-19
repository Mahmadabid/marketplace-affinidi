# Pixel Marketplace

[Marketplace App](https://pixels-market.vercel.app/)

## Technologies used

* Affinidi
* Nextjs
* Typescript

### Affinidi

Affinidi is used to handle Authentication of users and provide requested data of user to the web app. In Pixel Marketplace Affinidi is integrated to enhance user experience, handle authentication and displayng personalized features in marketplace.

### Affinidi Information Used

Currently Affinidi offers various data points about users and Pixel Marketplace is using all of them to offer a personalized and enhanced experience.

* **Name**

Affinidi gives complete name and nickname as well. Name includes First, Middle and Last Name. First and Last name is used in [Checkout page](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/pages/checkout.tsx). Nickname is used to greet users when they login to the Pixel Marketplace. Middle Name is used in [Profile Page](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/pages/profile.tsx).

* **Email**

Email is used to verify the users and is used in [Checkout page](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/pages/checkout.tsx).

* **Phone Number, Address, Postal Code, City**

Phone Number, Address, Postal Code, City are also used in checkout page to enhance user experience. All these fields are filled automatically.

* **Picture**

Picture is used in [Profile Page](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/pages/profile.tsx) and [Home Page](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/pages/index.tsx). Picture is displayed for user in Header for logout and navigation. In profile page it is used in completing profile of user.

* **Gender**

Products are displayed according to user Gender. User can navigate between genders or select All to display both products.
 
* **Birthdate**

Based on Age products or divided into kids and Adults section. Age is calculated from birthdate and Products of relevant category are displayed.
 
* **Country**

[Code](https://github.com/Mahmadabid/marketplace-affinidi/tree/master/src/components/country)

Country displays products in User's native currency to enhance User experience. Countries are fetched using ```https://restcountries.com/v3.1/all``` API. Missing countries are added in it and exported as a typesript variable in [Country.js](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/components/country/Country.js) file and exported variable in [CountryList.ts](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/components/country/CountryList.ts).

Currencies conversion rates are fetched thorugh ```https://open.er-api.com/v6/latest/USD``` API. Missing currencies are added using [CurrencyList.js](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/components/country/CurrencyList.js) file and exported as typescript variable in [Currencies.ts](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/components/country/Currencies.ts).

For better speed rates are prefetched an.d arent fetched on request. So data may become old. After countries and currencies are fethed they are merged using [Currency.js](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/components/country/Currency.js) which generates a typescript variable [Countries.ts](https://github.com/Mahmadabid/marketplace-affinidi/blob/master/src/components/country/Countries.ts) containing all information about countries.

* **LivenessCheck**

LivenessCheck is used to assign a blue tick checkmark to the user. Verified users will get 1% discount on all shop items. Liveness check is used in profile page and Home Page.
 
 
### User Experience

User experience is enhanced by search filters and sort features. 

**Filters**

User can sort according to:

* Name (Descending)
* Name (Ascending)
* Price (Descending)
* Price (Ascending)

User can add minimum and maximum price limit.

User can set gender and age filter.

**Search**

User can search different products by typing the name also user can apply above filters for each search.

### Payment
Two payments methods are supported.
1. Cash on delivery
2. [Pixel Bank](https://my-space-affinidi.vercel.app/bank)

##### Pixel Bank
Pixels Marketplace has integrated Pixel Bank to offer users online payments. Users can view there balance in Pixels Marketplace and directly make payments from here.

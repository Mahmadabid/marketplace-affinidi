import { countries } from "@/components/country/Countries";
import Modal from "@/components/shop/Modal";
import Settings from "@/components/shop/settings/Settings";
import { CountryContext } from "@/utils/CountryContext";
import { UserContext } from "@/utils/UserContext";
import { faCogs, faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import stringSimilarity from 'string-similarity';
import Cookies from 'js-cookie';
import { categories, convertedPrice, discountedPrice, products } from "@/components/shop/utils";
import Product from "@/components/shop/Product";
import SearchSettings from "@/components/shop/settings/SearchSettings";

const ProductDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const [switchCountry, setSwitchCountry] = useState(0);
  const [search, setSearch] = useState('');
  const [showSettings, setShowSettings] = useState(true);
  const [showSearchSettings, setShowSearchSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [User, _] = useContext(UserContext);
  const [selectedGender, setSelectedGender] = useState(User.user.gender ? User.user.gender === 'male' ? 'Men' : User.user.gender === 'female' ? 'Women' : 'All' : 'All');
  const [selectedSearchGender, setSelectedSearchGender] = useState(User.user.gender ? User.user.gender === 'male' ? 'Men' : User.user.gender === 'female' ? 'Women' : 'All' : 'All');
  const [country, setCountry] = useContext(CountryContext);

  useEffect(() => {
    const fetchCountry = localStorage.getItem('country');
    if (fetchCountry) {
      setSwitchCountry(2);
    } else {
      setSwitchCountry(1);
    }
  }, []);

  useEffect(() => {
    const fecthSetting = Cookies.get('setting');
    if (fecthSetting) {
      setShowSettings(false);
    }
  }, [])

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (switchCountry !== 1) return;

    if (User.user.country) {
      const userCountryName = User.user.country;

      const matches = stringSimilarity.findBestMatch(
        userCountryName,
        countries.map((c) => c.name)
      );

      const bestMatch = matches.bestMatch;
      const closestCountry = countries.find((c) => c.name === bestMatch.target);

      if (closestCountry) {
        setCountry({
          name: closestCountry.name,
          currencySymbol: closestCountry.currencySymbol,
          abbreviation: closestCountry.abbreviation,
          currencyRate: closestCountry.currencyRate,
        });
      }
    } else {
      setCountry({
        name: "United States",
        currencySymbol: "$",
        abbreviation: "USD",
        currencyRate: 1,
      });
    }
  }, [User, switchCountry]);

  const handleShowSearch = () => {
    setSearch('');
    setShowSearch(prev => !prev);
  }

  const filterProducts = () => {
    if (search) {
      const filtered = products.filter((product) => {
        const genderMatch = selectedSearchGender === 'All' || product.gender === selectedSearchGender;

        if (!genderMatch) {
          return false;
        }

        const searchMatch = stringSimilarity.compareTwoStrings(product.name.toLowerCase(), search.toLowerCase()) > 0.2;

        if (!searchMatch) {
          return false;
        }

        const priceMatch =
          (!minPrice || convertedPrice(User.user.verified ? discountedPrice(product.price, User.user.verified) : product.price, country.currencyRate) >= parseInt(minPrice, 10)) &&
          (!maxPrice || convertedPrice(User.user.verified ? discountedPrice(product.price, User.user.verified) : product.price, country.currencyRate) <= parseInt(maxPrice, 10));

        return priceMatch;
      });

      const sortedProducts = filtered.sort((a, b) => {
        switch (sortOrder) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'price-asc':
            return convertedPrice(User.user.verified ? discountedPrice(a.price, User.user.verified) : a.price, country.currencyRate) - convertedPrice(User.user.verified ? discountedPrice(b.price, User.user.verified) : b.price, country.currencyRate);
          case 'price-desc':
            return convertedPrice(User.user.verified ? discountedPrice(b.price, User.user.verified) : b.price, country.currencyRate) - convertedPrice(User.user.verified ? discountedPrice(a.price, User.user.verified) : a.price, country.currencyRate);
          default:
            return 0;
        }
      });

      return sortedProducts;
    } else {
      return products.filter(product => product.gender === selectedGender || selectedGender === 'All');
    }
  };

  const filteredProducts = filterProducts();

  return (
    <div>
      <div className="h-[1px] border-b-[1px] border-b-gray-400" />
      <div className="bg-white border-b-[1px] p-2 font-medium border-b-gray-400 shadow-lg">
        <ol className="flex flex-wrap justify-center items-center space-x-4 mx-2">
          <li onClick={() => setShowSettings(true)} className="hover:cursor-pointer"><FontAwesomeIcon className={showSettings ? 'text-slate-500' : ''} icon={faCogs} /></li>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`hover:cursor-pointer ${selectedGender === category ? 'text-slate-500' : ''}`}
              onClick={() => setSelectedGender(category)}
            >
              {category}
            </li>
          ))}
          <li onClick={handleShowSearch} className="hover:cursor-pointer">
            <FontAwesomeIcon icon={faSearch} className={showSearch ? 'text-slate-500' : ''} />
          </li>
        </ol>
      </div>
      {showSettings && <Settings setShowSettings={setShowSettings} country={country} setCountry={setCountry} />}
      {showSearch && <div className="flex justify-center flex-col items-center my-3">
        <div className="relative">
          <input className="rounded bg-gray-200 p-1 px-2 pr-8" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Products" />
          <FontAwesomeIcon icon={faSliders} className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer" onClick={() => setShowSearchSettings(true)} />
        </div>
        <p className="text-sky-600 font-medium my-1">Type Name to start filtering</p>
      </div>}
      {showSearchSettings && <SearchSettings categories={categories} minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} selectedSearchGender={selectedSearchGender} setSelectedSearchGender={setSelectedSearchGender} sortOrder={sortOrder} setSortOrder={setSortOrder} setShowSearchSettings={setShowSearchSettings} />}
      <div className="flex flex-wrap justify-center mt-8">
        {showModal && <Modal closeModal={closeModal} />}
        {filteredProducts.map((product, index) => (
          <Product key={index} product={product} openModal={openModal} />
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;

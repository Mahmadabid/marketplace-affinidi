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
import { calculateAge, categories, convertedPrice, discountedPrice, products } from "@/components/shop/utils";
import Product from "@/components/shop/Product";
import SearchSettings from "@/components/shop/settings/SearchSettings";
import FilterSettings from "@/components/shop/settings/FilterSettings";

const ProductDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [showSettings, setShowSettings] = useState(true);
  const [showSearchSettings, setShowSearchSettings] = useState(false);
  const [showFilterSettings, setShowFilterSettings] = useState(false);
  const [showSortSettings, setShowSortSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const [filterSortOrder, setFilterSortOrder] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [User, _] = useContext(UserContext);
  const [selectedGender, setSelectedGender] = useState(User.user.gender ? User.user.gender === 'male' ? 'Men' : User.user.gender === 'female' ? 'Women' : 'All' : 'All');
  const [userAge, setUserAge] = useState(User.user.birthdate ? calculateAge(User.user.birthdate) : 'adults')
  const [searchUserAge, setSearchUserAge] = useState(User.user.birthdate ? calculateAge(User.user.birthdate) : 'adults')
  const [country, setCountry] = useContext(CountryContext);

  useEffect(() => {
    const fecthSetting = Cookies.get('setting');
    if (fecthSetting) {
      setShowSettings(false);
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleShowSearch = () => {
    setSearch('');
    setShowSearch(prev => !prev);
  }

  const filterProducts = () => {

    if (search) {
      const filtered = products.filter((product) => {
        const genderMatch = selectedGender === 'All' || product.gender === selectedGender || product.gender === 'Unisex';

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

      const finalSortedProducts = sortedProducts.sort((a, b) => {
        if (searchUserAge === 'kids') {
          if (a.age === 'kids' && b.age === 'adults') {
            return -1;
          } else if (a.age === 'adults' && b.age === 'kids') {
            return 1;
          }
        } else if (searchUserAge === 'adults') {
          if (a.age === 'adults' && b.age === 'kids') {
            return -1;
          } else if (a.age === 'kids' && b.age === 'adults') {
            return 1;
          }
        }

        return 0;
      });

      return finalSortedProducts;
    } else {
      const filtered = products.filter(product => {
        const genderMatch = selectedGender === 'All' || product.gender === selectedGender || product.gender === 'Unisex';

        if (!genderMatch) {
          return false;
        }

        const priceMatch =
          (!filterMinPrice || convertedPrice(User.user.verified ? discountedPrice(product.price, User.user.verified) : product.price, country.currencyRate) >= parseInt(filterMinPrice, 10)) &&
          (!filterMaxPrice || convertedPrice(User.user.verified ? discountedPrice(product.price, User.user.verified) : product.price, country.currencyRate) <= parseInt(filterMaxPrice, 10));

        return priceMatch;
      });

      const sortedProducts = filtered.sort((a, b) => {
        switch (filterSortOrder) {
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

      const finalSortedProducts = sortedProducts.sort((a, b) => {
        if (userAge === 'kids') {
          if (a.age === 'kids' && b.age === 'adults') {
            return -1;
          } else if (a.age === 'adults' && b.age === 'kids') {
            return 1;
          }
        } else if (userAge === 'adults') {
          if (a.age === 'adults' && b.age === 'kids') {
            return -1;
          } else if (a.age === 'kids' && b.age === 'adults') {
            return 1;
          }
        }

        return 0;
      });

      return finalSortedProducts;
    }
  };

  const filteredProducts = filterProducts();

  const handleFilterOrder = () => {
    setShowSortSettings(prev => !prev);
    if (showSortSettings) {
      setFilterSortOrder('default')
    }
  }

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
      {showSearchSettings && <SearchSettings searchUserAge={searchUserAge} setSearchUserAge={setSearchUserAge} categories={categories} minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} selectedGender={selectedGender} setSelectedGender={setSelectedGender} sortOrder={sortOrder} setSortOrder={setSortOrder} setShowSearchSettings={setShowSearchSettings} />}
      {!showSearch && <div className="flex justify-center my-3 items-center">
        <FilterSettings userAge={userAge} setUserAge={setUserAge} setFilterMaxPrice={setFilterMaxPrice} setFilterMinPrice={setFilterMinPrice} filterMaxPrice={filterMaxPrice} filterMinPrice={filterMinPrice} setFilterSortOrder={setFilterSortOrder} setShowFilterSettings={setShowFilterSettings} showFilterSettings={showFilterSettings} showSortSettings={showSortSettings} filterSortOrder={filterSortOrder} handleFilterOrder={handleFilterOrder} />
      </div>}
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

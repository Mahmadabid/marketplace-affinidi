import { countries } from "@/components/country/Countries";
import Modal from "@/components/shop/Modal";
import Settings from "@/components/shop/Settings";
import { useCartContext } from "@/utils/CartContext";
import { CountryContext } from "@/utils/CountryContext";
import { UserContext } from "@/utils/UserContext";
import { faCogs, faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import stringSimilarity from 'string-similarity';
import Cookies from 'js-cookie';

const ProductDisplay = () => {
  const { addToCart } = useCartContext();
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

  const products = [
    { id: 1, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png', quantity: 1, description: 'hkjasdf jfhkjashf kashdfjshdf sjhkjh', gender: 'Women' },
    { id: 2, name: 'T-Shirt', price: 15, imageUrl: 'tee.png', quantity: 1, description: 'hkjasdf jfhkjas', gender: 'Men' },
    { id: 3, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png', quantity: 1, description: 'hkjasdf jfhkjashf kashdfjshdf sjhkjh', gender: 'Women' },
    { id: 4, name: 'T-Shirt', price: 15, imageUrl: 'tee.png', quantity: 1, description: 'hkjasdf jfhkjas', gender: 'Men' },
    { id: 5, name: 'Sweater', price: 20, imageUrl: 'https://d2z0lqci37nukm.cloudfront.net/media/catalog/product/cache/5a319794f6868ce12b948b8c65d98dde/m/-/m-sw06-m112-ebony201_rbpoybyydv2tloxh.webp', quantity: 1, description: 'Some description', gender: 'Women' },
  ];

  const convertedPrice = (price: number) => {
    const converted = price * country.currencyRate;
    return Number(converted.toFixed(2));
  };

  const discountedPrice = (price: number) => {
    const converted = User.user.verified ? price - price * 0.01 : price;
    return Number(converted.toFixed(2));
  };

  const categories = ['Men', 'Women', 'All'];

  const filterProducts = () => {
    if (search) {
      return products.filter((product) => {
        const genderMatch =
          selectedGender === 'All' || product.gender === selectedGender;

        if (!genderMatch) {
          return false;
        }

        const searchMatch =
          stringSimilarity.compareTwoStrings(
            product.name.toLowerCase(),
            search.toLowerCase()
          ) > 0.2;

        if (!searchMatch) {
          return false;
        }

        const priceMatch =
          (!minPrice || convertedPrice(User.user.verified ? discountedPrice(product.price) : product.price) >= parseInt(minPrice, 10)) &&
          (!maxPrice || convertedPrice(User.user.verified ? discountedPrice(product.price) : product.price) <= parseInt(maxPrice, 10));

        return priceMatch;
      });
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
      {showSearch && <div className="flex justify-center items-center my-3">
        <div className="relative">
          <input className="rounded bg-gray-200 p-1 px-2 pr-8" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Products" />
          <FontAwesomeIcon icon={faSliders} className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer" onClick={() => setShowSearchSettings(true)} />
        </div>
      </div>}
      {showSearchSettings && <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60 min-w-screen min-h-screen">
        <div className="bg-[#f1f1f5] rounded border border-gray-500 mx-1">
          <div className="flex justify-center items-center flex-col p-3 px-4">
            <div>
              <h2 className="font-medium text-2xl text-sky-600 my-2">Search in:</h2>
              <ol className="flex flex-wrap justify-center items-center space-x-4 mx-2">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className={`hover:cursor-pointer font-medium text-lg mb-2 ${selectedGender === category ? 'text-slate-500' : ''}`}
                    onClick={() => setSelectedGender(category)}
                  >
                    {category}
                  </li>
                ))}
              </ol>
            </div>
            <div className="my-1">
              <label className="font-medium text-lg mb-2">Sort Order:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded p-1 mx-1 border"
              >
                <option value="default">Default</option>
                <option value="name-asc">Name (Ascending)</option>
                <option value="name-desc">Name (Descending)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
            <div className="my-2">
              <label className="font-medium text-lg my-2">Price Range:</label>
              <div className="flex flex-col space-y-2">
                <div>
                  <span className="font-medium mr-1">{country.currencySymbol}:</span>
                  <input
                    type="text"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="rounded p-1 border"
                  />
                </div>
                <div>
                  <span className="font-medium mr-1">{country.currencySymbol}:</span>
                  <input
                    type="text"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="rounded p-1 border"
                  />
                </div>
              </div>
            </div>
            <button onClick={() => setShowSearchSettings(false)} className="p-1 bg-gray-800 hover:bg-black text-white font-medium rounded my-2">Close Search Settings</button>
          </div>
        </div>
      </div>}
      <div className="flex flex-wrap justify-center mt-8">
        {showModal && <Modal closeModal={closeModal} />}
        {filteredProducts.map((product, index) => (
          <div key={index} className="border-2 border-gray-300 p-4 text-center flex-1 max-w-60 min-w-60 bg-white mx-6 rounded-lg overflow-hidden mb-6">
            <img src={product.imageUrl} alt={product.name} className="max-h-40 max-w-40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 font-medium">
              {User.user.verified && <span className='line-through text-red-500'>
                {country.currencySymbol}{convertedPrice(product.price)}
              </span>}&nbsp;
              {country.currencySymbol}{discountedPrice(convertedPrice(product.price))}
            </p>
            <button
              onClick={() => addToCart({ ...product, price: User.user.verified ? discountedPrice(product.price) : product.price }, openModal)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;

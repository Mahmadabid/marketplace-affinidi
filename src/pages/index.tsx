import { countries } from "@/components/country/Countries";
import Modal from "@/components/shop/Modal";
import Settings from "@/components/shop/Settings";
import { useCartContext } from "@/utils/CartContext";
import { CountryContext } from "@/utils/CountryContext";
import { UserContext } from "@/utils/UserContext";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import stringSimilarity from 'string-similarity';
import Cookies from 'js-cookie';

const ProductDisplay = () => {
  const { addToCart } = useCartContext();
  const [showModal, setShowModal] = useState(false);
  const [switchCountry, setSwitchCountry] = useState(0);
  const [showSettings, setShowSettings] = useState(true);
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

  const filteredProducts = products.filter(product => product.gender === selectedGender || selectedGender === 'All');

  return (
    <div>
      <div className="h-[1px] border-b-[1px] border-b-gray-400" />
      <div className="bg-white border-b-[1px] p-2 font-medium border-b-gray-400 shadow-lg">
        <ol className="flex flex-wrap justify-center items-center space-x-4 mx-2">
          <li onClick={() => setShowSettings(true)} className="hover:cursor-pointer"><FontAwesomeIcon icon={faCogs} /></li>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`hover:cursor-pointer ${selectedGender === category ? 'text-slate-500' : ''}`}
              onClick={() => setSelectedGender(category)}
            >
              {category}
            </li>
          ))}
        </ol>
      </div>
      {showSettings && <Settings setShowSettings={setShowSettings} country={country} setCountry={setCountry} />}
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

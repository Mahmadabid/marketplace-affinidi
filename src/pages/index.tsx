import { countries } from "@/components/country/Countries";
import Modal from "@/components/shop/Modal";
import { useCartContext } from "@/utils/CartContext";
import { UserContext } from "@/utils/UserContext";
import { faCertificate } from "@fortawesome/free-solid-svg-icons/faCertificate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import stringSimilarity from 'string-similarity';

interface CountryProps {
  name: string;
  currencySymbol: string;
  abbreviation: string;
}

const ProductDisplay = () => {
  const { addToCart } = useCartContext();
  const [showModal, setShowModal] = useState(false);
  const [User, _] = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState(User.user.gender ? User.user.gender === 'male' ? 'Men' : User.user.gender === 'female' ? 'Women' : 'All' : 'All');
  const [country, setCountry] = useState<CountryProps>({
    name: "",
    currencySymbol: "",
    abbreviation: ""
  });
console.log(country)
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
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
        });
      }
    } else {
      setCountry({
        name: "United States",
        currencySymbol: "$",
        abbreviation: "USA"
      });
    }
  }, [User])

  const products = [
    { id: 1, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png', quantity: 1, description: 'hkjasdf jfhkjashf kashdfjshdf sjhkjh', gender: 'All' },
    { id: 2, name: 'T-Shirt', price: 15, imageUrl: 'tee.png', quantity: 1, description: 'hkjasdf jfhkjas', gender: 'Men' },
    { id: 3, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png', quantity: 1, description: 'hkjasdf jfhkjashf kashdfjshdf sjhkjh', gender: 'All' },
    { id: 4, name: 'T-Shirt', price: 15, imageUrl: 'tee.png', quantity: 1, description: 'hkjasdf jfhkjas', gender: 'Men' },
    { id: 5, name: 'Sweater', price: 20, imageUrl: 'https://d2z0lqci37nukm.cloudfront.net/media/catalog/product/cache/5a319794f6868ce12b948b8c65d98dde/m/-/m-sw06-m112-ebony201_rbpoybyydv2tloxh.webp', quantity: 1, description: 'Some description', gender: 'Women' },
  ];

  const discountedPrice = (price: number) => {
    return User.user.verified ? price - price * 0.01 : price;
  };

  const categories = ['Men', 'Women', 'All'];

  const filteredProducts = products.filter(product => product.gender === selectedGender || selectedGender === 'All');

  return (
    <div>
      { }
      <div className="h-[1px] border-b-[1px] border-b-gray-400" />
      <div className="bg-white border-b-[1px] p-2 font-medium border-b-gray-400 shadow-lg">
        <ol className="flex flex-wrap justify-center space-x-6 mx-2">
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
      <div className="text-center flex flex-row justify-center items-center">
        <h1 className='text-6xl xse:text-3xl xb:text-4xl font-bold italic truncate my-2 text-[#3bdbb8] font-sans'>Welcome {User.user.nickname ? User.user.nickname : User.user.givenName ? User.user.givenName : 'User'}</h1>
        <span
          className="ml-2 inline-block relative group"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className='relative'>
            <FontAwesomeIcon
              icon={faCertificate}
              className={`text-4xl xse:text-2xl xb:text-3xl ml-1 ${User.user.verified ? 'text-blue-500' : 'text-gray-400 opacity-50'}`}
              title={User.user.verified ? "Verified" : "Unverified"}
            />
            {User.user.verified && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute top-[47%] left-[52%] w-5 h-5 xb:w-4 xb:h-4 xse:w-3 xse:h-3 transform -translate-x-1/2 -translate-y-1/2"
                fill="#fff"
                stroke="#fff"
                strokeWidth="3"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
          </div>

          <span
            className={`absolute left-1/2 transform -translate-x-1/2 font-medium bg-blue-600 text-white px-2 py-1 my-1 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out`}
            style={{ visibility: isVisible ? 'visible' : 'hidden' }}
          >
            {User.user.verified ? 'Verified' : "Unverified"}
          </span>
        </span>
      </div>
      {isVisible && <div className="text-center break-words text-slate-500 mt-1 font-medium">{User.user.verified ? 'Verified user get 1% discount' : 'pass affinidi verification to get verified'}</div>}
      <div className="flex flex-wrap justify-center mt-8">
        {showModal && <Modal closeModal={closeModal} />}
        {filteredProducts.map((product, index) => (
          <div key={index} className="border-2 border-gray-300 p-4 text-center flex-1 max-w-60 min-w-60 bg-white mx-6 rounded-lg overflow-hidden mb-6">
            <img src={product.imageUrl} alt={product.name} className="max-h-40 max-w-40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 font-medium">
              <span className={`${User.user.verified && 'line-through text-red-500'}`}>
                ${product.price}
              </span>&nbsp;
              ${discountedPrice(product.price)}
            </p>
            <button
              onClick={() => addToCart({ ...product, price: discountedPrice(product.price) }, openModal)}
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

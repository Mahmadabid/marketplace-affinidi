import { useState, useContext } from 'react';
import { UserContext } from '@/utils/UserContext';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/shop/ConfirmationModal';
import { useCartContext } from '@/utils/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faEnvelope, faGlobe, faMapMarkedAlt, faMapMarkerAlt, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

const Checkout = () => {
  const [User, _] = useContext(UserContext);
  const { clearCart } = useCartContext();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: User.user?.givenName || '',
    lastName: User.user?.familyName || '',
    email: User.user?.email || '',
    phone: User.user?.phoneNumber || '',
    address: User.user?.address || '',
    postalCode: User.user?.postalCode || '',
    city: User.user?.city || '',
    country: User.user?.country || ''
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    clearCart();
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-sky-100'>
      <div className="p-6 max-w-screen-md mx-auto">
        <div className="bg-slate-50 p-4 flex flex-col rounded items-center">
          <h2 className="mb-4 text-4xl italic text-emerald-500 font-bold">Checkout</h2>
          <form className="w-80" onSubmit={handleSubmit}>
            <label htmlFor="firstName" className="block mt-4 mb-2">
              <FontAwesomeIcon icon={faUser} className="mr-1" />
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded bg-slate-200"
            />

            <label htmlFor="lastName" className="block mb-2 font-medium">
              <FontAwesomeIcon icon={faUser} className="mr-1" />
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded bg-slate-200"
              required
            />

            <label htmlFor="email" className="block mb-2 font-medium">
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded bg-slate-200"
              required
            />

            <label htmlFor="phone" className="block mb-2 font-medium">
              <FontAwesomeIcon icon={faPhone} className="mr-1" />
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={userData.phone}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded bg-slate-200"
              required
            />

            <label htmlFor="address" className="block mb-2 font-medium">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={userData.address}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded bg-slate-200"
              required
            />

            <label htmlFor="postalCode" className="block mb-2 font-medium">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-1" />
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              value={userData.postalCode}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded bg-slate-200"
              required
            />

            <label htmlFor="city" className="block mb-2 font-medium">
              <FontAwesomeIcon icon={faCity} className="mr-1" />
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={userData.city}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded bg-slate-200"
              required
            />

            <label htmlFor="country" className="block mb-2 font-medium">
              <FontAwesomeIcon icon={faGlobe} className="mr-1" />
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={userData.country}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded bg-slate-200"
              required
            />

            <button
              type="submit"
              className="hover:bg-black bg-gray-800 rounded text-white py-2 mt-8 w-full"
            >
              Submit Order
            </button>
          </form>
        </div>
        {showConfirmationModal && (
          <ConfirmationModal closeModal={closeConfirmationModal} />
        )}
      </div>
    </div>
  );
};

export default Checkout;
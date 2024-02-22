import { useState, useContext, useEffect } from 'react';
import { UserContext } from '@/utils/UserContext';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/shop/ConfirmationModal';
import { useCartContext } from '@/utils/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faEnvelope, faGlobe, faMapMarkedAlt, faMapMarkerAlt, faMoneyBill, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import Load from '@/components/utils/Load';
import { CountryContext } from '@/utils/CountryContext';
import { generateRandomId } from '@/components/utils/RandomId';
import GetDate from '@/components/global/Date';
import { convertedPrice } from '@/components/shop/utils';
import Link from 'next/link';

export interface BankProps {
  receiver: string;
  amount: number;
  id: string;
  date: string;
  owner: string;
}

const Checkout = () => {
  const [User, _] = useContext(UserContext);
  const [country] = useContext(CountryContext);
  const { clearCart, cartItems } = useCartContext();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [checkDeliveryAddress, setCheckDeliveryAddress] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [transactions, setTransactions] = useState<BankProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
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
    setShowDeliveryAddress(true);
  };

  const handlePaymentMethodChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    router.push('/');
  };

  const handleCheck = () => {
    if (checkDeliveryAddress) {
      setDeliveryAddress('');
      setCheckDeliveryAddress(false);
    } else {
      setDeliveryAddress(userData.address);
      setCheckDeliveryAddress(true);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (cartItems.length === 0) return;
      setLoading(true);
      try {
        const res = await fetch(`https://my-space-affinidi.vercel.app/api/bank?owner=${User.userId}`, {
          method: 'GET',
        });

        const data = await res.json();

        if (data.length > 0) {
          const formattedData = data.map((item: { amount: string; }) => ({
            ...item,
            amount: parseFloat(item.amount),
          }));

          setTransactions(formattedData);
          setLoading(false);
        }
        else {
          setTransactions([]);
          setLoading(false);
        }
      } catch {
        setTransactions([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchData]);

  const calculateBalance = () => {
    if (transactions.length === 0) {
      return 0;
    } else {
      const balance = transactions.reduce((total, transaction) => (transaction.receiver === User.userId ? total + transaction.amount : total - transaction.amount), 0);
      return convertedPrice(balance, country.currencyRate);
    }
  };

  const reConvertedPrice = (price: number, currencyRate: number) => {
    const converted = price / currencyRate;
    return converted;
  };

  const getTotalPrice = () => {
    const TotalPrice = cartItems.reduce((total, item) => total + item.quantity * convertedPrice(item.price, country.currencyRate), 0);
    return Number(TotalPrice.toFixed(2));
  };

  const handleSend = async () => {
    setFetchData(prev => !prev);

    const balance = calculateBalance();

    if (balance >= getTotalPrice()) {
      try {
        setLoading(true);
        const res = await fetch('https://my-space-affinidi.vercel.app/api/bank', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ receiver: 'Pixel MarketPlace', amount: reConvertedPrice(getTotalPrice(), country.currencyRate), id: generateRandomId(User.userId), date: GetDate(), owner: User.userId }),
        });

        if (!res.ok) {
          throw new Error('Failed to add transaction');
        }

        setFetchData(prev => !prev);
        setShowConfirmationModal(true);
        clearCart();
      } catch (error) {
        console.error('Error adding transaction:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Wallet balance is less then amount')
    }
  };

  const handlePay = () => {
    setShowConfirmationModal(true);
    clearCart();
  }

  return (
    <div className={`${cartItems.length === 0 ? 'flex items-center justify-center mt-10' : 'min-h-screen bg-sky-100'}`}>
      {loading && (
        <div
          className="fixed top-0 z-40 left-0 w-screen h-screen bg-gray-700 opacity-70 flex flex-col space-y-2 items-center justify-center"
        >
          <Load className='w-9 h-9 fill-white' />
        </div>
      )}
      {cartItems.length === 0 ? <p className='text-xl my-4 font-medium text-slate-700'>Your cart is empty. Add some products first.</p> :
        < div className="p-6 max-w-screen-md mx-auto">
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
              {!showDeliveryAddress &&
                <button
                  type="submit"
                  className="hover:bg-black bg-gray-800 rounded text-white py-2 mt-8 w-full"
                >
                  Go to Delivery
                </button>}
            </form>
            {showDeliveryAddress && (
              <div className="w-80 my-3">
                <div className='h-[1px] bg-black w-full my-4 bg-opacity-45'></div>
                <label htmlFor="deliveryAddress" className="block mb-2 font-medium">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                  Delivery Address
                </label>
                <input
                  type="text"
                  name="deliveryAddress"
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-2 mb-4 border-[2px] border-gray-300 focus:border-gray-500 focus:outline-none rounded bg-white shadow"
                />
                <div className="">
                  <input
                    type="checkbox"
                    id="sameAsBillingAddress"
                    checked={checkDeliveryAddress}
                    onChange={handleCheck}
                    className="mr-2 cursor-pointer"
                  />
                  <label htmlFor="sameAsBillingAddress" className="cursor-pointer text-gray-800 font-medium">
                    Same as Billing Address
                  </label>
                  {!deliveryAddress && <p className='text-[#ff0000] font-medium'>Enter Delivery Address</p>}
                </div>
                {deliveryAddress && <>
                  <div className='h-[1px] bg-black w-full my-4 bg-opacity-45'></div>
                  <div className="mb-4 mt-6">
                    <div className='flex flex-row items-center space-x-2'>
                      <FontAwesomeIcon icon={faMoneyBill} />
                      <label className="block mb-2 font-medium">Payment Method</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cashOnDelivery"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={handlePaymentMethodChange}
                        className="mr-2 cursor-pointer"
                      />
                      <label htmlFor="cashOnDelivery" className="cursor-pointer mr-4 text-gray-800 font-medium">
                        Cash on Delivery
                      </label>
                      <input
                        type="radio"
                        id="pixelBank"
                        name="paymentMethod"
                        value="pixel"
                        checked={paymentMethod === 'pixel'}
                        onChange={handlePaymentMethodChange}
                        className="mr-2 cursor-pointer"
                      />
                      <label htmlFor="pixelBank" className="cursor-pointer text-gray-800 font-medium">
                        Pay through Pixel Bank
                      </label>
                    </div>
                  </div></>}
                {deliveryAddress && paymentMethod !== 'cash' ?
                  <div>
                    {transactions.length > 0 ? <div>
                      <h2 className='font-medium italic'>Your Balance: <span className='font-medium not-italic'><span className="mr-1 font-medium text-[#37aca8] text-lg">{country.currencySymbol}</span>{calculateBalance()}</span></h2>
                      {error && <p className='text-[#ff0000]'>{error}</p>}
                      <h2 className='font-medium text-slate-700'>Your Order: <span className='font-medium not-italic'><span className="mr-1 font-medium text-[#37aca8] text-lg">{country.currencySymbol}</span>{getTotalPrice()}</span></h2>
                      <button onClick={handleSend} disabled={!deliveryAddress} className="hover:bg-black bg-gray-800 rounded text-white py-2 mt-8 w-full">Pay</button>
                    </div> : <div className='mt-7'>
                      <h3 className='text-xl font-medium my-2'>You dont have an Account.</h3>
                      <Link href="https://my-space-affinidi.vercel.app/bank" target="_blank"><button className="hover:bg-blue bg-blue-700 rounded text-white py-2 w-full">Create Account</button></Link>
                    </div>}
                  </div>
                  : <div><button onClick={handlePay} disabled={!deliveryAddress} className={`${deliveryAddress && 'hover:bg-black'} bg-gray-800 rounded text-white py-2 mt-8 w-full ${!deliveryAddress && 'hover:cursor-not-allowed'}`}>{deliveryAddress ? 'Pay': 'Add delivery Address'}</button></div>
                }
              </div>)}
          </div>
          {showConfirmationModal && (
            <ConfirmationModal closeModal={closeConfirmationModal} />
          )}
        </div>
      }
    </div >
  );
};

export default Checkout;
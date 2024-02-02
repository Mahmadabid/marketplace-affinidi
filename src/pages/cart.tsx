import { useCartContext } from '@/utils/CartContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { UserContext } from '@/utils/UserContext';

const Cart = () => {

    const { cartItems } = useCartContext();
    const { removeFromCart, clearCart } = useCartContext();
    const [isVisible, setIsVisible] = useState(false);
    const [User, _] = useContext(UserContext);
    const router = useRouter();

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const goToCheckout = () => {
        router.push('/checkout');
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className='text-6xl font-bold italic my-2 text-[#3bdbb8] font-sans'>Your Cart</h1>
            {cartItems.length === 0 && <p className='text-xl my-4 font-medium text-slate-800'>Your cart is empty. Add some products first.</p>}
            <div>
                {cartItems.map((item, index) => (
                    <div
                        key={index}
                        className='m-2 border shadow-md px-2 flex flex-row items-center justify-between space-x-3'
                    >
                        <div className='flex flex-row justify-center items-center'>
                            <img
                                className="object-cover w-14 h-14"
                                src={item.imageUrl}
                                alt={item.name}
                            />
                            <div className="p-4">
                                <div className="flex flex-row items-center space-x-2 mb-2">
                                    <h2 className="text-xl font-bold">{item.name}</h2>
                                    <h2 className="bg-gray-200 px-2 font-medium rounded-sm">{item.quantity}</h2>
                                </div>
                                <div className='flex flex-row space-x-1 items-center justify-center'>
                                    <h3 className="text-lg font-medium text-slate-800">${(item.price) * item.quantity}</h3>
                                    <div className='w-3 h-[2px] bg-black bg-opacity-30' />
                                    <p className='text-gray-600 text-sm break-all'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <FontAwesomeIcon onClick={() => removeFromCart(item.id)} icon={faTrash} className='text-[#ff0000] ml-6 mr-1 xse:ml-1 hover:cursor-pointer text-xl' />
                    </div>
                ))}
            </div>
            {cartItems.length !== 0 && <div className='flex flex-row space-x-10 items-center'>
                <div className='font-medium text-2xl my-2'>
                    <span className='text-slate-800'>Total: </span>$<span className='text-[#1867cd]'>{getTotalPrice()}</span>
                </div>
                <div className='relative items-center hover:cursor-pointer justify-center'>
                    <FontAwesomeIcon
                        onClick={() => clearCart()}
                        onMouseEnter={() => setIsVisible(true)}
                        onMouseLeave={() => setIsVisible(false)}
                        icon={faTrashCan}
                        title='Clear Cart'
                        className='text-[#ff8d00] ml-1 hover:cursor-pointer text-xl' />
                    <span
                        className={`absolute left-1/2 -top-11 transform -translate-x-1/2 w-[90px] font-medium bg-orange-600 text-white px-2 py-1 my-1 rounded-md invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out`}
                        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
                    >
                        Clear Cart
                    </span>
                </div>
            </div>}
            <button
                onClick={goToCheckout}
                disabled={cartItems.length === 0}
                className={`p-2 px-4 bg-blue-500 my-2 hover:bg-blue-700 text-white rounded ${cartItems.length === 0 && 'opacity-50 cursor-not-allowed'}`}
            >
                Go to Checkout
            </button>
        </div>
    );
};

export default Cart;

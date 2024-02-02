import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard";

const Breadcrumb = () => {
    const router = useRouter();

    return (
        <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <div onClick={() => router.push('/')} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-700 hover:cursor-pointer">
                        <FontAwesomeIcon icon={faHome} className="w-3 h-3 mr-2" />
                        <p className="text-sm font-medium">Home</p>
                    </div>
                </li>
                {router.pathname === '/cart' || router.pathname === '/checkout' || router.pathname === '/profile' ? <li>
                    <div className="flex items-center">
                        <svg className="rtl:rotate-180 block w-3 h-3 mr-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <div onClick={() => router.pathname === '/checkout'? router.push('/cart'): null} className={`inline-flex items-center text-sm font-medium text-gray-600 ${router.pathname === '/checkout'? 'hover:text-blue-700 hover:cursor-pointer': ''}`} >
                            <FontAwesomeIcon icon={router.pathname === "/profile" ? faUser : faCartShopping} className='w-3 h-3 mr-2' />
                            <p className="text-sm font-medium">{router.pathname === "/profile"? 'Profile': 'Cart'}</p>
                        </div>
                    </div>
                </li> : null}
                {router.pathname === '/checkout' &&
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 mr-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <FontAwesomeIcon icon={faCreditCard} className="w-3 h-3 text-gray-600 mr-2" />
                            <span className="text-sm font-medium text-gray-500">Checkout</span>
                        </div>
                    </li>}
            </ol>
        </nav >
    );
};

export default Breadcrumb;

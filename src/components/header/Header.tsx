import Link from 'next/link';
import { useState, useContext } from 'react';
import Load from '../utils/Load';
import { UserContext } from '@/utils/UserContext';
import ProfileDropdown from './ProfileDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';

const Header = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const [User, _] = useContext(UserContext);

  return (
    <header className="bg-[#2ea9a2] p-4 xse:p-[10px] z-50 text-white shadow-md relative flex justify-center items-center">
      {loggingOut && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-950 opacity-95 flex flex-col space-y-2 items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <div className="text-white flex flex-row text-2xl font-bold">
            Logging Out &nbsp;<Load className='w-9 h-9 fill-white' />
          </div>
          <p className="text-orange-600 text-lg font-bold">It will take a few seconds</p>
        </div>
      )}
      {User.userId ? <ProfileDropdown setLoggingOut={setLoggingOut} email={User.user.email} picture={User.user.picture} /> : <></>}
      <h1 className="mx-auto text-4xl xse:text-3xl font-bold">
        <Link href='/'>Pixel Market</Link>
      </h1>
      <Link href='/cart'>
        <FontAwesomeIcon icon={faCartShopping} className="text-[26px] mr-2 xse:mr-0 mt-1" />
      </Link>
    </header>
  )
};

export default Header;

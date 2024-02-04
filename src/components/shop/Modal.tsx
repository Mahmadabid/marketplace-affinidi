import { useRouter } from 'next/router';
import ConfettiExplosion from 'react-confetti-explosion';

interface ModalProps {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const router = useRouter();

  const goToCart = () => {
    closeModal();
    router.push('/cart');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60 min-w-screen min-h-screen">
      <div className='z-10 absolute top-1/2 left-1/2'><ConfettiExplosion /></div>
      <div className="p-6 rounded-lg text-center border bg-sky-50 border-slate-500">
        <p className="mb-4 text-2xl text-gray-800">Item successfully added to cart!</p>
        <button onClick={goToCart} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2">
          Go to Cart
        </button>
        <button onClick={closeModal} className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Modal;

import ReactConfetti from "react-confetti";

interface ConfirmationModalProps {
  closeModal: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-60 min-w-screen min-h-screen">
      <ReactConfetti />
      <div className="p-6 rounded-lg text-center border bg-sky-50 border-slate-500">
        <p className="mb-4 text-2xl text-gray-800">Order submitted. Thank you for shopping with us!</p>
        <button onClick={closeModal} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black font-medium">
          Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;

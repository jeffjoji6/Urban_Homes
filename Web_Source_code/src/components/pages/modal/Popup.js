import React from 'react';

const Popup = ({ isOpen, onClose }) => {
  return isOpen ? (
    <div className="w-200px h-200px fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50 blur"></div>
      <div className="z-10 bg-white p-6 rounded-md text-center">
        <p className="text-red-500 font-bold text-xl mb-4">Your account has been deactivated by the administrator.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  ) : null;
};

export default Popup;
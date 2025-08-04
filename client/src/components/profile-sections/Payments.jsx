import { FaCreditCard, FaPlus, FaTrash } from 'react-icons/fa';
import React from 'react';
const Payments = ({ 
  paymentMethods, 
  newCard, 
  setNewCard, 
  handleAddCard 
}) => {
  const getCardBrand = (number) => {
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'Mastercard';
    return 'Card';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaCreditCard className="mr-2" /> Payment Methods
      </h2>
      
      <div className="space-y-4 mb-8">
        {paymentMethods.map(method => (
          <div key={method.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-10 h-6 rounded mr-3 flex items-center justify-center ${
                  method.brand === 'Visa' ? 'bg-blue-900 text-white' :
                  'bg-gray-200'
                }`}>
                  {method.brand}
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• {method.last4}</p>
                  <p className="text-sm text-gray-500">
                    {method.name} • Expires {method.expiry}
                  </p>
                </div>
              </div>
              <button 
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Add New Payment Method</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded"
                value={newCard.number}
                onChange={(e) => setNewCard({...newCard, number: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-2 border rounded"
                value={newCard.name}
                onChange={(e) => setNewCard({...newCard, name: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-2 border rounded"
                value={newCard.expiry}
                onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-2 border rounded"
                value={newCard.cvv}
                onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
              />
            </div>
          </div>
          <button 
            onClick={handleAddCard}
            className="bg-orange-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!newCard.number || !newCard.name || !newCard.expiry || !newCard.cvv}
          >
            <FaPlus className="inline mr-1" /> Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
import { FaMapMarkerAlt, FaPlus, FaTrash } from 'react-icons/fa';
import React from 'react';
const Addresses = ({ 
  addresses, 
  newAddress, 
  setNewAddress, 
  handleAddAddress, 
  setDefaultAddress, 
  deleteAddress 
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaMapMarkerAlt className="mr-2" /> Address Book
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {addresses.map(address => (
          <div 
            key={address.id} 
            className={`border rounded-lg p-4 ${
              address.isDefault ? 'border-orange-300 bg-orange-50' : ''
            }`}
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {address.type} {address.isDefault && '(Default)'}
              </h3>
              <div className="space-x-2">
                <button 
                  className="text-orange-500 text-sm"
                  onClick={() => {
                    setNewAddress({
                      type: address.type,
                      address: address.address
                    });
                    deleteAddress(address.id);
                  }}
                >
                  Edit
                </button>
                {!address.isDefault && (
                  <>
                    <button 
                      className="text-gray-500 text-sm"
                      onClick={() => setDefaultAddress(address.id)}
                    >
                      Set Default
                    </button>
                    <button 
                      className="text-red-500 text-sm"
                      onClick={() => deleteAddress(address.id)}
                    >
                      <FaTrash className="inline mr-1" /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            <p className="mt-2 text-gray-700">{address.address}</p>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
            <select 
              value={newAddress.type}
              onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
            <textarea
              value={newAddress.address}
              onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="House no, Building, Street, Area, City, Pincode"
            ></textarea>
          </div>
          <button 
            onClick={handleAddAddress}
            className="bg-orange-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!newAddress.address.trim()}
          >
            <FaPlus className="inline mr-1" /> Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
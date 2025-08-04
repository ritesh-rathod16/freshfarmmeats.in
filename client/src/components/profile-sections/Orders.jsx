import { FaBox, FaTruck, FaUndo } from 'react-icons/fa';
import React from 'react';
const Orders = ({ orders }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaBox className="mr-2" /> Order History
      </h2>
      
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="font-medium">Items:</p>
                <ul className="list-disc list-inside text-sm">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} - ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Total: ₹{order.total}</p>
                  {order.tracking && (
                    <a 
                      href={`https://tracking.example.com/?tracking=${order.tracking}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-500 text-sm flex items-center"
                    >
                      <FaTruck className="mr-1" /> Track Order
                    </a>
                  )}
                </div>
                <div className="space-x-2">
                  <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">
                    <FaUndo className="inline mr-1" /> Reorder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaBox className="text-5xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
          <p className="mb-6 text-gray-500">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
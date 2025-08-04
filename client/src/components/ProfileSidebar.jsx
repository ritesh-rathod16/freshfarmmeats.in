// components/ProfileSidebar.jsx
import { FaUser, FaBox, FaMapMarkerAlt, FaCreditCard, FaHeart } from 'react-icons/fa';
import React from 'react';
const ProfileSidebar = ({ user, activeSection, setActiveSection }) => {
  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-3 overflow-hidden">
          {user.profilePic ? (
            <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <FaUser className="text-4xl text-gray-400" />
          )}
        </div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <button className="text-sm text-orange-500 mt-1">Upload Photo</button>
      </div>

      <nav className="space-y-2">
        {[
          { id: 'personal', icon: <FaUser />, label: 'Personal Info' },
          { id: 'orders', icon: <FaBox />, label: 'My Orders' },
          { id: 'addresses', icon: <FaMapMarkerAlt />, label: 'Address Book' },
          { id: 'payments', icon: <FaCreditCard />, label: 'Payment Methods' },
          { id: 'wishlist', icon: <FaHeart />, label: 'Wishlist' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left px-4 py-2 rounded flex items-center ${
              activeSection === item.id 
                ? 'bg-orange-100 text-orange-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-3">{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileSidebar;
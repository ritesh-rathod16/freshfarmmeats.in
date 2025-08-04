// components/profile-sections/PersonalInfo.jsx
import { FaUser, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import React from 'react';
const PersonalInfo = ({ 
  user, 
  editingField, 
  editValue, 
  startEditing, 
  cancelEditing, 
  saveEdit,
  setEditValue 
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaUser className="mr-2" /> Personal Information
      </h2>
      
      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4 overflow-hidden">
            {user.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FaUser className="text-2xl text-gray-400" />
            )}
          </div>
          <div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded mr-3">
              Upload Photo
            </button>
            <button className="text-gray-500">
              Remove
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Full Name</h3>
            {editingField === 'name' ? (
              <div className="flex space-x-2">
                <button 
                  onClick={saveEdit}
                  className="text-green-500 text-sm flex items-center"
                >
                  <FaCheck className="mr-1" /> Save
                </button>
                <button 
                  onClick={cancelEditing}
                  className="text-red-500 text-sm flex items-center"
                >
                  <FaTimes className="mr-1" /> Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => startEditing('name', user.name)}
                className="text-orange-500 text-sm flex items-center"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
            )}
          </div>
          {editingField === 'name' ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded"
              autoFocus
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Email Address</h3>
            {!user.emailVerified && (
              <button className="text-orange-500 text-sm">
                Verify Email
              </button>
            )}
          </div>
          <div className="flex items-center">
            <p>{user.email}</p>
            {user.emailVerified ? (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Verified
              </span>
            ) : (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                Not Verified
              </span>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Phone Number</h3>
            {editingField === 'phone' ? (
              <div className="flex space-x-2">
                <button 
                  onClick={saveEdit}
                  className="text-green-500 text-sm flex items-center"
                >
                  <FaCheck className="mr-1" /> Save
                </button>
                <button 
                  onClick={cancelEditing}
                  className="text-red-500 text-sm flex items-center"
                >
                  <FaTimes className="mr-1" /> Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => startEditing('phone', user.phone)}
                className="text-orange-500 text-sm flex items-center"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
            )}
          </div>
          {editingField === 'phone' ? (
            <input
              type="tel"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded"
              autoFocus
            />
          ) : (
            <p>{user.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
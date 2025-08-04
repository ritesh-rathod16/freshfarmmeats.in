// pages/ProfilePage.jsx
import React, { useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar';
import PersonalInfo from '../components/profile-sections/PersonalInfo';
import Orders from '../components/profile-sections/Orders';
import Addresses from '../components/profile-sections/Addresses';
import Payments from '../components/profile-sections/Payments';
import Wishlist from '../components/profile-sections/Wishlist';

const ProfilePage = () => {
  // User data state
  const [user, setUser] = useState({
    name: 'Ritesh Rathod',
    email: 'riteshrathod016@gmail.com',
    emailVerified: false,
    phone: '+91 7721874530',
    birthday: '2005-12-26',
    profilePic: null,
    membership: 'Gold',
    points: 1250
  });

  // Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123, Main Street, Andheri West, Mumbai - 400058',
      isDefault: true
    }
  ]);

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      name: 'Ritesh Rathod'
    }
  ]);

  // Orders state
  const [orders, setOrders] = useState([
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      items: [
        { name: 'Fresh Chicken (1kg)', quantity: 1, price: 299 }
      ],
      status: 'Delivered',
      total: 299,
      tracking: 'TRK789456123'
    }
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Fresh Salmon Fillet', price: 899, oldPrice: 999, inStock: true }
  ]);

  // New address form state
  const [newAddress, setNewAddress] = useState({ type: 'Home', address: '' });

  // New card form state
  const [newCard, setNewCard] = useState({ number: '', name: '', expiry: '', cvv: '' });

  // Edit states
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [activeSection, setActiveSection] = useState('personal');

  // Handle field edit
  const startEditing = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditValue('');
  };

  const saveEdit = () => {
    setUser({ ...user, [editingField]: editValue });
    setEditingField(null);
  };

  // Address management
  const handleAddAddress = () => {
    const newId = Math.max(...addresses.map(a => a.id), 0) + 1;
    setAddresses([...addresses, { ...newAddress, id: newId, isDefault: false }]);
    setNewAddress({ type: 'Home', address: '' });
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  // Payment methods
  const handleAddCard = () => {
    const newId = Math.max(...paymentMethods.map(p => p.id), 0) + 1;
    const last4 = newCard.number.slice(-4);
    setPaymentMethods([
      ...paymentMethods,
      {
        id: newId,
        type: 'card',
        last4,
        brand: getCardBrand(newCard.number),
        expiry: newCard.expiry,
        name: newCard.name
      }
    ]);
    setNewCard({ number: '', name: '', expiry: '', cvv: '' });
  };

  const getCardBrand = (number) => {
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'Mastercard';
    return 'Card';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <ProfileSidebar 
              user={user} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />

            <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
              {activeSection === 'personal' && (
                <PersonalInfo 
                  user={user}
                  editingField={editingField}
                  editValue={editValue}
                  startEditing={startEditing}
                  cancelEditing={cancelEditing}
                  saveEdit={saveEdit}
                  setEditValue={setEditValue}
                />
              )}

              {activeSection === 'orders' && (
                <Orders orders={orders} />
              )}

              {activeSection === 'addresses' && (
                <Addresses 
                  addresses={addresses}
                  newAddress={newAddress}
                  setNewAddress={setNewAddress}
                  handleAddAddress={handleAddAddress}
                  setDefaultAddress={setDefaultAddress}
                  deleteAddress={deleteAddress}
                />
              )}

              {activeSection === 'payments' && (
                <Payments 
                  paymentMethods={paymentMethods}
                  newCard={newCard}
                  setNewCard={setNewCard}
                  handleAddCard={handleAddCard}
                  getCardBrand={getCardBrand}
                />
              )}

              {activeSection === 'wishlist' && (
                <Wishlist wishlist={wishlist} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
// src/pages/MultiStepCart.js
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MultiStepCart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    cartCount,
    removeFromCart: removeItem, 
    updateQuantity: handleQuantityChange,
    clearCart
  } = useCart();
  
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'IN',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });
  const [orderDetails, setOrderDetails] = useState({
    orderId: generateOrderId(),
    date: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    time: new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  });

  function generateOrderId() {
    return 'MB' + Math.floor(100000 + Math.random() * 900000).toString();
  }

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPayment(method);
  };

  const nextStep = () => {
    if (step === 1 && cartItems.length === 0) {
      alert('Your cart is empty. Please add items to proceed.');
      return;
    }
    if (step === 2) {
      if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.address || 
          !shippingInfo.city || !shippingInfo.zipCode || !shippingInfo.country || !shippingInfo.phone) {
        alert('Please fill all shipping details');
        return;
      }
      if (!/^\d{10}$/.test(shippingInfo.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
      }
      if (!/^\d{6}$/.test(shippingInfo.zipCode)) {
        alert('Please enter a valid 6-digit zip code');
        return;
      }
    }
    if (step === 3) {
      if (selectedPayment === 'card' && 
          (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiryDate || !paymentInfo.cvv)) {
        alert('Please fill all payment details');
        return;
      }
      if (selectedPayment === 'card' && !/^\d{16}$/.test(paymentInfo.cardNumber)) {
        alert('Please enter a valid 16-digit card number');
        return;
      }
      if (selectedPayment === 'card' && !/^\d{3,4}$/.test(paymentInfo.cvv)) {
        alert('Please enter a valid CVV (3 or 4 digits)');
        return;
      }
      if (selectedPayment === 'upi' && !paymentInfo.upiId) {
        alert('Please enter UPI ID');
        return;
      }
      if (selectedPayment === 'upi' && !/^[\w.-]+@[\w]+$/.test(paymentInfo.upiId)) {
        alert('Please enter a valid UPI ID (e.g., name@upi)');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 999 ? 0 : 49;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCost + tax;

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    
    // Add logo and header
    doc.setFontSize(20);
    doc.setTextColor(40, 167, 69);
    doc.text('MeatBarn', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Invoice', 105, 30, { align: 'center' });
    
    // Add order details
    doc.setFontSize(10);
    doc.text(`Order ID: ${orderDetails.orderId}`, 15, 40);
    doc.text(`Date: ${orderDetails.date} ${orderDetails.time}`, 15, 45);
    doc.text(`Delivery Date: ${orderDetails.deliveryDate}`, 15, 50);
    
    // Add shipping info
    doc.text('Shipping Information:', 15, 60);
    doc.text(`${shippingInfo.firstName} ${shippingInfo.lastName}`, 15, 65);
    doc.text(shippingInfo.address, 15, 70);
    doc.text(`${shippingInfo.city}, ${shippingInfo.zipCode}`, 15, 75);
    doc.text(`India | Phone: ${shippingInfo.phone}`, 15, 80);
    
    // Add items table
    doc.autoTable({
      startY: 90,
      head: [['Item', 'Price', 'Qty', 'Total']],
      body: cartItems.map(item => [
        `${item.name} (${item.weight})`,
        `₹${item.price.toFixed(2)}`,
        item.quantity,
        `₹${(item.price * item.quantity).toFixed(2)}`
      ]),
      theme: 'grid',
      headStyles: { fillColor: [40, 167, 69] },
    });
    
    // Add totals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 150, finalY);
    doc.text(`Shipping: ${shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}`, 150, finalY + 5);
    doc.text(`GST (18%): ₹${tax.toFixed(2)}`, 150, finalY + 10);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Total: ₹${total.toFixed(2)}`, 150, finalY + 20);
    
    // Add footer
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text('Thank you for shopping with MeatBarn!', 105, 280, { align: 'center' });
    
    doc.save(`MeatBarn_Invoice_${orderDetails.orderId}.pdf`);
  };

  const handlePlaceOrder = () => {
    generateInvoice();
    clearCart();
    nextStep();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow max-w-4xl mx-auto p-4">
        {/* Progress steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className={`flex items-center ${step >= stepNum ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNum ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                {stepNum}
              </div>
              <span className="ml-2">
                {stepNum === 1 ? 'Cart' : 
                 stepNum === 2 ? 'Shipping' : 
                 stepNum === 3 ? 'Payment' : 'Confirmation'}
              </span>
              {stepNum < 4 && <div className="flex-1 h-1 mx-2 bg-gray-200 mt-3"></div>}
            </div>
          ))}
        </div>

        {/* Step 1: Cart */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Your Meat Cart</h2>
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
                <button 
                  onClick={handleContinueShopping}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <div key={item.id} className="py-4 flex">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600">{item.weight} | {item.category}</p>
                        <p className="text-green-600 font-medium">₹{item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="font-medium text-green-600">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>GST (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span className="text-green-600">₹{total.toFixed(2)}</span>
                  </div>
                  {subtotal < 999 && (
                    <p className="text-sm text-green-600 mt-2">
                      Add ₹{(999 - subtotal).toFixed(2)} more to get FREE shipping!
                    </p>
                  )}
                  <button 
                    onClick={nextStep}
                    className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Proceed to Shipping
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Shipping */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code*</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    maxLength="6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                  <select
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    disabled
                  >
                    <option value="IN">India</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  maxLength="10"
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Select Payment Method</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => handlePaymentMethodChange('card')}
                  className={`px-4 py-2 rounded border ${selectedPayment === 'card' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-300'}`}
                >
                  Credit/Debit Card
                </button>
                <button
                  onClick={() => handlePaymentMethodChange('upi')}
                  className={`px-4 py-2 rounded border ${selectedPayment === 'upi' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-300'}`}
                >
                  UPI
                </button>
              </div>
            </div>
            
            {selectedPayment === 'card' ? (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number*</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card*</label>
                  <input
                    type="text"
                    name="cardName"
                    value={paymentInfo.cardName}
                    onChange={handlePaymentChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date*</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV*</label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
              </form>
            ) : (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID*</label>
                  <input
                    type="text"
                    name="upiId"
                    value={paymentInfo.upiId}
                    onChange={handlePaymentChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="name@upi"
                    required
                  />
                </div>
                <div className="bg-yellow-50 p-3 rounded text-sm text-yellow-700">
                  Note: You'll be redirected to your UPI app for payment confirmation after placing the order.
                </div>
              </form>
            )}
            
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>GST (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span className="text-green-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-bold mb-2">Order Details</h3>
              <div className="space-y-2">
                <p><span className="text-gray-600">Order ID:</span> {orderDetails.orderId}</p>
                <p><span className="text-gray-600">Date:</span> {orderDetails.date} at {orderDetails.time}</p>
                <p><span className="text-gray-600">Delivery Date:</span> {orderDetails.deliveryDate}</p>
                <p><span className="text-gray-600">Total:</span> ₹{total.toFixed(2)}</p>
              </div>
              
              <h3 className="font-bold mt-4 mb-2">Shipping To</h3>
              <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.zipCode}</p>
              <p>India | Phone: {shippingInfo.phone}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={generateInvoice}
                className="bg-white border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-50"
              >
                Download Invoice
              </button>
              <button 
                onClick={() => navigate('/products')}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
      
 
    </div>
  );
};

export default MultiStepCart;
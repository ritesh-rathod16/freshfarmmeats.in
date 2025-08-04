import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DairySubscriptionPage = () => {
  const [cartCount, setCartCount] = useState(3);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    frequency: 'daily',
    items: {
      milk: true,
      curd: true,
      paneer: false,
      butter: false,
      cheese: false,
      ghee: false,
      cream: false
    },
    startDate: '',
    notes: ''
  });

  const handlePlanSelect = (planName) => {
    alert(`You've selected the ${planName} subscription. You'll be redirected to checkout.`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [name]: checked
      }
    }));
  };

  const handleFrequencyChange = (e) => {
    setFormData(prev => ({
      ...prev,
      frequency: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your custom subscription request! Our team will contact you shortly with a personalized quote.');
    setFormData({
      name: '',
      phone: '',
      address: '',
      frequency: 'daily',
      items: {
        milk: true,
        curd: true,
        paneer: false,
        butter: false,
        cheese: false,
        ghee: false,
        cream: false
      },
      startDate: '',
      notes: ''
    });
  };

  const benefits = [
    { icon: 'fas fa-percentage', title: 'Save 15% Monthly', description: 'Significant savings compared to retail prices' },
    { icon: 'fas fa-calendar-alt', title: 'Flexible Scheduling', description: 'Choose delivery days that work for you' },
    { icon: 'fas fa-snowflake', title: 'Always Fresh', description: 'Direct from farm to your home' },
    { icon: 'fas fa-pause', title: 'Pause Anytime', description: 'Going on vacation? Skip deliveries' },
    { icon: 'fas fa-bacon', title: 'Customizable', description: 'Add or remove items as needed' },
    { icon: 'fas fa-gift', title: 'Free Surprises', description: 'Occasional free samples and gifts' }
  ];

  const plans = [
    {
      name: 'Basic Box',
      price: '₹1,799',
      savings: 'Save ₹300 (15%)',
      features: [
        'Fresh Milk - 1L daily',
        'Curd - 500g every 3 days',
        'Paneer - 250g weekly',
        'Butter - 100g weekly'
      ],
      highlight: false
    },
    {
      name: 'Family Box',
      price: '₹2,999',
      savings: 'Save ₹500 (15%)',
      features: [
        'Fresh Milk - 2L daily',
        'Curd - 1kg every 3 days',
        'Paneer - 500g weekly',
        'Butter - 200g weekly',
        'Cheese - 200g weekly'
      ],
      highlight: true
    },
    {
      name: 'Premium Box',
      price: '₹4,499',
      savings: 'Save ₹800 (15%)',
      features: [
        'Fresh Milk - 3L daily',
        'Curd - 1.5kg every 3 days',
        'Paneer - 1kg weekly',
        'Butter - 500g weekly',
        'Cheese - 500g weekly',
        'Ghee - 500g monthly',
        'Fresh Cream - 250g weekly'
      ],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cartCount} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-yellow-500 pb-2">
              Dairy Subscription Box
            </h1>
            
            <div className="h-96 overflow-hidden rounded-lg mb-8">
              <img 
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Dairy Subscription" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Subscribe to our dairy box and get fresh milk, curd, paneer and more delivered to your doorstep daily. 
              Save 15% compared to retail prices and never run out of essentials. Customize your box based on your 
              family's needs and enjoy the convenience of scheduled deliveries.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-yellow-500 pb-2">
            Why Subscribe?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-yellow-500 text-4xl mb-4">
                  <i className={benefit.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-yellow-500 pb-2">
            Subscription Plans
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 ${plan.highlight ? 'border-2 border-yellow-400' : ''}`}
              >
                <div className={`p-6 text-center ${plan.highlight ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {plan.price} <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  <div className="text-green-600 text-sm">{plan.savings}</div>
                </div>
                
                <div className="p-6">
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handlePlanSelect(plan.name)}
                    className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </main>
      
      
    </div>
  );
};

export default DairySubscriptionPage;
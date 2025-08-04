import { useState, useEffect } from 'react';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaWhatsapp, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    accessKey: '3ad2ac7d-5205-4c7f-b856-de35b9a592f3' // Added access key to form data
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        accessKey: '3ad2ac7d-5205-4c7f-b856-de35b9a592f3' // Preserve access key
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Contact details with redirect functionality
  const contactDetails = [
    {
      icon: <FaPhone className="text-orange-500 text-xl" />,
      title: "Phone",
      items: [
        {
          text: "+91 7721874530",
          link: "tel:+917721874530",
          newTab: false
        },
        {
          text: "+91 7721874530 (Support)",
          link: "tel:+917721874530",
          newTab: false
        }
      ]
    },
    {
      icon: <FaWhatsapp className="text-orange-500 text-xl" />,
      title: "WhatsApp",
      items: [
        {
          text: "Chat on WhatsApp",
          link: "https://wa.me/917721874530",
          newTab: true
        }
      ]
    },
    {
      icon: <FaEnvelope className="text-orange-500 text-xl" />,
      title: "Email",
      items: [
        {
          text: "info@freshmeatdelivery.com",
          link: "mailto:info@freshmeatdelivery.com",
          newTab: false
        },
        {
          text: "support@freshmeatdelivery.com",
          link: "mailto:support@freshmeatdelivery.com",
          newTab: false
        }
      ]
    },
    {
      icon: <FaMapMarkerAlt className="text-orange-500 text-xl" />,
      title: "Our Locations",
      items: [
        {
          text: "123 Meat Street, Food Plaza, Mumbai",
          link: "https://maps.google.com?q=123+Meat+Street,Mumbai",
          newTab: true
        },
        {
          text: "456 Poultry Road, Nagpur",
          link: "https://maps.google.com?q=456+Poultry+Road,Nagpur",
          newTab: true
        }
      ]
    },
    {
      icon: <FaClock className="text-orange-500 text-xl" />,
      title: "Working Hours",
      items: [
        {
          text: "Mon-Sat: 8:00 AM - 10:00 PM",
          link: null
        },
        {
          text: "Sunday: 9:00 AM - 8:00 PM",
          link: null
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "What are your delivery hours?",
      answer: "We deliver from 8 AM to 10 PM every day, including Sundays and holidays."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking link via SMS and email."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 24 hours of delivery if the product is unopened and in its original packaging."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer special pricing for bulk orders. Please contact our sales team for more information."
    },
    {
      question: "How do I change or cancel my order?",
      answer: "You can change or cancel your order within 30 minutes of placing it by calling our customer support."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-50 to-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
              <p className="text-lg md:text-xl text-gray-600">
                Have questions about our products or services? Our team is ready to help you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                    Thank you for your message! We will get back to you soon.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="+91 1234567890"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    
                    {/* Hidden access key field */}
                    <input type="hidden" name="accessKey" value={formData.accessKey} />
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane /> Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    {contactDetails.map((detail, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors duration-200">
                        <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                          {detail.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{detail.title}</h3>
                          <div className="space-y-1">
                            {detail.items.map((item, itemIndex) => (
                              <div key={itemIndex}>
                                {item.link ? (
                                  <a 
                                    href={item.link} 
                                    target={item.newTab ? "_blank" : "_self"} 
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-orange-500 transition"
                                  >
                                    {item.text}
                                  </a>
                                ) : (
                                  <p className="text-gray-600">{item.text}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Maps Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Nagpur Location</h3>
                    <div className="h-64 rounded-lg overflow-hidden shadow-md">
                      <iframe
                        title="Nagpur Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116274.44243963703!2d78.99010838231972!3d21.161065902054286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1753821880629!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 relative pb-2">
                Frequently Asked Questions
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500"></span>
              </h2>
              
              <div className="space-y-4">
                {faqs.map((item, index) => (
                  <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center text-left"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                      {activeFaq === index ? (
                        <FaChevronUp className="text-orange-500" />
                      ) : (
                        <FaChevronDown className="text-orange-500" />
                      )}
                    </button>
                    
                    {activeFaq === index && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  );
};

export default Contact;
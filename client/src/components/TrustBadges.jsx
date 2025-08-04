import { FaTruck, FaLock, FaSnowflake } from 'react-icons/fa';
import React from 'react'

const TrustBadges = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mt-8">
      <div className="flex items-center">
        <FaTruck className="text-green-500 text-xl mr-2" />
        <span className="text-sm">Free Delivery Over ₹500</span>
      </div>
      <div className="flex items-center">
        <FaLock className="text-green-500 text-xl mr-2" />
        <span className="text-sm">100% Secure Payments</span>
      </div>
      <div className="flex items-center">
        <FaSnowflake className="text-green-500 text-xl mr-2" />
        <span className="text-sm">Hygienic Cold Packaging</span>
      </div>
    </div>
  );
};

export default TrustBadges;
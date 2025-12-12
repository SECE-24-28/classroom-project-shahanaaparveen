import React from 'react';

const ServicesSection = () => {
  const services = [
    { icon: "fa-solid fa-wifi", label: "Wi-Fi", color: "text-gray-600"},
    { icon: "fa-solid fa-address-card", label: "Postpaid", color: "text-gray-700" },
    { icon: "fa-solid fa-coins", label: "Financial Services", color: "text-red-600" },
    { icon: "fa-solid fa-money-bill", label: "Prepaid", color: "text-gray-600" },
    { icon: "fa-solid fa-satellite-dish", label: "DTH", color: "text-red-600" },
    { icon: "fa-solid fa-person", label: "Refer & Earn", color: "text-gray-700" },
    { icon: "fa-solid fa-building-columns", label: "Open Bank Account", color: "text-red-600" },
    { icon: "fa-solid fa-tv", label: "IPTV", color: "text-gray-600" }
  ];

  return (
    <div className="bg-red-700 dark:bg-red-800 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl font-black text-white mb-12 font-['Inter'] tracking-tight">
          Buy a New Connection
        </h2>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {services.map((service, index) => (
            <button
              key={index}
              className="flex flex-col items-center group hover:transform hover:scale-110 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-200">
                <i className={`${service.icon} text-3xl ${service.color} group-hover:scale-125 transition-transform duration-300`}></i>
              </div>
              <span className="text-sm font-semibold text-white text-center max-w-20 leading-tight">
                {service.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
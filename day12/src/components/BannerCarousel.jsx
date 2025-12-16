import React, { useState, useEffect } from 'react';

const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Airtel Festive Offer",
      subtitle: "Free benefits added",
      price: "₹349 Pack",
      description: "Unlimited Calls | 28 days validity",
      features: ["Unlimited 5G", "20+ OTTs", "Apple Music", "Worth ₹17,000"],
      bgColor: "bg-gradient-to-r from-red-600 to-red-700",
      buttonText: "SWITCH NOW",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      fontFamily: "font-['Poppins']"
    },
    {
      id: 2,
      title: "Jio Special Deal",
      subtitle: "Extra data included",
      price: "₹299 Pack",
      description: "2GB/day | 56 days validity",
      features: ["True 5G", "Disney+ Hotstar", "JioTV", "Worth ₹12,000"],
      bgColor: "bg-gradient-to-r from-gray-600 to-gray-700",
      buttonText: "GET NOW",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      fontFamily: "font-['Inter']"
    },
    {
      id: 3,
      title: "Vi Premium Plan",
      subtitle: "Weekend data rollover",
      price: "₹399 Pack",
      description: "1.5GB/day | 84 days validity",
      features: ["Vi Movies & TV", "Unlimited calls", "Weekend data", "Worth ₹8,000"],
      bgColor: "bg-gradient-to-r from-gray-500 to-gray-600",
      buttonText: "RECHARGE",
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop",
      fontFamily: "font-['Roboto']"
    },
    {
      id: 4,
      title: "BSNL Value Pack",
      subtitle: "Government network",
      price: "₹199 Pack",
      description: "Unlimited calls | 30 days validity",
      features: ["Pan India roaming", "100 SMS/day", "2GB data", "Worth ₹5,000"],
      bgColor: "bg-gradient-to-r from-gray-700 to-gray-800",
      buttonText: "ACTIVATE",
      image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=400&h=300&fit=crop",
      fontFamily: "font-['Poppins']"
    },
    {
      id: 5,
      title: "DTH Combo Offer",
      subtitle: "TV + Mobile bundle",
      price: "₹599 Pack",
      description: "200+ channels | 90 days validity",
      features: ["HD channels", "Mobile recharge", "Free installation", "Worth ₹15,000"],
      bgColor: "bg-gradient-to-r from-red-500 to-red-600",
      buttonText: "SUBSCRIBE",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
      fontFamily: "font-['Inter']"
    },
    {
      id: 6,
      title: "Postpaid Premium",
      subtitle: "Bill protection included",
      price: "₹799 Plan",
      description: "Unlimited everything | Monthly",
      features: ["International roaming", "Netflix", "Prime Video", "Worth ₹25,000"],
      bgColor: "bg-gradient-to-r from-gray-600 to-gray-700",
      buttonText: "UPGRADE",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      fontFamily: "font-['Roboto']"
    },
    {
      id: 7,
      title: "Student Special",
      subtitle: "Education discount",
      price: "₹149 Pack",
      description: "1GB/day | 28 days validity",
      features: ["Study apps free", "Video calling", "Social media", "Worth ₹3,000"],
      bgColor: "bg-gradient-to-r from-gray-500 to-gray-600",
      buttonText: "APPLY NOW",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      fontFamily: "font-['Poppins']"
    },
    {
      id: 8,
      title: "Family Pack Deal",
      subtitle: "Multiple connections",
      price: "₹999 Pack",
      description: "Shared data | 4 connections",
      features: ["Family sharing", "Parental controls", "Bulk savings", "Worth ₹30,000"],
      bgColor: "bg-gradient-to-r from-red-600 to-red-700",
      buttonText: "GET FAMILY PACK",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      fontFamily: "font-['Inter']"
    },
    {
      id: 9,
      title: "Business Solution",
      subtitle: "Enterprise grade",
      price: "₹1299 Plan",
      description: "Unlimited business calls | Monthly",
      features: ["Priority network", "Business apps", "24/7 support", "Worth ₹50,000"],
      bgColor: "bg-gradient-to-r from-gray-700 to-gray-800",
      buttonText: "CONTACT SALES",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      fontFamily: "font-['Roboto']"
    },
    {
      id: 10,
      title: "Weekend Bonanza",
      subtitle: "Limited time offer",
      price: "₹249 Pack",
      description: "Extra weekend data | 28 days",
      features: ["Double data weekends", "Free music", "Gaming benefits", "Worth ₹6,000"],
      bgColor: "bg-gradient-to-r from-gray-600 to-gray-700",
      buttonText: "GRAB DEAL",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop",
      fontFamily: "font-['Poppins']"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const currentBannerData = banners[currentBanner];

  return (
    <div className="relative h-80 overflow-hidden">
      <div className={`${currentBannerData.bgColor} ${currentBannerData.fontFamily} h-full flex items-center justify-between px-8 text-white transition-all duration-500 relative`}>
        
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src={currentBannerData.image} 
            alt={currentBannerData.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Left Content */}
        <div className="flex-1 relative z-10">
          <h2 className="text-4xl font-extrabold mb-3 tracking-wide drop-shadow-lg">{currentBannerData.title}</h2>
          <p className="text-xl mb-6 font-medium opacity-90">{currentBannerData.subtitle}</p>
          <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl">
            {currentBannerData.buttonText}
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 text-right relative z-10">
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 rounded-2xl p-8 inline-block max-w-md shadow-2xl border border-white/20">
            <h3 className="text-3xl font-black text-red-600 mb-3 tracking-tight">{currentBannerData.price}</h3>
            <p className="text-lg font-semibold mb-6 text-gray-700">{currentBannerData.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {currentBannerData.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-gray-700">{feature.split(' ')[0]}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-600">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevBanner}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 shadow-lg z-20"
      >
        <i className="fas fa-chevron-left text-lg"></i>
      </button>
      <button 
        onClick={nextBanner}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 shadow-lg z-20"
      >
        <i className="fas fa-chevron-right text-lg"></i>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white text-sm font-medium">{currentBanner + 1} / {banners.length}</span>
        <div className="flex space-x-1">
          {banners.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBanner ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
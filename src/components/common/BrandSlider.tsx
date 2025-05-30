import React from "react";

const logos: string[] = [
 
  "https://pngimg.com/uploads/porsche_logo/porsche_logo_PNG1.png",
  "https://www.pngmart.com/files/17/Suzuki-Logo-Transparent-Background.png",
  "https://gallerypng.com/wp-content/uploads/2024/05/mahindra-new-logo-png-image.png",
  "https://logos-world.net/wp-content/uploads/2021/10/Tata-Logo-700x394.png",
  // Repeat for infinite loop effect
  "https://www.pngall.com/wp-content/uploads/13/Audi-Logo-PNG-HD-Image.png",
  "https://pngimg.com/uploads/ferrari/ferrari_PNG102798.png",
  "https://logodownload.org/wp-content/uploads/2014/02/ford-logo-1.png",
  "https://pngimg.com/uploads/bmw_logo/bmw_logo_PNG19699.png",
  "https://clipart-library.com/new_gallery/28-284493_toyota-logo-and-slogan-png-download-toyota.png",
];

const BrandSlider: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-gray-900 py-4">
      <div className="flex animate-slide whitespace-nowrap">
        {logos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-64 h-24 flex items-center justify-center px-4">
            <img
              src={logo}
              alt={`Brand ${index}`}
              className="h-20 object-contain transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSlider;

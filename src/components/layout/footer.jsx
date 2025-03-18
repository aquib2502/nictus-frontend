import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Expert Photo and Name (Left) */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Image 
              src="/expert.jpg" 
              alt="Expert Photo" 
              width={96} 
              height={96} 
              objectFit="cover" 
            />
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-800">John Doe</h3>
        </div>
        {/* Expert Information (Right) */}
        <div className="mt-6 md:mt-0 md:ml-10 text-center md:text-left">
          <p className="text-gray-700">
            John Doe is a renowned expert with over 20 years of experience, providing top-tier consultancy and insights to help you achieve success.
          </p>
          <p className="text-gray-700 mt-2">
            Contact: john.doe@example.com
          </p>
        </div>
      </div>
    </footer>
  );
}

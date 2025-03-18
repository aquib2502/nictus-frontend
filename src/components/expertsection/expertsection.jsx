import React from "react";
import Image from "next/image";

export default function ExpertSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Expert Photo and Name (Left) */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-48 h-58 rounded-full overflow-hidden">
            <Image 
              src="/expert.jpg" 
              alt="Expert Photo" 
              width={192} 
              height={192}  
            />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-800 ml-2">Aquib Hingwala</h3>
        </div>
        {/* Expert Information (Right) */}
        <div className="mt-8 md:mt-0 md:ml-20 text-center md:text-left">
          <p className="text-gray-700 text-2xl">
            Aquib Hingwala is a renowned expert with over 20 years of experience in his field. His innovative approach and deep understanding of industry trends have made him a trusted consultant for numerous Fortune 500 companies.
          </p>
          <p className="text-gray-700 mt-4 text-2xl">
            His passion for excellence and commitment to providing tailored solutions has empowered businesses to reach their full potential. John’s insights are highly valued in strategy sessions and high-level consultations.
          </p>
          <p className="text-gray-700 mt-4 text-2xl">
            In addition to his professional accomplishments, John is also a sought-after speaker and mentor, sharing his expertise at international conferences and educational events.
          </p>
          <p className="text-gray-700 mt-4 text-2xl">
            Contact: john.doe@example.com
          </p>
        </div>
      </div>
    </section>
  );
}

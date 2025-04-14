
import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1F2C] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Brand */}
          <div>
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/02b89a7d-05f0-4fc7-ac33-ae496a8df8f2.png" 
                alt="NxtWave Logo" 
                className="h-16 w-auto"
              />
            </div>
          </div>

          {/* Remove quick links section */}
          <div className="hidden md:block"></div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Reach Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 mt-1 mr-2" />
                <div>
                  <p>+91 8008 9009 08</p>
                  <p className="text-sm text-gray-400">(WhatsApp only)</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:support@niatindia.com" className="hover:text-amber-500 transition-colors">
                  support@niatindia.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-10">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 mt-1 mr-2" />
            <div>
              <h3 className="text-xl font-semibold">Admissions Office Address:</h3>
              <p className="mt-2">
                NIAT - NxtWave Institute of Advanced Technologies
                <br />
                No. 144 Survey 37, Financial District, 
                <br />
                Nanakramguda, Telangana 500032
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

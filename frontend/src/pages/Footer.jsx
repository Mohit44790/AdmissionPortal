import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";


const Footer = () => {
  const startYear = 2021;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* University Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={"https://dseuadm.samarth.edu.in/assets/759660c7/site_files/dseu_logo.png"}
              alt="University Logo"
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-lg font-semibold text-white">
              Delhi Skill & Entrepreneurship University
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering students with industry-relevant skills, innovation,
            and academic excellence for a future-ready workforce.
          </p>
        </div>

        {/* Admissions */}
        <div>
          <h3 className="text-white font-semibold mb-4">Admissions</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/admissions" className="hover:text-white">Admission Process</a></li>
            <li><a href="/programs" className="hover:text-white">Programs Offered</a></li>
            <li><a href="/eligibility" className="hover:text-white">Eligibility Criteria</a></li>
            <li><a href="/apply" className="hover:text-white">Apply Now</a></li>
          </ul>
        </div>

        {/* About University */}
        <div>
          <h3 className="text-white font-semibold mb-4">About Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">University Overview</a></li>
            <li><a href="/campuses" className="hover:text-white">Campuses</a></li>
            <li><a href="/academics" className="hover:text-white">Academics</a></li>
            <li><a href="/careers" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400 mb-3">
            📍 New Delhi, India  
            <br />
            📧 admissions@dseu.ac.in  
            <br />
            ☎ +91-11-00000000
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaLinkedinIn /></a>
            <a href="#" className="social-icon"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-10 py-4 text-center text-sm text-gray-400">
        © {startYear}{currentYear > startYear ? ` – ${currentYear}` : ""}  
        {" "}Delhi Skill & Entrepreneurship University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

# Portfolio-Websites
 An online representation of work you have created, as well as your skills and experiences.

https://teams.microsoft.com/l/meetup-join/19%3ameeting_OTNlZGQ5NmYtMjVmZi00ZWE0LWE3NDctZTMwMTg4OGZkYjQ1%40thread.v2/0?context=%7b%22Tid%22%3a%22990ad79e-1372-4210-8d3e-8488f7d3238e%22%2c%22Oid%22%3a%220100f304-372c-47a6-9fb6-597aa1d9e530%22%7d


https://dribbble.com/shots/24175820-Landing-Page-for-Construction-Company


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
// import bgvideoblack from "./videos/bgvideoblack.mp4";
import bgvideo1 from "./videos/bgvideo1.mp4";
import genetic1 from "../images/genetic1.jpg";
const Card = ({ title, description }) => (
  <div
    className="bg-black bg-opacity-90 backdrop-blur-lg text-black rounded-3xl shadow-3xl p-6 transition-transform transform hover:scale-105 animate-fade-in m-4 max-w-xs"
    style={{
      backgroundImage: url(${genetic1}),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.8, 
      zIndex:1,
    }}
  >
    
    <h3 className="text-xl font-semibold mb-2  font-Lato">{title}</h3>
    <p className="text-m font-Lato">{description}</p>
  </div>
);

const LandingPage = () => {
  const navigate=useNavigate()
  const handlesubmit=()=>{
    navigate('/form')
  }
  return (
    <div className="relative flex flex-col min-h-screen text-white">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover blur-md"
        autoPlay
        loop
        muted
      >
        <source src={bgvideo1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Header Section */}
      <header className="flex flex-col items-start justify-start p-6 ml-10 relative z-10 top-20">
        <nav className="absolute top-6 right-40 flex space-x-7">
        
          <button type="submit" className="bg-blue bg-opacity-90 backdrop-blur-l text-black py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300" onClick={handlesubmit}>
            Start Survey
          </button>
      </nav>
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-800 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-in-left">
          Join In Genetic Revolution
        </h1>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-slide-in-right">
          Unlock Secrets of Your DNA!!
        </h1>
        <p className="text-xl mb-5 text-black font-['Lora'] ">Your one-stop solution for fast and reliable services.</p>
      </header>

      {/* Main Content Section */}
      <main className="flex flex-col items-left mt-10 p-10 relative z-10">
        <div className="bg-white bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 max-w-md mb-10">
          <h2 className="text-3xl font-bold font-['Montserrat'] mb-4 text-black">Our Vision</h2>
          <p className="text-l text-black font-Lato">
           We envision a future where genetic insights empower individuals to make informed health decisions and contribute to the advancement of medical science. Our mission is to democratize access to genetic testing, ensuring that everyone can benefit from the knowledge hidden within their DNA.
           By providing accurate and comprehensive genetic information, we aim to help individuals understand their genetic predispositions and take proactive steps towards better health.
           We are committed to making genetic testing accessible to all, regardless of background or location.
           We prioritize the confidentiality and security of our participants’ genetic information.
            We aim to revolutionize lab services with innovative solutions that enhance quality and efficiency in operations.
          </p>
        </div>

        {/* Cards Section */}
        <div className="flex flex-wrap justify-center mt-10">
          <Card title="Why Genetic Survey" description="Understand your genetic makeup to make informed health decisions. Our testing kits provide you with valuable insights into your DNA.
          Our testing kits are simple to use and can be done from the comfort of your home. Just follow the instructions, send back your sample, and receive your results online"/>
          <Card title="Quality Assurance"  description="At RSB, we are committed to delivering the highest quality genetic testing services. Our testing kits are meticulously checked
           for accuracy and reliability, ensuring you receive precise results you can trust. All tests are conducted in certified laboratories, adhering to strict protocols to maintain data integrity.
            We continuously strive to improve our processes based on your valuable feedback." />
          <Card title="Data Analysis" description="Our advanced data analysis techniques provide you with comprehensive insights into your genetic makeup. Utilizing cutting-edge technology 
          and expert interpretation, we transform complex genetic data into clear, actionable reports. Your privacy is our priority, and we implement robust measures to protect your genetic information." />
          <Card title="Service Efficiency" description="Experience a seamless and efficient service with RSB. Our fast turnaround times ensure you receive your genetic reports promptly. We prioritize a user-friendly
           experience, offering clear instructions and support throughout the process. Our responsive customer service team is always available to assist you with any questions or concerns" />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="flex flex-col items-center justify-center bg-opacity-80 mt-auto py-8 bg-black relative z-10">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Get in Touch</h2>
        <div className="flex space-x-3">
          <a href="mailto:info@example.com" className="text-black hover:text-gray-500 transition duration-300">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-500 transition duration-300">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-500 transition duration-300">
            <FontAwesomeIcon icon={faGlobe} size="lg" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage


     

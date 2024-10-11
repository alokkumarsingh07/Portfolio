# Portfolio-Websites
 An online representation of work you have created, as well as your skills and experiences.

https://teams.microsoft.com/l/meetup-join/19%3ameeting_OTNlZGQ5NmYtMjVmZi00ZWE0LWE3NDctZTMwMTg4OGZkYjQ1%40thread.v2/0?context=%7b%22Tid%22%3a%22990ad79e-1372-4210-8d3e-8488f7d3238e%22%2c%22Oid%22%3a%220100f304-372c-47a6-9fb6-597aa1d9e530%22%7d


https://dribbble.com/shots/24175820-Landing-Page-for-Construction-Company


https://0342-2405-201-d02c-e927-7dfd-3706-a6b1-6ff1.ngrok-free.app 



https://teams.microsoft.com/l/meetup-join/19%3ameeting_MGY4NTMxNzYtMzQyZS00NzQ3LTk3OTktOWMyMDZmMzcxMWU2%40thread.v2/0?context=%7b%22Tid%22%3a%22990ad79e-1372-4210-8d3e-8488f7d3238e%22%2c%22Oid%22%3a%220100f304-372c-47a6-9fb6-597aa1d9e530%22%7d





import React, { useRef } from "react";
import icon from "../images/icon.png"; // Keep your icon import
import entiretest from "../images/entiretest.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { questionsData } from "./questionData/Questions"; // Import questionsData

const Tests = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative mt-20 bg-blur-md bg-blue-900 shadow-lg shadow-blue-600"
      style={{
        backgroundImage: `url(${entiretest})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center p-4">
        <span className="bg-neutral-900 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          Our Featured Tests
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          <span className="font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-700 text-transparent bg-clip-text">
            Take a Quick Serve Here!
          </span>
        </h2>
      </div>
      <div className="flex items-center justify-center mt-10 lg:mt-20">
        <button onClick={scrollLeft} className="text-purple-800 p-4 text-md">
          <FaChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex flex-nowrap overflow-x-auto overflow-hidden whitespace-nowrap scrollbar-hide w-trackingwide"
        >
          {Object.keys(questionsData).map((key) => (
            <div
              key={key}
              className="w-full sm:w-1/2 lg:w-1/3 p-4 animate-fade-in"
            >
              <div className="bg-blue-300 bg-opacity-30 backdrop-blur-md border border-blue-600 shadow-purple-800 rounded-lg p-4 flex flex-col justify-between items-start shadow-lg transition transform hover:scale-105">
                <div className="flex mb-2 items-center">
                  <img
                    src={icon}
                    alt="Lab Test Icon"
                    className="h-10 w-10 mr-2"
                  />
                  <h5 className="text-xl text-blue-900 p-8">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h5>
                </div>
                <p className="text-md text-neutral-700 mb-4 whitespace-normal line-clamp-2">
                  Identify if you carry inherited conditions.
                </p>
                <Link
                  to={`/form/${key}`}
                  className="text-blue-900 py-2 px-4 rounded-md"
                >
                  Start Test
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button onClick={scrollRight} className="text-purple-800 p-4 text-md">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Tests;

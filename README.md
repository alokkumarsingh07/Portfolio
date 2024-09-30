# Portfolio-Websites
 An online representation of work you have created, as well as your skills and experiences.

https://teams.microsoft.com/l/meetup-join/19%3ameeting_OTNlZGQ5NmYtMjVmZi00ZWE0LWE3NDctZTMwMTg4OGZkYjQ1%40thread.v2/0?context=%7b%22Tid%22%3a%22990ad79e-1372-4210-8d3e-8488f7d3238e%22%2c%22Oid%22%3a%220100f304-372c-47a6-9fb6-597aa1d9e530%22%7d


https://a8fe-2405-201-d02c-e927-250c-8c4e-3954-7d34.ngrok-free.app/


https://dribbble.com/shots/24175820-Landing-Page-for-Construction-Company


import React, { useState, useEffect } from "react";

const GeneticHistoryForm = ({ formData, setFormData }) => {
  const [localData, setLocalData] = useState(formData);

  useEffect(() => {
    setLocalData(formData);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
      familyGeneticDisorders: value === "yes" ? prevData.familyGeneticDisorders : "",
    }));
  };

  useEffect(() => {
    setFormData(localData);
  }, [localData, setFormData]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2">
          Do you have a family history of genetic disorders?
        </label>
        <div className="space-x-4">
          {["yes", "no"].map((value) => (
            <label key={value} className="inline-flex items-center">
              <input
                type="radio"
                name="hasFamilyGeneticDisorders"
                value={value}
                checked={localData.hasFamilyGeneticDisorders === value}
                onChange={handleRadioChange}
                className="mr-2"
              />
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </label>
          ))}
        </div>
        {localData.hasFamilyGeneticDisorders === "yes" && (
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            type="text"
            placeholder="Please specify"
            name="familyGeneticDisorders"
            value={localData.familyGeneticDisorders}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        <label className="block mb-2">
          Has anyone in your family undergone genetic testing before?
        </label>
        <div className="space-x-4">
          {["yes", "no", "unknown"].map((value) => (
            <label key={value} className="inline-flex items-center">
              <input
                type="radio"
                name="familyGeneticTesting"
                value={value}
                checked={localData.familyGeneticTesting === value}
                onChange={handleChange}
                className="mr-2"
              />
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-2">
          Are you interested in learning about potential hereditary risks?
        </label>
        <div className="space-x-4">
          {["yes", "no"].map((value) => (
            <label key={value} className="inline-flex items-center">
              <input
                type="radio"
                name="interestedInHereditaryRisks"
                value={value}
                checked={localData.interestedInHereditaryRisks === value}
                onChange={handleChange}
                className="mr-2"
              />
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneticHistoryForm;

# Portfolio-Websites
 An online representation of work you have created, as well as your skills and experiences.

https://teams.microsoft.com/l/meetup-join/19%3ameeting_OTNlZGQ5NmYtMjVmZi00ZWE0LWE3NDctZTMwMTg4OGZkYjQ1%40thread.v2/0?context=%7b%22Tid%22%3a%22990ad79e-1372-4210-8d3e-8488f7d3238e%22%2c%22Oid%22%3a%220100f304-372c-47a6-9fb6-597aa1d9e530%22%7d


https://a8fe-2405-201-d02c-e927-250c-8c4e-3954-7d34.ngrok-free.app/


https://dribbble.com/shots/24175820-Landing-Page-for-Construction-Company

https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODlhY2E0OGQtNTFlOS00M2Q3LWJlY2UtZTRkZDE1NTY4YjU4%40thread.v2/0?context=%7b%22Tid%22%3a%22990ad79e-1372-4210-8d3e-8488f7d3238e%22%2c%22Oid%22%3a%220100f304-372c-47a6-9fb6-597aa1d9e530%22%7d

https://d08c-2405-201-d02c-e927-89de-e78b-d459-b038.ngrok-free.app/


const MedicalHistoryForm = ({ formData, setFormData }) => (
  <div className="space-y-4">
    <div>
      <label className="block mb-2">
        Do you have any known medical conditions? If yes, please specify:
      </label>
      <div className="space-x-4">
        {["yes", "no"].map((value) => (
          <label key={value} className="inline-flex items-center">
            <input
              type="radio"
              name="medicalConditions"
              value={value}
              checked={formData.medicalConditions === value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  medicalConditions: e.target.value,
                  // medicalConditionsDetails: "",
                })
              }
              className="mr-2"
            />
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </label>
        ))}
      </div>
      {formData.medicalConditions === "yes" && (
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="familyGeneticDetails"
          placeholder="Please specify..."
          value={formData.medicalConditionsDetails || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              medicalConditionsDetails: e.target.value,
            })
          }
        />
      )}
    </div>
    <div>
      <label className="block mb-2">
        Have you been diagnosed with any hereditary conditions?
      </label>
      <div className="space-x-4">
        {["yes", "no"].map((value) => (
          <label key={value} className="inline-flex items-center">
            <input
              type="radio"
              name="hereditaryConditions"
              value={value}
              checked={formData.hereditaryConditions === value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hereditaryConditions: e.target.value,
                })
              }
              className="mr-2"
            />
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </label>
        ))}
      </div>
      {formData.hereditaryConditions === "yes" && (
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="hereditaryConditionsDetails"
          placeholder="Please specify..."
          value={formData.hereditaryConditionsDetails || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              hereditaryConditionsDetails: e.target.value,
            })
          }
        />
      )}
    </div>
    <div>
      <label className="block mb-2">
        Are you currently taking any medications?
      </label>
      <div className="space-x-4">
        {["yes", "no"].map((value) => (
          <label key={value} className="inline-flex items-center">
            <input
              type="radio"
              name="currentMedications"
              value={value}
              checked={formData.currentMedications === value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentMedications: e.target.value,
                })
              }
              className="mr-2"
            />
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </label>
        ))}
      </div>

      {formData.currentMedications === "yes" && (
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="currentMedicationsDetails"
          placeholder="Please specify..."
          value={formData.currentMedicationsDetails || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              currentMedicationsDetails: e.target.value,
            })
          }
        />
      )}
    </div>
    <div>
      <label className="block mb-2">Do you have any allergies?</label>

      <div className="space-x-4">
        {["yes", "no"].map((value) => (
          <label key={value} className="inline-flex items-center">
            <input
              type="radio"
              name="allergies"
              value={value}
              checked={formData.allergies === value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  allergies: e.target.value,
                })
              }
              className="mr-2"
            />
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </label>
        ))}
      </div>

      {formData.allergies === "yes" && (
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="allergiesDetails"
          placeholder="Please specify..."
          value={formData.allergiesDetails || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              allergiesDetails: e.target.value,
            })
          }
        />
      )}
    </div>
    <div>
      <label className="block mb-2">
        Have you undergone any medical tests in the past years?
      </label>

      <div className="space-x-4">
        {["yes", "no"].map((value) => (
          <label key={value} className="inline-flex items-center">
            <input
              type="radio"
              name="recentMedicalTests"
              value={value}
              checked={formData.recentMedicalTests === value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  recentMedicalTests: e.target.value,
                })
              }
              className="mr-2"
            />
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </label>
        ))}
      </div>

      {formData.recentMedicalTests === "yes" && (
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="recentMedicalTestsDetails"
          placeholder="Please specify..."
          value={formData.recentMedicalTestsDetails || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              recentMedicalTestsDetails: e.target.value,
            })
          }
        />
      )}
    </div>
  </div>
);

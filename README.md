# Portfolio-Websites
 An online representation of work you have created, as well as your skills and experiences.

https://teams.microsoft.com/l/meetup-join/19%3ameeting_OTNlZGQ5NmYtMjVmZi00ZWE0LWE3NDctZTMwMTg4OGZkYjQ1%40thread.v2/0?context=%7b%22Tid%22%3a%22990ad79e-1372-4210-8d3e-8488f7d3238e%22%2c%22Oid%22%3a%220100f304-372c-47a6-9fb6-597aa1d9e530%22%7d


https://a8fe-2405-201-d02c-e927-250c-8c4e-3954-7d34.ngrok-free.app/


https://dribbble.com/shots/24175820-Landing-Page-for-Construction-Company

https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODlhY2E0OGQtNTFlOS00M2Q3LWJlY2UtZTRkZDE1NTY4YjU4%40thread.v2/0?context=%7b%22Tid%22%3a%22990ad79e-1372-4210-8d3e-8488f7d3238e%22%2c%22Oid%22%3a%220100f304-372c-47a6-9fb6-597aa1d9e530%22%7d

https://d08c-2405-201-d02c-e927-89de-e78b-d459-b038.ngrok-free.app/


const GeneticHistoryForm = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2">
          Do you have a family history of genetic disorders?
        </label>
        <div className="flex space-x-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="familyGeneticDisorders"
              value="yes"
              checked={formData.familyGeneticDisorders === "yes"}
              onChange={() => {
                setFormData({ ...formData, familyGeneticDisorders: "yes" });
              }}
              className="mr-2"
            />
            Yes
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="familyGeneticDisorders"
              value="no"
              checked={formData.familyGeneticDisorders === "no"}
              onChange={() => {
                setFormData({ ...formData, familyGeneticDisorders: "no" });
              }}
              className="mr-2"
            />
            No
          </label>
        </div>
        {formData.familyGeneticDisorders === "yes" && (
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="familyGeneticDetails"
            placeholder="Please specify..."
            value={formData.familyGeneticDetails || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                familyGeneticDetails: e.target.value,
              })
            }
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
                checked={formData.familyGeneticTesting === value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    familyGeneticTesting: e.target.value,
                  })
                }
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
                checked={formData.interestedInHereditaryRisks === value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interestedInHereditaryRisks: e.target.value,
                  })
                }
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

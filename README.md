import React, { useState } from "react";
import formDataJsons from "./questionData/formDatas.js";

const DynamicForm = ({ testopt, formData, setFormData }) => {
  const questions = formDataJsons[testopt] || [];
  const [otherVisible, setOtherVisible] = useState({});

  // const handleChange = (e, key, option) => {
  //   const isChecked = e.target.checked;
  //   const currentValues = formData[key]
  //     ? formData[key].split(",").map((item) => item.trim())
  //     : [];

  //   let newValues;
  //   if (isChecked) {
  //     newValues = [...new Set([...currentValues, option])]; // Add option if checked
  //   } else {
  //     newValues = currentValues.filter((item) => item !== option); // Remove option if unchecked
  //   }

  //   // Handle the "Others" option specifically
  // if (option === "Others" || option === "Yes") {
  //   setOtherVisible((prev) => {
  //     const newOtherVisible = !prev[key];
  //     if (!newOtherVisible) {
  //       newValues = newValues.filter((item) => item !== option);
  //       setFormData((prevData) => ({ ...prevData, [`${key}_other`]: "" })); // Reset other value
  //     } else {
  //       newValues.push(option);
  //     }
  //     return { ...prev, [key]: newOtherVisible };
  //   });
  // }

  //   // Update formData state
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [key]: newValues.join(", "),
  //   }));
  // };

  const handleChange = (e, key, option) => {
    const isChecked = e.target.checked;
    const currentValues = formData[key]
      ? formData[key].split(",").map((item) => item.trim())
      : [];

    let newValues;
    if (isChecked) {
      newValues = [...new Set([...currentValues, option])]; // Add option if checked
    } else {
      newValues = currentValues.filter((item) => item !== option); // Remove option if unchecked
    }
    if (option === "Others" || option === "Yes") {
      setOtherVisible((prev) => {
        const newOtherVisible = !prev[key];
        if (!newOtherVisible) {
          newValues = newValues.filter((item) => item !== option);
          setFormData((prevData) => ({ ...prevData, [`${key}_other`]: "" })); // Reset other value
        } else {
          newValues.push(option);
        }
        return { ...prev, [key]: newOtherVisible };
      });
    }

    setFormData((prevData) => ({
      ...prevData,
      [key]: newValues.join(", "),
    }));
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleRadioChange = (e, key) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    // Handle the "Yes" option for radio buttons
    if (value === "Yes") {
      setOtherVisible((prev) => ({ ...prev, [key]: true }));
    } else {
      setOtherVisible((prev) => ({ ...prev, [key]: false }));
      setFormData((prevData) => ({ ...prevData, [`${key}_other`]: "" }));
    }
  };

  const today = new Date().toISOString().split("T")[0];

  // const renderFurtherInfoQuestions = (subQ, q) => {
  //   if (!Array.isArray(subQ.subQuestionNeedFUrtherInfo)) {
  //     return null;
  //   }
  //   {
  //     console.log(subQ);
  //   }
  //   return subQ.subQuestionNeedFUrtherInfo.map((subQuestionForOtherOption) => {
  //     const uniqueKey =
  //       subQuestionForOtherOption.needFurtherInfoId ||
  //       subQuestionForOtherOption.needFUrtherInfoHeading;

  //     switch (subQuestionForOtherOption.needFUrtherInfoQuestionType) {
  //       case "checkbox":
  //         return (
  //           <div key={uniqueKey} className="space-y-2">
  //             <label className="inline-flex items-center">
  //               <input
  //                 type="checkbox"
  //                 id={`${q.questionId}_${subQuestionForOtherOption.needFUrtherInfoHeading}`}
  //                 name={subQuestionForOtherOption.needFUrtherInfoHeading}
  //                 checked={
  //                   formData[q.questionId]?.includes(
  //                     subQuestionForOtherOption.needFUrtherInfoHeading
  //                   ) || false
  //                 }
  //                 onChange={(e) =>
  //                   handleChange(
  //                     e,
  //                     q.questionId,
  //                     subQuestionForOtherOption.needFUrtherInfoHeading
  //                   )
  //                 }
  //                 className="mr-2"
  //               />
  //               <span>{subQuestionForOtherOption.needFUrtherInfoHeading}</span>
  //             </label>
  //           </div>
  //         );
  //       case "text":
  //         return (
  //           <>
  //             <input
  //               key={uniqueKey}
  //               type="text"
  //               placeholder="Please specify"
  //               value={
  //                 formData[
  //                   `${subQuestionForOtherOption.needFUrtherInfoHeading}`
  //                 ] || ""
  //               }
  //               onChange={(e) =>
  //                 handleInputChange(
  //                   e,
  //                   `${subQuestionForOtherOption.needFUrtherInfoHeading}`
  //                 )
  //               }
  //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
  //             />
  //           </>
  //         );
  //       case "radio":
  //         return (
  //           <div key={uniqueKey} className="space-x-4">
  //             {subQ.options?.map((option, optionIndex) => (
  //               <label key={optionIndex} className="inline-flex items-center">
  //                 <input
  //                   type="radio"
  //                   name={subQuestionForOtherOption.needFUrtherInfoHeading}
  //                   value={option}
  //                   checked={
  //                     formData[
  //                       subQuestionForOtherOption.needFUrtherInfoHeading
  //                     ] === option
  //                   }
  //                   onChange={(e) =>
  //                     handleRadioChange(
  //                       e,
  //                       subQuestionForOtherOption.needFUrtherInfoHeading
  //                     )
  //                   }
  //                   className="mr-2"
  //                 />

  //                 {option}
  //               </label>
  //             ))}
  //           </div>
  //         );
  //       case "dropdown":
  //         return (
  //           <select
  //             key={uniqueKey}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md"
  //             name={subQuestionForOtherOption.needFUrtherInfoHeading}
  //             value={
  //               formData[subQuestionForOtherOption.needFUrtherInfoHeading] || ""
  //             }
  //             onChange={(e) =>
  //               handleInputChange(
  //                 e,
  //                 subQuestionForOtherOption.needFUrtherInfoHeading
  //               )
  //             }
  //           >
  //             <option value="">Select an option</option>
  //             {subQ.options?.map((option, optionIndex) => (
  //               <option key={optionIndex} value={option}>
  //                 {option}
  //               </option>
  //             ))}
  //           </select>
  //         );
  //       case "date":
  //         return (
  //           <input
  //             key={uniqueKey}
  //             type="date"
  //             value={
  //               formData[subQuestionForOtherOption.needFUrtherInfoHeading] || ""
  //             }
  //             onChange={(e) =>
  //               handleInputChange(
  //                 e,
  //                 subQuestionForOtherOption.needFUrtherInfoHeading
  //               )
  //             }
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md"
  //           />
  //         );
  //       default:
  //         return null;
  //     }
  //   });
  // };

  // const renderFurtherInfoQuestions = (subQ, q) => {
  //   if (!Array.isArray(subQ.subQuestionNeedFUrtherInfo)) {
  //     return null;
  //   }

  //   return subQ.subQuestionNeedFUrtherInfo.map((subQuestionForOtherOption) => {
  //     const uniqueKey = subQuestionForOtherOption.needFurtherInfoId;

  //     // Common wrapper with question text
  //     const QuestionWrapper = ({ children }) => (
  //       <div key={uniqueKey} className="space-y-2 mt-3">
  //         {subQuestionForOtherOption.needFUrtherInfoHeading && (
  //           <p className="font-medium mb-2">
  //             {subQuestionForOtherOption.needFUrtherInfoHeading}
  //           </p>
  //         )}
  //         {subQuestionForOtherOption.needFUrtherInfonText && (
  //           <p className="text-gray-600 mb-2">
  //             {subQuestionForOtherOption.needFUrtherInfonText}
  //           </p>
  //         )}
  //         {children}
  //       </div>
  //     );

  //     switch (subQuestionForOtherOption.needFUrtherInfoQuestionType) {
  //       case "checkbox":
  //         return (
  //           <QuestionWrapper key={uniqueKey}>
  //             <label className="inline-flex items-center">
  //               <input
  //                 type="checkbox"
  //                 id={`${q.questionId}_${subQuestionForOtherOption.needFurtherInfoId}`}
  //                 name={subQuestionForOtherOption.needFurtherInfoId}
  //                 checked={
  //                   formData[q.questionId]?.includes(
  //                     subQuestionForOtherOption.needFurtherInfoId
  //                   ) || false
  //                 }
  //                 onChange={(e) =>
  //                   handleChange(
  //                     e,
  //                     q.questionId,
  //                     subQuestionForOtherOption.needFurtherInfoId
  //                   )
  //                 }
  //                 className="mr-2"
  //               />
  //               <span>{subQuestionForOtherOption.needFurtherInfoId}</span>
  //             </label>
  //           </QuestionWrapper>
  //         );

  //       case "text":
  //         return (

  //             <input
  //               type="text"
  //               placeholder="Please specify"
  //               key={uniqueKey}
  //               name={`${q.questionId}_${subQuestionForOtherOption.needFurtherInfoId}`}
  //               value={
  //                 formData[
  //                   `${q.questionId}_${subQuestionForOtherOption.needFurtherInfoId}`
  //                 ] || ""
  //               }
  //               onChange={(e) =>
  //                 handleInputChange(
  //                   e,
  //                   `${q.questionId}_${subQuestionForOtherOption.needFurtherInfoId}` // Unique key for form data
  //                 )
  //               }
  //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
  //             />

  //         );

  //       case "radio":
  //         return (
  //           <QuestionWrapper key={uniqueKey}>
  //             <div className="space-x-4">
  //               {subQuestionForOtherOption.options?.map(
  //                 (option, optionIndex) => (
  //                   <label
  //                     key={optionIndex}
  //                     className="inline-flex items-center mr-4"
  //                   >
  //                     <input
  //                       type="radio"
  //                       name={subQuestionForOtherOption.needFurtherInfoId}
  //                       value={option}
  //                       checked={
  //                         formData[
  //                           subQuestionForOtherOption.needFurtherInfoId
  //                         ] === option
  //                       }
  //                       onChange={(e) =>
  //                         handleRadioChange(
  //                           e,
  //                           subQuestionForOtherOption.needFurtherInfoId
  //                         )
  //                       }
  //                       className="mr-2"
  //                     />

  //                     {option}
  //                   </label>
  //                 )
  //               )}
  //             </div>
  //           </QuestionWrapper>
  //         );

  //       case "dropdown":
  //         return (
  //           <QuestionWrapper key={uniqueKey}>
  //             <select
  //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
  //               name={subQuestionForOtherOption.needFUrtherInfoHeading}
  //               value={
  //                 formData[subQuestionForOtherOption.needFUrtherInfoHeading] ||
  //                 ""
  //               }
  //               onChange={(e) =>
  //                 handleInputChange(
  //                   e,
  //                   subQuestionForOtherOption.needFUrtherInfoHeading
  //                 )
  //               }
  //             >
  //               <option value="">Select an option</option>
  //               {subQuestionForOtherOption.options?.map(
  //                 (option, optionIndex) => (
  //                   <option key={optionIndex} value={option}>
  //                     {option}
  //                   </option>
  //                 )
  //               )}
  //             </select>
  //           </QuestionWrapper>
  //         );

  //       case "date":
  //         return (
  //           <QuestionWrapper key={uniqueKey}>
  //             <input
  //               type="date"
  //               max={today}
  //               value={
  //                 formData[subQuestionForOtherOption.needFUrtherInfoHeading] ||
  //                 ""
  //               }
  //               onChange={(e) =>
  //                 handleInputChange(
  //                   e,
  //                   subQuestionForOtherOption.needFUrtherInfoHeading
  //                 )
  //               }
  //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
  //             />
  //           </QuestionWrapper>
  //         );

  //       default:
  //         return null;
  //     }
  //   });
  // };

  const renderFurtherInfoQuestions = (subQ, q) => {
    if (!Array.isArray(subQ.subQuestionNeedFUrtherInfo)) {
      return null;
    }

    return subQ.subQuestionNeedFUrtherInfo.map((subQuestionForOtherOption) => {
      const uniqueKey = `${q.questionId}_${subQuestionForOtherOption.needFUrtherInfoId}`;

      switch (subQuestionForOtherOption.needFUrtherInfoQuestionType) {
        case "text":
          return (
            <div key={uniqueKey} className="space-y-2">
              <input
                type="text"
                placeholder="Please specify"
                value={formData[uniqueKey] || ""}
                onChange={(e) => handleInputChange(e, uniqueKey)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          );

        case "radio":
          return (
            <div key={uniqueKey} className="space-y-2">
              {subQuestionForOtherOption.options?.map((option, index) => (
                <label key={index} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={uniqueKey} // Group radios by unique key
                    value={option}
                    checked={formData[uniqueKey] === option}
                    onChange={(e) => handleRadioChange(e, uniqueKey)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          );

        case "dropdown":
          return (
            <div key={uniqueKey} className="space-y-2">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData[uniqueKey] || ""}
                onChange={(e) => handleInputChange(e, uniqueKey)}
              >
                <option value="">Select an option</option>
                {subQuestionForOtherOption.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );

        case "checkbox":
          return (
            <div key={uniqueKey} className="space-y-2">
              {subQuestionForOtherOption.options?.map((option, index) => (
                <label key={index} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id={`${uniqueKey}_${option}`} // Unique ID for each checkbox
                    name={option}
                    checked={formData[uniqueKey]?.includes(option) || false}
                    onChange={(e) => handleChange(e, uniqueKey, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          );

        case "date":
          return (
            <div key={uniqueKey} className="space-y-2">
              <input
                type="date"
                max={today} // Ensure no future dates
                value={formData[uniqueKey] || ""}
                onChange={(e) => handleInputChange(e, uniqueKey)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <div className="space-y-4">
      {questions.map((form) => (
        <div key={form.formName} className="form-group">
          <h2 className="text-xl font-bold">{form.formName}</h2>
          {form.question?.map((q) => (
            <div key={q.questionId} className="question-group">
              {q.questionHeading && (
                <h3 className="text-lg font-bold">{q.questionHeading}</h3>
              )}
              <p>{q.questionText}</p>

              {q.subQuestions?.map((subQ) => (
                <div key={subQ.subQuestionId} className="space-y-2">
                  {subQ.subQuestionType === "checkbox" && (
                    <div className="space-y-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id={`${q.questionId}_${subQ.subQuestionHeading}`}
                          name={subQ.subQuestionHeading}
                          checked={
                            formData[q.questionId]?.includes(
                              subQ.subQuestionHeading
                            ) || false
                          }
                          onChange={(e) =>
                            handleChange(
                              e,
                              q.questionId,
                              subQ.subQuestionHeading
                            )
                          }
                          className="mr-2"
                        />
                        <span>{subQ.subQuestionHeading}</span>
                      </label>
                      {subQ.subQuestionHeading === "Others" &&
                        otherVisible[q.questionId] &&
                        renderFurtherInfoQuestions(subQ, q)}
                    </div>
                  )}
                  {subQ.subQuestionType === "text" && (
                    <input
                      key={subQ.subQuestionId}
                      type="text"
                      placeholder={subQ.subQuestionText}
                      value={
                        formData[`${q.questionId}_${subQ.subQuestionId}`] || ""
                      } // Unique value
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          `${q.questionId}_${subQ.subQuestionId}`
                        )
                      } // Unique key
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  )}
                  {subQ.subQuestionType === "radio" && (
                    <div key={subQ.subQuestionId}>
                      <div className="space-x-4">
                        {subQ.options?.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="inline-flex items-center"
                          >
                            <input
                              type="radio"
                              name={q.questionId}
                              value={option}
                              checked={formData[q.questionId] === option}
                              onChange={(e) =>
                                handleRadioChange(e, q.questionId)
                              }
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                      {formData[q.questionId] === "Yes" &&
                        otherVisible[q.questionId] &&
                        renderFurtherInfoQuestions(subQ, q)}
                    </div>
                  )}
                  {subQ.subQuestionType === "dropdown" && (
                    <select
                      key={subQ.subQuestionId}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      name={q.questionId}
                      value={formData[q.questionId] || ""}
                      onChange={(e) => handleInputChange(e, q.questionId)}
                    >
                      <option value="">Select an option</option>
                      {subQ.options?.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {subQ.subQuestionType === "date" && (
                    <input
                      key={subQ.subQuestionId}
                      type="date"
                      max={today}
                      value={formData[q.questionId] || ""}
                      onChange={(e) => handleInputChange(e, q.questionId)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;




@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




const formDataJsons = {
  //   PGX: [
  //     {
  //       formName: "Current Medications",
  //       question: [
  //         {
  //           questionHeading: "",
  //           questionText:
  //             "Are you taking any of the following types of medications? (Check all that apply)",
  //           subQuestions: [
  //             {
  //               subQuestionHeading:
  //                 "Statins for high cholesterol (e.g., atorvastatin, simvastatin)",
  //               subQuestionType: "checkbox",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionHeading:
  //                 "Antidepressants (e.g., SSRIs, SNRIs, tricyclics)",
  //               subQuestionType: "checkbox",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionHeading: "Cancer medications",
  //               subQuestionType: "checkbox",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionHeading:
  //                 "Blood thinners (e.g., warfarin, clopidogrel)",
  //               subQuestionType: "checkbox",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionHeading: "HIV medications",
  //               subQuestionType: "checkbox",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionHeading: "Immunosuppressants",
  //               subQuestionType: "checkbox",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionHeading: "Others",
  //               subQuestionType: "checkbox",
  //               subQuestionText: "",
  //               subQuestionNeedFUrtherInfo: [
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "",
  //                   needFUrtherInfonText: "",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       formName: "Detailed Medical History",
  //       question: [
  //         {
  //           questionHeading: "Cardiovascular",
  //           questionText:
  //             "Do you have any of the following cardiovascular conditions? Please check all that apply:",
  //           subQuestions: [
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "High cholesterol",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "High blood pressure",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "History of heart attack or stroke",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "Others",
  //               subQuestionText: "",
  //             //   subQuestionNeedFUrtherInfo: [
  //             //     {
  //             //       needFUrtherInfoQuestionType: "text",
  //             //       needFUrtherInfoHeading: "",
  //             //       needFUrtherInfonText: "",
  //             //     },
  //             //   ],
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "Mental Health",
  //           questionText:
  //             "Do you have any of the following mental health conditions? Please check all that apply:",
  //           subQuestions: [
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "Depression",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "Anxiety",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "Bipolar disorder",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "Other mental health conditions",
  //               subQuestionText: "",
  //               subQuestionNeedFUrtherInfo: [
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "",
  //                   needFUrtherInfonText: "",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "Cancer",
  //           questionText: "What type of cancer have you had?",
  //           subQuestions: [
  //             {
  //               subQuestionType: "text",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "",
  //           questionText: "What was the date of your diagnosis?",
  //           subQuestions: [
  //             {
  //               subQuestionType: "date",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "",
  //           questionText: "What is your current status?",
  //           subQuestions: [
  //             {
  //               subQuestionType: "dropdown",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //               options: ["In treatment", "In remission", "Cured"],
  //             },
  //           ],
  //         },

  //         {
  //           questionHeading: "Blood Disorders",
  //           questionText: "Do you have any history of blood clots? ",
  //           subQuestions: [
  //             {
  //               subQuestionType: "date",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "",
  //           questionText: "Do you have a bleeding problem? ",
  //           subQuestions: [
  //             {
  //               subQuestionType: "text",
  //               subQuestionHeading: "",
  //               subQuestionText: "Bleeding disorders",
  //             },
  //           ],
  //         },

  //         {
  //           questionHeading: "Infectious Diseases",
  //           questionText:
  //             "Do you have HIV? Please provide the date of diagnosis.",
  //           subQuestions: [
  //             {
  //               subQuestionType: "date",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "",
  //           questionText:
  //             "Do you have hepatitis? Please specify the type and date of diagnosis:",
  //           subQuestions: [
  //             {
  //               subQuestionType: "text",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "",
  //           questionText:
  //             "Do you have any other infectious diseases? Please specify:",
  //           subQuestions: [
  //             {
  //               subQuestionType: "text",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //             },
  //           ],
  //         },

  //         {
  //           questionHeading: "Autoimmune Disorders",
  //           questionText:
  //             "Ignore if not applicableDo you have any of the following autoimmune conditions? Please check all that apply.",
  //           subQuestions: [
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "Rheumatoid Arthritis",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "Lupus",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "Multiple sclerosis",
  //               subQuestionText: "",
  //             },
  //             {
  //               subQuestionType: "checkbox",
  //               subQuestionHeading: "Other autoimmune conditions",
  //               subQuestionText: "",
  //               subQuestionNeedFUrtherInfo: [
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "",
  //                   needFUrtherInfonText: "",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "Organ Transplants",
  //           questionText: "What type of transplant have you received?",
  //           subQuestions: [
  //             {
  //               subQuestionType: "text",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "",
  //           questionText: "What was the date of your transplant?",
  //           subQuestions: [
  //             {
  //               subQuestionType: "date",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //             },
  //           ],
  //         },

  //         {
  //           questionHeading: "Other Medical History",
  //           questionText:
  //             "Please list any other significant medical conditions not covered in the previous sections:",
  //           subQuestions: [
  //             {
  //               subQuestionType: "text",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       formName: "Detailed Medication Reactions",
  //       question: [
  //         {
  //           questionHeading: "",
  //           questionText:
  //             "Have you ever experienced an unusual or severe reaction to any medication?",
  //           subQuestions: [
  //             {
  //               subQuestionType: "radio",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //               options: ["Yes", "No"],
  //               subQuestionNeedFUrtherInfo: [
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "Medication Name",
  //                   needFUrtherInfonText: "",
  //                 },
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "Reaction Description",
  //                   needFUrtherInfonText: "",
  //                 },
  //                 {
  //                   needFUrtherInfoQuestionType: "dropdown",
  //                   needFUrtherInfoHeading: "Severity ",
  //                   needFUrtherInfonText: "",
  //                 },
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "Duration ",
  //                   needFUrtherInfonText: "",
  //                 },
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "Action Taken ",
  //                   needFUrtherInfonText: "",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "",
  //           questionText:
  //             "Have you ever had genetic testing that showed you were at risk for medication side effects?",
  //           subQuestions: [
  //             {
  //               subQuestionType: "radio",
  //               subQuestionHeading: "",
  //               subQuestionText:
  //                 "Have you ever had genetic testing that showed you were at risk for medication side effects?",
  //               options: ["Yes", "No", "Unsure"],
  //               subQuestionNeedFUrtherInfo: [
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "",
  //                   needFUrtherInfonText: "",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       formName: "Family History",
  //       question: [
  //         {
  //           questionHeading: "",
  //           questionText: "Do you smoke? ",
  //           subQuestions: [
  //             {
  //               subQuestionType: "radio",
  //               subQuestionHeading: "",
  //               subQuestionText: "Do you smoke? ",
  //               options: ["Yes", "No"],
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "",
  //           questionText: "Do you consume alcohol? ",
  //           subQuestions: [
  //             {
  //               subQuestionType: "radio",
  //               subQuestionHeading: "",
  //               subQuestionText: "Do you smoke? ",
  //               options: ["Yes", "No"],
  //               subQuestionNeedFUrtherInfo: [
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "",
  //                   needFUrtherInfonText: "",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           questionHeading: "",
  //           questionText: "Do you follow any specific diet?",
  //           subQuestions: [
  //             {
  //               subQuestionType: "radio",
  //               subQuestionHeading: "",
  //               subQuestionText: "Do you follow any specific diet?",
  //               options: ["Yes", "No"],
  //               subQuestionNeedFUrtherInfo: [
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "",
  //                   needFUrtherInfonText: "",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },

  //     {
  //       formName: "Lifestyle Factors",
  //       question: [
  //         {
  //           questionHeading: "",
  //           questionText:
  //             "Has anyone in your immediate family experienced unusual reactions to medications?",
  //           subQuestions: [
  //             {
  //               subQuestionType: "radio",
  //               subQuestionHeading: "",
  //               subQuestionText: "",
  //               options: ["Yes", "No", "Unsure"],
  //               subQuestionNeedFUrtherInfo: [
  //                 {
  //                   needFUrtherInfoQuestionType: "text",
  //                   needFUrtherInfoHeading: "",
  //                   needFUrtherInfonText: "",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],

  PGX: [
    {
      formName: "Current Medications",
      question: [
        {
          questionId: "medications_1",
          questionHeading: "",
          questionText:
            "Are you taking any of the following types of medications? (Check all that apply)",
          subQuestions: [
            {
              subQuestionId: "medications_statins",
              subQuestionHeading:
                "Statins for high cholesterol (e.g., atorvastatin, simvastatin)",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "medications_antidepressants",
              subQuestionHeading:
                "Antidepressants (e.g., SSRIs, SNRIs, tricyclics)",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "medications_cancer",
              subQuestionHeading: "Cancer medications",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "medications_blood_thinners",
              subQuestionHeading:
                "Blood thinners (e.g., warfarin, clopidogrel)",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "medications_hiv",
              subQuestionHeading: "HIV medications",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "medications_immunosuppressants",
              subQuestionHeading: "Immunosuppressants",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "medications_others",
              subQuestionHeading: "Others",
              subQuestionType: "checkbox",
              subQuestionText: "",
              subQuestionNeedFUrtherInfo: [
                {
                  needFurtherInfoId: "medications_others_text",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      formName: "Detailed Medical History",
      question: [
        {
          questionId: "medical_history_cardiovascular",
          questionHeading: "Cardiovascular",
          questionText:
            "Do you have any of the following cardiovascular conditions? Please check all that apply:",
          subQuestions: [
            {
              subQuestionId: "medical_history_high_cholesterol",
              subQuestionType: "checkbox",
              subQuestionHeading: "High cholesterol",
              subQuestionText: "",
            },
            {
              subQuestionId: "medical_history_high_blood_pressure",
              subQuestionType: "checkbox",
              subQuestionHeading: "High blood pressure",
              subQuestionText: "",
            },
            {
              subQuestionId: "medical_history_heart_attack",
              subQuestionType: "checkbox",
              subQuestionHeading: "History of heart attack or stroke",
              subQuestionText: "",
            },
            {
              subQuestionId: "medical_history_others",
              subQuestionType: "checkbox",
              subQuestionHeading: "Others",
              subQuestionText: "",
              subQuestionNeedFUrtherInfo: [
                {
                  needFurtherInfoId: "medical_history_others_text",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
        {
          questionId: "medical_history_mental_health",
          questionHeading: "Mental Health",
          questionText:
            "Do you have any of the following mental health conditions? Please check all that apply:",
          subQuestions: [
            {
              subQuestionId: "mental_health_depression",
              subQuestionType: "checkbox",
              subQuestionHeading: "Depression",
              subQuestionText: "",
            },
            {
              subQuestionId: "mental_health_anxiety",
              subQuestionType: "checkbox",
              subQuestionHeading: "Anxiety",
              subQuestionText: "",
            },
            {
              subQuestionId: "mental_health_bipolar",
              subQuestionType: "checkbox",
              subQuestionHeading: "Bipolar disorder",
              subQuestionText: "",
            },
            {
              subQuestionId: "mental_health_other_conditions",
              subQuestionType: "checkbox",
              subQuestionHeading: "Others",
              subQuestionText: "",
              subQuestionNeedFUrtherInfo: [
                {
                  needFurtherInfoId: "mental_health_others_text",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
        {
          questionId: "medical_history_cancer_type",
          questionHeading: "Cancer",
          questionText: "What type of cancer have you had?",
          subQuestions: [
            {
              subQuestionId: "cancer_type_input",
              subQuestionType: "text",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "medical_history_cancer_diagnosis_date",
          questionHeading: "",
          questionText: "What was the date of your diagnosis?",
          subQuestions: [
            {
              subQuestionId: "cancer_diagnosis_date",
              subQuestionType: "date",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "medical_history_current_status",
          questionHeading: "",
          questionText: "What is your current status?",
          subQuestions: [
            {
              subQuestionId: "current_status_dropdown",
              subQuestionType: "dropdown",
              subQuestionHeading: "",
              subQuestionText: "",
              options: ["In treatment", "In remission", "Cured"],
            },
          ],
        },
        {
          questionId: "medical_history_blood_disorders",
          questionHeading: "Blood Disorders",
          questionText: "Do you have any history of blood clots?",
          subQuestions: [
            {
              subQuestionId: "blood_disorders_date",
              subQuestionType: "date",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "medical_history_bleeding_problem",
          questionHeading: "",
          questionText: "Do you have a bleeding problem?",
          subQuestions: [
            {
              subQuestionId: "bleeding_problem_input",
              subQuestionType: "text",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "medical_history_infectious_diseases_hiv",
          questionHeading: "Infectious Diseases",
          questionText:
            "Do you have HIV? Please provide the date of diagnosis.",
          subQuestions: [
            {
              subQuestionId: "hiv_diagnosis_date",
              subQuestionType: "date",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "medical_history_infectious_hepatitis",
          questionHeading: "",
          questionText:
            "Do you have hepatitis? Please specify the type and date of diagnosis:",
          subQuestions: [
            {
              subQuestionId: "hepatitis_specify",
              subQuestionType: "text",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "medical_history_other_infectious_diseases",
          questionHeading: "",
          questionText:
            "Do you have any other infectious diseases? Please specify:",
          subQuestions: [
            {
              subQuestionId: "other_infectious_diseases_specify",
              subQuestionType: "text",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "medical_history_autoimmune_disorders",
          questionHeading: "Autoimmune Disorders",
          questionText:
            "Ignore if not applicable. Do you have any of the following autoimmune conditions? Please check all that apply.",
          subQuestions: [
            {
              subQuestionId: "autoimmune_disorders_rheumatoid",
              subQuestionType: "checkbox",
              subQuestionHeading: "Rheumatoid Arthritis",
              subQuestionText: "",
            },
            {
              subQuestionId: "autoimmune_disorders_lupus",
              subQuestionType: "checkbox",
              subQuestionHeading: "Lupus",
              subQuestionText: "",
            },
            {
              subQuestionId: "autoimmune_disorders_multiple_sclerosis",
              subQuestionType: "checkbox",
              subQuestionHeading: "Multiple sclerosis",
              subQuestionText: "",
            },
            {
              subQuestionId: "autoimmune_disorders_other_conditions",
              subQuestionType: "checkbox",
              subQuestionHeading: "Others",
              subQuestionText: "",
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoId: "autoimmune_disorders_others_text",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
        {
          questionId: "medical_history_organ_transplants",
          questionHeading: "Organ Transplants",
          questionText: "What type of transplant have you received?",
          subQuestions: [
            {
              subQuestionId: "transplant_type_input",
              subQuestionType: "text",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "medical_history_transplant_date",
          questionHeading: "",
          questionText: "What was the date of your transplant?",
          subQuestions: [
            {
              subQuestionId: "transplant_date",
              subQuestionType: "date",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "medical_history_other_conditions",
          questionHeading: "Other Medical History",
          questionText:
            "Please list any other significant medical conditions not covered in the previous sections:",
          subQuestions: [
            {
              subQuestionId: "other_conditions_input",
              subQuestionType: "text",
              subQuestionHeading: "",
              subQuestionText: "",
            },
          ],
        },
      ],
    },
    {
      formName: "Detailed Medication Reactions",
      question: [
        {
          questionId: "medication_reactions_unusual_reaction",
          questionHeading: "",
          questionText:
            "Have you ever experienced an unusual or severe reaction to any medication?",
          subQuestions: [
            {
              subQuestionId: "medication_reactions_radio",
              subQuestionType: "radio",
              subQuestionHeading: "",
              subQuestionText: "",
              options: ["Yes", "No"],
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoId: "medication_reactions_text",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "Medication Name",
                  needFUrtherInfonText: "",
                },
                {
                  needFUrtherInfoId: "medication_reactions_text_1",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "Reaction Description",
                  needFUrtherInfonText: "",
                },
                {
                  needFUrtherInfoId: "medication_reactions_dropdown",
                  needFUrtherInfoQuestionType: "dropdown",
                  needFUrtherInfoHeading: "Severity ",
                  needFUrtherInfonText: "",
                  options: ["Mild", "Moderate", "Severe"],
                },
                {
                  needFUrtherInfoId: "medication_reactions_text_2",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "Duration ",
                  needFUrtherInfonText: "",
                },
                {
                  needFUrtherInfoId: "medication_reactions_text_3",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "Action Taken ",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
        {
          questionId: "medication_reactions_genetic_testing",
          questionHeading: "",
          questionText:
            "Have you ever had genetic testing that showed you were at risk for medication side effects?",
          subQuestions: [
            {
              subQuestionId: "genetic_testing_radio",
              subQuestionType: "radio",
              subQuestionHeading: "",
              subQuestionText:
                "Have you ever had genetic testing that showed you were at risk for medication side effects?",
              options: ["Yes", "No", "Unsure"],
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoId: "genetic_testing_text",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      formName: "Family History",
      question: [
        {
          questionId: "family_history_smoking",
          questionHeading: "",
          questionText: "Do you smoke?",
          subQuestions: [
            {
              subQuestionId: "smoke_radio",
              subQuestionType: "radio",
              subQuestionHeading: "",
              subQuestionText: "Do you smoke?",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "family_history_alcohol",
          questionHeading: "",
          questionText: "Do you consume alcohol?",
          subQuestions: [
            {
              subQuestionId: "alcohol_radio",
              subQuestionType: "radio",
              subQuestionHeading: "",
              subQuestionText: "Do you consume alcohol?",
              options: ["Yes", "No"],
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoId: "alcohol_text",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
        {
          questionId: "family_history_specific_diet",
          questionHeading: "",
          questionText: "Do you follow any specific diet?",
          subQuestions: [
            {
              subQuestionId: "specific_diet_radio",
              subQuestionType: "radio",
              subQuestionHeading: "",
              subQuestionText: "Do you follow any specific diet?",
              options: ["Yes", "No"],
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoId: "specific_diet_text",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      formName: "Lifestyle Factors",
      question: [
        {
          questionId: "lifestyle_family_reactions",
          questionHeading: "",
          questionText:
            "Has anyone in your immediate family experienced unusual reactions to medications?",
          subQuestions: [
            {
              subQuestionId: "family_medication_reactions",
              subQuestionType: "radio",
              subQuestionHeading: "",
              subQuestionText: "",
              options: ["Yes", "No", "Unsure"],
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoId: "family_medication_reactions_text",
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  respiratory: [
    {
      formName: "Medical History",
      question: [
        {
          questionId: "symptom_experience", // More meaningful identifier
          questionHeading: "",
          questionText: "Are you experiencing any of the following symptoms?",
          subQuestions: [
            {
              subQuestionId: "symptom_experience_sq1", // Hierarchical ID
              subQuestionHeading: "Coughing",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq2",
              subQuestionHeading: "Sneezing",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq3",
              subQuestionHeading: "Stuffy or runny nose",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq4",
              subQuestionHeading: "Sore throat",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq5",
              subQuestionHeading: "Headache",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq6",
              subQuestionHeading: "Weakness or fatigue",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq7",
              subQuestionHeading: "Muscle aches",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq8",
              subQuestionHeading: "Fever or chills",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq9",
              subQuestionHeading: "Wheezing or difficulty breathing",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq10",
              subQuestionHeading: "Low appetite",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq11",
              subQuestionHeading: "Diarrhea",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq12",
              subQuestionHeading: "Vomiting",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "symptom_experience_sq13",
              subQuestionHeading: "Others",
              subQuestionType: "checkbox",
              subQuestionText: "",
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
        {
          questionId: "symptom_duration", // More meaningful identifier
          questionHeading: "",
          questionText: "How long have you been experiencing these symptoms?",
          subQuestions: [
            {
              subQuestionId: "symptom_duration_sq1",
              subQuestionHeading: "",
              subQuestionType: "dropdown",
              subQuestionText: "",
              options: [
                "Less than 24 hours",
                "1-3 days",
                "4-7 days",
                "More than a week",
              ],
            },
          ],
        },
        {
          questionId: "high_risk_categories", // More meaningful identifier
          questionHeading: "",
          questionText:
            "Do you fall into any of the following high-risk categories?",
          subQuestions: [
            {
              subQuestionId: "high_risk_categories_sq1",
              subQuestionHeading: "",
              subQuestionType: "dropdown",
              subQuestionText: "",
              options: [
                "Very young (infant or young child)",
                "Elderly (65 years or older)",
                "Weakened (compromised) immune system",
                "Pregnant",
                "Living in close quarters (e.g., dormitory, nursing home, military barracks)",
              ],
            },
          ],
        },
        {
          questionId: "recent_contact_infection", // More meaningful identifier
          questionHeading: "",
          questionText:
            "Have you recently been in close contact with someone who has a respiratory infection?",
          subQuestions: [
            {
              subQuestionId: "recent_contact_infection_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No", "Unsure"],
            },
          ],
        },
        {
          questionId: "cold_flu_season", // More meaningful identifier
          questionHeading: "",
          questionText:
            "Is it currently cold and flu season (late fall through early spring)?",
          subQuestions: [
            {
              subQuestionId: "cold_flu_season_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "flu_vaccination", // More meaningful identifier
          questionHeading: "",
          questionText: "Have you received a flu vaccination this year?",
          subQuestions: [
            {
              subQuestionId: "flu_vaccination_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "hospitalization_consideration", // More meaningful identifier
          questionHeading: "",
          questionText:
            "Are your symptoms severe enough to consider hospitalization?",
          subQuestions: [
            {
              subQuestionId: "hospitalization_consideration_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No", "Unsure"],
            },
          ],
        },
        {
          questionId: "recent_travel_outbreak", // More meaningful identifier
          questionHeading: "",
          questionText:
            "Have you traveled recently to an area with known respiratory disease outbreaks?",
          subQuestions: [
            {
              subQuestionId: "recent_travel_outbreak_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "pre_existing_conditions", // More meaningful identifier
          questionHeading: "",
          questionText: "Do you have any pre-existing respiratory conditions?",
          subQuestions: [
            {
              subQuestionId: "pre_existing_conditions_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
        {
          questionId: "medications_currently_taking", // More meaningful identifier
          questionHeading: "",
          questionText:
            "Are you currently taking any medications for your symptoms?",
          subQuestions: [
            {
              subQuestionId: "medications_currently_taking_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
        {
          questionId: "symptom_improvement", // More meaningful identifier
          questionHeading: "",
          questionText:
            "Have you noticed any improvement in your symptoms with over-the-counter medications?",
          subQuestions: [
            {
              subQuestionId: "symptom_improvement_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No", "Haven't tried any"],
            },
          ],
        },
        {
          questionId: "concerning_symptoms", // More meaningful identifier
          questionHeading: "",
          questionText:
            "Are you experiencing any symptoms that are particularly concerning or different from a typical cold or flu?",
          subQuestions: [
            {
              subQuestionId: "concerning_symptoms_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
              subQuestionNeedFUrtherInfo: [
                {
                  needFUrtherInfoQuestionType: "text",
                  needFUrtherInfoHeading: "",
                  needFUrtherInfonText: "",
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  // Respiratory: [
  //   {
  //     formName: "Medical History",
  //     question: [
  //       {
  //         questionHeading: "",
  //         questionText: "Are you experiencing any of the following symptoms? ",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "Coughing ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Sneezing ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Stuffy or runny nose ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Sore throat",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Headache ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Weakness or fatigue ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Muscle aches  ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Fever or chills ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Wheezing or difficulty breathing ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Low appetite ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Diarrhea",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Vomiting",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Others",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //             subQuestionNeedFUrtherInfo: [
  //               {
  //                 needFUrtherInfoQuestionType: "text",
  //                 needFUrtherInfoHeading: "",
  //                 needFUrtherInfonText: "",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText: "How long have you been experiencing these symptoms",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "dropdown",
  //             subQuestionText: "",
  //             options: [
  //               "Less than 24 hours",
  //               " 1-3 days",
  //               "4-7 days",
  //               "More than a week",
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Do you fall into any of the following high-risk categories?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "dropdown",
  //             subQuestionText: "",
  //             options: [
  //               "Very young (infant or young child)",
  //               "Elderly (65 years or older)",
  //               "Weakened (compromised) immune system ",
  //               "Pregnant",
  //               "Living in close quarters (e.g., dormitory, nursing home, military barracks)",
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Have you recently been in close contact with someone who has a respiratory infection? ",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No", "Unsure"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Is it currently cold and flu season (late fall through early spring)?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText: "Have you received a flu vaccination this year?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Are your symptoms severe enough to consider hospitalization?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No", "Unsure"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Have you traveled recently to an area with known respiratory disease outbreaks?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText: "Do you have any pre-existing respiratory conditions?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //             subQuestionNeedFUrtherInfo: [
  //               {
  //                 needFUrtherInfoQuestionType: "text",
  //                 needFUrtherInfoHeading: "",
  //                 needFUrtherInfonText: "",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Are you currently taking any medications for your symptoms?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //             subQuestionNeedFUrtherInfo: [
  //               {
  //                 needFUrtherInfoQuestionType: "text",
  //                 needFUrtherInfoHeading: "",
  //                 needFUrtherInfonText: "",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Have you noticed any improvement in your symptoms with over-the-counter medications?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No", "Haven't tried any"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Are you experiencing any symptoms that are particularly concerning or different from a typical cold or flu?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //             subQuestionNeedFUrtherInfo: [
  //               {
  //                 needFUrtherInfoQuestionType: "text",
  //                 needFUrtherInfoHeading: "",
  //                 needFUrtherInfonText: "",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ],
  // Hereditary: [
  //   {
  //     formName: "HBOC Syndrome Testing",
  //     question: [
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Do you have any close family members who were diagnosed with breast cancer at or before the age of 50? ",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Has any close family member been diagnosed with triple-negative breast cancer at any age? ",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Do you have any male relatives who have been diagnosed with breast cancer at any age?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Has anyone in your close family been diagnosed with ovarian cancer at any age?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Does anyone in your close family have a history of pancreatic cancer?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",

  //         questionText:
  //           "Have you been informed that any of your family members with cancer belong to a high-risk or very-high-risk group?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "How many close family members in total have been diagnosed with either breast or prostate cancer? ",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "dropdown",
  //             subQuestionText: "",
  //             options: ["0", "1", "2", "more"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText: "Are you of Ashkenazi Jewish ancestry? ",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Which of the following best describes your family cancer history? ",
  //         subQuestions: [
  //           {
  //             subQuestionHeading:
  //               "Breast cancer in family member(s) aged 50 or younger",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Triple-negative breast cancer",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Male breast cancer",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Ovarian cancer",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Pancreatic cancer",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading:
  //               "Multiple cases of breast and/or prostate cancer ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "None of the above",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     formName: "Lynch Syndrome Testing",
  //     question: [
  //       {
  //         questionHeading: "",
  //         questionText: "Have you been diagnosed with colorectal cancer?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "If yes in above question , were you diagnosed before the age of 50?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No", "Not Applicable"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Have you been diagnosed with any of the following Lynch Syndrome-related cancers? ",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "Endometrial cancer",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Gastric ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Ovarian ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: " ",
  //           },
  //           {
  //             subQuestionHeading: "Pancreatic ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Urothelial",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Biliary tract ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Small intestine  ",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "Brain (Glioblastoma)",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //           {
  //             subQuestionHeading: "None of the above",
  //             subQuestionType: "checkbox",
  //             subQuestionText: "",
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "If you have had colorectal cancer, were you also diagnosed with another Lynch Syndrome-related cancer either at the same time or later?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No", "Not applicable"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Have you ever had genetic testing that showed MMR (Mismatch Repair) deficiency in a tumor?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No", "Unsure"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "If yes in above question, do you know which test was used to determine MMR deficiency?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "dropdown",
  //             subQuestionText: "",
  //             options: [
  //               "PCR",
  //               "NGS (Next-Generation Sequencing)",
  //               "IHC (Immunohistochemistry)",
  //               "None of the above",
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Have you ever had a risk assessment for Lynch Syndrome using a model like PREMM?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No", "Unsure"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "If yes in above question, do you know if your PREMM risk score was greater than 2.5%?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "dropdown",
  //             subQuestionText: "",
  //             options: ["Yes", "No", "Unsure", "Not applicable"],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Have you been diagnosed with any of the following conditions?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "dropdown",
  //             subQuestionText: "",
  //             options: [
  //               "Sebaceous adenoma ",
  //               "Sebaceous carcinoma ",
  //               "Muir-Torre Syndrome (Keratoacanthoma)",
  //               "None of the above",
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         questionHeading: "",
  //         questionText:
  //           "Has a healthcare professional ever suggested that you might be at increased risk for Lynch Syndrome?",
  //         subQuestions: [
  //           {
  //             subQuestionHeading: "",
  //             subQuestionType: "radio",
  //             subQuestionText: "",
  //             options: ["Yes", "No"],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ],

  Hereditary: [
    {
      formName: "HBOC Syndrome Testing",
      question: [
        {
          questionId: "breast_cancer_family", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Do you have any close family members who were diagnosed with breast cancer at or before the age of 50?",
          subQuestions: [
            {
              subQuestionId: "breast_cancer_family_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "triple_negative_cancer_family", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Has any close family member been diagnosed with triple-negative breast cancer at any age?",
          subQuestions: [
            {
              subQuestionId: "triple_negative_cancer_family_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "male_breast_cancer_relatives", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Do you have any male relatives who have been diagnosed with breast cancer at any age?",
          subQuestions: [
            {
              subQuestionId: "male_breast_cancer_relatives_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "ovarian_cancer_family", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Has anyone in your close family been diagnosed with ovarian cancer at any age?",
          subQuestions: [
            {
              subQuestionId: "ovarian_cancer_family_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "pancreatic_cancer_history", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Does anyone in your close family have a history of pancreatic cancer?",
          subQuestions: [
            {
              subQuestionId: "pancreatic_cancer_history_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "family_high_risk_cancer", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Have you been informed that any of your family members with cancer belong to a high-risk or very-high-risk group?",
          subQuestions: [
            {
              subQuestionId: "family_high_risk_cancer_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "family_cancer_count", // Meaningful identifier
          questionHeading: "",
          questionText:
            "How many close family members in total have been diagnosed with either breast or prostate cancer?",
          subQuestions: [
            {
              subQuestionId: "family_cancer_count_sq1",
              subQuestionHeading: "",
              subQuestionType: "dropdown",
              subQuestionText: "",
              options: ["0", "1", "2", "more"],
            },
          ],
        },
        {
          questionId: "ashkenazi_jewish_ancestry", // Meaningful identifier
          questionHeading: "",
          questionText: "Are you of Ashkenazi Jewish ancestry?",
          subQuestions: [
            {
              subQuestionId: "ashkenazi_jewish_ancestry_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "family_cancer_history_description", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Which of the following best describes your family cancer history?",
          subQuestions: [
            {
              subQuestionId: "family_cancer_history_description_sq1",
              subQuestionHeading:
                "Breast cancer in family member(s) aged 50 or younger",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "family_cancer_history_description_sq2",
              subQuestionHeading: "Triple-negative breast cancer",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "family_cancer_history_description_sq3",
              subQuestionHeading: "Male breast cancer",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "family_cancer_history_description_sq4",
              subQuestionHeading: "Ovarian cancer",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "family_cancer_history_description_sq5",
              subQuestionHeading: "Pancreatic cancer",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "family_cancer_history_description_sq6",
              subQuestionHeading:
                "Multiple cases of breast and/or prostate cancer",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "family_cancer_history_description_sq7",
              subQuestionHeading: "None of the above",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
          ],
        },
      ],
    },
    {
      formName: "Lynch Syndrome Testing",
      question: [
        {
          questionId: "colorectal_cancer_diagnosis", // Meaningful identifier
          questionHeading: "",
          questionText: "Have you been diagnosed with colorectal cancer?",
          subQuestions: [
            {
              subQuestionId: "colorectal_cancer_diagnosis_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
        {
          questionId: "colorectal_cancer_age", // Meaningful identifier
          questionHeading: "",
          questionText:
            "If yes in above question, were you diagnosed before the age of 50?",
          subQuestions: [
            {
              subQuestionId: "colorectal_cancer_age_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No", "Not Applicable"],
            },
          ],
        },
        {
          questionId: "lynch_related_cancers", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Have you been diagnosed with any of the following Lynch Syndrome-related cancers?",
          subQuestions: [
            {
              subQuestionId: "lynch_related_cancers_sq1",
              subQuestionHeading: "Endometrial cancer",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "lynch_related_cancers_sq2",
              subQuestionHeading: "Gastric",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "lynch_related_cancers_sq3",
              subQuestionHeading: "Ovarian",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "lynch_related_cancers_sq4",
              subQuestionHeading: "Pancreatic",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "lynch_related_cancers_sq5",
              subQuestionHeading: "Urothelial",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "lynch_related_cancers_sq6",
              subQuestionHeading: "Biliary tract",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "lynch_related_cancers_sq7",
              subQuestionHeading: "Small intestine",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "lynch_related_cancers_sq8",
              subQuestionHeading: "Brain (Glioblastoma)",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
            {
              subQuestionId: "lynch_related_cancers_sq9",
              subQuestionHeading: "None of the above",
              subQuestionType: "checkbox",
              subQuestionText: "",
            },
          ],
        },
        {
          questionId: "colorectal_and_lynch_cancer", // Meaningful identifier
          questionHeading: "",
          questionText:
            "If you have had colorectal cancer, were you also diagnosed with another Lynch Syndrome-related cancer either at the same time or later?",
          subQuestions: [
            {
              subQuestionId: "colorectal_and_lynch_cancer_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No", "Not applicable"],
            },
          ],
        },
        {
          questionId: "genetic_testing_mmr_deficiency", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Have you ever had genetic testing that showed MMR (Mismatch Repair) deficiency in a tumor?",
          subQuestions: [
            {
              subQuestionId: "genetic_testing_mmr_deficiency_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No", "Unsure"],
            },
          ],
        },
        {
          questionId: "mmr_deficiency_test_type", // Meaningful identifier
          questionHeading: "",
          questionText:
            "If yes in above question, do you know which test was used to determine MMR deficiency?",
          subQuestions: [
            {
              subQuestionId: "mmr_deficiency_test_type_sq1",
              subQuestionHeading: "",
              subQuestionType: "dropdown",
              subQuestionText: "",
              options: [
                "PCR",
                "NGS (Next-Generation Sequencing)",
                "IHC (Immunohistochemistry)",
                "None of the above",
              ],
            },
          ],
        },
        {
          questionId: "lynch_risk_assessment", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Have you ever had a risk assessment for Lynch Syndrome using a model like PREMM?",
          subQuestions: [
            {
              subQuestionId: "lynch_risk_assessment_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No", "Unsure"],
            },
          ],
        },
        {
          questionId: "premm_risk_score", // Meaningful identifier
          questionHeading: "",
          questionText:
            "If yes in above question, do you know if your PREMM risk score was greater than 2.5%?",
          subQuestions: [
            {
              subQuestionId: "premm_risk_score_sq1",
              subQuestionHeading: "",
              subQuestionType: "dropdown",
              subQuestionText: "",
              options: ["Yes", "No", "Unsure", "Not applicable"],
            },
          ],
        },
        {
          questionId: "lynch_conditions_diagnosis", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Have you been diagnosed with any of the following conditions?",
          subQuestions: [
            {
              subQuestionId: "lynch_conditions_diagnosis_sq1",
              subQuestionHeading: "",
              subQuestionType: "dropdown",
              subQuestionText: "",
              options: [
                "Sebaceous adenoma",
                "Sebaceous carcinoma",
                "Muir-Torre Syndrome (Keratoacanthoma)",
                "None of the above",
              ],
            },
          ],
        },
        {
          questionId: "healthcare_professional_suggestion", // Meaningful identifier
          questionHeading: "",
          questionText:
            "Has a healthcare professional ever suggested that you might be at increased risk for Lynch Syndrome?",
          subQuestions: [
            {
              subQuestionId: "healthcare_professional_suggestion_sq1",
              subQuestionHeading: "",
              subQuestionType: "radio",
              subQuestionText: "",
              options: ["Yes", "No"],
            },
          ],
        },
      ],
    },
  ],
};

export default formDataJsons;

// import React, { useState } from "react";
// import formDataJsons from "./questionData/formDatas.js";

// const DynamicForm = ({ testopt, formData, setFormData }) => {
//   const questions = formDataJsons[testopt] || [];
//   const [otherVisible, setOtherVisible] = useState({});

//   const handleChange = (e, key, option) => {
//     const isChecked = e.target.checked;
//     const currentValues = formData[key]
//       ? formData[key].split(",").map((item) => item.trim())
//       : [];

//     let newValues;

//     // Update the list of selected options
//     if (isChecked) {
//       newValues = [...new Set([...currentValues, option])];
//     } else {
//       newValues = currentValues.filter((item) => item !== option);
//     }

//     // Handle the "Others" option specifically
//     if (option === "Others" || option === "Yes") {
//       setOtherVisible((prev) => {
//         const newOtherVisible = !prev[key];
//         if (!newOtherVisible) {
//           newValues = newValues.filter((item) => item !== "Others");
//           setFormData((prevData) => ({ ...prevData, [`${key}_other`]: "" }));
//         } else {
//           newValues.push("Others");
//         }
//         return { ...prev, [key]: newOtherVisible };
//       });
//     }

//     // Update formData state
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: newValues.join(", "),
//     }));
//   };

//   const handleInputChange = (e, key) => {
//     const { value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };

//   const handleRadioChange = (e, key) => {
//     const value = e.target.value;
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };

//   const renderFurtherInfoQuestions = (subQ, q) => {
//     // Guard clause - check if the array exists and is not empty
//     if (
//       !Array.isArray(subQ.subQuestionNeedFUrtherInfo) ||
//       subQ.subQuestionNeedFUrtherInfo.length === 0
//     ) {
//       return null;
//     }

//     return subQ.subQuestionNeedFUrtherInfo.map(
//       (subQuestionForOtherOption, index) => {
//         const questionType =
//           subQuestionForOtherOption.needFUrtherInfoQuestionType;

//         switch (questionType) {
//           case "checkbox":
//             return (
//               <div key={index} className="space-y-2">
//                 <label className="inline-flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`${q.questionId}_${subQ.subQuestionHeading}`}
//                     name={subQ.subQuestionHeading}
//                     checked={formData[q.questionId]?.includes(
//                       subQ.subQuestionHeading
//                     )}
//                     onChange={(e) =>
//                       handleChange(e, q.questionId, subQ.subQuestionHeading)
//                     }
//                     className="mr-2"
//                   />
//                   <span>{subQ.subQuestionHeading}</span>
//                 </label>
//               </div>
//             );
//           case "text":
//             return (
//               <input
//                 key={index}
//                 type="text"
//                 placeholder="Please specify"
//                 value={formData[`${q.questionId}_other`] || ""}
//                 onChange={(e) => handleInputChange(e, `${q.questionId}_other`)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             );
//           case "radio":
//             return (
//               <div key={index} className="space-x-4">
//                 {subQuestionForOtherOption.options?.map(
//                   (option, optionIndex) => (
//                     <label
//                       key={optionIndex}
//                       className="inline-flex items-center"
//                     >
//                       <input
//                         type="radio"
//                         name={q.questionId}
//                         value={option}
//                         checked={formData[q.questionId] === option}
//                         onChange={(e) => handleRadioChange(e, q.questionId)}
//                         className="mr-2"
//                       />
//                       {option}
//                     </label>
//                   )
//                 )}
//               </div>
//             );
//           case "dropdown":
//             return (
//               <select
//                 key={index}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 name={q.questionId}
//                 value={formData[q.questionId] || ""}
//                 onChange={(e) => handleInputChange(e, q.questionId)}
//               >
//                 <option value="">Select an option</option>
//                 {subQuestionForOtherOption.options?.map(
//                   (option, optionIndex) => (
//                     <option key={optionIndex} value={option}>
//                       {option}
//                     </option>
//                   )
//                 )}
//               </select>
//             );
//           case "date":
//             return (
//               <input
//                 key={index}
//                 type="date"
//                 value={formData[q.questionId] || ""}
//                 onChange={(e) => handleInputChange(e, q.questionId)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             );
//           default:
//             return null;
//         }
//       }
//     );
//   };

//   return (
//     <div className="space-y-4">
//       {questions.map((form, formIndex) => (
//         <div key={formIndex} className="form-group">
//           <h2 className="text-xl font-bold">{form.formName}</h2>
//           {form.question?.map((q, questionIndex) => (
//             <div key={questionIndex} className="question-group">
//               {q.questionHeading && (
//                 <h3 className="text-lg font-bold">{q.questionHeading}</h3>
//               )}
//               <p>{q.questionText}</p>
//               {q.subQuestions?.map((subQ, subQIndex) => {
//                 switch (subQ.subQuestionType) {
//                   case "checkbox":
//                     return (
//                       <div key={subQIndex} className="space-y-2">
//                         <label className="inline-flex items-center">
//                           <input
//                             type="checkbox"
//                             id={`${q.questionId}_${subQ.subQuestionHeading}`}
//                             name={subQ.subQuestionHeading}
//                             checked={formData[q.questionId]?.includes(
//                               subQ.subQuestionHeading
//                             )}
//                             onChange={(e) =>
//                               handleChange(
//                                 e,
//                                 q.questionId,
//                                 subQ.subQuestionHeading
//                               )
//                             }
//                             className="mr-2"
//                           />
//                           <span>{subQ.subQuestionHeading}</span>
//                         </label>
//                         {subQ.subQuestionHeading === "Others" &&
//                           otherVisible[q.questionId] &&
//                           renderFurtherInfoQuestions(subQ, q)}
//                       </div>
//                     );
//                   case "text":
//                     return (
//                       <input
//                         key={subQIndex}
//                         type="text"
//                         placeholder={subQ.subQuestionText}
//                         value={formData[q.questionId] || ""}
//                         onChange={(e) => handleInputChange(e, q.questionId)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                       />
//                     );
//                   case "radio":
//                     return (
//                       <div key={subQIndex} className="space-x-4">
//                         {subQ.options?.map((option, optionIndex) => (
//                           <label
//                             key={optionIndex}
//                             className="inline-flex items-center"
//                           >
//                             <input
//                               type="radio"
//                               name={q.questionId}
//                               value={option}
//                               checked={formData[q.questionId] === option}
//                               onChange={(e) =>
//                                 handleRadioChange(e, q.questionId)
//                               }
//                               className="mr-2"
//                             />
//                             {option}
//                           </label>
//                         ))}
//                         {subQ.subQuestionHeading === "Yes" &&
//                           otherVisible[q.questionId] &&
//                           renderFurtherInfoQuestions(subQ, q)}
//                       </div>
//                     );
//                   case "dropdown":
//                     return (
//                       <select
//                         key={subQIndex}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                         name={q.questionId}
//                         value={formData[q.questionId] || ""}
//                         onChange={(e) => handleInputChange(e, q.questionId)}
//                       >
//                         <option value="">Select an option</option>
//                         {subQ.options?.map((option, optionIndex) => (
//                           <option key={optionIndex} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     );
//                   case "date":
//                     return (
//                       <input
//                         key={subQIndex}
//                         type="date"
//                         value={formData[q.questionId] || ""}
//                         onChange={(e) => handleInputChange(e, q.questionId)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                       />
//                     );
//                   default:
//                     return null;
//                 }
//               })}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DynamicForm;

// import React, { useState } from "react";
// import formDataJsons from "./questionData/formDatas.js";

// const DynamicForm = ({ testopt, formData, setFormData }) => {
//   const questions = formDataJsons[testopt] || [];
//   const [otherVisible, setOtherVisible] = useState({});

//   const handleChange = (e, key, option) => {
//     const isChecked = e.target.checked;
//     const currentValues = formData[key]
//       ? formData[key].split(",").map((item) => item.trim())
//       : [];

//     let newValues;
//     if (isChecked) {
//       newValues = [...new Set([...currentValues, option])]; // Add option if checked
//     } else {
//       newValues = currentValues.filter((item) => item !== option); // Remove option if unchecked
//     }

//     // Handle the "Others" option specifically
//     if (option === "Others" || option === "Yes") {
//       setOtherVisible((prev) => {
//         const newOtherVisible = !prev[key];
//         if (!newOtherVisible) {
//           newValues = newValues.filter((item) => item !== option);
//           setFormData((prevData) => ({ ...prevData, [`${key}_other`]: "" })); // Reset other value
//         } else {
//           newValues.push(option);
//         }
//         return { ...prev, [key]: newOtherVisible };
//       });
//     }

//     // Update formData state
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: newValues.join(", "),
//     }));
//   };

//   const handleInputChange = (e, key) => {
//     const { value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };

//   const handleRadioChange = (e, key) => {
//     const value = e.target.value;
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));

//     // Handle the "Yes" option for radio buttons
//     if (value === "Yes") {
//       setOtherVisible((prev) => ({ ...prev, [key]: true }));
//     } else {
//       setOtherVisible((prev) => ({ ...prev, [key]: false }));
//       setFormData((prevData) => ({ ...prevData, [`${key}_other`]: "" }));
//     }
//   };

//   const renderFurtherInfoQuestions = (subQ, q) => {

//     if (!Array.isArray(subQ.subQuestionNeedFUrtherInfo)) {
//       return null;
//     }

//     return subQ.subQuestionNeedFUrtherInfo.map(
//       (subQuestionForOtherOption, index) => {
//         const uniqueKey = subQuestionForOtherOption.id || subQuestionForOtherOption.needFUrtherInfoHeading;

//         switch (subQuestionForOtherOption.needFUrtherInfoQuestionType) {
//           case "checkbox":

//             return (
//               <div key={uniqueKey} className="space-y-2">
//                 <label className="inline-flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`${q.questionId}_${subQ.subQuestionHeading}`}
//                     name={subQ.subQuestionHeading}
//                     checked={
//                       formData[q.questionId]?.includes(
//                         subQ.subQuestionHeading
//                       ) || false
//                     }
//                     onChange={(e) =>
//                       handleChange(e, q.questionId, subQ.subQuestionHeading)
//                     }
//                     className="mr-2"
//                   />
//                   <span>{subQ.subQuestionHeading}</span>
//                 </label>
//               </div>
//             );
//           case "text":
//             {
//               console.log("Index:", uniqueKey);
//               console.log("subQuestionForOtherOption:", subQuestionForOtherOption);
//             }
//             return (
//               <>
//                 <input
//                   key={index}
//                   type="text"
//                   placeholder="Please specify"
//                   value={formData[`${q.questionId}_other`] || ""}
//                   onChange={(e) =>
//                     handleInputChange(e, `${q.questionId}_other`)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 />
//                 {/* {console.log(
//                   subQuestionForOtherOption.needFUrtherInfoHeading
//                 )} */}
//               </>
//             );
//           case "radio":
//             return (
//               <div key={index} className="space-x-4">
//                 {subQ.options?.map((option, optionIndex) => (
//                   <label key={optionIndex} className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name={q.questionId}
//                       value={option}
//                       checked={formData[q.questionId] === option}
//                       onChange={(e) => handleRadioChange(e, q.questionId)}
//                       className="mr-2"
//                     />
//                     {option}
//                   </label>
//                 ))}
//               </div>
//             );
//           case "dropdown":
//             return (
//               <select
//                 key={index}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 name={q.questionId}
//                 value={formData[q.questionId] || ""}
//                 onChange={(e) => handleInputChange(e, q.questionId)}
//               >
//                 <option value="">Select an option</option>
//                 {subQ.options?.map((option, optionIndex) => (
//                   <option key={optionIndex} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             );
//           case "date":
//             return (
//               <input
//                 key={index}
//                 type="date"
//                 value={formData[q.questionId] || ""}
//                 onChange={(e) => handleInputChange(e, q.questionId)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             );
//           default:
//             return null;
//         }
//       }
//     );
//   };

//   return (
//     <div className="space-y-4">
//       {questions.map((form, formIndex) => (
//         <div key={formIndex} className="form-group">
//           <h2 className="text-xl font-bold">{form.formName}</h2>
//           {form.question?.map((q, questionIndex) => (
//             <div key={questionIndex} className="question-group">
//               {q.questionHeading && (
//                 <h3 className="text-lg font-bold">{q.questionHeading}</h3>
//               )}
//               <p>{q.questionText}</p>
//               {q.subQuestions?.map((subQ, subQIndex) => {
//                 switch (subQ.subQuestionType) {
//                   case "checkbox":
//                     return (
//                       <div key={subQIndex} className="space-y-2">
//                         <label className="inline-flex items-center">
//                           <input
//                             type="checkbox"
//                             id={`${q.questionId}_${subQ.subQuestionHeading}`}
//                             name={subQ.subQuestionHeading}
//                             checked={
//                               formData[q.questionId]?.includes(
//                                 subQ.subQuestionHeading
//                               ) || false
//                             }
//                             onChange={(e) =>
//                               handleChange(
//                                 e,
//                                 q.questionId,
//                                 subQ.subQuestionHeading
//                               )
//                             }
//                             className="mr-2"
//                           />
//                           <span>{subQ.subQuestionHeading}</span>
//                         </label>
//                         {subQ.subQuestionHeading === "Others" &&
//                           otherVisible[q.questionId] &&
//                           renderFurtherInfoQuestions(subQ, q)}
//                       </div>
//                     );
//                   case "text":
//                     return (
//                       <input
//                         key={subQIndex}
//                         type="text"
//                         placeholder={subQ.subQuestionText}
//                         value={formData[q.questionId] || ""}
//                         onChange={(e) => handleInputChange(e, q.questionId)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                       />
//                     );
//                   case "radio":
//                     return (
//                       <div key={subQIndex}>
//                         <div className="space-x-4">
//                           {subQ.options?.map((option, optionIndex) => (
//                             <label
//                               key={optionIndex}
//                               className="inline-flex items-center"
//                             >
//                               <input
//                                 type="radio"
//                                 name={q.questionId}
//                                 value={option}
//                                 checked={formData[q.questionId] === option}
//                                 onChange={(e) =>
//                                   handleRadioChange(e, q.questionId)
//                                 }
//                                 className="mr-2"
//                               />
//                               {option}
//                             </label>
//                           ))}
//                         </div>
//                         {formData[q.questionId] === "Yes" &&
//                           otherVisible[q.questionId] &&
//                           renderFurtherInfoQuestions(subQ, q)}
//                       </div>
//                     );
//                   case "dropdown":
//                     return (
//                       <select
//                         key={subQIndex}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                         name={q.questionId}
//                         value={formData[q.questionId] || ""}
//                         onChange={(e) => handleInputChange(e, q.questionId)}
//                       >
//                         <option value="">Select an option</option>
//                         {subQ.options?.map((option, optionIndex) => (
//                           <option key={optionIndex} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     );
//                   case "date":
//                     return (
//                       <input
//                         key={subQIndex}
//                         type="date"
//                         value={formData[q.questionId] || ""}
//                         onChange={(e) => handleInputChange(e, q.questionId)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                       />
//                     );
//                   default:
//                     return null;
//                 }
//               })}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DynamicForm;

import React, { useState } from "react";
import formDataJsons from "./questionData/formDatas.js";

const DynamicForm = ({ testopt, formData, setFormData }) => {
  const questions = formDataJsons[testopt] || [];
  const [otherVisible, setOtherVisible] = useState({});

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

    // Handle the "Others" option specifically
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

    // Update formData state
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

  const renderFurtherInfoQuestions = (subQ, q) => {
    if (!Array.isArray(subQ.subQuestionNeedFUrtherInfo)) {
      return null;
    }
    {
      console.log(subQ);
    }
    return subQ.subQuestionNeedFUrtherInfo.map((subQuestionForOtherOption) => {
      const uniqueKey =
        subQuestionForOtherOption.id ||
        subQuestionForOtherOption.needFUrtherInfoHeading;

      switch (subQuestionForOtherOption.needFUrtherInfoQuestionType) {
        case "checkbox":
          return (
            <div key={uniqueKey} className="space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id={`${q.questionId}_${subQuestionForOtherOption.needFUrtherInfoHeading}`}
                  name={subQuestionForOtherOption.needFUrtherInfoHeading}
                  checked={
                    formData[q.questionId]?.includes(
                      subQuestionForOtherOption.needFUrtherInfoHeading
                    ) || false
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      q.questionId,
                      subQuestionForOtherOption.needFUrtherInfoHeading
                    )
                  }
                  className="mr-2"
                />
                <span>{subQuestionForOtherOption.needFUrtherInfoHeading}</span>
              </label>
            </div>
          );
        case "text":
          return (
            <>
              <input
                key={uniqueKey}
                type="text"
                placeholder="Please specify"
                value={
                  formData[
                    `${subQuestionForOtherOption.needFUrtherInfoHeading}`
                  ] || ""
                }
                onChange={(e) =>
                  handleInputChange(
                    e,
                    `${subQuestionForOtherOption.needFUrtherInfoHeading}`
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </>
          );
        case "radio":
          return (
            <div key={uniqueKey} className="space-x-4">
              {subQ.options?.map((option, optionIndex) => (
                <label key={optionIndex} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={subQuestionForOtherOption.needFUrtherInfoHeading}
                    value={option}
                    checked={
                      formData[
                        subQuestionForOtherOption.needFUrtherInfoHeading
                      ] === option
                    }
                    onChange={(e) =>
                      handleRadioChange(
                        e,
                        subQuestionForOtherOption.needFUrtherInfoHeading
                      )
                    }
                    className="mr-2"
                  />

                  {option}
                </label>
              ))}
            </div>
          );
        case "dropdown":
          return (
            <select
              key={uniqueKey}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              name={subQuestionForOtherOption.needFUrtherInfoHeading}
              value={
                formData[subQuestionForOtherOption.needFUrtherInfoHeading] || ""
              }
              onChange={(e) =>
                handleInputChange(
                  e,
                  subQuestionForOtherOption.needFUrtherInfoHeading
                )
              }
            >
              <option value="">Select an option</option>
              {subQ.options?.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        case "date":
          return (
            <input
              key={uniqueKey}
              type="date"
              value={
                formData[subQuestionForOtherOption.needFUrtherInfoHeading] || ""
              }
              onChange={(e) =>
                handleInputChange(
                  e,
                  subQuestionForOtherOption.needFUrtherInfoHeading
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
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
              {/* {console.log("Question", q)} */}
              {q.subQuestions?.map((subQ) => (
                <div key={subQ.subQuestionId} className="space-y-2">
                  {/* {console.log("subQ", subQ)} */}
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
                      value={formData[q.questionId] || ""}
                      onChange={(e) => handleInputChange(e, q.questionId)}
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

 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



import React, { useState } from "react";
import formDataJsons from "./questionData/formDatas.js";

const DynamicForm = ({ testopt, formData, setFormData }) => {
  const questions = formDataJsons[testopt] || [];
  const [otherVisible, setOtherVisible] = useState({});

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

    // Handle the "Others" option specifically
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

    // Update formData state
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

  const renderFurtherInfoQuestions = (subQ, q) => {
    if (!Array.isArray(subQ.subQuestionNeedFUrtherInfo)) {
      return null;
    }

    return subQ.subQuestionNeedFUrtherInfo.map((subQuestionForOtherOption) => {
      const uniqueKey =
        subQuestionForOtherOption.needFurtherInfoId ||
        subQuestionForOtherOption.needFUrtherInfoHeading;

      // Common wrapper with question text
      const QuestionWrapper = ({ children }) => (
        <div key={uniqueKey} className="space-y-2 mt-3">
          {subQuestionForOtherOption.needFUrtherInfoHeading && (
            <p className="font-medium mb-2">
              {subQuestionForOtherOption.needFUrtherInfoHeading}
            </p>
          )}
          {subQuestionForOtherOption.needFUrtherInfonText && (
            <p className="text-gray-600 mb-2">
              {subQuestionForOtherOption.needFUrtherInfonText}
            </p>
          )}
          {children}
        </div>
      );

      switch (subQuestionForOtherOption.needFUrtherInfoQuestionType) {
        case "checkbox":
          return (
            <QuestionWrapper>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id={`${q.questionId}_${subQuestionForOtherOption.needFUrtherInfoHeading}`}
                  name={subQuestionForOtherOption.needFUrtherInfoHeading}
                  checked={
                    formData[q.questionId]?.includes(
                      subQuestionForOtherOption.needFUrtherInfoHeading
                    ) || false
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      q.questionId,
                      subQuestionForOtherOption.needFUrtherInfoHeading
                    )
                  }
                  className="mr-2"
                />
                <span>{subQuestionForOtherOption.needFUrtherInfoHeading}</span>
              </label>
            </QuestionWrapper>
          );

        case "text":
          return (
            <QuestionWrapper>
              <input
                type="text"
                placeholder="Please specify"
                value={
                  formData[
                    `${subQuestionForOtherOption.needFUrtherInfoHeading}`
                  ] || ""
                }
                onChange={(e) =>
                  handleInputChange(
                    e,
                    `${subQuestionForOtherOption.needFUrtherInfoHeading}`
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </QuestionWrapper>
          );

        case "radio":
          return (
            <QuestionWrapper>
              <div className="space-x-4">
                {subQuestionForOtherOption.options?.map(
                  (option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        type="radio"
                        name={subQuestionForOtherOption.needFUrtherInfoHeading}
                        value={option}
                        checked={
                          formData[
                            subQuestionForOtherOption.needFUrtherInfoHeading
                          ] === option
                        }
                        onChange={(e) =>
                          handleRadioChange(
                            e,
                            subQuestionForOtherOption.needFUrtherInfoHeading
                          )
                        }
                        className="mr-2"
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
            </QuestionWrapper>
          );

        case "dropdown":
          return (
            <QuestionWrapper>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                name={subQuestionForOtherOption.needFUrtherInfoHeading}
                value={
                  formData[subQuestionForOtherOption.needFUrtherInfoHeading] ||
                  ""
                }
                onChange={(e) =>
                  handleInputChange(
                    e,
                    subQuestionForOtherOption.needFUrtherInfoHeading
                  )
                }
              >
                <option value="">Select an option</option>
                {subQuestionForOtherOption.options?.map(
                  (option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  )
                )}
              </select>
            </QuestionWrapper>
          );

        case "date":
          return (
            <QuestionWrapper>
              <input
                type="date"
                value={
                  formData[subQuestionForOtherOption.needFUrtherInfoHeading] ||
                  ""
                }
                onChange={(e) =>
                  handleInputChange(
                    e,
                    subQuestionForOtherOption.needFUrtherInfoHeading
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </QuestionWrapper>
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
              {/* {console.log("Question", q)} */}
              {q.subQuestions?.map((subQ) => (
                <div key={subQ.subQuestionId} className="space-y-2">
                  {/* {console.log("subQ", subQ)} */}
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
                      value={formData[q.questionId] || ""}
                      onChange={(e) => handleInputChange(e, q.questionId)}
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

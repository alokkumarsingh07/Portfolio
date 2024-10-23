import React, { useState } from "react";
import formDataJsons from "./questionData/formDatas.js";

const DynamicForm = ({ testopt, formData, setFormData }) => {
  const questions = formDataJsons[testopt] || [];
  const [otherVisible, setOtherVisible] = useState({});

  const handleCheckboxChange = (e, questionId, subQ) => {
    const isChecked = e.target.checked;
    const currentValues = formData[questionId]
      ? formData[questionId].split(",").map((item) => item.trim())
      : [];

    let newValues;
    if (isChecked) {
      newValues = [...new Set([...currentValues, subQ.subQuestionHeading])];
    } else {
      newValues = currentValues.filter(
        (item) => item !== subQ.subQuestionHeading
      );
    }

    // Handle "Others" checkbox
    if (subQ.subQuestionHeading === "Others") {
      setOtherVisible((prev) => {
        const newOtherVisible = !prev[questionId];
        if (!newOtherVisible) {
          // Clear the "Others" text field when unchecking
          const otherTextKey = `${questionId}_${subQ.subQuestionId}`;
          setFormData((prevData) => {
            const newData = { ...prevData };
            delete newData[otherTextKey];
            return newData;
          });
        }
        return { ...prev, [questionId]: newOtherVisible };
      });
    }

    setFormData((prevData) => ({
      ...prevData,
      [questionId]: newValues.join(", "),
    }));
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleRadioChange = (e, questionId) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: value,
    }));

    // Handle "Yes" option visibility for further questions
    if (value === "Yes") {
      setOtherVisible((prev) => ({ ...prev, [questionId]: true }));
    } else {
      setOtherVisible((prev) => ({ ...prev, [questionId]: false }));
      // Clear any associated further info fields
      const keysToDelete = Object.keys(formData).filter(
        (key) => key.startsWith(`${questionId}_`) && key !== questionId
      );
      setFormData((prevData) => {
        const newData = { ...prevData };
        keysToDelete.forEach((key) => delete newData[key]);
        return newData;
      });
    }
  };

  const renderFurtherInfoQuestions = (subQ, questionId) => {
    if (!Array.isArray(subQ.subQuestionNeedFUrtherInfo)) {
      return null;
    }

    return subQ.subQuestionNeedFUrtherInfo.map((furtherInfo) => {
      const furtherInfoKey = `${questionId}_${subQ.subQuestionId}`;

      switch (furtherInfo.needFUrtherInfoQuestionType) {
        case "text":
          return (
            <div key={furtherInfoKey} className="space-y-2">
              <input
                type="text"
                placeholder={
                  furtherInfo.needFUrtherInfonText || "Please specify"
                }
                value={formData[furtherInfoKey] || ""}
                onChange={(e) => handleInputChange(e, furtherInfoKey)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          );

        case "radio":
          return (
            <div key={furtherInfoKey} className="space-y-2">
              {furtherInfo.options?.map((option, index) => (
                <label key={index} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name={furtherInfoKey}
                    value={option}
                    checked={formData[furtherInfoKey] === option}
                    onChange={(e) => handleInputChange(e, furtherInfoKey)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          );

        case "dropdown":
          return (
            <div key={furtherInfoKey} className="space-y-2">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData[furtherInfoKey] || ""}
                onChange={(e) => handleInputChange(e, furtherInfoKey)}
              >
                <option value="">Select an option</option>
                {furtherInfo.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );

        case "checkbox":
          return (
            <div key={furtherInfoKey} className="space-y-2">
              {furtherInfo.options?.map((option, index) => (
                <label key={index} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name={furtherInfoKey}
                    value={option}
                    checked={
                      formData[furtherInfoKey]?.includes(option) || false
                    }
                    onChange={(e) => {
                      const currentValues = formData[furtherInfoKey]
                        ? formData[furtherInfoKey]
                            .split(",")
                            .map((item) => item.trim())
                        : [];
                      let newValues;
                      if (e.target.checked) {
                        newValues = [...new Set([...currentValues, option])];
                      } else {
                        newValues = currentValues.filter(
                          (item) => item !== option
                        );
                      }
                      handleInputChange(
                        { target: { value: newValues.join(", ") } },
                        furtherInfoKey
                      );
                    }}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          );

        case "date":
          const today = new Date().toISOString().split("T")[0];
          return (
            <div key={furtherInfoKey} className="space-y-2">
              <input
                type="date"
                max={today}
                value={formData[furtherInfoKey] || ""}
                onChange={(e) => handleInputChange(e, furtherInfoKey)}
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
            <div key={q.questionId} className="question-group mb-6">
              {q.questionHeading && (
                <h3 className="text-lg font-bold mb-2">{q.questionHeading}</h3>
              )}
              <p className="mb-4">{q.questionText}</p>

              {q.subQuestions?.map((subQ) => (
                <div key={subQ.subQuestionId} className="space-y-2 mb-4">
                  {/* Checkbox Input */}
                  {subQ.subQuestionType === "checkbox" && (
                    <div className="space-y-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id={subQ.subQuestionId}
                          name={subQ.subQuestionId}
                          checked={
                            formData[q.questionId]?.includes(
                              subQ.subQuestionHeading
                            ) || false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(e, q.questionId, subQ)
                          }
                          className="mr-2"
                        />
                        <span>{subQ.subQuestionHeading}</span>
                      </label>
                      {subQ.subQuestionHeading === "Others" &&
                        otherVisible[q.questionId] && (
                          <div className="ml-6">
                            {renderFurtherInfoQuestions(subQ, q.questionId)}
                          </div>
                        )}
                    </div>
                  )}

                  {/* Text Input */}
                  {subQ.subQuestionType === "text" && (
                    <div>
                      {subQ.subQuestionHeading && (
                        <label className="block mb-2">
                          {subQ.subQuestionHeading}
                        </label>
                      )}
                      <input
                        type="text"
                        placeholder={subQ.subQuestionText}
                        value={
                          formData[`${q.questionId}_${subQ.subQuestionId}`] ||
                          ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            `${q.questionId}_${subQ.subQuestionId}`
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}

                  {/* Radio Input */}
                  {subQ.subQuestionType === "radio" && (
                    <div>
                      {subQ.subQuestionHeading && (
                        <label className="block mb-2">
                          {subQ.subQuestionHeading}
                        </label>
                      )}
                      <div className="space-x-4">
                        {subQ.options?.map((option, index) => (
                          <label
                            key={index}
                            className="inline-flex items-center mr-4"
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
                        otherVisible[q.questionId] && (
                          <div className="ml-6 mt-2">
                            {renderFurtherInfoQuestions(subQ, q.questionId)}
                          </div>
                        )}
                    </div>
                  )}

                  {/* Dropdown Input */}
                  {subQ.subQuestionType === "dropdown" && (
                    <div>
                      {subQ.subQuestionHeading && (
                        <label className="block mb-2">
                          {subQ.subQuestionHeading}
                        </label>
                      )}
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData[q.questionId] || ""}
                        onChange={(e) => handleInputChange(e, q.questionId)}
                      >
                        <option value="">Select an option</option>
                        {subQ.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Date Input */}
                  {subQ.subQuestionType === "date" && (
                    <div>
                      {subQ.subQuestionHeading && (
                        <label className="block mb-2">
                          {subQ.subQuestionHeading}
                        </label>
                      )}
                      <input
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        value={formData[q.questionId] || ""}
                        onChange={(e) => handleInputChange(e, q.questionId)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
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

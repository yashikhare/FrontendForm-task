import React, { useState } from "react";
//Import of fontAwesomeIcons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
//Import of css
import "./Form.css";
//Import of Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [question, setQuestion] = useState({
    survey: "",
    description: "",
    questionType: "",
    questions: [],
  });

  //Added sucessfully Notification by using toast
  const defaultPosition = toast.POSITION.TOP_CENTER;
  const showToast = (
    type = "success",
    msg,
    autoClose = 2000,
    className = "primaryColor",
    position = defaultPosition
  ) => {
    if (type === "success") {
      toast.success(msg, {
        autoClose: autoClose === null ? 2000 : autoClose,
        className: className === null ? "primaryColor" : className,
        position: position,
      });
    }
  };

  const handleClick = (value) => {
    console.log(value);
    setQuestion({ ...question, questions: [] });
    if (value === "number") {
      setQuestion({
        ...question,
        questions: [
          ...question.questions,
          { placeholder: "", min: "", max: "", step: "" },
        ],
        questionType: value,
      });
    } else if (value === "textareas") {
      setQuestion({
        ...question,
        questions: [
          ...question.questions,
          { placeholder: "", min: "", max: "", rows: "" },
        ],
        questionType: value,
      });
    } else if (
      value === "radio" ||
      value === "checkbox" ||
      value === "select"
    ) {
      setQuestion({
        ...question,
        questions: [...question.questions, { placeholder: "" }],
        questionType: value,
      });
    } else if (value === "slider") {
      setQuestion({
        ...question,
        questions: [
          ...question.questions,
          { placeholder: "", min: "", max: "" },
        ],
        questionType: value,
      });
    }
  };

  const handlePlus = (value) => {
    if (value === "number") {
      setQuestion({
        ...question,
        questions: [
          ...question.questions,
          { placeholder: "", min: "", max: "", step: "" },
        ],
      });
    } else if (value === "textareas") {
      setQuestion({
        ...question,
        questions: [
          ...question.questions,
          { placeholder: "", min: "", max: "", rows: "" },
        ],
      });
    } else if (
      value === "radio" ||
      value === "checkbox" ||
      value === "select"
    ) {
      setQuestion({
        ...question,
        questions: [...question.questions, { placeholder: "" }],
      });
    } else if (value === "slider") {
      setQuestion({
        ...question,
        questions: [
          ...question.questions,
          { placeholder: "", min: "", max: "" },
        ],
      });
    }
  };

  const handleMinus = (index) => {
    let temp = question;
    temp.questions.splice(index, 1);
    setQuestion({ ...temp });
  };

  const handleValue = (index, name, value) => {
    // console.log(index, name, value);
    let temp = question;
    if (name === "placeholder") {
      temp.questions[index] = { ...temp.questions[index], placeholder: value };
    } else if (name === "max") {
      temp.questions[index] = { ...temp.questions[index], max: value };
    } else if (name === "min") {
      temp.questions[index] = { ...temp.questions[index], min: value };
    } else if (name === "step") {
      temp.questions[index] = { ...temp.questions[index], step: value };
    } else if (name === "row") {
      temp.questions[index] = { ...temp.questions[index], row: value };
    }
    setQuestion({ ...temp });
  };

  return (
    <div className="formcontainer">
      <div className="container">
        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        <h1>Add Questions</h1>
      </div>
      <div className="inputField">
        <input
          type="text"
          onChange={(e) => {
            setQuestion({ ...question, survey: e.target.value });
          }}
          placeholder="question title"
        />
        <input
          type="text"
          onChange={(e) => {
            setQuestion({ ...question, description: e.target.value });
          }}
          placeholder="Question description"
        />
      </div>
      <form>
        <select
          id="form"
          name="form"
          onChange={(e) => {
            setQuestion({ ...question, questionType: e.target.value });
            handleClick(e.target.value);
          }}
        >
          <option value="none">none</option>
          <option value="number">number</option>
          <option value="select">select</option>
          <option value="textareas">Textareas</option>
          <option value="radio">Radio</option>
          <option value="checkbox">checkbox</option>
          <option value="slider">slider</option>
        </select>
      </form>
      {question?.questions?.map((item, i) => (
        <div className="fieldlabel">
          <label className="label"> option{i}</label>
          <div className="field" key={i}>
            {(question?.questionType === "number" ||
              question?.questionType === "textareas" ||
              question?.questionType === "radio" ||
              question?.questionType === "checkbox" ||
              question?.questionType === "select" ||
              question?.questionType === "slider") && (
              <input
                className="input1"
                type="text"
                value={item.placeholder}
                name="placeholder"
                placeholder="placeholder"
                onChange={(e) => {
                  handleValue(i, e.target.name, e.target.value);
                }}
              />
            )}
            {(question?.questionType === "number" ||
              question?.questionType === "textareas" ||
              question?.questionType === "slider") && (
              <input
                className="input2"
                type="number"
                placeholder="max"
                name="max"
                value={item.max}
                onChange={(e) => {
                  handleValue(i, e.target.name, e.target.value);
                }}
              />
            )}
            {(question?.questionType === "number" ||
              question?.questionType === "textareas" ||
              question?.questionType === "slider") && (
              <input
                className="input2"
                type="number"
                name="min"
                placeholder="min"
                value={item.min}
                onChange={(e) => {
                  handleValue(i, e.target.name, e.target.value);
                }}
              />
            )}
            {question?.questionType === "number" && (
              <input
                className="input2"
                type="number"
                placeholder="step"
                name="step"
                value={item.step}
                onChange={(e) => {
                  handleValue(i, e.target.name, e.target.value);
                }}
              />
            )}

            {question?.questionType === "textareas" && (
              <input
                className="input2"
                type="text"
                placeholder="row"
                name="row"
                value={item.row}
                onChange={(e) => {
                  handleValue(i, e.target.name, e.target.value);
                }}
              />
            )}
            {question.questions.length > 1 && (
              <FontAwesomeIcon
                icon={faMinusCircle}
                onClick={() => {
                  handleMinus(i);
                }}
              ></FontAwesomeIcon>
            )}
          </div>
        </div>
      ))}
      {question.questions.length > 0 && (
        <FontAwesomeIcon
          icon={faPlusCircle}
          onClick={() => {
            handlePlus(question.questionType);
          }}
          className="plus"
        ></FontAwesomeIcon>
      )}

      <button
        onClick={() => {
          console.log(question);
          showToast("success", "Added successfully !");
        }}
      >
        Submit
      </button>
      <ToastContainer />
    </div>
  );
}

export default Form;

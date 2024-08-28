import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // Callback Functions

  const getQuestions = () => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(data => setQuestions(data));
  };

  const deleteQuestion = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: 'DELETE'
    })
     .then(() => getQuestions());
  }

  const updateQuestion = (questionObj) => {
    console.log(questionObj);
    fetch(`http://localhost:4000/questions/${questionObj.id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: questionObj.newAnswer})
    })
      .then(r => r.json())
      .then(r => getQuestions());
  };

  const onDeleteClick = questionId => deleteQuestion(questionId);

  const onAnswerChange = questionObj => updateQuestion(questionObj);

  const makeQuestionItem = question => <QuestionItem key={question.id} question={question} onDeleteClick={onDeleteClick} onAnswerChange={onAnswerChange} />;

  // Get and Create Questions

  useEffect(getQuestions, []);

  const questionItemArr = questions.map(makeQuestionItem);

  // Component JSX

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItemArr}</ul>
    </section>
  );
}

export default QuestionList;

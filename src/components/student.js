import "../App.css";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Dash, Plus } from "react-bootstrap-icons";

function Student({ student = [], updateTag }) {
  const [showGrades, setShowGrades] = useState(false);

  const Average = (grades) => {
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
      sum += parseInt(grades[i]);
    }
    return (sum / 800) * 100;
  };
  return (
    <Row className="pt-3">
      <Col xs={12} lg={2} className="ml-3">
        <img
          src={student.pic}
          alt={student.firstName + "pic"}
          className="w-lg-100 w-md-50"
        />
      </Col>
      <Col xs={12} lg={8} className="center-all">
        <h1>
          {student.firstName.toUpperCase()} {student.lastName.toUpperCase()}
        </h1>
        <div className="info">
          <p>Email: {student.email}</p>
          <p>Company: {student.company}</p>
          <p>Skill: {student.skill}</p>
          <p>Average: {Average(student.grades)}%</p>
        </div>
      </Col>
      <Col xs={12} lg={2}>
        {!showGrades ? (
          <Plus size={70} onClick={() => setShowGrades(!showGrades)} />
        ) : (
          <Dash size={70} onClick={() => setShowGrades(!showGrades)} />
        )}
      </Col>
      {showGrades && (
        <Row className="pt-3">
          {student.grades.map((grade, index) => (
            <Col xs={12} lg={{ span: 10, offset: 2 }} key={index}>
              <p className="info grades">
                Test {index + 1}: <span className="pl-25">{grade}%</span>
              </p>
            </Col>
          ))}
        </Row>
      )}
      <Row className="pl-25 pt-3">
        <Col xs={12} lg={{ span: 6, offset: 2 }} className="tagCont">
          {student.tag?.map((tag) => {
            return (
              <span className="tag" key={`${tag} ${student.id}`}>
                {tag}
              </span>
            );
          })}
        </Col>
      </Row>
      <Row className="pt-3 pl-25">
        <Col xs={12} lg={{ span: 10, offset: 2 }} className="input-cont">
          <input
            type="text"
            placeholder="Add a tag"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                updateTag(student.id - 1, e.target.value);
                e.target.value = "";
              }
            }}
            className="w-50 tag-input"
          ></input>
        </Col>
      </Row>
      <hr className="my-3" />
    </Row>
  );
}

export default Student;

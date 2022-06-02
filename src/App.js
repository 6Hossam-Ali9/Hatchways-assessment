import "./App.css";
import Student from "./components/student";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");

  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.students);
      });
  }, []);

  const validStudent = (student) => {
    if (
      student.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchName.toLowerCase())
    ) {
      if (searchTag === "") {
        return true;
      } else if (!Array.isArray(student["tag"])) {
        return false;
      } else {
        for (let i = 0; i < student.tag.length; i++) {
          if (student.tag[i].toLowerCase().includes(searchTag.toLowerCase())) {
            return true;
          }
        }
        return false;
      }
    }
  };

  const addTag = (index, tag) => {
    let oldStudents = [...students];
    if (Array.isArray(oldStudents[index]["tag"])) {
      let duplicate = false;
      console.log(oldStudents[index]["tag"].length);
      for (let i = 0; i < oldStudents[index]["tag"].length; i++) {
        if (tag === oldStudents[index]["tag"][i]) {
          duplicate = true;
        }
      }
      if (!duplicate) {
        oldStudents[index]["tag"] = [...oldStudents[index]["tag"], tag];
      }
    } else {
      oldStudents[index]["tag"] = [tag];
    }
    setStudents(oldStudents);
  };
  return (
    <Container className="h-100">
      <Row className="main-row">
        <Col>
          <Container className="m-auto window position-relative">
            <div className="position-sticky bg-white inputs">
              <Row>
                <Col>
                  <input
                    type="search"
                    placeholder="Search by name"
                    onChange={(e) => setSearchName(e.target.value)}
                    className="pt-3"
                  ></input>
                </Col>
              </Row>
              <Row className="pt-4">
                <Col>
                  <input
                    type="search"
                    placeholder="Search by tag"
                    onChange={(e) => setSearchTag(e.target.value)}
                  ></input>
                </Col>
              </Row>
            </div>
            {students
              .filter((student) => validStudent(student))
              .map((studentInfo) => (
                <Student
                  student={studentInfo}
                  key={studentInfo.id}
                  updateTag={addTag}
                />
              ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

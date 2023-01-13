import "./App.css";
import {string, object, date} from "yup";
import { useState } from "react";
import { questions } from "./Questions";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MultiStepProgressBar } from "./components/MultiStepProgressBar";
import { MultiStepForm } from "./components/MultiStepForm";

const testItem = {
  label: "username",
  type: "text", // text, or password, or information, or select
  key: "username",
  options: ["State 1", "State 2"],
};

const USERREGEX = /^[A-Za-z0-9_]+$/;
const POSTALCODEREGEX = /^[0-9]{6}$/;

const userNameAndPasswordValidation = object().shape({
  username: string()
    .required("Username is required")
    .min(8, "Username must be at least 8 characters long")
    .matches(
      USERREGEX,
      "Username can only contain alphanumeric characters and underscores"
    ),

    password: string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[\d]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});

const passwordValidation = object().shape({
  password: string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[\d]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});

const others = object().shape({
  postalcode: string()
    .required()
    .matches(
      POSTALCODEREGEX,
      "Postal code must only be comprised of 6 digits only"
    ),
  state: string().required("Please select your state."),
  email: string().email(),
  website: string().url(),
  createdOn: date().default(function () {
    return new Date();
  }),
});



function App() {
  const totalPagesCount = questions?.length || 0;
  const [index, setIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [pagesAnswers, setPagesAnswers] = useState({});
  const [userNameInputClass, setUserNameInputClass] = useState("");
  const [passwordInputClass, setPasswordInputClass] = useState("");
  const [inputClass, setInputClass] = useState("");

  const [validated, setValidated] = useState(true); //assume no errors at first
  const [errorMessage, setErrorMessage] = useState("");



  // submission callback
  const onSubmit = (e) => {
    e.preventDefault();
    switch(index) {
      case 1:
        
        userNameAndPasswordValidation.validate(pagesAnswers[index], {abortEarly: false}).then(
        (responseData) => {
          //no validation error
          console.log("response Data ", responseData)
          setUserNameInputClass("");
          goToNextPage()
        }).catch((err) => {
          console.log("error ", err.errors)
          setValidated(false)
          setErrorMessage(err.errors.join("\r\n"));
          console.log("page answers ", pagesAnswers);
          console.log("page  err.errors ",  err.errors);
          console.log("page  err.Password ",  err.errors.includes("Password"));

          const usernameError = err.errors.some(element => element.includes("Username"));
          const passwordError = err.errors.some(element => element.includes("Password"));

          if (usernameError) {
            setInputClass("invalid");
          } 

          if (passwordError) {
            setPasswordInputClass("invalid")
          }
        })

        // passwordValidation.validate(pagesAnswers[index], {abortEarly: false}).then(
        //   (responseData) => {
        //     //no validation error
        //     console.log("response Data ", responseData)
        //     setPasswordInputClass("")
        //     // goToNextPage()
        //   }).catch((err) => {
        //     console.log("error ", err.errors)
        //     setValidated(false)
        //     setErrorMessage(err.errors.join("\r\n"));
        //     console.log("page answers ", pagesAnswers);
        //     console.log("page  err.errors ",  err.errors);
  
        //     setPasswordInputClass("invalid");
        //   })

        //   if (passwordInputClass === "" &&  userNameInputClass === "") {
        //     goToNextPage()
        //   }
       break; 
      case 2:
        others.validate(pagesAnswers[index], {abortEarly: false}).then(
          (responseData) => {
            //no validation error
            console.log("response Data ", responseData)
            goToNextPage()
          }).catch((err) => {
            console.log("error ", err.errors)
            setValidated(false)
            setErrorMessage(err.errors.join("\r\n"));
          })
        break; 
      default:
        console.log("No more validation required")
        goToNextPage()
    }

  };

  const goToNextPage = () => {
    setValidated(true);
     if (index - 3) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      window.alert(JSON.stringify(pagesAnswers));
      // clear form on submit
      setPagesAnswers({});
      setSubmitted(true);
    }
  }
  // previous button callback
  const prevButton = () => {
    if (index > 1) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  // restart the submission
  const handleStart = () => {
    setIndex(1);
    setSubmitted(false);
  };

  // setup the answer state in the controlled form
  const onPageUpdate = (step, answerObj) => {
    setPagesAnswers({
      ...pagesAnswers,
      [step]: {
        ...pagesAnswers[step],
        ...answerObj,
      },
    });
  };

  return (
    <main className="App">
      <Container className="h-100">
        <Row className="m-5">
          <Col className="align-self-center">
            <MultiStepProgressBar step={index} />
          </Col>
        </Row>

        <Row className="m-5">
          <Col className="align-self-center">
            {!validated && (
              <div className="alert alert-danger" role="alert"> 
               {errorMessage}
              </div>
           )}
          </Col>
        </Row>

        <Form onSubmit={onSubmit}>
          <Card>
            {submitted ? (
              <Card.Body>
                <p>Your answers have been submitted!</p>
              </Card.Body>
            ) : (
              <Card.Body>
                <MultiStepForm
                  list={questions}
                  step={index}
                  onPageUpdate={onPageUpdate}
                  pagesAnswers={pagesAnswers}
                  inputClass = {inputClass}

                />
              </Card.Body>
            )}

            {submitted ? (
              <Card.Footer>
                <Button onClick={handleStart}>Start Over</Button>
              </Card.Footer>
            ) : (
              <Card.Footer className="d-flex justify-content-between">
                <Button onClick={prevButton} disabled={index == 1}>
                  Previous
                </Button>
                <Button type="submit">
                  {index === totalPagesCount ? "Submit" : "Next"}
                </Button>
              </Card.Footer>
            )}
          </Card>
        </Form>
      </Container>
    </main>
  );
}

export default App;

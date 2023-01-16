import React, { useState, useRef, useEffect } from "react";

const FormInput = () => {
  const renderCount = useRef(0);

  // controlled input
  const [firstName, setFirstName] = useState("");

  // uncontrolled input
  const lastNameInput = useRef(); // this will reference the last name input

  useEffect(() => {
    //helper to compute the amount of renders
    renderCount.current += 1;
  });

  useEffect(() => {
    //focus on the lastname input field upon refresh
    lastNameInput.current?.focus();
  }, []);

  const formHandler = () => {
    const data = {
      firstName,
      lastName: lastNameInput.current?.value,
    };
    console.log(lastNameInput); 
    console.log("data " , data);
  };
  return (
    <div>
      <h3>Handling Form Inputs</h3>

      <form>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          placeholder="Your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Your Last Name"
          ref={lastNameInput}
          onChange ={(e) => {
            console.log("lastname changed");
            // lastNameC
          }}
        />

        <button type="button" onClick={formHandler}>
            Submit
        </button>
      </form>
      <p>The number of re-renders: {renderCount.current}</p>
    </div>
  );
};

export default FormInput;
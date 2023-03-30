import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const submitInfo = () => {
    Axios.post("http://localhost:3001/api/insert", {
      name: name,
      phone: phone,
      email: email,
    }).then(() => {
      alert("successful insert");
    });
  };

  return (
    <div className="App">
      <h1>Contact List Application</h1>
      <div className="info">
        <input
          type="text"
          name="name"
          placeholder="Name:"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number:"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <input
          type="text"
          name="email"
          placeholder="E-Mail:"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button onClick={submitInfo}>Submit Contact</button>
      </div>
    </div>
  );
}

export default App;

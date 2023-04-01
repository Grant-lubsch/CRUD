import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setContactList(response.data);
    });
  }, []);

  const submitInfo = () => {
    console.log("submitInfo() called");
    Axios.post("http://localhost:3001/api/insert", {
      name: name,
      phone: phone,
      email: email,
    });

    setContactList([
      ...contactList,
      { contactName: name, contactPhone: phone, contactEmail: email },
    ]);
  };
  
  handleDelete = (event) => {

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

        <br></br>

        <table border="1">
          <thead>
            <tr>
              <td>Name</td>
              <td>Phone</td>
              <td>Email</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {contactList.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.contactName}</td>
                  <td>{val.contactPhone}</td>
                  <td>{val.contactEmail}</td>
                  <td>
                    <button onClick={() => handleEdit(val.id)}>Edit</button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleDelete(val.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

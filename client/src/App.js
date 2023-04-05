import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactList, setContactList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setContactList(response.data);
    });
  }, []);

  const submitInfo = () => {
    Axios.post("http://localhost:3001/api/insert", {
      name: name,
      phone: phone,
      email: email,
    }).then(() => {
      setContactList([
        ...contactList,
        { contactName: name, contactPhone: phone, contactEmail: email },
      ]);
      setName("");
      setPhone("");
      setEmail("");
    });
  };

  /*  const submitInfo = () => {
    console.log("submitInfo() called");
    Axios.post("http://localhost:3001/api/insert", {
      name: name,
      phone: phone,
      email: email,
    });
*/

  const handleEdit = (id) => {
    setEditing(true);
    setEditId(id);
    const contact = contactList.find((contact) => contact.id === id);
    setName(contact.contactName);
    setPhone(contact.contactPhone);
    setEmail(contact.contactEmail);
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then(() => {
      setContactList(
        contactList.filter((contact) => {
          return contact.id !== id;
        })
      );
    });
  };

  const handleUpdate = () => {
    Axios.put(`http://localhost:3001/api/update/${editId}`, {
      name: name,
      phone: phone,
      email: email,
    }).then(() => {
      setContactList(
        contactList.map((contact) => {
          if (contact.id === editId) {
            return {
              id: editId,
              contactName: name,
              contactPhone: phone,
              contactEmail: email,
            };
          } else {
            return contact;
          }
        })
      );
      setName("");
      setPhone("");
      setEmail("");
      setEditId(null);
      setEditing(false);
    });
  };

//  setContactList([
    ...contactList,
    { contactName: name, contactPhone: phone, contactEmail: email },
  ]);

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

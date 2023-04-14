import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactList, setContactList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const handleUpdate = (id) => {
    setEditing(true);
    setEditId(id);
    const contactToUpdate = contactList.find((val) => val.id === id);
    setName(contactToUpdate.contactName);
    setPhone(contactToUpdate.contactPhone);
    setEmail(contactToUpdate.contactEmail);
  };

  const handleUpdateSubmit = () => {
    Axios.put(`http://localhost:3001/api/update/${editId}`, {
      name: name,
      phone: phone,
      email: email,
    }).then(() => {
      setName("");
      setPhone("");
      setEmail("");
      setEditId(null);
      setEditing(false);
      Axios.get("http://localhost:3001/api/get").then((response) => {
        setContactList(response.data);
      });
    });
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then(() => {
      Axios.get("http://localhost:3001/api/get").then((response) => {
        setContactList(response.data);
      });
    });
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contactList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(contactList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <h1>Contact List Application</h1>
      <div className="info">
        <input
          type="text"
          name="name"
          placeholder="Name:"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number:"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          name="email"
          placeholder="E-Mail:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {editing ? (
          <button onClick={handleUpdateSubmit}>Update Contact</button>
        ) : (
          <button onClick={submitInfo}>Submit Contact</button>
        )}
        <br />
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
            {currentItems.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.contactName}</td>
                  <td>{val.contactPhone}</td>
                  <td>{val.contactEmail}</td>
                  <td>
                    <button onClick={() => handleUpdate(val.id)}>Edit</button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleDelete(val.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          {pageNumbers.map((number) => {
            return (
              <button
                key={number}
                id={number}
                onClick={handleClick}
                className={currentPage === number ? "active" : null}
              >
                {number}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

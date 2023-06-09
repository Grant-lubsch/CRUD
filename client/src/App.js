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
    Axios.get("/api/get").then((response) => {
      setContactList(response.data);
    });
  }, []);

  const submitInfo = () => {
    Axios.post("/api/insert", {
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
    Axios.put(`/api/update/${editId}`, {
      name: name,
      phone: phone,
      email: email,
    }).then(() => {
      setName("");
      setPhone("");
      setEmail("");
      setEditId(null);
      setEditing(false);
      Axios.get("/api/get").then((response) => {
        setContactList(response.data);
      });
    });
  };

  const handleDelete = (id) => {
    Axios.delete(`/api/delete/${id}`).then(() => {
      Axios.get("/api/get").then((response) => {
        setContactList(response.data);
      });
    });
  };

  const handleClick = (event) => {
    const id = event.target.id;
    if (id === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (id === "next" && currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    } else if (!isNaN(id)) {
      setCurrentPage(Number(id));
    }
  };

  const handleNext = () => {
    setCurrentPage((page) => page + 1);
  };

  const handlePrev = () => {
    setCurrentPage((page) => page - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contactList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 2);
    i <=
    Math.min(currentPage + 2, Math.ceil(contactList.length / itemsPerPage));
    i++
  ) {
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
          <nav>
            <ul className="pagination">
              <li
                className={
                  currentPage === 1 ? "page-item disabled" : "page-item"
                }
              >
                <button className="page-link" onClick={handlePrev}>
                  Previous
                </button>
              </li>
              {pageNumbers.map((number) => {
                if (number < currentPage - 1 || number > currentPage + 1) {
                  return null;
                }
                return (
                  <li
                    key={number}
                    className={
                      currentPage === number ? "page-item active" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      id={number}
                      onClick={handleClick}
                    >
                      {number}
                    </button>
                  </li>
                );
              })}
              <li
                className={
                  currentPage === pageNumbers.length
                    ? "page-item disabled"
                    : "page-item"
                }
              >
                <button className="page-link" onClick={handleNext}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;

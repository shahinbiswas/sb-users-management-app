import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // নিচে CSS দেওয়া আছে

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editId, setEditId] = useState(null);

  // 🔹 Read users
  const getAllUsers = async () => {
    const response = await axios.get('http://localhost:3001/users');
    setUsers(response.data);
  };

  // 🔹 Create / Update users
  const addUser = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:3001/users/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post('http://localhost:3001/users', formData);
    }
    setFormData({ name: '', email: '' });
    getAllUsers();
  };

  // 🔹 Delete users
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    getAllUsers();
  };

  // 🔹 Edit user
  const editUser = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container">
      <h2 className="title">👥 User Management App</h2>

      {/* Form */}
      <form className="form" onSubmit={addUser}>
        <input
          type="text"
          value={formData.name}
          placeholder="Enter Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          value={formData.email}
          placeholder="Enter Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="submit" className="btn add-btn">
          {editId ? 'Update User' : 'Add User'}
        </button>
      </form>

      <div className="user-list">
        {users.map((user) => (
          <article key={user.id} className="user-card">
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <div className="btn-group">
              <button className="btn edit-btn" onClick={() => editUser(user)}>
                ✏️ Edit
              </button>
              <button
                className="btn delete-btn"
                onClick={() => deleteUser(user.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default App;

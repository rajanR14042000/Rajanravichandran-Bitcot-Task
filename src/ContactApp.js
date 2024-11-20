import React, { useState } from 'react';
import './App.css'; // Import your CSS file

// given json data will show  case in first page...
const initialContacts = [
  {
    id: 1,
    name: "Aaron",
    mobile: "5785664545",
    email: "aaron@gmail.com",
    address: "123 Main Street",
    addedAt: new Date().toLocaleString()
  },
  {
    id: 2,
    name: "Buincy Hanson",
    mobile: "5785664545",
    email: "hanson@gmail.com",
    address: "456 Elm Street",
    addedAt: new Date().toLocaleString()
  }
];

const AllContacts = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchContactDetails, setsearchContactDetails] = useState('');
  const [openAddContact, setopenAddContact] = useState(false);
  const [modalType, setModalType] = useState('add'); 
  const [currentContact, setCurrentContact] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    addedAt: ''
  });

  const handleSearch = (e) => {
    setsearchContactDetails(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddContact = () => {
    if (formData.name && formData.email && formData.phone && formData.address) {
      const newContact = {
        ...formData,
        id: Date.now(),
        addedAt: new Date().toLocaleString() // Save current date and time
      };
      setContacts([...contacts, newContact]);
      resetForm();
      setopenAddContact(false);
    } else {
      alert('Please fill in all fields.');
    }
  };
// to edit the contact this field
  const handleEditContact = (contact) => {
    setModalType('edit');
    setFormData(contact);
    setCurrentContact(contact);
    setopenAddContact(true);
  };
// to view contact this function
  const handleViewContact = (contact) => {
    setModalType('view');
    setCurrentContact(contact);
    setopenAddContact(true);
  };
// to add it after to update this contact 
  const handleUpdateContact = () => {
    setContacts(contacts.map(contact => contact.id === currentContact.id ? formData : contact));
    resetForm();
    setopenAddContact(false);
  };
// to delete the update contact
  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
//to rest the form after submit
  const resetForm = () => {
    setFormData({ id: '', name: '', email: '', phone: '', address: '', addedAt: '' });
    setModalType('add');
    setCurrentContact(null);
  };


  return (
    <div className="container">
      <h1>All Contacts</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchContactDetails}
        onChange={handleSearch}
        className="search-bar"
      />
      <button onClick={() => { setopenAddContact(true); resetForm(); alert('please add a contact in it page') }} className="button">
        Add Contact

      </button>
      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contact.id} className="contact-item">
            <span>{contact.name} - {contact.email} - {contact.phone} - {contact.address}</span>
            <div>
              <button className="view" onClick={() => handleViewContact(contact)}>View</button>
              <button className="edit" onClick={() => handleEditContact(contact)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(contact.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

{/* Modal for Adding, Editing, or Viewing Contact */}
      {openAddContact && modalType !== 'view' && (
        <div className="modal">
          <h2>{modalType === 'add' ? 'Add Contact' : 'Edit Contact'}</h2>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
            {modalType === 'add' ? (
              <button type="button" onClick={handleAddContact} className="button">
                Submit
              </button>
            ) : (
              <button type="button" onClick={handleUpdateContact} className="button">
                Update
              </button>
            )}
            <button type="button" onClick={() => setopenAddContact(false)} className="button close" style={{ marginLeft: '10px' }}>
              Close
            </button>
          </form>
        </div>
      )}

      {/* Modal for Viewing Contact */}
      {openAddContact && modalType === 'view' && currentContact && (
        <div className="modal">
          <h2>View Contact</h2>
          <p><strong>Name:</strong> {currentContact.name}</p>
          <p><strong>Email:</strong> {currentContact.email}</p>
          <p><strong>Phone:</strong> {currentContact.phone}</p>
          <p><strong>Address:</strong> {currentContact.address}</p>
          <p><strong>Added At:</strong> {currentContact.addedAt}</p>
          <button type="button" onClick={() => setopenAddContact(false) } className="button close">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AllContacts;

import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // 1. Add this import

const ContactCard = ({ contact }) => {
    const { dispatch } = useGlobalReducer(); // 2. Add this line

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/Jose/contacts/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Now dispatch will actually exist and work!
                dispatch({ type: "delete_contact", payload: id });
            } 
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex align-items-center">
        <img
          src="https://via.placeholder.com/100"
          className="rounded-circle me-4"
          alt="profile"
        />
        <div>
          <h5 className="card-title mb-1">{contact.name}</h5>
          <p className="text-muted mb-1">
            <i className="fas fa-map-marker-alt me-2"></i>{contact.address}
          </p>
          <p className="text-muted mb-1">
            <i className="fas fa-phone me-2"></i>{contact.phone}
          </p>
          <p className="text-muted mb-0">
            <i className="fas fa-envelope me-2"></i>{contact.email}
          </p>
          <Link to="/demo">
            <button className="btn btn-success m-2">Tasks</button>

          </Link>
          <button
            className="btn btn-danger border-0"
            onClick={() => deleteContact(contact.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
          <Link to={`/edit-contact/${contact.id}`} className="btn btn-link m-3 text-dark bg-light">
            <i className="fas fa-pencil-alt fs-5x"></i>
          </Link>


        </div>
      </div>
    </div>
  );
};

export default ContactCard;
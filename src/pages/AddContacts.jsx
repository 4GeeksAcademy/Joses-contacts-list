import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Assuming you want to redirect after adding

const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    // 1. Local state to manage form inputs
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
 
    // 2. Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // 3. API Call Function
    const createContact = async (dataToSend) => {
        try {
            const response = await fetch('https://playground.4geeks.com/contact/agendas/Jose/contacts', {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                // Optional: Update your global store here
                dispatch({ type: "add_contact", payload: data });
                alert("Contact added successfully!");
                navigate("/"); // Redirect to contact list
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createContact(formData);
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 mx-auto" style={{ maxWidth: "600px" }}>
                <h1 className="text-center">Add a New Contact</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="phone" 
                            placeholder="Enter phone"
                            value={formData.phone}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="address" 
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Save Contact</button>
                </form>
            </div>
        </div>
    );
};

export default AddContact;
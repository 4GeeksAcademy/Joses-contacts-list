import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';

const EditContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));
        if (contactToEdit) {
            setFormData({
                name: contactToEdit.name,
                email: contactToEdit.email,
                phone: contactToEdit.phone,
                address: contactToEdit.address
            });
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/Jose/contacts/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const updatedContact = await response.json();
                dispatch({ type: 'update_contact', payload: updatedContact });
                alert('Contact updated successfully!');
                navigate('/');
            } else {
                console.error('Error updating contact:', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 mx-auto" style={{ maxWidth: "600px" }}>
                <h1 className="text-center">Edit Contact</h1>
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
                            placeholder="Email"
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
                            placeholder="Phone"
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
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Update Contact</button>
                </form>
            </div>
        </div>
    );
};

export default EditContact;





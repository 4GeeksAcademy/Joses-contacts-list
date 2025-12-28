import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const apiUrl = "https://playground.4geeks.com/contact/agendas/Jose/contacts";

  const fetchContacts = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch contacts");
      
      const data = await response.json();
      
      // Dispatching data.contacts because the API returns { contacts: [...] }
      dispatch({
        type: "all_contacts",
        payload: data.contacts,
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }; 

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contacts List</h1>
      <div className="row justify-content-center">
        {store.contacts && store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <div key={contact.id} className="col-12 col-md-8 mb-3">
               {/* Passing contact data as a prop named 'contact' */}
              <ContactCard contact={contact} />
            </div>
          ))
        ) : (
          <div className="text-center">
            <div className="No contacts-icon mb-3">
              <span className="visually-hidden">No contacts</span>
            </div>
            <p className="mt-2">No contacts or agenda is empty...</p>
          </div>
        )}
      </div>
    </div>
  );
};
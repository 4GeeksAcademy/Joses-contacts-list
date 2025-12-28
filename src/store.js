export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,

      },
    ],
     Contacts: [],
  } 
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
case "delete_contact":
    return {
        ...store,
        // Use != (loose inequality) just in case one ID is a string and the other a number
        contacts: store.contacts.filter(contact => contact.id != action.payload)
    };

 case "all_contacts":
      return {
        ...store,
        contacts: action.payload, // payload should be the array of contacts
      };
      case "update_contact":
    return {
        ...store,
       
        contacts: store.contacts.map(contact => 
            contact.id === action.payload.id ? action.payload : contact
        )
    };

    case 'add_task':

      const { id,  color } = action.payload
 
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      return store;
  }    
}

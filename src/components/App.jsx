import { Component } from 'react';
import { ContactForm } from './Form/ContactForm';
import { ContactList } from './Contacts/ContactsList';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const dublicateContact = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (dublicateContact) {
      alert(`${name} already in contact list!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFindContact = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <Layout>
        <ContactForm onAdd={this.addContact} />
        <Filter filter={filter} onFilterContact={this.handleFindContact} />
        {filteredContacts.length > 0 && (
          <ContactList
            contacts={filteredContacts}
            onDelete={this.handleDeleteContact}
          />
        )}
        <GlobalStyle />
      </Layout>
    );
  }
}

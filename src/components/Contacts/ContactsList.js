import { ListItem, Title } from './ContactsList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <>
      <Title>Contacts</Title>
      <ul>
        {contacts.map(({ id, name, number }) => (
          <ListItem key={id}>
            {name}: {number}
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
          </ListItem>
        ))}
      </ul>
    </>
  );
};

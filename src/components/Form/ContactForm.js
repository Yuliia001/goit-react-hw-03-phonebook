import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  StyledForm,
  Label,
  Button,
  ErrMessage,
  Title,
} from './ContactForm.styled';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters.'
    )
    .required('Required'),
  number: Yup.string()
    .min(5, 'Too Short!')
    .max(15, 'Too Long!')
    .matches(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )

    .required('Required'),
});

export const ContactForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        onAdd(values);
        actions.resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <>
          <Title>Phone book</Title>
          <StyledForm>
            <Label>
              Name
              <Input
                type="text"
                name="name"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              />
              <ErrMessage name="name" component="div" />
            </Label>
            <Label>
              Number
              <Input
                type="tel"
                name="number"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              />
              <ErrMessage name="number" component="div" />
            </Label>
            <Button type="submit" disabled={isSubmitting}>
              Add Contact
            </Button>
          </StyledForm>
        </>
      )}
    </Formik>
  );
};

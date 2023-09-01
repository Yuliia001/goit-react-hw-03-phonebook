import { Input, Label } from './Filter.styled';

export const Filter = ({ filter, onFilterContact }) => {
  return (
    <Label>
      Find contacts by name
      <Input type="text" value={filter} onChange={onFilterContact}></Input>
    </Label>
  );
};

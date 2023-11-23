import React, { FC, FormEvent } from 'react';

interface Props {
  value?: string;
  checked?: boolean
  label?: string
  onChange(event: FormEvent<HTMLInputElement>): void;
}

const Checkbox: FC<Props> = ({ value, label, checked, onChange }) => (
  <label key={label}>
    <input type="checkbox" value={value} checked={checked} onChange={onChange} />
    {label}
  </label>
);

export default Checkbox;

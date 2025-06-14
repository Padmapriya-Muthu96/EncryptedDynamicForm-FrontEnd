import React from 'react';

const FormField = ({ field, value, onChange, onBlur }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label>{field.label}</label><br />
      <input
        autoFocus
        type={field.type}
        name={field.label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
    </div>
  );
};

export default FormField;
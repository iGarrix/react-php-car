type InputGroupProps = {
  label: string;
  field: string;
  value: string;
  errors: Array<string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const InputGroup = ({ label, field, value, errors, onChange, type = "text" }: InputGroupProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <input type={type} 
        className="form-control" 
        onChange={onChange}
        value={value}
        id={field} name={field} />
      {errors && errors.map((x, i) => <span className="text-danger" key={i}>{x}</span>)}
    </div>
  );
};

export default InputGroup;

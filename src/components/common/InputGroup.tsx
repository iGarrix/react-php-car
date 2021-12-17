import classNames from 'classnames';

type AppProps = {
    value?: string,
    label: string,
    field: string,
    touched?: boolean | null,
    error?: string | null,
    type?: "text"|"email"|"password"
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const InputGroup = ({label, field, onChange, touched=null, error=null, type="text", value=""}: AppProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={field}
        defaultValue={value}
        className={classNames("form-control",
          {"is-invalid": touched && error},
          {"is-valid": touched && !error}
        )}
        id={field}
        onChange={onChange}
      />
      {(touched && error) && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}; 

export default InputGroup;
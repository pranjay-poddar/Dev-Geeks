import './radio.css';

const RadioButton = (props) => {
  const {
    label = '',
    name,
    id,
    checked,
    onChange,
    disabled,
    className,
  } = props;

  return (
    <div
      className={`radioBtn ${className && className !== '' ? className : ''}`}
    >
      <input
        type="radio"
        disabled={disabled === undefined ? false : disabled}
        onChange={onChange}
        id={id}
        name={name}
        checked={checked}
      />
      <label className="pl-2" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;

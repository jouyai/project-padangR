const Button = ({ children, onClick, className }) => (
  <button onClick={onClick}
    className={`btn btn-primary ${className}`}>
    {children}
  </button>
);
export default Button;

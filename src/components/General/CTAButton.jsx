const CTAButton = ({btnText,onclick = ()=>{}}) => {
  return (
    <button
      className="btn btn-primary btn-large"
      onClick={onclick}
    >
      <span>{btnText}</span>
      <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default CTAButton;

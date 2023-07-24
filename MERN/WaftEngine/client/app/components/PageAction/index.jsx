const PageActions = (props) => {
  const { loading, position, children } = props;
  return (
    <div
      className={`bg-white border border-t-0 p-4 rounded-b ${
        loading ? 'opacity-50' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default PageActions;

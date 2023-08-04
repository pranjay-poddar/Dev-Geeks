const PageContent = (props) => {
  const { loading, children } = props;
  return (
    <div
      className={`bg-white border p-4 rounded mb-10 transition-opacity ease-out ${
        loading ? 'opacity-70' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default PageContent;

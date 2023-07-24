const TableFilter = (props) => {
  const { col, children } = props;

  return (
    <div className={`p-2 bg-gray-100 rounded filterBox`}>
      <div
        className={`${col === 1 ? 'max-w-sm' : ''}${
          col === 2 ? 'max-w-md' : ''
        }${col === 3 ? 'max-w-xl' : ''}${col === 4 ? 'max-w-4xl' : ''}${
          col === 5 ? 'max-w-5xl' : ''
        }${col === 6 ? 'max-w-6xl' : ''}${col === 7 ? 'max-w-7xl' : ''}${
          col > 7 ? 'w-full' : ''
        } grid gap-2 grid-cols-${col} items-center`}
      >
        {children}
      </div>
    </div>
  );
};

export default TableFilter;

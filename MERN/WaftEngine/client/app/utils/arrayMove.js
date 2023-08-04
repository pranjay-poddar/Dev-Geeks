const arrayMoveMutate = (array, from, to) => {
  const startIndex = from < 0 ? array.length + from : from;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = to < 0 ? array.length + to : to;

    const [item] = array.splice(from, 1);
    array.splice(endIndex, 0, item);
  }
};

const arrayMove = (array, from, to) => {
  const _array = [...array];
  arrayMoveMutate(_array, from, to);
  return _array;
};

export default arrayMove;

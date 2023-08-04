import Dialog from '../Dialog';

export default function DeleteDialog(props) {
  const handleClose = () => {
    props.doClose();
  };

  const handleDialogDelete = () => {
    props.doDelete();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        title="Are you sure to delete?"
        body={props.body || ''}
        actions={
          <div className="m-4 w-full flex justify-between px-1">
            <button
              type="button"
              className="-ml-1 bg-gray-100 w-1/2 border rounded px-3 py-2 text-sm leading-none font-bold hover:bg-gray-300"
              onClick={handleClose}
            >
              {props.closeButton ? props.closeButton : `Don't Delete`}
            </button>
            <button
              type="button"
              className="-mr-1 bg-red-100 w-1/2 text-red-600 px-3 py-2 text-sm font-bold leading-none border border-red-300 hover:bg-red-600 hover:text-white rounded"
              onClick={handleDialogDelete}
            >
              {props.confirmButton ? props.confirmButton : `Delete`}
            </button>
          </div>
        }
      />
    </div>
  );
}

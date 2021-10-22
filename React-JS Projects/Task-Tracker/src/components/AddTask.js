import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  function alertbox(data,classes)
  {
      let parent=document.getElementById("alert");
      let alert=document.createElement('div');
      alert.className=`alert alert-${classes}`;
      alert.textContent=data;
      parent.appendChild(alert);
      setTimeout(() => {
          alert.remove();
      }, 3000);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text || !day) {
        alertbox("Please add in Task and Day","warning");
      return;
    }

    onAdd({ text, day, reminder })
    alertbox("Task added successfully","success");

    setText('');
    setDay('');
    setReminder(false);
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className="text-center" id="alert">
      </div>  
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='text'
          placeholder='Add Day & Time'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask
import React from "react";

function CreateArea(props) {

        const [note , setNote] = React.useState({
            title: "",
            content: ""
        });
        const [alert, setAlert] = React.useState(false);

        function handleChange(event){
            const {name, value} = event.target; 

            setNote(prevNote => {
                return {
                    ...prevNote, 
                    [name]: value
                };
            });
        }


        function submitNote(event){
            if(note.title == '' && note.content == ''){
                setAlert(true);
                setTimeout(() => setAlert(false), 2000);
                return;
            }
            props.onAdd(note);
            setNote({
                title: "",
                content: ""
            });
            
        }

        const message = (
            <div class="alert alert-danger" role="alert">
                    Write Something...
            </div>
        );

    return (
        <div className="noteblock">
            <form>
                <input
                name="title"
                onChange={handleChange} 
                value={note.title} 
                placeholder="Title"
                />
                <textarea 
                name="content" onChange={handleChange} 
                value={note.content}
                placeholder="Make a Note..." 
                rows="3"
                />
                <div>{alert ? message : null}</div>
            <button type="button" onClick={submitNote} >Add</button>
            </form>
        </div>
    )
}

export default CreateArea;
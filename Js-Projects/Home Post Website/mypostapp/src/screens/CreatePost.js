import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/constant'
import { useParams } from 'react-router-dom'


function CreatePost() {

    const { postId, userId } = useParams()


    let reqBody = JSON.stringify({
        title: title,
        body: body,
        userId: 1,
    });
    const [body, setBody] = useState()
    const [title, setTitle] = useState()
    const [isEdit, setIsEdit] = useState(false)



    let methodType = 'POST';
    const populateData = () => {
        // true means edit req
        if (postId) {
            setIsEdit(true)
            methodType = 'PUT';
            // fetch the details from POSTID


            fetch(`${API_BASE_URL}/posts/${postId}`)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    reqBody = JSON.stringify({
                        //setTitle(json.title)
                    //setBody(json.body)
                });
        });
    }
}











const createPost = (event) => {

    event.preventDefault(); //stop the default tbehavioiur of page reload 

    let methodType = 'POST';
    if (postId) {
        methodType = 'PUT';
    }

    fetch(`${API_BASE_URL}/posts`, {
        method: '${methodType}',
        body: reqBody,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {

            console.log(json)
            if (isEdit) {
                alertFunction('Post Edited Successfully', 'success')
            }
            else {
                alertFunction('Post Created Successfully', 'success')

            }
        }).catch((err) => {
            alertFunction('Some error occured', 'danger')
            console.log(err)
        })



}
function alertFunction(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    var alertPlaceholder = document.getElementById('AlertMessage')
    alertPlaceholder.append(wrapper)
}

useEffect(() => {
    populateData()
}, [])



return (
    <div className="container" >
        {isEdit ? <h3 className="text-center text-uppercase pt-4">Edit Post</h3>
            : <h3 className="text-center text-uppercase pt-4">Create Post</h3>}
        <div id="AlertMessage"></div>
        <div className="mx-auto conatct-form-conatiner shadow-sm rounded p-3 lh-1 text-muted">
            <form onSubmit={(event) => { createPost(event) }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" >Name</label>
                    <input onChange={(e) => { setTitle(e.target.value) }} type="text" className="form-control" id="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" > Enter post description</label>
                    <textarea onChange={(e) => { setBody(e.target.value) }} className='form-control' id='description' required></textarea>
                </div>
                <div className='d-grid'>
                    <button type="submit" className="btn btn-primary">
                        {isEdit ? 'Edit Post' : 'Create Post'}
                    </button>

                </div>
            </form>
        </div >
    </div >
)
}




export default CreatePost
import React, { useEffect, useState, useParams } from 'react'
import { API_BASE_URL } from '../config/constant'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


function AllPosts() {

    const navigate = useNavigate();
    //Create a variable all posts and set a method a to update the vlaue of posts that
    // useState hook helps us to create this variable ith aempty array
    const [posts, setPosts] = React.useState([]);
    const [loader, setLoader] = useState(false);
    function alertFunction(message, type) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        var alertPlaceholder = document.getElementById('AlertMessage')
        alertPlaceholder.append(wrapper)
    }



    const deletePost = (postId) => {
        //console.log(postId)

        let action = window.confirm("Are you sure you want to delete this post?");

        if(action){
            axios.delete(`${API_BASE_URL}/posts/${postId}`)
            .then((resp) => {
                console.log(resp)
                alertFunction(`Post with id ${postId} deleted successfully`, 'success')
                navigate('/posts');
            })
            .catch((err) => {
                console.log(err)
                alertFunction(`Error deleting post with id ${postId}`, 'danger')
            });
        }
        

        
    }
    //ES6 function to get all pots from REST API

    const getAllPosts = () => {
        setLoader(true);
        fetch(`${API_BASE_URL}/posts`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setPosts(json)
                setLoader(false);
            });
    }

    // we want to load data on page load of this component
    useEffect(() => {
        // console.log("All posts loaded")
        getAllPosts();

    }, []); //empty array means execute only once when the page loads


    return (
        <div>
            <section className="latest-post container py-4">
                <h3 className="text-center text-uppercase pt-4">Latest Posts</h3>
                <div className="row">
                    {
                        loader ?
                            <div className="col-12 text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            : posts.map((post, index) => {
                                return <div key={index} className="col-lg-4 col-md-4 col-sm-12 mb-2">
                                    <div className="card ">
                                        <img style={{ height: "280px" }} src="https://source.unsplash.com/random/400*400" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">{post.body}</p>
                                            <div className="d-flex justify-content-between">
                                                <Link to={`/posts/${post.id}/${post.userId}`} className="btn btn-primary  text-uppercase" target>
                                                    <i class="fa-solid fa-location-arrow me-1"></i> Details
                                                </Link>

                                                <Link to={`/create/${post.id}/${post.userId}`} className="btn btn-warning text-uppercase" target>
                                                    <i class="fa-solid fa-pen-to-square me-1"></i>Edit
                                                </Link>


                                                <button onClick={() => { deletePost(post.id) }} className="btn btn-danger text-uppercase" target>
                                                    <i class="fa-solid fa-trash me-1"></i>Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                    }
                </div>
            </section>
        </div>
    )
}

export default AllPosts
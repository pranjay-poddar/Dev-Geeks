import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllDetailsAsync } from '../../redux/DetailsSlice';

function Details({ confirmed, recovered, deaths, lastUpdate }) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDetailsAsync());
    }, [dispatch]);

    return (
        <div className='bg-white mt-5'>
            <div className='text-center'>
                <h5>All Details</h5>
            </div>
            <div className="py-5">
                <div className="container">
                    <div className="row hidden-md-up">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-block">
                                    <h4 className="card-title ">Confirmed</h4>
                                    <h6 className="card-subtitle text-muted mt-1"> {confirmed}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-block">
                                    <h4 className="card-title">Recovered</h4>
                                    <h6 className="card-subtitle text-muted mt-1">{recovered}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-block">
                                    <h4 className="card-title">Deaths</h4>
                                    <h6 className="card-subtitle text-muted mt-1">{deaths}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;

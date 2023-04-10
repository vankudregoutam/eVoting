import React, { useState, useEffect } from 'react'
// import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom'


function AddVote() {

    const [data, setData] = useState([]);
    // const { user, isLoading } = useUser();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const Vote = () => {
        // disable
    }

    const LogOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
        window.alert('Log Out Successful!')
    }

    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:5000/getAllCandidate', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                console.log(data, 'candidateData');
                setData(data.data)
            })
        // .then(res => navigate('/addCandidate'))
    }, [])

    return (
        <>
            <div className="container">

                <div className="view-container">
                    <h2>Add Vote</h2><br /><br />
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Party Name</th>
                                    <th>Vote</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(i => (

                                    <tr key={i._id}>
                                        <td>{i.name}</td>
                                        <td>{i.partyname}</td>
                                        <td><button className="btn btn-primary" onClick={Vote} >Vote</button></td>
                                        {/* <td>
                                            {user ? <button className="btn btn-primary" onClick={Vote} >Vote</button>
                                                : <button className="btn btn-primary" disabled >Login</button>
                                            }
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="footer">
                {/* <div className="nav-right"> */}
                    <button className="btn btn-danger" onClick={LogOut}>Log Out</button>
                {/* </div> */}
            </div><br /><br />
        </>
    )
}

export default AddVote

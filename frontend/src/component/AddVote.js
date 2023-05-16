import React, { useState, useEffect } from 'react'
// import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom'


function AddVote(props) {

    const [data, setData] = useState([]);
    // const { user, isLoading } = useUser();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const Vote = (id, name) => {
        // disable
        if(window.confirm(`Do you want to vote ${name}`)) {
            fetch(`http://localhost:5001/vote/${id}`, {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    candidateId: id
                }),
            }).then(res => {
                res.json();
            })
            // .then()
        }
    }

    const LogOut = () => {
        if (window.confirm('Do you want to logout')) {
            localStorage.removeItem('token')
            navigate('/login')
            window.alert('Log Out Successful!')
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:5001/getAllCandidate', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                console.log(data, 'candidateData');
                setData(data.data)
            })
    }, [])

    return (
        <>

            <div className="container">
                <div className="view-container">
                    <h3>Welcome</h3>
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
                                        <td><button className="btn btn-primary" onClick={() => Vote(i._id, i.name)} >Vote</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <footer>
                <button className="btn btn-danger" onClick={LogOut}>Log Out</button>
            </footer><br /><br />

        </>
    )
}

export default AddVote

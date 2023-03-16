import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'


function AddVote() {

    const [data, setData] = useState([])

    // const navigate = useNavigate()

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
                                        {/* <td><Icon icon={trash} /></td> */}
                                        <td><button className="btn btn-primary">Vote</button></td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddVote

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'

const initialValues = {
    name: '',
    partyname: '',
    votes: 0
}

function Addcandidate() {
    const navigate = useNavigate()
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('admin token')) {
            navigate('/admin')
        }
    }, [])

    const getCandidate = () => {
        fetch('http://localhost:5001/getAllCandidate', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                console.log(data, 'candidateData');
                setData(data.data)
            }
            )
    }

    const handleDelete = (id, name) => {

        if (window.confirm(`Are you sure to delete ${name}?`)) {
            fetch(`http://localhost:5001/deleteCandidate/${id}`, {
                method: 'DELETE',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    candidateId: id
                }),
            }).then((res) => {
                res.json();
            })
            window.location.reload()
            .then((data) =>
                alert(data.data)
            )
            .catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        getCandidate();
    }, [])

    const LogOut = () => {
        if (window.confirm('Do you want to logout')) {
            localStorage.removeItem('admin token')
            navigate('/admin')
            window.alert('Log Out Successful!')
        }
    }

    const handleSubmit = (e) => {
        // debugger

        const { name, partyname, votes } = values;

        fetch('http://localhost:5001/addCandidate', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                name, partyname, votes
            })
        })
            // Changed here
            .then(() => {
                getCandidate();
            })
    }

    const { values, errors, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,   // this initialValues will be passed to values after submitting
        onSubmit: (vḁlues) => {
            console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ vḁlues", vḁlues)
        }
    });
    console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ errors", errors)
    return (
        <>
            <button className="btn btn-danger" onClick={LogOut}>Log Out</button><br /><br />
            <div className='wrapper'>
                <h1>Candidates</h1>
                <p>Add candidtes standing in election</p>
                <div className="card mx-5" style={{ width: '45rem' }}><br />
                    {/* changed onSubmit */}
                    <form method="POST" className='form-container' onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-10 w-50">
                                <input type="text" autoComplete='off' className="form-control" name="name" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Name' required />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-4 col-form-label">Party Name</label>
                            <div className="col-sm-10 w-50">
                                <input type="text" autoComplete='off' className="form-control" name="partyname" id="partyname" value={values.partyname} onChange={handleChange} onBlur={handleBlur} placeholder='Enter Party Name' required />
                            </div>
                        </div>
                        <button className="btn btn-primary" >ADD</button>
                    </form>
                </div>
                <div className="view-container">
                    <div className="table-responsive">
                        <table className='table'>
                            <thead>
                                <tr>
                                    {/* <th>Symbol</th> */}
                                    <th>Name</th>
                                    <th>Party Name</th>
                                    {/* <th>Edit</th> */}
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(i => (

                                    <tr key={i._id}>
                                        {/* <td>{i.img}</td> */}
                                        {/* <td><img src='{i.img}' width={100} /></td> */}
                                        <td>{i.name}</td>
                                        <td>{i.partyname}</td>
                                        {/* <td><Icon icon={pen_3} style={{ cursor: 'pointer', color: 'green' }} onClick={() => handleEdit(i._id, i.name)} /></td> */}
                                        <td><Icon icon={trash} style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(i._id, i.name)} /></td>
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

export default Addcandidate

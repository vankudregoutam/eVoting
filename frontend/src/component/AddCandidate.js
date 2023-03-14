import React, { useState ,useEffect } from 'react';
import View from './View';

// getting the values of local storage
const getDatafromLS = () => {
    const data = localStorage.getItem('candidates');
    if(data) {
        return JSON.parse(data);    // JSON.pasrse converts the string to object format
    } else {
        return []
    }
}

export default function AddCandidate() {

    // main array of name and party name
    const [candidates, setCandidates] = useState(getDatafromLS());

    // input field states
    const [name, setName] = useState('');
    const [partyname, setPartyName] = useState('');

    // form submit event
    const handleAddSubmit = (e) => {
        e.preventDefault();

        // creating an object
        let candidate ={
            name,
            partyname
        }

        setCandidates([...candidates,candidate]);
        setName('');
        setPartyName('');
    }

    // saving data to local storge
    useEffect (() => {
        localStorage.setItem('candidates', JSON.stringify(candidates));     // stores the data in string format inlocal storage
    }, [candidates])

    return (
        <div className='wrapper'>
            <h1 style={{ color: 'white' }}>Candidates</h1>
            <p>Add candidtes standing in election</p>
            <div className="main">
                <div className="form-container">
                    <form autoComplete='off' className='form-group' onSubmit={handleAddSubmit}>
                        <label htmlFor="name" className="col-sm-4 col-form-label" style={{ color: 'white' }}>Name</label>
                        <input type='text' className='form-control' name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required /> <br /> <br />
                        <label htmlFor="partyname" className="col-sm-4 col-form-label" style={{ color: 'white' }}>Party Name</label>
                        <input type='text' className='form-control' name="partyname" id="partyname" value={partyname} onChange={(e) => setPartyName(e.target.value)} required /> <br /> <br />
                        <button className="btn btn-primary" >ADD</button>
                    </form>
                </div>
                <div className="view-container">
                    {candidates.length > 0 && <>
                        <div className="table-responsive">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Party Name</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <View candidates={candidates}/>
                                </tbody>
                            </table>
                        </div>
                    </>}
                    {candidates.length < 1 && <div>No Candidates are added yet</div> }
                </div>
            </div>
        </div>
    )
}

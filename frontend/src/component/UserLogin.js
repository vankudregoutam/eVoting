import React, { useEffect } from 'react'
import { logInSchema } from './Validate';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
// import { getAuth, signInAnonymously } from 'firebase/auth'

// import axios from 'axios'

export default function UserLogin(props) {

    // const [error, setError] = useState('')

    const navigate = useNavigate();

    const initialValues = {
        id: '',
        pass: '',
    }

    useEffect(() => {
        if (localStorage.getItem('admin token')) {
            window.alert('First Logout as admin!');
            navigate('/admin/addCandidate');
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, id, pass } = values;

        // try {
        //     await signInAnonymously(getAuth(), id, pass)
        // } catch (e) {
        //     setError(e.message)
        // }

        fetch('http://localhost:5001/login', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                name, id, pass
            })
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem('token', data)
            window.alert('Login Successful');
            navigate('/login/addVote')
        })
    }

    // const login = () => {
    //     // axios.post('http://localhost:3001/login', values).then(res => console.log(res))
    // }

    const { values, errors, touched, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: logInSchema,
        onSubmit: (vḁlues) => {
            console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ vḁlues", vḁlues)
        }
    });
    console.log("🚀 ~ file: Registration.js:20 ~ Registration ~ errors", errors)


    return (
        <>
            <div className='container my-5'>
                <center>
                    <h3>User Login</h3><br />
                    <div className="card mx-5" style={{ width: '40rem' }}>
                        <div className="card-body mx-5">
                            <div className='auth-form-container my-3'>
                                <form action="/" className='login-form ms-5' onSubmit={handleSubmit}>
                                    <div className="mb-3 row">
                                        <label htmlFor="id" className="col-sm-4 col-form-label">Voter ID</label>
                                        <div className="col-sm-10 w-50">
                                            <input type="integer" className="form-control" autoComplete='off' maxLength={10} name="id" id="id" value={values.id} onChange={handleChange} onBlur={handleBlur} />
                                            {errors.id && touched.id ? (<p className='form-error' style={{ color: 'red' }}>{errors.id}</p>) : null}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="pass" className="col-sm-4 col-form-label">Password</label>
                                        <div className="col-sm-10 w-50">
                                            <input type="password" className="form-control" autoComplete='off' name="pass" id="pass" value={values.pass} onChange={handleChange} onBlur={handleBlur} placeholder='**** ****' />
                                            {errors.pass && touched.pass ? (<p className='form-error' style={{ color: 'red' }}>{errors.pass}</p>) : null}
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mx-2">LogIn</button><br />
                                    <div className="btn" onClick={() => navigate('/register')}>Don't have an account? Register Here.</div>
                                </form>
                            </div>
                        </div>
                    </div>
                </center>
            </div>
            <br />
            <br />
        </>
    )
}

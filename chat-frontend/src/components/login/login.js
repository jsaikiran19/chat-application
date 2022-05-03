import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button, Radio, Alert, Backdrop, CircularProgress } from "@mui/material";
import GoogleLogin from 'react-google-login';
import store from '../../store';
import { forgot, login, setUserDetails, signUp } from '../../services/user.service';
import './login.scss';

export function Login() {
    const [user_type, setUserType] = useState('User');
    const [password, setPassword] = useState('');
    const [user_mail, setUserName] = useState('');
    const navigate = useNavigate();
    const [forgotPasswordForm, setForgotPasswordForm] = useState(false);
    const [searchParams] = useSearchParams()
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ type: 'success', msg: '' })
    const {state} = useLocation();

    useEffect(() => {
        const msg = state?.emailVerificationMsg?.msg;
        console.log(state);
        setAlert({ ...alert, msg })
    }, [])


    function handleUserName(e) {
        setUserName(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    const navigateToHome = (user) => {
        setLoading(false)
        // user.user_type = 'Admin';
        store.dispatch({ type: 'SET_USER', userDetails: user });
        setUserDetails(user);
        // addPerson(user);
        navigate('/dashboard', { state: { isFirstTime } });
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const {data} = await login(user_mail, password);
            console.log(data);
            setLoading(false);
            navigateToHome(data.response);
        }
        catch (e) {
            setLoading(false)
            const alert = { type: 'error', msg: e.message };
            setAlert(alert)
        }
        
    }

    // const responseGoogle = async (response) => {
    //     const profile = response.profileObj
    //     console.log(response);
    //     if (profile) {

    //         const user = {
    //             email: profile.email,
    //             first_name: profile.givenName || profile.name,
    //             last_name: profile.familyName,
    //             user_type: user_type
    //         }
    //         try {
    //             setLoading(true);
    //             const {data} = await signUp(user);
    //             // createUser({...user, user_email:user.first_name, secret: user.email.split('@')[0]+ "@" +user.first_name, custom_json:JSON.stringify(user) })
    //             navigateToHome(data.userInfo);
    //         }
    //         catch (e) {
    //             setLoading(false)
    //             const {data} = e.response;
    //             const msg = data?.message;
    //             if (msg === 'Bad request params - email already exists. Try logging in!') {
    //                 navigateToHome(data.userInfo);
    //             }
    //         }

    //     }
    // }

    const forgotPassoword = () => {
        // console.log('forgot password')
        setForgotPasswordForm(true);
    }

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            await forgot(user_mail);
            const alert = { type: 'success', msg: 'An email has been sent to you to reset your password' }
            setAlert(alert);
        }
        catch (e) {
            const alert = { type: 'error', msg: e.response.data.message };
            setAlert(alert)
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={loginUser}>
                    <div className="login-inputs-container">
                        {alert.msg && <Alert severity={alert.type}>{alert.msg}</Alert>}
                        {!forgotPasswordForm && <div className="login-inputs">
                            <div style={{ fontSize: "21px", padding: "1em" }}>Login here</div>
                            {/* <div style={{ fontSize: "16px", padding: "1em" }}>Choose User or Admin and enter your Username and password</div> */}
                            {/* <div className="roles">
                                <label htmlFor="User">User</label>
                                <Radio
                                    checked={user_type === 'User'}
                                    onChange={() => setUserType('User')}
                                    value="User"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                <label htmlFor="Admin">Admin</label>
                                <Radio
                                    checked={user_type === 'Admin'}
                                    onChange={() => setUserType('Admin')}
                                    value="Admin"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                            </div> */}
                            <TextField size="small" type="email" required className="input-text" onChange={handleUserName} id="outlined-basic" label="Username" variant="outlined" />
                            <TextField size="small" required type="password" onChange={handlePassword} className="input-text" id="outlined-basic-password" label="Password" variant="outlined"></TextField>
                            <Button size="small" id="signIn" type="submit" className="input-text" variant="contained">Sign In</Button>
                            {/* <p className="forgot" onClick={forgotPassoword}>Forgot Password?</p> */}
                            <div className="social-media-login">
                                {/* <GoogleButton style={{ width: '260px' }} onClick={() => { setgoogleLogin(true) }}></GoogleButton>

                                {<GoogleLogin
                                    clientId="1043088031232-5akad0b64kh6ld0qhc1fuohn3s3283vf.apps.googleusercontent.com"
                                    buttonText="Continue with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy='single_host_origin'
                                />} */}
                                <p style={{ textDecoration: "underline" }} onClick={() => navigate('/register')}>Don't have an account? Click here to register.</p>
                            </div>
                        </div>}
                        {
                            forgotPasswordForm && <div className="login-inputs">
                                <div className="enter-name">Enter your email</div>
                                <TextField size="small" type="email" required className="input-text"
                                    onChange={handleUserName} id="outlined-basic" label="Username" variant="outlined" />
                                <Button size="small" id="resetPassword" className="input-text" variant="contained" onClick={resetPassword}>Reset Password</Button>
                            </div>
                        }
                    </div>
                </form>

            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>

    )
}
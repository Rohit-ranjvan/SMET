import React, { useState } from 'react';
import { FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import axios from "axios";

const LoginForm = ({ registerPath, resetPath }) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        usernameOrEmail: "Ds0801", // Default email for testing
        password: "PHmqW9hg",              // Default password for testing
        // usernameOrEmail: "Ds0801", // Default email for testing
        // password: "PHmqW9hg",              // Default password for testing
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange =  (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post(
                `${import.meta.env.VITE_SOME_KEY}/API/V1/authenticate`, 
                credentials, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                console.log("Login Success:", response.data.accessToken); 
                alert("Login successful!");
                localStorage.setItem('token', response.data.accessToken);
                navigate('/home');
            })
            .catch((error) => {
                console.error("Login Error:", error.response?.data || error.message);
                setErrorMessage(error.response?.data?.message || "Failed to login. Please try again.");
            });
    };
    

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            <p className="fs-12 fw-medium text-muted">Thank you for getting back to <strong>Nelel</strong> web applications. Let's access our best recommendations for you.</p>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form className="w-100 mt-4 pt-2" onSubmit={handleLogin}>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        name="usernameOrEmail"
                        value={credentials.usernameOrEmail}
                        onChange={handleInputChange}
                        placeholder="Email or Username"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberMe" />
                            <label className="custom-control-label c-pointer" htmlFor="rememberMe">Remember Me</label>
                        </div>
                    </div>
                    <div>
                        <Link to={resetPath} className="fs-11 text-primary">Forget password?</Link>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100" onClick={handleLogin}>Login</button>
                </div>
            </form>
            <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative">
                    <span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">or</span>
                </div>
            </div>
            <div className="mt-5 text-muted">
                <span> Don't have an account?</span>
                <Link to={registerPath} className="fw-bold"> Create an Account</Link>
            </div>
        </>
    );
};

export default LoginForm;

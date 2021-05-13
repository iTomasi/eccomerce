import React, {useState, useRef} from "react";
import {Link} from "react-router-dom";
import Axios from "axios";
import config from "../config/config";
import "./scss/form.scss";

interface IShowPassword {
    icon: string,
    display: boolean
}

const Login = () => {

    const eyesIcon = useRef({hide: "fas fa-eye-slash", unhide: "fas fa-eye"})

    const [showPassword, setShowPassword] = useState<IShowPassword>({icon: eyesIcon.current.hide, display: false});

    const handleIconPassword = () => {
        showPassword.display
        ? setShowPassword((prev: any) => ({...prev, display: false, icon: eyesIcon.current.hide}))
        : setShowPassword((prev: any) => ({...prev, display: true, icon: eyesIcon.current.unhide}))
    }

    const loggin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const res = await Axios.post(config.HOST.BACK_END + "/auth/sign-in", {
            email: formData.get("email"),
            password: formData.get("password")
        }, {headers: {"Content-Type": "application/json"}})

        console.log(res.data)

    }

    return (
        <>
        <form className="iw_form" onSubmit={loggin}>
            <div className="formSection">
                <label className="labelTitle">Email</label>
                <input className="input" type="text" placeholder="Email" name="email"/>
            </div>

            <div className="formSection">
                <label className="labelTitle">Password</label>

                <label className="inputIcon">
                    <input type={showPassword.display ? "text" : "password"} placeholder="Password" name="password"/>
                    <i className={showPassword.icon} onClick={handleIconPassword}></i>
                </label>
            </div>

            <button type="submit">Log In</button>
        </form>

        <Link to="#" className="forgotPassword">Forgot password?</Link>

        <div className="dontHaveAccount">
            <h3>Don't have an account?</h3>
            <Link to="/sign-up">sign up now</Link>
        </div>
        </>

    )
};

export default Login;
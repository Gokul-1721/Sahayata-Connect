import { useState } from "react";

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    async function login() {
        if (!email || !pass) {
            alert("Please enter both email and password.");
            return;
        }
        var fd = new FormData();
        fd.append("email", email);
        fd.append("pass", pass);
        var resp = await fetch("http://localhost:2000/admin/login", {
            method: 'POST',
            body: fd
        });
        var data = await resp.json();
        if (data.id) {
            localStorage.setItem("aname", data.name);
            window.location = "/";
        } else {
            alert(data.msg || "Invalid login credentials.");
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input onChange={(ev) => setEmail(ev.target.value)} type="email" className="form-control form-control-user" placeholder="Enter Email Address..." />
                                            </div>
                                            <div className="form-group">
                                                <input onChange={(ev) => setPass(ev.target.value)} type="password" className="form-control form-control-user" placeholder="Password" />
                                            </div>
                                            <button onClick={login} type="button" className="btn btn-primary btn-user btn-block">Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
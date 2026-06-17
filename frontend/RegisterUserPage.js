import React, { useState } from "react";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

function RegisterUserPage() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [department, setDepartment] =
        useState("");

    const [role, setRole] = useState("");

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        localStorage.removeItem("department");

        window.location.href = "/";
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                "http://localhost:8080/auth/register",

                {
                    name,
                    email,
                    password,
                    department,
                    role,
                    reportingManagerId: null
                }
            );

            alert(response.data);

            setName("");

            setEmail("");

            setPassword("");

            setDepartment("");

            setRole("");
        }

        catch(error) {

            console.error(error);

            alert("Registration Failed");
        }
    };

    return (

        <div>

            {/* NAVBAR */}

            <nav className=
                "navbar navbar-expand-lg navbar-dark bg-dark px-4"
            >

                <a className="navbar-brand" href="/">

                    Nexnid ERP

                </a>

                <div className="ms-auto">

                    <button

                        className="btn btn-danger"

                        onClick={handleLogout}
                    >

                        Logout

                    </button>

                </div>

            </nav>

            {/* FORM */}

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-6">

                        <div className=
                            "card shadow-lg p-5"
                        >

                            <h2 className="mb-4 text-center">

                                Register New User

                            </h2>

                            <form
                                onSubmit={handleRegister}
                            >

                                <div className="mb-3">

                                    <label className=
                                        "form-label"
                                    >

                                        Full Name

                                    </label>

                                    <input

                                        type="text"

                                        className=
                                        "form-control"

                                        value={name}

                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }

                                        required
                                    />
                                </div>

                                <div className="mb-3">

                                    <label className=
                                        "form-label"
                                    >

                                        Email

                                    </label>

                                    <input

                                        type="email"

                                        className=
                                        "form-control"

                                        value={email}

                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }

                                        required
                                    />
                                </div>

                                <div className="mb-3">

                                    <label className=
                                        "form-label"
                                    >

                                        Password

                                    </label>

                                    <input

                                        type="password"

                                        className=
                                        "form-control"

                                        value={password}

                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }

                                        required
                                    />
                                </div>

                                <div className="mb-3">

                                    <label className=
                                        "form-label"
                                    >

                                        Department

                                    </label>

                                    <select

                                        className=
                                        "form-select"

                                        value={department}

                                        onChange={(e) =>
                                            setDepartment(
                                                e.target.value
                                            )
                                        }

                                        required
                                    >

                                        <option value="">

                                            Select Department

                                        </option>

                                        <option value="CEO">

                                            CEO

                                        </option>

                                        <option value="CFO">

                                            CFO

                                        </option>

                                        <option value="CPO">

                                            CPO

                                        </option>

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label className=
                                        "form-label"
                                    >

                                        Role

                                    </label>

                                    <select

                                        className=
                                        "form-select"

                                        value={role}

                                        onChange={(e) =>
                                            setRole(
                                                e.target.value
                                            )
                                        }

                                        required
                                    >

                                        <option value="">

                                            Select Role

                                        </option>

                                        <option value="ADMIN">

                                            ADMIN

                                        </option>

                                        <option value="CEO">

                                            CEO

                                        </option>

                                        <option value="CFO">

                                            CFO

                                        </option>

                                        <option value="CPO">

                                            CPO

                                        </option>

                                        <option
                                            value=
                                            "SENIOR_INTERIOR_DESIGNER"
                                        >

                                            Senior Interior Designer

                                        </option>

                                    </select>

                                </div>

                                <button

                                    type="submit"

                                    className=
                                    "btn btn-primary w-100"
                                >

                                    Register User

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default RegisterUserPage;
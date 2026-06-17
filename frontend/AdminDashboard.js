import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        localStorage.removeItem("department");

        window.location.href = "/";
    };

    const handleRegisterUser = () => {

        window.location.href = "/register-user";
    };

    return (

        <div>

            {/* NAVBAR */}

            <nav className=
                "navbar navbar-expand-lg navbar-dark bg-dark px-4"
            >

                <a className="navbar-brand" href="/">

                    Nexnid ERP Admin

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

            {/* MAIN CONTENT */}

            <div className="container mt-5">

                <div className="row">

                    <div className="col-md-12">

                        <div className=
                            "card shadow-lg p-5 border-0"
                        >

                            <h1 className="mb-3">

                                Admin Dashboard

                            </h1>

                            <p className="text-muted">

                                Welcome Admin

                            </p>

                            <button

                                className=
                                "btn btn-primary mt-3"

                                onClick={
                                    handleRegisterUser
                                }
                            >

                                Register New User

                            </button>

                        </div>

                    </div>

                </div>

                {/* DASHBOARD CARDS */}

                <div className="row mt-4">

                    <div className="col-md-4">

                        <div className=
                            "card shadow p-4 text-center"
                        >

                            <h3>

                                Manage Employees

                            </h3>

                            <p>

                                Add and manage users

                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className=
                            "card shadow p-4 text-center"
                        >

                            <h3>

                                Departments

                            </h3>

                            <p>

                                View company departments

                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className=
                            "card shadow p-4 text-center"
                        >

                            <h3>

                                Reports

                            </h3>

                            <p>

                                Access ERP reports

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;
import React, { useState } from "react";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

/* IMPORT BACKGROUND IMAGE */

import backgroundImage from "/Users/hp/nexnid-erp-frontend/src/img/Login-Background.jpg";

function LoginPage() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [role, setRole] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                "http://localhost:8080/auth/login",

                {
                    email,
                    password
                }
            );

            const token =
                response.data.token;

            const backendRole =
                response.data.role;

            const department =
                response.data.department;

            const name =
                response.data.name;

            /* STORE DATA */

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "role",
                backendRole
            );

            localStorage.setItem(
                "department",
                department
            );

            localStorage.setItem(
                "name",
                name
            );

            localStorage.setItem(
                "email",
                email
            );

            alert("Login Successful");

            /* ROLE BASED REDIRECTION */

            if (backendRole === "ADMIN") {

                window.location.href =
                    "/admin-dashboard";
            }

            else if (backendRole === "CEO") {

                window.location.href =
                    "/ceo-dashboard";
            }

            else if (backendRole === "CFO") {

                window.location.href =
                    "/cfo-dashboard";
            }

            else if (backendRole === "CPO") {

                window.location.href =
                    "/cpo-dashboard";
            }

            else if (
                backendRole ===
                "SENIOR_INTERIOR_DESIGNER"
            ) {

                window.location.href =
                    "/designer-dashboard";
            }

        }

        catch (error) {

            console.error(error);

            alert("Invalid Credentials");
        }
    };

    return (

        <div

            style={{

                minHeight: "100vh",

                backgroundImage:
                    `linear-gradient(
                        rgba(25,20,15,0.60),
                        rgba(25,20,15,0.68)
                    ),
                    url(${backgroundImage})`,

                backgroundSize: "cover",

                backgroundPosition: "center",

                backgroundRepeat: "no-repeat",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                padding: "20px"
            }}
        >

            {/* LOGIN CARD */}

            <div

                className="p-4"

                style={{

                    width: "390px",

                    background:
                        "rgba(245,235,220,0.14)",

                    border:
                        "1px solid rgba(255,255,255,0.12)",

                    backdropFilter:
                        "blur(14px)",

                    borderRadius: "28px",

                    boxShadow:
                        "0px 8px 30px rgba(0,0,0,0.35)"
                }}
            >

                {/* BRANDING */}

                <div className="text-center mb-4">

                    <h1

                        style={{

                            color: "#f8f4ee",

                            fontWeight: "700",

                            fontSize: "34px",

                            letterSpacing: "1px"
                        }}
                    >

                        Nexnid ERP

                    </h1>

                    <p

                        style={{

                            color: "#eadbc8",

                            marginTop: "8px",

                            fontSize: "14px",

                            letterSpacing: "0.5px"
                        }}
                    >

                        Luxury Interior Management

                    </p>

                </div>

                {/* FORM */}

                <form onSubmit={handleLogin}>

                    {/* ROLE */}

                    <div className="mb-3">

                        <label

                            style={{

                                color: "#f3e7d3",

                                marginBottom: "6px",

                                fontWeight: "500",

                                fontSize: "14px"
                            }}
                        >

                            Select Role

                        </label>

                        <select

                            className="form-select"

                            value={role}

                            onChange={(e) =>
                                setRole(
                                    e.target.value
                                )
                            }

                            required

                            style={{

                                height: "48px",

                                borderRadius: "12px",

                                background:
                                    "rgba(255,255,255,0.82)",

                                border:
                                    "none",

                                color: "#3b2f2f",

                                fontSize: "14px"
                            }}
                        >

                            <option value="">

                                Choose Role

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

                    {/* EMAIL */}

                    <div className="mb-3">

                        <label

                            style={{

                                color: "#f3e7d3",

                                marginBottom: "6px",

                                fontWeight: "500",

                                fontSize: "14px"
                            }}
                        >

                            Email

                        </label>

                        <input

                            type="email"

                            className="form-control"

                            value={email}

                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }

                            required

                            placeholder=
                            "Enter your email"

                            style={{

                                height: "48px",

                                borderRadius: "12px",

                                background:
                                    "rgba(255,255,255,0.18)",

                                border:
                                    "1px solid rgba(255,255,255,0.15)",

                                color: "white",

                                fontSize: "14px"
                            }}
                        />

                    </div>

                    {/* PASSWORD */}

                    <div className="mb-4">

                        <label

                            style={{

                                color: "#f3e7d3",

                                marginBottom: "6px",

                                fontWeight: "500",

                                fontSize: "14px"
                            }}
                        >

                            Password

                        </label>

                        <input

                            type="password"

                            className="form-control"

                            value={password}

                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }

                            required

                            placeholder=
                            "Enter your password"

                            style={{

                                height: "48px",

                                borderRadius: "12px",

                                background:
                                    "rgba(255,255,255,0.18)",

                                border:
                                    "1px solid rgba(255,255,255,0.15)",

                                color: "white",

                                fontSize: "14px"
                            }}
                        />

                    </div>

                    {/* LOGIN BUTTON */}

                    <button

                        type="submit"

                        className="btn w-100"

                        style={{

                            height: "50px",

                            borderRadius: "12px",

                            border: "none",

                            fontWeight: "600",

                            fontSize: "15px",

                            background:
                                "linear-gradient(to right, #8b6b4a, #c2a27d)",

                            color: "white",

                            boxShadow:
                                "0px 6px 20px rgba(0,0,0,0.25)"
                        }}
                    >

                        Login

                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;
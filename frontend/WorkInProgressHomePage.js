import React from "react";

import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function WorkInProgressHomePage() {

    const navigate = useNavigate();

    const statusCards = [

        {
            title: "Active",
            color: "#16a34a",
            path: "/workinprogress/active",
            description: "View all active ongoing projects"
        },

        {
            title: "On Hold",
            color: "#eab308",
            path: "/workinprogress/onhold",
            description: "Projects waiting for action"
        },

        {
            title: "Cancelled",
            color: "#dc2626",
            path: "/workinprogress/cancelled",
            description: "Cancelled workflow projects"
        },

        {
            title: "Complete",
            color: "#2563eb",
            path: "/workinprogress/complete",
            description: "Successfully completed projects"
        }
    ];

    return (

        <div

            style={{
                background:
                    "linear-gradient(to right, #eef2ff, #f8fafc)",

                minHeight: "100vh",

                padding: "40px"
            }}
        >

            {/* HEADER */}

            <div className="mb-5">

                <h1

                    style={{
                        fontWeight: "700",
                        color: "#1e293b"
                    }}
                >

                    Work In Progress

                </h1>

                <p className="text-muted">

                    Select a workflow category

                </p>

            </div>

            {/* STATUS LIST */}

            <div className="d-flex flex-column gap-4">

                {
                    statusCards.map((item, index) => (

                        <div

                            key={index}

                            onClick={() =>
                                navigate(item.path)
                            }

                            className="bg-white"

                            style={{

                                borderRadius: "24px",

                                padding: "28px 35px",

                                cursor: "pointer",

                                transition: "0.3s ease",

                                borderLeft:
                                    `8px solid ${item.color}`,

                                boxShadow:
                                    "0px 5px 20px rgba(0,0,0,0.05)"
                            }}

                            onMouseEnter={(e) => {

                                e.currentTarget.style.transform =
                                    "translateY(-5px)";

                                e.currentTarget.style.boxShadow =
                                    "0px 10px 30px rgba(0,0,0,0.08)";
                            }}

                            onMouseLeave={(e) => {

                                e.currentTarget.style.transform =
                                    "translateY(0px)";

                                e.currentTarget.style.boxShadow =
                                    "0px 5px 20px rgba(0,0,0,0.05)";
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h3

                                        style={{
                                            fontWeight: "700",
                                            color: "#0f172a"
                                        }}
                                    >

                                        {item.title}

                                    </h3>

                                    <p

                                        className="mb-0"

                                        style={{
                                            color: "#64748b"
                                        }}
                                    >

                                        {item.description}

                                    </p>

                                </div>

                                <div

                                    style={{
                                        width: "14px",
                                        height: "14px",
                                        borderRadius: "50%",
                                        background: item.color
                                    }}
                                >

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default WorkInProgressHomePage;
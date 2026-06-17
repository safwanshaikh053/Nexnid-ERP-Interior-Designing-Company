import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function DesignerDashboard() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("department");

    localStorage.removeItem("name");

    localStorage.removeItem("email");

    window.location.href = "/";
}

  return (
    <div
      className="d-flex"
      style={{
        background: "linear-gradient(to right, #eef2ff, #f8fafc)",
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}

      <div
        className="d-flex flex-column justify-content-between p-4"
        style={{
          width: "270px",
          background: "linear-gradient(to bottom, #312e81, #1e1b4b)",
          color: "white",
          minHeight: "100vh",
          boxShadow: "4px 0px 15px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <h2
            className="text-center mb-5"
            style={{
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            Nexnid ERP
          </h2>

          {/* SIDEBAR BUTTONS */}

          <div className="d-grid gap-3">
            <button
              className="btn btn-light border-0"
              style={{
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              Button 1
            </button>

            <button
              className="btn btn-light border-0"
              style={{
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              Button 2
            </button>

            <button
              className="btn btn-light border-0"
              style={{
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              Button 3
            </button>

            <button
              className="btn btn-light border-0"
              style={{
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              Button 4
            </button>
          </div>
        </div>

        {/* PROFILE BUTTON */}

        <button
          className="btn btn-light border-0"
          style={{
            borderRadius: "15px",
            padding: "12px",
            fontWeight: "600",
          }}
          onClick={() => setShowProfile(true)}
        >
          👤 {localStorage.getItem("name")}
        </button>
      </div>

      {/* MAIN CONTENT */}

      <div className="flex-grow-1">
        {/* NAVBAR */}

        <nav
          className="navbar px-5 py-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              color: "#1e293b",
            }}
          >
            Senior Interior Designer Dashboard
          </h3>
        </nav>

        {/* PAGE CONTENT */}

        <div className="container-fluid p-5">
          {/* WELCOME SECTION */}

          <div
            className="p-5 mb-5"
            style={{
              background: "linear-gradient(to right, #4f46e5, #7c3aed)",
              borderRadius: "25px",
              color: "white",
              boxShadow: "0px 10px 30px rgba(79,70,229,0.3)",
            }}
          >
            <h1
              style={{
                fontWeight: "700",
              }}
            >
              Welcome, {localStorage.getItem("name")} 👋
            </h1>

            <p
              className="mt-3"
              style={{
                fontSize: "18px",
                opacity: "0.9",
              }}
            >
              Manage projects, meetings and workflows from your smart ERP
              dashboard.
            </p>
          </div>

          {/* DASHBOARD CARDS */}

          <div className="row g-4">
            {/* CARD */}

            {[
              {
                title: "Qualified & Assigned",
                route: "/qualified-assigned",
              },

              {
                title: "Lost",
                route: "/lost",
              },

              {
                title: "Follow Up",
                route: "/follow-up",
              },

              {
                title: "Non Contactable",
                route: "/client-meetings",
              },

              {
                title: "Work in Progress",
                route: "/workinprogress",
              },

              {
                title: "Handover",
                route: "/handover",
              },
            ].map((card, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="p-5 h-100"
                  style={{
                    backgroundColor: "white",

                    borderRadius: "25px",

                    cursor: "pointer",

                    transition: "0.3s",

                    boxShadow: "0px 5px 20px rgba(0,0,0,0.05)",
                  }}
                  onClick={() => navigate(card.route)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0px)")
                  }
                >
                  <h4
                    style={{
                      fontWeight: "700",

                      color: "#1e293b",
                    }}
                  >
                    {card.title}
                  </h4>

                  <p className="text-muted mt-3">
                    Open module and manage related workflow.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROFILE POPUP */}

      {showProfile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            zIndex: 999,
          }}
        >
          <div
            className="p-5"
            style={{
              width: "420px",

              backgroundColor: "white",

              borderRadius: "25px",

              boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h2
              className="mb-4"
              style={{
                fontWeight: "700",
              }}
            >
              User Profile
            </h2>

            <div className="mb-3">
              <strong>Name:</strong>

              <p className="text-muted">{localStorage.getItem("name")}</p>
            </div>
            <div className="mb-3">
              <strong>Email:</strong>

              <p className="text-muted">{localStorage.getItem("email")}</p>
            </div>

            <div className="mb-3">
              <strong>Role:</strong>

              <p className="text-muted">{localStorage.getItem("role")}</p>
            </div>

            <div className="mb-4">
              <strong>Department:</strong>

              <p className="text-muted">{localStorage.getItem("department")}</p>
            </div>

            <div className="d-flex justify-content-end gap-3">
              <button
                className="btn btn-light"
                onClick={() => setShowProfile(false)}
              >
                Close
              </button>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignerDashboard;

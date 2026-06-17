import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

function QualifiedAssignedPage() {

  const [showPopup, setShowPopup] =
    useState(false);

  const [leads, setLeads] =
    useState([]);

  /* FORM STATES */

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [contact, setContact] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  const [leadType, setLeadType] =
    useState("Walk In");

  const [remarks, setRemarks] =
    useState("");

  /* FETCH LEADS */

  const fetchLeads = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8080/leads"
        );

      /* SORT NEWEST FIRST */

      const sortedLeads =
        response.data.sort(
          (a, b) => b.id - a.id
        );

      setLeads(sortedLeads);

    }

    catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchLeads();

  }, []);

  /* SAVE LEAD */

  const handleSaveLead = async () => {

    try {

      await axios.post(

        "http://localhost:8080/leads",

        {
          name,
          email,
          contact,
          pincode,
          leadType,
          remarks,

          status:
            "Work In Progress",

          /* IMPORTANT */

          workStatus:
            "Active"
        }
      );

      fetchLeads();

      setShowPopup(false);

      setName("");

      setEmail("");

      setContact("");

      setPincode("");

      setLeadType("Walk In");

      setRemarks("");

    }

    catch (error) {

      console.error(error);
    }
  };

  /* CHANGE STATUS */

  const handleStatusChange = async (
    leadId,
    newStatus
  ) => {

    try {

      await axios.put(

        `http://localhost:8080/leads/${leadId}/status`,

        {
          status: newStatus,

          workStatus:

            newStatus ===
            "Work In Progress"

              ? "Active"

              : null
        }
      );

      fetchLeads();

    }

    catch (error) {

      console.error(error);
    }
  };

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

      <div

        className=
        "d-flex justify-content-between align-items-center mb-5"
      >

        <div>

          <h1

            style={{
              fontWeight: "700",
              color: "#1e293b"
            }}
          >

            Qualified & Assigned

          </h1>

          <p className="text-muted">

            Manage all assigned leads
            and project discussions

          </p>

        </div>

        <button

          className="btn btn-primary"

          style={{
            borderRadius: "12px",
            padding: "12px 20px",
            fontWeight: "600",
            background: "#4f46e5",
            border: "none"
          }}

          onClick={() =>
            setShowPopup(true)
          }
        >

          + Create New Lead

        </button>

      </div>

      {/* TABLE */}

      <div

        className=
        "bg-white p-4 shadow-sm"

        style={{
          borderRadius: "20px",
          boxShadow:
            "0px 5px 20px rgba(0,0,0,0.05)"
        }}
      >

        <h4

          className="mb-4"

          style={{
            fontWeight: "700"
          }}
        >

          Leads Table

        </h4>

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-light">

              <tr>

                <th>Name</th>

                <th>
                  Lead No
                </th>

                <th>
                  Lead Assigned Date/Time
                </th>

                <th>
                  Current Status
                </th>

                <th>
                  Change Status
                </th>

                <th>
                  Remarks
                </th>

              </tr>

            </thead>

            <tbody>

              {
                leads.map((lead) => (

                  <tr key={lead.id}>

                    <td>

                      {lead.name}

                    </td>

                    <td>

                      {lead.id}

                    </td>

                    <td>

                      {
                        new Date(
                          lead.assignedDateTime
                        ).toLocaleString()
                      }

                    </td>

                    <td>

                      <span

                        className="badge"

                        style={{

                          backgroundColor:

                            lead.status ===
                              "Work In Progress"

                              ? "#16a34a"

                              :

                              lead.status ===
                                "Follow Up"

                                ? "#2563eb"

                                :

                                lead.status ===
                                  "Handover"

                                  ? "#7c3aed"

                                  :

                                  lead.status ===
                                    "Lost"

                                    ? "#dc2626"

                                    :

                                    "#ea580c"
                        }}
                      >

                        {lead.status}

                      </span>

                    </td>

                    <td>

                      <select

                        className=
                        "form-select"

                        value={
                          lead.status
                        }

                        onChange={(e) =>
                          handleStatusChange(
                            lead.id,
                            e.target.value
                          )
                        }
                      >

                        <option>

                          Lost

                        </option>

                        <option>

                          Follow Up

                        </option>

                        <option>

                          Non Contactable

                        </option>

                        <option>

                          Work In Progress

                        </option>

                        <option>

                          Handover

                        </option>

                      </select>

                    </td>

                    <td>

                      {lead.remarks}

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

      {/* POPUP */}

      {
        showPopup && (

          <div

            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor:
                "rgba(0,0,0,0.5)",

              display: "flex",

              justifyContent:
                "center",

              alignItems:
                "center",

              zIndex: 999
            }}
          >

            <div

              className=
              "bg-white p-5"

              style={{
                width: "700px",
                borderRadius: "25px"
              }}
            >

              <div

                className=
                "d-flex justify-content-between align-items-center mb-4"
              >

                <h3

                  style={{
                    fontWeight: "700"
                  }}
                >

                  Create New Lead

                </h3>

                <button

                  className=
                  "btn-close"

                  onClick={() =>
                    setShowPopup(false)
                  }
                >

                </button>

              </div>

              {/* FORM */}

              <div className="row g-4">

                <div className="col-md-6">

                  <label>

                    Name

                  </label>

                  <input

                    type="text"

                    className=
                    "form-control"

                    placeholder=
                    "Enter client name"

                    value={name}

                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-6">

                  <label>

                    Email

                  </label>

                  <input

                    type="email"

                    className=
                    "form-control"

                    placeholder=
                    "Enter email"

                    value={email}

                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-6">

                  <label>

                    Contact

                  </label>

                  <input

                    type="text"

                    className=
                    "form-control"

                    placeholder=
                    "Enter contact"

                    value={contact}

                    onChange={(e) =>
                      setContact(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-6">

                  <label>

                    Pincode

                  </label>

                  <input

                    type="text"

                    className=
                    "form-control"

                    placeholder=
                    "Enter pincode"

                    value={pincode}

                    onChange={(e) =>
                      setPincode(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-6">

                  <label>

                    Lead Type

                  </label>

                  <select

                    className=
                    "form-select"

                    value={leadType}

                    onChange={(e) =>
                      setLeadType(
                        e.target.value
                      )
                    }
                  >

                    <option>

                      Walk In

                    </option>

                    <option>

                      Referral

                    </option>

                  </select>

                </div>

                <div className="col-md-12">

                  <label>

                    Remarks

                  </label>

                  <textarea

                    className=
                    "form-control"

                    rows="3"

                    placeholder=
                    "Enter remarks"

                    value={remarks}

                    onChange={(e) =>
                      setRemarks(
                        e.target.value
                      )
                    }
                  >

                  </textarea>

                </div>

              </div>

              {/* BUTTONS */}

              <div

                className=
                "d-flex justify-content-end gap-3 mt-5"
              >

                <button

                  className=
                  "btn btn-light"

                  onClick={() =>
                    setShowPopup(false)
                  }
                >

                  Cancel

                </button>

                <button

                  className=
                  "btn btn-primary"

                  style={{
                    background: "#4f46e5",
                    border: "none"
                  }}

                  onClick={
                    handleSaveLead
                  }
                >

                  Save Lead

                </button>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default QualifiedAssignedPage;
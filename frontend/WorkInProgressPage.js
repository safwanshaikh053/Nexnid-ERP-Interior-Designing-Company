import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function WorkInProgressPage({ defaultTab }) {

  const navigate = useNavigate();

  const [leads, setLeads] =
    useState([]);

  const [activeTab] =
    useState(defaultTab);

  /* FETCH LEADS */

  const fetchLeads = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8080/leads"
        );

      const filteredLeads =
        response.data.filter(

          (lead) =>

            lead.status ===
            "Work In Progress"
        );

      const sortedLeads =
        filteredLeads.sort(

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

  return (

    <div

      style={{
        background:
          "linear-gradient(to right, #ecfeff, #f0fdfa)",

        minHeight: "100vh",

        padding: "40px"
      }}
    >

      {/* HEADER */}

      <div className="mb-5">

        <h1

          style={{
            fontWeight: "700",
            color: "#065f46"
          }}
        >

          Work In Progress Leads

        </h1>

      </div>

      {/* TABLE */}

      <div

        className="bg-white p-4 shadow-sm"

        style={{
          borderRadius: "20px"
        }}
      >

        <table className="table table-hover align-middle">

          <thead className="table-light">

            <tr>

              <th>Name</th>

              <th>Lead No</th>

              <th>Date/Time</th>

              <th>Work Status</th>

              <th>Change Status</th>

              <th>Remarks</th>

            </tr>

          </thead>

          <tbody>

            {

              leads

              .filter(

                (lead) =>

                  (lead.workStatus || "Active")
                  === activeTab
              )

              .map((lead) => (

                <tr

                  key={lead.id}

                  style={{
                    cursor: "pointer"
                  }}

                  onClick={() =>
                    navigate(`/project/${lead.id}`)
                  }
                >

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

                  {/* STATUS */}

                  <td>

                    <span

                      className={

                        activeTab === "Active"

                          ? "badge bg-success"

                          : activeTab === "Cancelled"

                          ? "badge bg-danger"

                          : activeTab === "On Hold"

                          ? "badge bg-warning text-dark"

                          : "badge bg-primary"
                      }
                    >

                      {
                        lead.workStatus
                        || "Active"
                      }

                    </span>

                  </td>

                  {/* CHANGE STATUS */}

                  <td>

                    <select

                      className="form-select"

                      value={
                        lead.workStatus
                        || "Active"
                      }

                      onClick={(e) =>
                        e.stopPropagation()
                      }

                      onChange={async (e) => {

                        try {

                          await axios.put(

                            `http://localhost:8080/leads/${lead.id}/status`,

                            {
                              status:
                                "Work In Progress",

                              workStatus:
                                e.target.value
                            }
                          );

                          fetchLeads();

                        }

                        catch (error) {

                          console.error(error);
                        }
                      }}
                    >

                      <option value="Active">

                        Active

                      </option>

                      <option value="Cancelled">

                        Cancelled

                      </option>

                      <option value="On Hold">

                        On Hold

                      </option>

                      <option value="Complete">

                        Complete

                      </option>

                    </select>

                  </td>

                  {/* REMARKS */}

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
  );
}

export default WorkInProgressPage;
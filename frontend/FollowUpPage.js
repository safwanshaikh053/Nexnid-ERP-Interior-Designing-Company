import React, {
    useState,
    useEffect
} from "react";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

function FollowUpPage() {

    const [leads, setLeads] =
        useState([]);

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
                        "Follow Up"
                );

            /* SORT NEWEST FIRST */

            const sortedLeads =
                filteredLeads.sort(

                    (a, b) => b.id - a.id
                );

            setLeads(sortedLeads);

        }

        catch(error) {

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

                    Follow Up Leads

                </h1>

                <p className="text-muted">

                    Leads requiring follow up

                </p>

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

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead className="table-light">

                            <tr>

                                <th>Name</th>

                                <th>Lead No</th>

                                <th>
                                    Lead Assigned Date/Time
                                </th>

                                <th>
                                    Current Status
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

                                                className=
                                                "badge bg-primary"
                                            >

                                                {
                                                    lead.status
                                                }

                                            </span>

                                        </td>

                                        <td>

                                            {
                                                lead.remarks
                                            }

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default FollowUpPage;
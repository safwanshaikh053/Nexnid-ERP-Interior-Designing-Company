import React, {
    useState,
    useEffect
} from "react";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

function LostPage() {

    const [leads, setLeads] =
        useState([]);

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
                        "Lost"
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
                    "linear-gradient(to right, #fef2f2, #fff1f2)",

                minHeight: "100vh",

                padding: "40px"
            }}
        >

            {/* HEADER */}

            <div className="mb-5">

                <h1
                    style={{
                        fontWeight: "700",
                        color: "#991b1b"
                    }}
                >

                    Lost Leads

                </h1>

            </div>

            {/* TABLE */}

            <div
                className="bg-white p-4 shadow-sm"

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

                                <th>Date/Time</th>

                                <th>Status</th>

                                <th>Remarks</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                leads.map((lead) => (

                                    <tr key={lead.id}>

                                        <td>{lead.name}</td>

                                        <td>{lead.id}</td>

                                        <td>

                                            {
                                                new Date(
                                                    lead.assignedDateTime
                                                ).toLocaleString()
                                            }

                                        </td>

                                        <td>

                                            <span className="badge bg-danger">

                                                {lead.status}

                                            </span>

                                        </td>

                                        <td>{lead.remarks}</td>

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

export default LostPage;
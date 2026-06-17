import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";

import interactionPlugin from "@fullcalendar/interaction";

function ProjectDetailsPage() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  const [meetingUnlocked, setMeetingUnlocked] = useState(false);
  /* STATES */

  const [showModal, setShowModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");

  const [note, setNote] = useState("");

  const [reminders, setReminders] = useState([]);

  const [activeModule, setActiveModule] = useState("Calendar");

  /* MODULES */

  const modules =

  meetingUnlocked

    ? [

        "Calendar",

        "Overview",

        "Basic Info",

        "BOQ",

        "Custom Element",

        "Proposals",

        "Payment",

        "PPT",

        "File",

        "Hand Over / Feasibility"
      ]

    : [

        "Calendar"
      ];

  /* DATE CLICK */

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);

    setShowModal(true);
  };

  /* SAVE REMINDER */
const saveReminder = async () => {

    if (!note.trim()) return;

    const newReminder = {

        title: note,

        date: selectedDate
    };

    setReminders([
        ...reminders,
        newReminder
    ]);

    try {

        if (!meetingUnlocked) {

            await axios.put(

                `http://localhost:8080/leads/${id}/schedule-meeting`
            );

            setMeetingUnlocked(true);

            fetchLead();
        }

    } catch (error) {

        console.error(error);
    }

    setNote("");

    setShowModal(false);
};
 

   
useEffect(() => {

  fetchLead();

}, [id]);

const fetchLead = async () => {

  try {

    const response =
      await axios.get(
        `http://localhost:8080/leads/${id}`
      );

    setLead(response.data);

    setMeetingUnlocked(
      response.data.meetingScheduled
    );

  } catch (error) {

    console.error(error);
  }
};
  return (
    <div
      style={{
        background: "linear-gradient(to right, #eef2ff, #f8fafc)",

        minHeight: "100vh",

        padding: "30px",
      }}
    >
      <div className="row g-4">
        {/* SIDEBAR */}

        <div className="col-md-3">
          <div
            className="bg-white p-4"
            style={{
              borderRadius: "25px",

              boxShadow: "0px 5px 20px rgba(0,0,0,0.05)",
            }}
          >
            {/* HEADER */}

            <div className="mb-4">
              <h3
                style={{
                  fontWeight: "700",
                  color: "#1e293b",
                }}
              >
                Project Modules
              </h3>

              <p className="text-muted mb-0">Lead ID : {id}</p>
            </div>

            {/* MODULE BUTTONS */}

            <div className="d-flex flex-column gap-3">
              {modules.map((module, index) => (
                <button
                  key={index}
                  className="btn"
                  onClick={() => setActiveModule(module)}
                  style={{
                    textAlign: "left",

                    padding: "15px 18px",

                    borderRadius: "16px",

                    fontWeight: "600",

                    fontSize: "15px",

                    background: activeModule === module ? "#4f46e5" : "#f8fafc",

                    color: activeModule === module ? "white" : "#334155",

                    border:
                      activeModule === module ? "none" : "1px solid #e2e8f0",

                    transition: "0.3s ease",
                  }}
                >
                  {module}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className="col-md-9">
          <div
            className="bg-white p-4"
            style={{
              borderRadius: "25px",

              minHeight: "85vh",

              boxShadow: "0px 5px 20px rgba(0,0,0,0.05)",
            }}
          >
            {/* HEADER */}

            <div className="mb-4">
              <h2
                style={{
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                {activeModule}
              </h2>

              <p className="text-muted">
                Manage project related information and workflow
              </p>
            </div>

            <hr />

            {/* CALENDAR */}

            {activeModule === "Calendar" ? (
              <div className="mt-4">
                {!meetingUnlocked && (

  <div
    className="alert alert-warning mb-4"
  >

    Please schedule the first client meeting
    to unlock the project workspace.

  </div>
)}
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  height="auto"
                  dateClick={handleDateClick}
                  events={reminders}
                  headerToolbar={{
                    left: "prev,next today",

                    center: "title",

                    right: "",
                  }}
                  dayCellClassNames={(arg) => {
                    const today = new Date();

                    if (arg.date.toDateString() === today.toDateString()) {
                      return ["today-highlight"];
                    }

                    return [];
                  }}
                />

                {/* REMINDER LIST */}

                <div className="mt-5">
                  <h4
                    style={{
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    Reminders
                  </h4>

                  <div className="mt-4">
                    {reminders.length === 0 ? (
                      <p className="text-muted">No reminders added.</p>
                    ) : (
                      reminders.map((item, index) => (
                        <div
                          key={index}
                          className="bg-light p-3 mb-3"
                          style={{
                            borderRadius: "15px",
                          }}
                        >
                          <h6
                            style={{
                              fontWeight: "700",
                            }}
                          >
                            {item.date}
                          </h6>

                          <p className="mb-0">{item.title}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* OTHER MODULES */

              <div className="mt-5">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    minHeight: "50vh",
                  }}
                >
                  <h5 className="text-muted">
                    {activeModule} content will appear here.
                  </h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* REMINDER MODAL */}

      {showModal && (
        <div
          style={{
            position: "fixed",

            top: 0,

            left: 0,

            width: "100%",

            height: "100%",

            background: "rgba(0,0,0,0.5)",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            zIndex: 999,
          }}
        >
          <div
            className="bg-white p-5"
            style={{
              width: "500px",

              borderRadius: "25px",
            }}
          >
            <h3
              style={{
                fontWeight: "700",
              }}
            >
              Add Reminder
            </h3>

            <p className="text-muted">{selectedDate}</p>

            <textarea
              className="form-control mt-4"
              rows="5"
              placeholder="Write reminder note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>

            <div className="d-flex justify-content-end gap-3 mt-4">
              <button
                className="btn btn-light"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                style={{
                  background: "#4f46e5",
                  border: "none",
                }}
                onClick={saveReminder}
              >
                Save Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM FULLCALENDAR STYLING */}

      <style>
        {`

          .today-highlight {

            background: #eef2ff !important;
          }

          .fc .fc-daygrid-day.fc-day-today {

            background-color: #c3cef5 !important;
          }

          .fc .fc-daygrid-day-number {

            font-weight: 600;

            color: #6e798a;
          }

          .fc .fc-toolbar-title {

            font-size: 28px;

            font-weight: 700;

            color: #374864;
          }

          .fc .fc-button {

            background: #4f46e5 !important;

            border: none !important;

            box-shadow: none !important;

            padding: 8px 16px !important;

            border-radius: 10px !important;
          }

          .fc .fc-button:hover {

            background: #4338ca !important;
          }

          .fc-theme-standard td,
          .fc-theme-standard th {

            border-color: #717f91;
          }

          .fc .fc-daygrid-day-frame {

            min-height: 110px;
          }

          .fc .fc-col-header-cell-cushion {

            color: #595a58;

            font-weight: 700;

            text-decoration: none;
          }

          .fc .fc-daygrid-event {

            border: none;

            background: #4f46e5;

            padding: 3px 6px;

            border-radius: 6px;

            font-size: 12px;
          }

          .fc .fc-scrollgrid {

            border-radius: 16px;

            overflow: hidden;
          }

        `}
      </style>
    </div>
  );
}

export default ProjectDetailsPage;

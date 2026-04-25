import React, { useEffect, useState } from "react";
import ComplaintCard from "../components/ComplaintCard.jsx";
import Cameracapture from "../userpages/Cameracapture.jsx";
import "./manager.css";

const Updatestatus = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const managerId = localStorage.getItem("userId");

    useEffect(() => {
        if (managerId) {
            fetchComplaints();
        }
    }, [managerId]);

    const fetchComplaints = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `http://localhost:8011/getcomplaint/${managerId}`
            );

            const data = await res.json();

            if (data.status) {
                const cleanedData = data.response.map((c) => ({
                    ...c,
                    proof: c.proof && c.proof.startsWith("data:image")
                        ? c.proof
                        : "https://dummyimage.com/300x200/ccc/000&text=No+Image",
                    createdAt: c.createdAt || new Date(),
                    status: c.status || "Pending",
                    location: c.location || "No Location",
                    title: c.title || "No Title"
                }));

                setComplaints(cleanedData);
            } else {
                setComplaints([]);
            }

        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };


    const handleStatusChange = (id, newStatus) => {
        if (newStatus === "Solved") {
            setSelectedId(id); // open camera
        } else {
            updateStatus(id, newStatus, null);
        }
    };


    const updateStatus = async (id, status, image) => {
        try {
            const res = await fetch(
                `http://localhost:8011/managerupdate/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: status,
                        completedProof: image
                    })
                }
            );

            const data = await res.json();

            if (data) {
                setComplaints((prev) =>
                    prev.map((c) =>
                        c._id === id
                            ? { ...c, status: status, completedProof: image }
                            : c
                    )
                );
            }

            // reset
            setSelectedId(null);
            setCapturedImage(null);

        } catch (err) {
            console.error("Update Error:", err);
        }
    };

    return (
        <div className="manager-container">
            <h2>Assigned Complaints</h2>

            {loading ? (
                <p>Loading...</p>
            ) : complaints.length === 0 ? (
                <p>No complaints assigned</p>
            ) : (
                <div className="card-grid">
                    {complaints.map((c) => (
                        <ComplaintCard
                            key={c._id}
                            image={c.proof}
                            title={c.title}
                            status={c.status}
                            location={c.location}
                            date={new Date(c.createdAt)}

                            actions={
                                <>
                                    {/* DROPDOWN */}
                                    <select
                                        value={c.status}
                                        disabled={c.status === "Solved"}
                                        onChange={(e) =>
                                            handleStatusChange(c._id, e.target.value)
                                        }
                                    >
                                        <option value="">Update Status</option>
                                        <option value="InProgress">In Progress</option>
                                        <option value="Solved">Solved</option>
                                    </select>

                                    {/*  SHOW PROOF IMAGE */}
                                    {c.completedProof && (
                                        <div style={{ marginTop: "-25px", textAlign: "center" }}>
                                            <p style={{ fontSize: "12px", marginBottom: "4px" }}>
                                                <b>Proof</b>
                                            </p>

                                            <img
                                                src={c.completedProof}
                                                alt="proof"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    objectFit: "cover",
                                                    borderRadius: "6px",
                                                    border: "1px solid #ccc"
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* CAMERA */}
                                    {selectedId === c._id && (
                                        <div style={{ marginTop: "10px" }}>
                                            <Cameracapture setImage={setCapturedImage} />

                                            {capturedImage && (
                                                <>
                                                    <img
                                                        src={capturedImage}
                                                        alt="preview"
                                                        style={{ width: "50px", height: "50px" }}
                                                    />
                                                    <br />
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(c._id, "Solved", capturedImage)
                                                        }
                                                    >
                                                        Submit Proof
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </>
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Updatestatus;
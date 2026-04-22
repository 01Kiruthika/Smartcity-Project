import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import "./complaintCard.css";

const ComplaintCard = ({
    image,
    title,
    status,
    location,
    date,
    actions
}) => {

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "red";
            case "InProgress": return "orange";
            case "Solved": return "green";
            default: return "gray";
        }
    };

    return (
        <div className="complcard">

            <img
                src={image || "https://via.placeholder.com/150"}
                alt={title}
                className="card-img"
            />

            <div className="compl-body">

                <h4 className="title">{title}</h4>
                <p className="location"><FaMapMarkerAlt className="icon" />{location}</p>
                <p className="date"> <FaCalendarAlt className="icon" />
                    {new Date(date).toLocaleDateString()}
                </p>

                <span
                    className="status"
                    style={{ backgroundColor: getStatusColor(status) }}
                >
                    {status}
                </span>

                {/* ✅ SHOW ONLY IF PASSED */}
                {actions && (
                    <div className="action-container">
                        {actions}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ComplaintCard;
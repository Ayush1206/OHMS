import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

// Define the color palette based on your theme
const COLORS = {
  porcelain: "#f0f1f2",
  william: "#3b5b6a",
};

// Interface for the request
interface Request {
  id: number;
  itemName: string;
  quantity: string;
  requested_by: string;
}

// SuppliesRequests Component
const SuppliesRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  // Fetch requests from JSON (API)
  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const response = await axios.get("/api/supplies-request");
      console.log("below is data");
      
      console.log(response);
      
      setRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }

  // Handle Approve/Reject actions
  const handleApprove = async (id: number) => {
    try {
      console.log(`Request ${id} approved`);
      
      // Send a POST request to update the status of the request
      const response = await axios.put("/api/supplies-request", {
        id: id,
        status: "Approved"
      });
      
      if (response.status === 200) {
        console.log(`Request ${id} has been approved successfully.`);
      } else {
        console.error(`Failed to approve request ${id}.`);
      }
    } catch (error) {
      console.error("Error approving the request:", error);
    }
  };
  

  const handleReject = async (id: number) => {
    console.log(`Request ${id} rejected`);
    try {
        console.log(`Request ${id} approved`);
        
        // Send a POST request to update the status of the request
        const response = await axios.put("/api/supplies-request", {
          id: id,
          status: "Rejected"
        });
        
        if (response.status === 200) {
          console.log(`Request ${id} has been rejected successfully.`);

          fetchRequests();
        } else {
          console.error(`Failed to Reject request ${id}.`);
        }
      } catch (error) {
        console.error("Error rejecting the request:", error);
      }
  };

  return (
    <div
      className="overflow-y-auto"
      style={{
        maxHeight: "400px", // Fixed height for the notification area
        backgroundColor: COLORS.porcelain,
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.william }}>
        Supply Requests
      </h2>
      {requests.map((request) => (
        <div
          key={request.id}
          className="bg-white shadow-md rounded-lg p-4 mb-4"
        >
          <h3 className="text-lg font-bold mb-2 text-william">
            Request for: {request.itemName}
          </h3>
          <p className="text-sm mb-2">Quantity: {request.quantity}</p>
          <p className="text-sm mb-4">Requested by: {request.requested_by}</p>
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              onClick={() => handleApprove(request.id)}
            >
              <FaCheck className="mr-2" /> Approve
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
              onClick={() => handleReject(request.id)}
            >
              <FaTimes className="mr-2" /> Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuppliesRequests;

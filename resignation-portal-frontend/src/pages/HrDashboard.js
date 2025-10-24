import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";

export default function HrDashboard() {
  const [resignations, setResignations] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3001/api/resignations");
    setResignations(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleApprove = async (id) => {
    await axios.post(`http://localhost:3001/api/resignations/${id}/approve`);
    fetchData();
  };

  const handleReject = async (id) => {
    await axios.post(`http://localhost:3001/api/resignations/${id}/reject`);
    fetchData();
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>HR Dashboard</Typography>
      {resignations.map((r) => (
        <Card key={r._id} style={{ marginTop: 10 }}>
          <CardContent>
            <Typography><b>{r.employeeName}</b> — {r.reason}</Typography>
            <Typography>Status: {r.status}</Typography>
            <Button onClick={() => handleApprove(r._id)}>Approve</Button>
            <Button onClick={() => handleReject(r._id)}>Reject</Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

export default function EmployeeDashboard() {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>Employee Dashboard</Typography>
      <Button component={Link} to="/resignation/submit" variant="contained">Submit Resignation</Button>
    </Container>
  );
}

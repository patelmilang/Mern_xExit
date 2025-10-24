import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

export default function SubmitResignation() {
  const [form, setForm] = useState({ reason: "", lastWorkingDay: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/resignations", form);
    alert("Resignation submitted successfully!");
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Submit Resignation</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Reason" name="reason" fullWidth margin="normal" value={form.reason} onChange={handleChange} />
        <TextField label="Last Working Day" name="lastWorkingDay" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={form.lastWorkingDay} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
}

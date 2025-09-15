import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";
import Button from "@mui/material/Button";

// Define Student type based on backend response
interface Student {
  id: number;
  name: string;
  address: string;
}

const Students: React.FC = () => {
  const [name, setName] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [students, setStudents] = React.useState<Student[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);

    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then(() => {
        console.log("New Student Added");
        return fetch("http://localhost:8080/student/getAll");
      })
      .then((res) => res.json())
      .then((result: Student[]) => {
        setStudents(result);
        setName("");
        setAddress("");
      })
      .catch((err) => console.error("Error:", err));
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result: Student[]) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2 }}>
        <h1>Add Student</h1>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <h1>Students</h1>
        <Box>
          {students.map((student) => (
            <Paper
              elevation={6}
              style={{
                margin: "10px",
                padding: "15px",
                textAlign: "left",
              }}
              key={student.id}
            >
              Id: {student.id}
              <br />
              Name: {student.name}
              <br />
              Address: {student.address}
            </Paper>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default Students;

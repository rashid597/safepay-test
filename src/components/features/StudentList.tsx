import { useState } from "react";
import { useGetStudentQuery, useDeleteStudentMutation } from "../../redux_files/api-slice";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import { IconButton } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';

import StudentUpdateFormDialog from "./StudentUpdateFormDialog";

interface Student {
  uuid: number;
  class: number;
  name: string;
  sex: string;
  age: number;
  siblings: number;
  gpa: number;
}

type SortBy = "name" | "class" | "age" | "siblings" | "gpa";

interface StudentListProps {}

const StudentList: React.FC<StudentListProps> = () => {


  // refetching after deleting from database
  const { refetch: getStudents } = useGetStudentQuery();

  //////////////////////////////////////////////////////
  // component state
  const [dialogOpen, setDialogOpen] = useState(false);

  // handle dialog open
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  // handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
    getStudents();
  };

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  /////////////////////////////////////

  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("name");

  const { data, isLoading, isError } = useGetStudentQuery();

  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();

  let filteredData = data;

  if (filterText !== "") {
    filteredData = data?.filter((student) =>
      student.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  
  let sortedData:Student[] = [];
  
  
  if(filteredData)
  {sortedData = [...filteredData].sort((a: Student, b: Student) => {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    return 0;
  });}

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching students.</div>;
  }


  

  return (
    <>
      <TextField
        fullWidth
        label="Filter by name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <TextField
        fullWidth
        label="Sort by"
        select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortBy)}
        SelectProps={{
          native: true,
        }}
      >
        <option value="name">Name</option>
        <option value="class">Class</option>
        <option value="age">Age</option>
        <option value="siblings">Number of siblings</option>
        <option value="gpa">GPA</option>
      </TextField>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UUID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Number of Siblings</TableCell>
              <TableCell>GPA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData?.map((student: Student, index) => (
              <TableRow key={student.uuid}>
                <TableCell>{student.uuid}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.sex}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.siblings}</TableCell>
                <TableCell>{student.gpa}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={()=> deleteStudent(student.uuid)
                    .then(()=> getStudents())
                  }>
                    <DeleteOutlined />
                  </IconButton>
                  <IconButton 
                  onClick={()=> 
                  {
                    setSelectedStudent(student);
                    handleDialogOpen();
                  }}>
                    <EditOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {dialogOpen && (
          <StudentUpdateFormDialog
            open={dialogOpen}
            onClose={handleDialogClose} initialValues={selectedStudent}
          />
      )}
    </>
  );
};

export default StudentList;

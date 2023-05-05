import React, { ChangeEvent, FC, useState, forwardRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { useUpdateStudentMutation } from '../../redux_files/api-slice';
import { QueryDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

interface StudentUpdate {
  uuid: number;
  class: number;
  name: string;
  sex: string;
  age: number;
  siblings: number;
  gpa: number;
}



interface StudentUpdateFormDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues: StudentUpdate |null;
}





const StudentUpdateFormDialog: FC<StudentUpdateFormDialogProps> = ({ open, onClose, initialValues }) => {


  // 
  const [updateStudent, { isLoading, isError }] = useUpdateStudentMutation();

  // form state
  const [formState, setFormState] = useState<StudentUpdate>({
    uuid: initialValues?.uuid || 0,
    class: initialValues?.class || 0,
    name: initialValues?.name || '',
    sex: initialValues?.sex || 'male',
    age: initialValues?.age || 0,
    siblings: initialValues?.siblings || 0,
    gpa: initialValues?.gpa || 0
  });

  // handle form input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  

  // handle form submission
  const handleSubmit = () => {
    // TODO: handle form submission
    updateStudent(formState).unwrap()
    .then(()=> onClose())
    
    
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <TextField label="UUID" name="uuid" value={formState.uuid} onChange={handleInputChange} disabled fullWidth />
        <TextField label="Class" name="class" value={formState.class} onChange={handleInputChange} type="number" fullWidth />
        <TextField label="Name" name="name" value={formState.name} onChange={handleInputChange} fullWidth />
        <TextField select label="Sex" name="sex" value={formState.sex} onChange={handleInputChange} fullWidth>
          <option style={{cursor:'pointer'}} value="male">Male</option>
          <option style={{cursor:'pointer'}} value="female">Female</option>
        </TextField>
        <TextField label="Age" name="age" value={formState.age} onChange={handleInputChange} type="number" fullWidth />
        <TextField label="Siblings" name="siblings" value={formState.siblings} onChange={handleInputChange} type="number" fullWidth />
        <TextField label="GPA" name="gpa" value={formState.gpa} onChange={handleInputChange} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentUpdateFormDialog;

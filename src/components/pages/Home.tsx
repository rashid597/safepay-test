import { useGetStudentQuery, useCreateStudentMutation } from '../../redux_files/api-slice';
import { useDispatch } from 'react-redux';
import { getStudent } from '../../redux_files/api-slice';

import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import StudentList from '../features/StudentList';
import { classicNameResolver } from 'typescript';


interface HomeProps{
  className: string
}

interface StudentInput {
  "class": number;
  "name": string;
  "sex": 'male' | 'female';
  "age": number;
  "siblings": number;
  "gpa": number;
}

const useStyles = makeStyles({
  marginLeft: {
    marginLeft:10,
  },
  marginTopBot:{
    marginTop:15,
    marginBottom:15,
  }
})



const Home = ({className }: HomeProps) =>{

  const classes = useStyles();

  const [formData, setFormData] = useState<StudentInput>({
    "class": 0,
    "name": '',
    "sex": 'male',
    "age": 0,
    "siblings": 0,
    "gpa": 0,
  });

  const [createStudent, { isLoading, error }] = useCreateStudentMutation();


  const dispatch = useDispatch();

  const { refetch: getStudents } = useGetStudentQuery();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle submitting the form data, such as saving it to a database
    console.log(formData);
    createStudent(formData)
    .unwrap()
    .then(() => {
      getStudents();
      
    }).then(()=>{
      setFormData({
        "class": 0,
        "name": '',
        "sex": 'male',
        "age": 0,
        "siblings": 0,
        "gpa": 0,
      });
    });

  };


  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    
  };
  
  return(
    <div>
       <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Grid container>

          <Grid item xs={4}>
            <TextField
                className=''
                label='Name'
                variant='outlined'
                color='primary'
                name='name'
                value={formData.name}
                onChange={handleInputChanges}
                fullWidth
                
              />
          </Grid>

          <Grid item xs={4}>
            <TextField
              className={classes.marginLeft}
              label='Class'
              variant='outlined'
              color='primary'
              name='class'
              value={formData.class || ''}
              onChange={handleInputChanges}
              fullWidth
            />
          </Grid>
            {/* select */}
            <Grid item xs={12}>
              <RadioGroup name='sex' value={formData.sex} onChange={handleInputChanges} >
                <FormControlLabel control={<Radio color='primary' />} label='Male' value='male' />
                <FormControlLabel control={<Radio color='primary' />} label='Female' value='female' />
              </RadioGroup>
            </Grid>

            <Grid item xs={4}>
              <TextField
                className=''
                label='Age'
                variant='outlined'
                color='primary'
                name='age'
                value={formData.age || ''}
                onChange={handleInputChanges}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className=''
                label='Siblings'
                variant='outlined'
                color='primary'
                name='siblings'
                value={formData.siblings || ''}
                onChange={handleInputChanges}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className=''
                label='GPA'
                variant='outlined'
                color='primary'
                name='gpa'
                value={formData.gpa || ''}
                type='number'
                onChange={handleInputChanges}
                inputProps={{ step: 0.1 }}
              />
            </Grid>

            <Button
              type='submit'
              color='primary'
              variant='contained'
              className={classes.marginTopBot}
            >
              Create Student
            </Button>

        </Grid>

      </form>
        <StudentList />

    </div>
  )
}

export default Home;
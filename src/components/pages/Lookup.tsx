import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";

import GridCard from '../features/GridCard';

import { useGetStudentQuery } from "../../redux_files/api-slice";
import { useAppDispatch, useAppSelector } from "../../redux_files/hooks";
import { setUid } from "../../redux_files/uuid-slice";
import { useDispatch } from "react-redux";
import { setuid } from "process";

interface LookupProps{
  className: string
}

const useStyles = makeStyles({
 
})

const Lookup = ( {className}: LookupProps) =>
{

  const uid = useAppSelector((state)=> state.uuid.value);
  const dispatch = useAppDispatch();

  console.log(uid);
  

  const { data, isFetching, isError}  = useGetStudentQuery();
  
  // const filteredData = uid > 0 ? data.filter((item) => item.uuid === uid) : data;

  return (
    <Container>

      <TextField
      variant='outlined'
      label='Enter UUID'
      fullWidth
      value={uid}
      onChange={(e)=> {
        const value = parseInt(e.target.value);
        if(!isNaN(value))
        {
          dispatch(setUid(value));
        }
      }}
      />
      
      <Grid container spacing={3}>
        {isError ? <Typography>Something Went Wrong</Typography> : data === undefined ? '' :
        uid > 0 ?
        data.filter(item=> item.uuid === uid).map(i => {
          return(
            <Grid item key={i.uuid} xs={12} md={6} lg={4}> 
              <GridCard student={i} />
            </Grid>
          )
        }) :
        data.map(item =>{
          return(
            <Grid item key={item.uuid} xs={12} md={6} lg={4}> 
              <GridCard student={item} />
            </Grid>
          )
        })}
      </Grid>

    </Container>
  )
}

export default Lookup;
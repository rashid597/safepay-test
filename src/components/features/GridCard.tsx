import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { IconButton, Typography } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';

import { useDeleteStudentMutation } from '../../redux_files/api-slice';

interface Student {
  uuid: number;
  class: number;
  name: string;
  sex: string;
  age: number;
  siblings: number;
  gpa: number;
}

interface GridCardProps{
  student: Student;
}

const GridCard = ({student}: GridCardProps) =>
{

  

  return(
    <Container>
      <Card elevation={2}>
        <CardHeader
          title={`${student.uuid}. ${student.name}`}
          subheader={student.sex[0].toUpperCase()+student.sex.slice(1).toLowerCase()}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={6} sm={6}>
              <Typography>
              {`Class: ${student.class}`}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography>
              {`Age: ${student.age}`}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography>
              {`Siblings: ${student.siblings}`}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography>
              {`GPA: ${student.gpa}`}
              </Typography>
            </Grid>
          </Grid>
          
          
        </CardContent>        
        
      </Card>
    </Container>
  )
}

export default GridCard;
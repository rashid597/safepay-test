import { ReactNode } from "react";

import { makeStyles, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { HomeOutlined, SearchOutlined } from "@material-ui/icons";
import Container from "@material-ui/core/Container";

import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps{
  children:ReactNode;
}

const useStyles = makeStyles({
  
  drawer:{
    width: 250,
  },
  drawerPaper:{
    width:250
  },
  root:{
    display:'flex',
  },
  active:{
    background: '#ebf6ff',
  }
})

const Layout = ({children}: LayoutProps) =>
{
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Home',
      icon: <HomeOutlined color="primary" />,
      path: '/'
    },
    {
      text: 'Lookup',
      icon: <SearchOutlined color="primary" />,
      path: '/lookup'
    },
  ]


  

  return(
    <div style={{display:'flex'}}>

      <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor="left"
        classes={{paper: classes.drawerPaper}}
      >
        

        <List>
          {menuItems.map(item=>(
            <ListItem
              button
              key={item.text}
              onClick={()=> navigate(item.path)}
              className={location.pathname == item.path ? classes.active : ''}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

      </Drawer>

      <Container>
        <div>
          {children}
        </div>
      </Container>
    </div>
  )
}

export default Layout;
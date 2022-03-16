import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import './Components.css';
import {Link} from "react-router-dom";
import CVs from '../img/CVs';
import Users from '../img/Users';
import Projects from '../img/Projects';
import Education from '../img/Education';
import Technologies from '../img/Technologies';
import WorkExp from '../img/WorkExp'


const drawerWidth = 240; // 11%

const mainLinks = [
  { name: 'CVs', link: '/CVs', code: '1', icon: (x: string, y: string) => <CVs isActive={x === y}/> },
  { name: 'Users', link: '/Users', code: '2', icon: (x: string, y: string) => <Users isActive={x === y}/>},
  { name: 'Projects', link: '/Projects', code: '3', icon: (x: string, y: string) => <Projects isActive={x === y}/> },
]

const otherLinks = [
  { name: 'Education', link: '/Education', code: '4', icon: (x: string, y: string) => <Education isActive={x === y}/> },
  { name: 'Technologies', link: '/Technologies', code: '5', icon: (x: string, y: string) => <Technologies isActive={x === y}/> },
  { name: 'Work Experience', link: '/WorkExperience', code: '6', icon: (x: string, y: string) => <WorkExp isActive={x === y}/> },
]

export default function PermanentDrawerLeft() {
  const [selectedIndex, setSelectedIndex] = React.useState<string>('1');

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    code: string,
  ) => {
    setSelectedIndex(code);
  };

  const VerticalDivider = () => (
    <Divider
      orientation="vertical"
      variant="middle"
      flexItem
    />
  );

  const CustomLink = (name: string, link: string, code: string, icon: (x: string, y: string) => JSX.Element) => {
    return (
      <ListItem button
                selected={selectedIndex === code}
                onClick={(event) => handleListItemClick(event, code)}>
        <Link to={link} className='link'>
        <ListItemIcon sx={{paddingRight: '12.25px', width: '13,5px'}}>
          {icon(selectedIndex, code)}
        </ListItemIcon>
        <ListItemText primary={name} />
        {selectedIndex === code && <VerticalDivider />}
        </Link>
      </ListItem>
    )
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '215px',
            boxSizing: 'border-box',
            backgroundColor:'#303439',
            pt: '35px',
            margin: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img width = '80px' src={require ('../img/LeviCV.svg').default} alt="logo" style={{marginBottom: '35px', paddingLeft: '30px',}} />
        <Divider variant="inset"/>
        <Typography variant = 'body2' sx={{marginTop: '45px', paddingLeft: '30px', marginBottom: '19px'}}>MAIN</Typography>
        <List>
          {
            mainLinks.map((x, i) => CustomLink(x.name, x.link, x.code, x.icon))
          }
          <Divider variant="inset" sx={{mt: '24.5px'}}/>
          <Typography variant = 'body2'  sx={{mb: '19px', mt: '45px', paddingLeft: '30px',}}>OTHER</Typography>
          {
            otherLinks.map((x, i) => CustomLink(x.name, x.link, x.code, x.icon))
          }
        </List>
      </Drawer>
    </Box>
  );
}

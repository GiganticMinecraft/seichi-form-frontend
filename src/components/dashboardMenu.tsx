'use client';

import { styled } from '@material-ui/core';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function DashboardMenu() {
  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Menu
      </Typography>
      <Demo>
        <List>
          {['Dashboard', 'Forms', 'Announcements'].map((value) => {
            return (
              <ListItem key={value}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={value} />
              </ListItem>
            );
          })}
        </List>
      </Demo>
    </Grid>
  );
}

import { Box, Grid, Paper, styled } from '@mui/material';
import React from 'react';
import piggy from '../../images/piggy.jpg';

export default function LoginAd() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  return (
    <>


<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
            <Item>
        <div className='finance'>
      <img className="piggy" src={piggy} alt="laughs" />
      </div>
      </Item>
        </Grid>
       
        <Grid item xs={8}>
        <Item>
        <div className="advertising">
        <div className="sentences">
          <div id="choose">&#160;Choose what is</div>
          <div className="flexwords">
            <div id="best" className="advcolor">
              <u>BEST</u>
            </div>
            <div id="you">for YOU!</div>
          </div>
       
      

      <div id="banking" className="advcolor">
        <u>Good Banking</u></div>

      <div id="have">has what's </div>

      <div className="flexwords">
        <div id="good" className="advcolor">
          <u>GOOD</u>
        </div>
        <div id="for">for YOU.</div>
      </div>
      </div>
      </div>
      </Item>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

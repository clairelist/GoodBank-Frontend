import { Box, Grid, Paper, styled } from '@mui/material';
import React from 'react';
import piggy from '../../images/piggy.jpg';

export default function LoginAd() {

  return (
    <>


<Box sx={{ flexGrow: 1,
  border: 'none' }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
        <div className='finance'>
      <img className="piggy" src={piggy} alt="laughs" />
      </div>
        </Grid>
       
        <Grid item xs={8}>
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
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

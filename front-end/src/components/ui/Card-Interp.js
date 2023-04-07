import React from 'react'; 
import interp from '../../assets/img/static/interpolate.PNG'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CardInterp = () => {


return (
<Card className='card-card' sx={{ maxWidth: 800 }}>
<CardMedia
  component="img"
  alt="Interpolated Data"
  height="500"
  image={interp}
  className='card-img img-fluid'
/>
<CardContent>
<Typography gutterBottom variant="h4" component="div">
    Data Prediction
  <p>
    Interpolation
  </p>
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
    Interpolation is a statistical method that is used to predict values between a start point and an end point. It almost tries to find a line of best fit, but seeks to fill in the gaps along the way. The intention with this method is to see how well it performs with outliers present, and how well it performs without these present. 
  </Typography>
</CardContent>
<CardActions>
  <a href='/Interpolate'>
  <Button variant="contained" color='grey' size="large" style={{marginLeft:"auto", marginRight:"auto"}}>View</Button>
  </a>
</CardActions>
</Card>

)

}
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
<Card className='card' sx={{ maxWidth: 800 }}>
<CardMedia
  component="img"
  alt="Interpolated Data"
  height="500"
  image={interp}
  className='card-img img-fluid'
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
    Interpolated Data
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
    The original data is over 200,000 lines long. Exploratory data analysis is performed to identify any relationships between data points. 
  </Typography>
</CardContent>
<CardActions>
  <a href='/Interpolate'>
  <Button size="medium" className='btn btn-primary'>View</Button>
  </a>
</CardActions>
</Card>

)

}
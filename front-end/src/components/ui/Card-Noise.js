import React from 'react'; 
import normald from '../../assets/img/static/normald.PNG'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CardNoise = () => {


return (
<Card className='card-card' sx={{ maxWidth: 800 }}>
<CardMedia
  component="img"
  alt="Normal Distribution Data"
  height="500"
  image={normald}
  className='card-img img-fluid'
/>
<CardContent>
  <Typography gutterBottom variant="h4" component="div">
    Noisy Data
  </Typography>
  
  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
  As the original variables do not contain much noise, for the purposes of demonstration, noise is applied to the LPG value. Noise is basically meaningless data, and the purpose is to see how much of this data can affect the chart visuals. This is done by replacing 10% of the values with Normally Distributed data, then 40% of the values are replaced. These Scatterplots will then be explained based on the output. It is expected that the difference in each chart will be noticable.
  </Typography>
  
</CardContent>
<CardActions>
  <a href='/NoisyData'>
  <Button variant="contained" color='grey' size="large" style={{marginLeft:"auto", marginRight:"auto"}}>View</Button>
  </a>
</CardActions>
</Card>

)

}
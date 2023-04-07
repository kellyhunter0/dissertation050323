import React from 'react'; 
import normald from '../../assets/img/static/normaldMissing.PNG'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CardNormalDMissing = () => {


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
    Data Prediction

    <p>
    Normal Distribution</p>
  </Typography>

  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
Normal Distributions are a type probability distribution, this one in particular generates data based on the frequency of data nearest the mean. This method will be used to predict missing values where there are outliers present, and also to predict missing values where the outliers have been removed 
  </Typography>
</CardContent>
<CardActions>
  <a href='/NormalDistribution'>
  <Button variant="contained" color='grey' size="large" style={{marginLeft:"auto", marginRight:"auto"}}>View</Button>
  </a>
</CardActions>
</Card>

)

}
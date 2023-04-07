import React from 'react'; 
import linearr from '../../assets/img/static/linearreg.PNG';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CardLinearR = () => {


return (
<Card className='card-card' sx={{maxWidth: 800 }}>
<CardMedia
  component="img"
  alt="Linear Regression Data"
  height="500"
  image={linearr} 
  className='card-img img-fluid'
/>
<CardContent>
<Typography gutterBottom variant="h4" component="div">
    Data Prediction
  <p>
    Linear Regression
  </p>
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
  Linear Regression is a Machine Learning method that is used to predict values based on test and train data. It takes a small sample of your dataset to train with, and generates some predictions for LPG, and this is based on the rest of the data. The intention with this method is to see how well it performs with and without outliers present.
  </Typography>
</CardContent>
<CardActions>
  <a href='/LinearReg'>
  <Button variant="contained" color='grey' size="large" style={{marginLeft:"auto", marginRight:"auto"}}>View</Button>
  </a>
</CardActions>
</Card>

)

}
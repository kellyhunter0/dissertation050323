import React from 'react'; 
import knn from '../../assets/img/static/knn.PNG'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CardKNN = () => {


return (
<Card className='card-card' sx={{ maxWidth: 800 }}>
<CardMedia
  component="img"
  alt="KNN Data"
  height="500"
  image={knn}
  className='card-img img-fluid'
/>
<CardContent>
<Typography gutterBottom variant="h4" component="div">
    Data Prediction
  <Typography gutterBottom variant="h6" component="div">
    K-Nearest Neighbour
  </Typography>
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
    The original data is over 200,000 lines long. Exploratory data analysis is performed to identify any relationships between data points. 
  </Typography>
</CardContent>
<CardActions>
  <a href='/KNN'>
  <Button variant="contained" color='grey' size="large" style={{marginLeft:"auto", marginRight:"auto"}}>View</Button>
  </a>
</CardActions>
</Card>

)

}
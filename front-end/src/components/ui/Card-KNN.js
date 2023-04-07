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
  <p>
    K-Nearest Neighbour
  </p>
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
    K-Nearest Neighbour is a way of estimating values by looking for the value it's closest to based off the number of neighbours its nearest to. KNN is used to predict missing values where there are outliers present, and also to predict missing values where the outliers have been removed. 
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
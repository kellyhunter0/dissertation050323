import React from 'react'; 
import outlier from '../../assets/img/static/outliers.PNG'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CardOutliers = () => {


return (
<Card className='card' sx={{ maxWidth: 600 }}>
<CardMedia
  component="img"
  alt="Outlier Data"
  height="520"
  image={outlier}
  className='card-img img-fluid'
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
    Outlier Data
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
    Exploratory data analysis is performed to identify any outliers in the data. Outliers are points that lie outside the range of normal, so something might be too high or too low depending on the context, and this can alter the chart output and change the line of best fit.
  </Typography>
</CardContent>
<CardActions>
  <a href='/Outliers'>
  <Button size="medium" className='btn btn-primary'>View</Button>
  </a>
</CardActions>
</Card>

)

}
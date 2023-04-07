
import React from 'react'; 
import missing from '../../assets/img/static/missing.PNG'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CardMissing = () => {


return (
<Card className='card-card' sx={{ maxWidth: 800 }}>
<CardMedia
  component="img"
  alt="Missing Data"
  height="525"
  image={missing}
  className='card-img img-fluid'
/>
<CardContent>
  <Typography gutterBottom variant="h4" component="div">
    Missing Data
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
   Halfing the data did not affect the look of the chart, so the investigation now centers around creating missing values so we can compare methods of dealing with missing data later on. Leaving missing data in the dataset is bad practice in data science so there needs to be methods of dealing with this.
  </Typography>
</CardContent>
<CardActions>
  <a href='/Missing'>
  <Button variant="contained" color='grey' size="large" style={{marginLeft:"auto", marginRight:"auto"}}>View</Button>
  </a>
</CardActions>
</Card>

)

}
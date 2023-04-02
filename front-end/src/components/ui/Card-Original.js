import React from 'react'; 
import original from '../../assets/img/static/original.PNG'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
export const CardOriginal = () => {


return (
<Card className='card' sx={{ maxWidth: 800}}>
<CardMedia
  component="img"
  alt="Original Data"
  height="520"
  image={original}
  className='card-img'
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
    Original Data
  </Typography>
  <Typography variant="body2" color="text.secondary" style={{fontSize:'16px'}}>
    The original data is over 400,000 lines long, so for performance this is reduced to 200,000 lines. Exploratory data analysis is performed to identify any relationships between variables. Relationships in data science are where one thing directly affects another, and these two variables often have a high correlation coefficient, which measures how much they depend on eachother.
  </Typography>
</CardContent>
<CardActions >
<Box textAlign='center'>
  <a href='/Original'>
  <Button variant="contained" color='primary' size="large" style={{marginLeft:"auto", marginRight:"auto"}}>View</Button>
  </a> 
  </Box>
</CardActions>
</Card>

)

}
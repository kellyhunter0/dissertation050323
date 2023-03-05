// import React, {useEffect, useRef, useState} from 'react';
// useEffect(() => {
//     d3.csv("/datasets/iot_telemetry_data.csv", d3.autoType).then(setData);
//   }, []);

//   useEffect(() => {
//     d3.csv("/datasets/iot_telemetry_data.csv", d3.autoType).then(setBigData);
//   }, []);
// useEffect(() => {
//     fetch("/timestamp").then(
//       res => res.json()
//     ).then(
//       pyData => {
//         setData(pyData)
//         //console.log(dig(pyData , 'timestamp'))
//         console.log(pyData)
//       }
//     )
//   }, [])

//   useEffect(() => {
//     fetch("/humidity").then(
//       res => res.json()
//     ).then(
//       pyData => {
//         setData(pyData)
//         //console.log(dig(pyData , 'timestamp'))
//         console.log(pyData)
//       }
//     )
//   }, [])

//   useEffect(() => {
//     fetch("/temperature").then(
//       res => res.json()
//     ).then(
//       pyData => {
//         setData(pyData)
//         //console.log(dig(pyData , 'timestamp'))
//         console.log(pyData)
//       } 
//     )
//   }, [])

//   useEffect(() => {
//     fetch("/co").then(
//       res => res.json()
//     ).then(
//       pyData => {
//         setData(pyData)
//         //console.log(dig(pyData , 'timestamp'))
//         //pyData = pyData.
//         console.log(pyData)
//       }
//     )    
//   }, [])
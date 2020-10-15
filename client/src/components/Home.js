import React, { useState } from "react";
import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Scatter, ScatterChart} from "recharts"

export default function Home(props) {
    // const arr = [8,5,6,12,2,9,1,4]
    // const arr = [null, 5, 6, 8, null, null, null, null]
    const data = [
        {x: 100, y: 200}, {x: 120, y: 100}, {x: 170, y: 300},
        {x: 140, y: 250}, {x: 150, y: 400}, {x: 110, y: 280},
      ];
      const polygon = [
        {x: 45, y:100}, {x: 45, y:200}, {x: 90, y:200}, {x: 90, y:100},
      ];
      return (
        <ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <XAxis type={'number'} dataKey={'x'} name='stature' unit='cm'/>
          <YAxis dataKey={'y'} name='weight' unit='kg'/>
          <CartesianGrid />
          <Scatter name='A school' data={polygon} fill='#8884d8'/>
          <Tooltip cursor={{strokeDasharray: '3 3'}}/>
        </ScatterChart>
      );
}

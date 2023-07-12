import React from 'react'
import Chart from '../components/Chart'
import { Badge } from 'antd';
import { useState } from 'react';

export default function CountChart(){
  const[count2, setCount]=useState([])
  return (
    <div>
        <Badge size='small' count={count2} offset={[4, 4]}>
            <Chart setCount={setCount}/>
        </Badge>
    </div>
  )
}


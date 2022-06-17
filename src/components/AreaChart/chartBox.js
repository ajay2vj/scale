import React from 'react';
import {
  Typography,
} from "@material-ui/core";
import './ChartContainerStyles.css';
export default function ChartBox({
  description,
  children,
  large,
  className,
  margin,
  paddingClass
}) {
  
 
  return (
    <div
    style={{width:'48%', height: '359px'}}
    className={`min-h-40 ${large && 'w-full'
      } bg-white shadow-sm mt-3 border border-gray-100 ${margin}`}
    >
      <div className="pt-2 pb-4 flex ">
        <Typography
          className={className}
        >{description}</Typography>
      </div>
      <div className={`p-3 flex justify-between flex-wrap ${paddingClass}`}>{children}</div>
    
  </div>
  );
}

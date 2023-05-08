import React from 'react';


const IndividualSummary = ({title,count,average,max,total}) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>Count = {count}</p>
            <p>Average = {average+" ms"}</p>
            <p>Maximum = {max+" ms"}</p>
            <p>Total = {total+" ms"}</p>
        </div>
    );
};


export default IndividualSummary;
import React from 'react';
import IndividualSummary from './IndividualSummary';


const GCSummary = ({data}) => {
    return (
        <div>
            <IndividualSummary title = "Young collection total time" count = {data.young_ct} average={data.young_tot/data.young_ct} max={data.young_max} total={data.young_tot}/>
            <IndividualSummary title = "All collection total time" count = {data.all_ct} average={data.all_tot/data.all_ct} max={data.all_max} total={data.all_tot}/>
            <IndividualSummary title = "Old collection total time" count = {data.old_ct} average={data.old_tot/data.old_ct} max={data.old_max} total={data.old_tot}/>
            <IndividualSummary title = "All collection pause time" count = {data.pause_ct} average={data.pause_tot/data.pause_ct} max={data.pause_max} total={data.pause_tot}/>
        </div>
    );
};



export default GCSummary;
import React from 'react';

const AllDashboards = () => {
    return (
        <div>
            <button><a href='http://35.173.221.24:8079/'>Async Profiler</a></button><br/>
            <button><a href='http://34.205.76.51:9090/'>Difference graph</a></button><br/>
            <button onClick={() => window.location = "/uploadjfr"}>JFR Stats</button>
        </div>
    );
};


export default AllDashboards;
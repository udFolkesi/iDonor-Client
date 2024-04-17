import React from "react";
import { Button } from "react-bootstrap";

function Reports() {
    function handleDownload() {
        fetch("https://localhost:7178/api/Statistics")
            .then(res => res.blob())
            .then(blob => {
                var file = window.URL.createObjectURL(blob);
                window.location.assign(file);
        });
    }

    return(
        <div>
            <h4>Reports</h4>
            <div>
                <a href="handleDownload()" onClick={handleDownload}>Download</a> 
            </div>
            <div>
                <a href="handleDownload()">Download</a> 
            </div>
            <div>
                <a href="handleDownload()">Download</a> 
            </div>
            <div>
                <a href="handleDownload()">Download</a> 
            </div>
        </div>
    );
}

export default Reports;
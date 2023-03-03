import React, {Component} from 'react';
import {Bar, Chart, Line} from 'react-chartjs-2';
import data_messages from '../data/charts-messages-data.json';
import data_calls from '../data/charts-calls-data.json';
import {CategoryScale} from "chart.js";
import {Chart as ChartJS} from "chart.js/auto";
import {MDBCol} from "mdb-react-ui-kit";

class Dashboard extends Component {

    componentDidMount() {
        // console.log(window.location.pathname);
        document.getElementById("mySidenav").style.width = "0";
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div>
                <h2 className="fw-bold ms-4">Message Chart</h2>
                <MDBCol className="px-md-5 m-md-5">
                    <Bar data={data_messages}/>
                </MDBCol>

                <h2 className="fw-bold ms-4">Call Chart</h2>
                <MDBCol className="px-md-5 m-md-5">
                    <Line data={data_calls}/>
                </MDBCol>
            </div>
        );
    }
}

export default Dashboard;
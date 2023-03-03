import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {createTheme, ThemeProvider} from '@mui/material';
import axios from 'axios';
import Export from '../utils/export-json'
import "../theme/table.css";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'ID', field: 'id', editable: 'never'},
                {title: 'First Name', field: 'FirstName'},
                {title: 'Last Name', field: 'LastName'},
                {title: 'Nationality', field: 'Nationality'},
                {title: 'Phone Number', field: 'PhoneNumber'},
                {title: 'Last Month Bill', field: 'LastMonthBill'},
            ],
            data: [],
            errorMessage: ''
        };
    }

    componentDidMount() {
        document.getElementById("mySidenav").style.width = "0";
        axios.get('/data/table-data.json')
            .then(res => {
                this.setState({data: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleAdd = newData => {
        const data = [...this.state.data];
        data.push(newData);
        Export(data); //Export data into new json (but there are no extra fields so yeah ..)
        // axios.post('/data/table-data.json', data)
        //     .then(res => {
        //         this.setState({data});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({errorMessage: 'An error occurred while adding the data.'});
        //     });
    };

    handleUpdate = (newData, oldData) => {
        const data = [...this.state.data];
        const index = data.indexOf(oldData);
        data[index] = newData;
        Export(data); //update data into new json

        // axios.put('/data/table-data.json', data)
        //     .then(res => {
        //         this.setState({data});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({errorMessage: 'An error occurred while updating the data.'});
        //     });
    };

    handleDelete = oldData => {
        const data = [...this.state.data];
        const index = data.indexOf(oldData);
        data.splice(index, 1);
        Export(data); //update data into new json

        // axios.delete('/data/table-data.json', data)
        //     .then(res => {
        //         this.setState({data});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({errorMessage: 'An error occurred while deleting the data.'});
        //     });
    };

    render() {

        const defaultMaterialTheme = createTheme();
        return (
            <div style={{width: '100%', height: '100%'}}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <ThemeProvider theme={defaultMaterialTheme}>
                    <div>
                        <MaterialTable
                            title="Data Table"
                            columns={this.state.columns}
                            data={this.state.data}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.handleAdd(newData);
                                            resolve();
                                        }, 1000)
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.handleUpdate(newData, oldData);
                                            resolve();
                                        }, 1000)
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            this.handleDelete(oldData);
                                            resolve();
                                        }, 1000)
                                    }),
                            }}
                            detailPanel={[
                                {
                                    tooltip: 'Show Name',
                                    render: rowData => {
                                        return (
                                            <div className="detailPanel text-center bg-danger bg-opacity-75">
                                                <p>Address: {rowData.Address} </p>
                                                <p># of Services Subscribed: {rowData.ServicesSubscribed} </p>
                                                <p> Age: {rowData.Age} </p>
                                            </div>
                                        )
                                    },
                                }]}
                        />
                        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}

export default Table;
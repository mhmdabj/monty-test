import React, {Component} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {toast, ToastContainer} from 'react-toastify';
import {MDBCol, MDBIcon, MDBRow} from "mdb-react-ui-kit";
import "../theme/dragdrop.css";
import Export from "../utils/export-json";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {id: "item-1", content: "Employee 1", type: "e", zone: "job-1e"},
                {id: "item-1-2", content: "Vehicle 1", type: "v", zone: null},
                {id: "item-2", content: "Employee 2", type: "e", zone: null},
                {id: "item-2-2", content: "Vehicle 2", type: "v", zone: null},
                {id: "item-3", content: "Employee 3", type: "e", zone: null},
                {id: "item-3-2", content: "Vehicle 3", type: "v", zone: null},
                {id: "item-4", content: "Employee 4", type: "e", zone: null},
                {id: "item-4-2", content: "Vehicle 4", type: "v", zone: null},
            ],
            jobs: [
                {id: "job-1", title: "Job 1", type: "type-1"},
                {id: "job-2", title: "Job 2", type: "type-2"},
                {id: "job-3", title: "Job 3", type: "type-1"},
                {id: "job-4", title: "Job 4", type: "type-2"},
            ],

        };
    }
    componentDidMount() {
        document.getElementById("mySidenav").style.width = "0";
    }
    onDragEnd = (result) => {
        const {source, destination} = result;
        const draggedItem = this.state.items.find((item) => item.id === result.draggableId);
        if (!destination) {
            toast.error("Careful the item will get hurt x_x")
            return;
        }
        const numDestination = destination.droppableId;
        const destinationItems = this.state.items.filter(item => item.zone === destination.droppableId);
        if (source.droppableId === "free-zone-1" && destination.droppableId !== "free-zone-1") {
            const draggedItem = this.state.items.find((item) => item.id === result.draggableId);
            // Check if the destination zone is the same type as the item
            if (numDestination == null || !numDestination.endsWith(draggedItem.type)) {
                toast.error("You cant drop this item in this zone!")
                return;
            }
            // Check if the destination zone contain more than one item
            if (destinationItems.length !== 0) {
                toast.error("1 Item per zone!")
                return;
            }
            const updatedItem = {...draggedItem, zone: destination.droppableId};
            const items = [...this.state.items];
            const index = items.findIndex((item) => item.id === updatedItem.id);
            items.splice(index, 1, updatedItem);
            this.setState({items});
        } else if (source.droppableId !== "free-zone-1" && destination.droppableId === "free-zone-1") {
            const draggedItem = this.state.items.find((item) => item.id === result.draggableId);
            const updatedItem = {...draggedItem, zone: null};
            const items = [...this.state.items];
            const index = items.findIndex((item) => item.id === updatedItem.id);
            items.splice(index, 1, updatedItem);
            this.setState({items});
        } else if (source.droppableId !== "free-zone-1" && destination.droppableId !== "free-zone-1") {
            if (numDestination == null || !numDestination.endsWith(draggedItem.type)) {
                toast.error("You cant drop this item in this zone!")
                return;
            }
            if (destinationItems.length !== 0) {
                toast.error("1 Item per zone!")
                return;
            }
            const updatedItem = {...draggedItem, zone: destination.droppableId};
            const items = [...this.state.items];
            const index = items.findIndex((item) => item.id === updatedItem.id);
            items.splice(index, 1, updatedItem);
            this.setState({items});
        }
    };

    exportJSON = () => {
        const {items} = this.state;
        const jobs = {};

// Loop through each item and add it to its corresponding zone and job
        items.forEach((item) => {
            let jobZone
            if (item.zone) {
                jobZone = item.zone.slice(0, -1);
            } else {
                jobZone = "freeZone";
            }
            const {zone} = item;
            if (!jobs[jobZone]) {
                jobs[jobZone] = {
                    id: jobZone,
                    zones: {},
                };
            }

            if (!jobs[jobZone].zones[zone]) {
                jobs[jobZone].zones[zone] = {
                    id: zone,
                    items: [],
                };
            }

            jobs[jobZone].zones[zone].items.push({
                id: item.id,
                content: item.content,
            });
        });

// Return the jobs object as a JSON string
        Export(jobs);
    };

    render() {
        const {items, jobs} = this.state;

        return (
            <div>
                <ToastContainer/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <MDBRow size="12">
                        <MDBCol md='3'>
                            <Droppable droppableId="free-zone-1">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="droppable p-2 mt-2"
                                    >
                                        <h3>Free Zone</h3>
                                        {items.filter((item) => !item.zone).map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided) => (
                                                    <div className="col-8"
                                                         ref={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}>
                                                        <div className="draggable-free my-1 p-2 me-2">
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </MDBCol>
                        <MDBCol md='6' className="flex-wrap mt-2">
                            {jobs.map((job) => (
                                <React.Fragment key={job.id}>
                                    <div className="text-center bg-success bg-gradient bg-opacity-75">{job.title}</div>
                                    <div className="d-flex">
                                        <Droppable key={job.id + 'e'} droppableId={job.id + 'e'}>
                                            {(provided) => (
                                                <div className="col-6 d-flex align-items-center p-1 mb-4 droppable"
                                                     ref={provided.innerRef}
                                                     {...provided.droppableProps}>
                                                    {/*<h3>{job.title}</h3>*/}
                                                    <MDBIcon className="text-success" icon='user-alt'/>
                                                    <div className="vl"></div>
                                                    {items.filter((item) => item.zone === job.id + "e").map((item, index) => (
                                                        <React.Fragment key={item.id}>
                                                            <Draggable key={item.id + "e"} draggableId={item.id}
                                                                       index={index}>
                                                                {(provided) => (
                                                                    <div className="w-100 max-width-320"
                                                                         ref={provided.innerRef}
                                                                         {...provided.draggableProps}
                                                                         {...provided.dragHandleProps}
                                                                    >
                                                                        <div className="draggable my-1 p-2 me-2">
                                                                            {item.content}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        </React.Fragment>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>

                                        <Droppable key={job.id + 'v'} droppableId={job.id + 'v'}>
                                            {(provided) => (
                                                <div className="col-6 d-flex align-items-center p-1 mb-4 droppable"
                                                     ref={provided.innerRef}
                                                     {...provided.droppableProps}
                                                >
                                                    {/*<h3>{job.title}</h3>*/}
                                                    <MDBIcon className="text-success" fas icon="car"/>
                                                    <div className="vl"></div>
                                                    {items.filter((item) => item.zone === job.id + 'v').map((item, index) => (
                                                        <React.Fragment key={item.id}>
                                                            <Draggable key={item.id} draggableId={item.id}
                                                                       index={index}>
                                                                {(provided) => (
                                                                    <div className="w-100 max-width-320"
                                                                         ref={provided.innerRef}
                                                                         {...provided.draggableProps}
                                                                         {...provided.dragHandleProps}>
                                                                        <div className="draggable my-1 p-2 me-2">
                                                                            {item.content}

                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        </React.Fragment>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable></div>
                                </React.Fragment>
                            ))}
                        </MDBCol>
                    </MDBRow>
                </DragDropContext>
                <div className="d-flex center justify-content-center">
                    <button className="btn btn-primary mt-4" onClick={this.exportJSON}>Export to JSON</button>
                </div>
            </div>
        );
    }
}

export default App;

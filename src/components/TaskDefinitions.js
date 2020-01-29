import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import TaskDefinition from "./TaskDefinition";
import { Grid } from "@material-ui/core";

class TaskDefinitions extends Component {
    render() {
        let cards = this.props.taskDefinitions.map((taskDefinition) => {
            return (
                <Grid item xs={4}>
                    <TaskDefinition taskDefinition={taskDefinition}/>
                </Grid>
            );
        });
        return (
            <Grid container spacing={3}>
                {cards}
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskDefinitions: state.taskDefinitions,
    }
};

export default connect(mapStateToProps, {})(TaskDefinitions);
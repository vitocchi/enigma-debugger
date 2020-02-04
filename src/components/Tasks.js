import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import Task from "./Task";
import { Grid } from "@material-ui/core";

class Tasks extends Component {
    render() {
        let cards = this.props.tasks.map((task) => {
            return (
                <Grid item xs={4}>
                    <Task
                        task={task}
                    />
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
        tasks: state.tasks,
    }
};

export default connect(mapStateToProps, {})(Tasks);
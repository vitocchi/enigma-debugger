import React, { Component } from "react";
import { Card, Typography, CardContent, Button, CardActions, TextField } from "@material-ui/core";
import { changeTaskArg, computeTask } from '../actions';
import connect from "react-redux/es/connect/connect";
class Task extends Component {
    handleClickCompute = () => {
        this.props.computeTask(this.props.task.fn)
    }
    handleClickReset = () => {
        for(let arg of this.props.task.args) {
            this.props.changeTaskArg({fn: this.props.task.fn, arg: arg.name, value: ''})
        }
    }
    render() {
        let args = this.props.task.args;
        let argField = args.map((arg) => {
            return (
                <div key={arg.name}>
                    {arg.name}:{arg.type}
                    <TextField 
                        value = {arg.value}
                        onChange = {(e) => this.props.changeTaskArg({fn:this.props.task.fn, arg: arg.name, value:e.target.value})}
                    />
                </div>
            )
        })
        return (
            <Card
                style={{
                    maxWidth: 275,
                    margin: 20
                }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {this.props.task.fn}
                    </Typography>
                        {argField}
                </CardContent>
                <CardActions>
                    <Button
                        onClick={this.handleClickCompute}
                    >
                        COMPUTE
                    </Button>
                    <Button
                        onClick={this.handleClickReset}
                    >
                        RESET
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default connect(
    null,
    {
        changeTaskArg,
        computeTask
    }
)(Task);
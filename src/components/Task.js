import React, { Component } from "react";
import { Card, Typography, CardContent, Button, CardActions, TextField, InputLabel, CardHeader } from "@material-ui/core";
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
            let label = arg.name + ": " + arg.type
            return (
                <div key={arg.name} style={{padding: "10px"}}>
                    <InputLabel>{label}</InputLabel>
                    <TextField 
                        value = {arg.value}
                        onChange = {(e) => this.props.changeTaskArg({fn:this.props.task.fn, arg: arg.name, value:e.target.value})}
                        size="small"
                        variant="outlined"
                    />
                </div>
            )
        })
        return (
            <Card
                style={{
                    maxWidth: 275,
                }}>
                <CardHeader
                    title={this.props.task.fn}
                    style={{backgroundColor: "lightgray"}}
                />
                <CardContent>
                    {argField}
                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        onClick={this.handleClickCompute}
                    >
                        COMPUTE
                    </Button>
                    <Button
                        color="primary"
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
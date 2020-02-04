import React, { Component } from "react";
import { Card, Typography, CardContent, TextField, CardActionArea, Button } from "@material-ui/core";
import { changeTaskArg, dispatchTask } from '../actions';
import connect from "react-redux/es/connect/connect";
class Task extends Component {
    handleClickButton = () => {
        this.props.dispatchTask(this.props.task.fn)
    }
    render() {
        let args = this.props.task.args;
        let argField = args.map((arg) => {
            return (
                <div>
                    {arg.name}:{arg.type}
                    <TextField 
                        value = {arg.value}
                        onChange = {(e) => this.props.changeTaskArg({fn:this.props.task.fn, arg: arg.name, value:e.target.value})}
                    />
                </div>
            )
        })
        return (
            <Card style={{maxWidth: 275}}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {this.props.task.fn}
                    </Typography>
                        {argField}
                </CardContent>
                <CardActionArea>
                    <Button
                        onClick = {this.handleClickButton}>
                        compute
                    </Button>
                </CardActionArea>
            </Card>
        );
    }
}

export default connect(
    null,
    {
        changeTaskArg,
        dispatchTask
    }
)(Task);
import React, { Component } from "react";
import { Card, Typography, CardContent, TextField, CardActionArea, Button } from "@material-ui/core";

class TaskDefinition extends Component {
    render() {
        let taskDefinition = this.props.taskDefinition;
        let argField = taskDefinition.args.map((arg) => {
            return (
                <div>
                    {arg.variable}:{arg.type} <TextField />
                </div>
            )
        })
        return (
            <Card style={{maxWidth: 275}}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {taskDefinition.fn}
                    </Typography>
                        {argField}
                </CardContent>
                <CardActionArea>
                    <Button>
                        compute
                    </Button>
                </CardActionArea>
            </Card>
        );
    }
}

export default TaskDefinition;
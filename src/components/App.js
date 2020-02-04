// Imports - React
import React, { Component } from "react";
// Imports - Redux
import connect from "react-redux/es/connect/connect";
// Imports - Frameworks (Semantic-UI and Material-UI)
import { Container, Message } from "semantic-ui-react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
// Imports - Initialize Enigma
import getEnigmaInit from "../utils/getEnigmaInit.js";
// Imports - Components
import Header from "./Header";
import "../App.css";
// Imports - Actions (Redux)
import { initializeEnigma } from '../actions';
import Tasks from "./Tasks.js";
import EnigmaClient from "../utils/EnigmaClient.js";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class App extends Component {
    async componentDidMount() {
        // Initialize enigma-js client library (including web3)
        const enigma = await getEnigmaInit();
        const accounts = await enigma.web3.eth.getAccounts();
        console.log("init")
        const contract = await this.initDeployedContract(enigma)
        console.log("finish")
        const enigmaClient = new EnigmaClient(enigma, accounts, contract)
        this.props.initializeEnigma(enigmaClient);
    }
    initDeployedContract = async (enigma) => {
        const secretContractCount = await enigma.enigmaContract.methods.countSecretContracts().call();
        const deployedAddress = (await enigma.enigmaContract.methods.getSecretContractAddresses(secretContractCount-1, secretContractCount).call())[0];
        return deployedAddress
    }

    render() {
        if (!this.props.enigma) {
            return (
                <div className="App">
                    <Header/>
                    <Message color="red">Enigma setup still loading...</Message>
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <Header/>
                    <Tasks/>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return { enigma: state.enigma }
};

export default connect(
    mapStateToProps,
    { initializeEnigma }
)(withStyles(styles)(App));

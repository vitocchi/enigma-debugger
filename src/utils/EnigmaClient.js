import { utils, eeConstants } from "enigma-js";
import { log, group, groupEnd } from "./Logger";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// wrapper of enigma-js-client
class EnigmaClient {
    constructor(enigma, accounts, contract) {
        this.enigma = enigma;
        this.accounts = accounts;
        this.contract = contract;
        this.computeTask = this.computeTask.bind(this);
        this.throwTask = this.throwTask.bind(this);
        this.waitForTaskSuccess = this.waitForTaskSuccess.bind(this);
        this.getTaskResult = this.getTaskResult.bind(this);
        this.decryptTaskResult = this.decryptTaskResult.bind(this);
        this.taskGasLimit = 1000000;
        this.taskGasPx = utils.toGrains(1);
    }
    async computeTask(taskFn, taskArgs, outputType) {
        log("Compute Task")
        log(taskFn);
        log(taskArgs);
        await this.throwTask(taskFn, taskArgs)
            .then(this.waitForTaskSuccess)
            .then(this.getTaskResult)
            .then(this.decryptTaskResult)
            .then((task) => this.decodeOutput(task, outputType))
            .catch((e) => {
                log('Task failed ' + e.message)
            })
    }
    throwTask(taskFn, taskArgs) {
        return new Promise((resolve, reject) => {
            this.enigma.computeTask(taskFn, taskArgs, this.taskGasLimit, this.taskGasPx, this.accounts[0], this.contract)
            .on(eeConstants.SEND_TASK_INPUT_RESULT, (result) => resolve(result))
            .on(eeConstants.ERROR, (error) => reject(error));
        });
    }
    async waitForTaskSuccess(task) {
        log('Task pending...');
        while (task.ethStatus === 1) {
            task = await this.enigma.getTaskRecordStatus(task);
            await sleep(1000);
        }
        if (task.ethStatus === 2 ) {
            log('Task succeeded ✔');
            return task
        } else {
            throw new Error("ethStatus is " + task.ethStatus)
        }
    }
    getTaskResult(task) {
        return new Promise((resolve, reject) => {
            this.enigma.getTaskResult(task)
                .on(eeConstants.GET_TASK_RESULT_RESULT, (result) => resolve(result))
                .on(eeConstants.ERROR, (error) => reject(error));
        });
    }
    async decryptTaskResult(task) {
        group()
        const output =  (await this.enigma.decryptTaskResult(task)).decryptedOutput;
        groupEnd()
        return output
    }
    decodeOutput(output, outputType) {
        let decoded
        if (outputType === 'void') {
            decoded = ''
        } else {
            decoded = this.enigma.web3.eth.abi.decodeParameter(outputType, output);
        }
        log("Task output:" + decoded)
        return decoded
    }
}

export default EnigmaClient
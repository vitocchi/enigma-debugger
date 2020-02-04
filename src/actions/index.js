export const initializeEnigma = (enigma) => {
    return {
        type: 'ENIGMA_INITIALIZED',
        payload: enigma
    };
};

export const notifyMessage = (notification) => {
    return {
        type: 'MESSAGE_NOTIFIED',
        payload: notification
    };
};

export const changeTaskArg = (payload) => {
    return {
        type: 'TASK_ARG_CHANGED',
        payload: payload,
    };
}

export const dispatchTask = (fn) => {
    return (dispatch, getState) => {
        log("dispatchTask")
        const {enigma, tasks} = getState()
        let fnIndex = tasks.findIndex(e => e.fn === fn);
        const argTypes = tasks[fnIndex].args.map(arg => arg.type)
        const taskFn = fn + "(" + argTypes.join() + ")"
        const taskArgs = tasks[fnIndex].args.map(arg => ([
            arg.value, arg.type   
        ]))
        enigma.computeTask(taskFn, taskArgs)
            .then((output) => {
                let decoded = enigma.enigma.web3.eth.abi.decodeParameter(tasks[fnIndex].outputType, output);
                log(decoded)
            })
            .catch((e) => {
                log('task failed:' + e.message)
            })
    }
}

function log (message) {
    console.log(message)
}
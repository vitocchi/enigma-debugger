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
        console.log("dispatchTask")
        console.time('dispatch')
        const {enigma, tasks} = getState()
        let fnIndex = tasks.findIndex(e => e.fn === fn);
        const argTypes = tasks[fnIndex].args.map(arg => arg.type)
        const taskFn = fn + "(" + argTypes.join() + ")"
        const taskArgs = tasks[fnIndex].args.map(arg => ([
            arg.value, arg.type   
        ]))
        enigma.computeTask(taskFn, taskArgs, tasks[fnIndex].outputType)
            .then((output) => {
                console.log("task output:" + output)
            })
            .catch((e) => {
                console.log('task failed:' + e.message)
            })
            .finally(() => console.timeEnd('dispatch'))
    }
}
import { combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

const initializeEnigmaReducer = (enigma = null, action) => {
    if (action.type === 'ENIGMA_INITIALIZED') {
        return action.payload;
    }

    return enigma;
};

const notifyMessageReducer = (notification = {open: false, message: ''}, action) => {
    if (action.type === 'MESSAGE_NOTIFIED') {
        return action.payload;
    }

    return notification;
};

const tD = [
    {
        fn: 'addition',
        args: [
            {
                name: 'x',
                type: 'uint256',
                value: '1',
            },
            {
                name: 'y',
                type: 'uint256',
                value: '2',
            },
        ],
        outputType: 'uint256',
    },
];

const tasksReducer = (tasks = tD, action) => {
    if (action.type === 'TASK_ARG_CHANGED') {
        let fnIndex = tasks.findIndex(e => e.fn === action.payload.fn);
        let argIndex = tasks[fnIndex].args.findIndex(e => e.name === action.payload.arg);
        tasks[fnIndex].args[argIndex].value = action.payload.value;
        return [
            ...tasks.slice(0, fnIndex),
            {
                fn: tasks[fnIndex].fn,
                args: [
                    ...tasks[fnIndex].args.slice(0, argIndex),
                    {
                        name: tasks[fnIndex].args[argIndex].name,
                        type: tasks[fnIndex].args[argIndex].type,
                        value: action.payload.value
                    },
                    ...tasks[fnIndex].args.slice(argIndex+1)
                ],
                outputType: tasks[fnIndex].outputType
            },
            ...tasks.slice(fnIndex + 1),
        ];
    }
    return tD;
}

export default combineReducers({
    enigma: initializeEnigmaReducer,
    notification: notifyMessageReducer,
    form: formReducer,
    tasks: tasksReducer
});

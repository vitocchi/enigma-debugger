import { combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

const initializeEnigmaReducer = (enigma = null, action) => {
    if (action.type === 'ENIGMA_INITIALIZED') {
        return action.payload;
    }

    return enigma;
};

const initializeAccountsReducer = (accounts = [], action) => {
    if (action.type === 'ACCOUNTS_INITIALIZED') {
        return action.payload;
    }

    return accounts;
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
                type: 'u256',
                value: null,
            },
            {
                name: 'y',
                type: 'u256',
                value: null,
            },
        ],
        outputType: 'u256',
    },
];

const tasksReducer = (tasks = tD, action) => {
    if (action.type === 'TASK_ARG_CHANGED') {
        let fnIndex = tasks.findIndex(e => e.fn === action.payload.fn);
        let argIndex = tasks[fnIndex].args.findIndex(e => e.name === action.payload.arg);
        tasks[fnIndex].args[argIndex].value = action.payload.value;
        return tD;
    }
    return tD;
}

export default combineReducers({
    enigma: initializeEnigmaReducer,
    accounts: initializeAccountsReducer,
    notification: notifyMessageReducer,
    form: formReducer,
    tasks: tasksReducer
});

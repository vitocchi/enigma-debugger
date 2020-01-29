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
                variable: 'x',
                type: 'u256'
            },
            {
                variable: 'y',
                type: 'u256'
            }
        ],
        outputType: 'u256',
    },
    {
        fn: 'addition',
        args: [
            {
                variable: 'x',
                type: 'u256'
            },
            {
                variable: 'y',
                type: 'u256'
            }
        ],
        outputType: 'u256',
    },
    {
        fn: 'addition',
        args: [
            {
                variable: 'x',
                type: 'u256'
            },
            {
                variable: 'y',
                type: 'u256'
            }
        ],
        outputType: 'u256',
    },
];

const taskDefinitionsReducer = (taskDefinitions = tD, action) => {
    return tD;
}

export default combineReducers({
    enigma: initializeEnigmaReducer,
    accounts: initializeAccountsReducer,
    notification: notifyMessageReducer,
    form: formReducer,
    taskDefinitions: taskDefinitionsReducer
});

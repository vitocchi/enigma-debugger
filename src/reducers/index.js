import { combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import taskDefinition from '../taskDefinition.json';

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

const tasksReducer = (tasks = taskDefinition, action) => {
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
    return tasks;
}

export default combineReducers({
    enigma: initializeEnigmaReducer,
    notification: notifyMessageReducer,
    form: formReducer,
    tasks: tasksReducer
});

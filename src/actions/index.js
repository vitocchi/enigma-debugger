export const initializeEnigma = (enigma) => {
    return {
        type: 'ENIGMA_INITIALIZED',
        payload: enigma
    };
};

export const initializeAccounts = (accounts) => {
    return {
        type: 'ACCOUNTS_INITIALIZED',
        payload: accounts
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

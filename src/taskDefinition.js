export const taskDefinition = [
    {
        fn: 'registor',
        args: [
            {
                name: 'id',
                type: 'string',
                value: '',
            },
            {
                name: 'pass',
                type: 'string',
                value: '',
            },
        ],
        outputType: 'void',
    },
    {
        fn: 'save_memo',
        args: [
            {
                name: 'id',
                type: 'string',
                value: '',
            },
            {
                name: 'pass',
                type: 'string',
                value: '',
            },
            {
                name: 'memo',
                type: 'string',
                value: '',
            },
        ],
        outputType: 'void',
    },
    {
        fn: 'get_memo',
        args: [
            {
                name: 'id',
                type: 'string',
                value: '',
            },
            {
                name: 'pass',
                type: 'string',
                value: '',
            },
        ],
        outputType: 'string',
    },
]
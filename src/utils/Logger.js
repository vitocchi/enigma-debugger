export const log = (message) => {
    console.log(
        "%c Enigma Debugger %c " + message,
        "color: lightgreen; background-color: black",
        "color: blue;",
    )
}

export const group = () => {
    console.groupCollapsed(
        "%cEnigma Debugger|Log by enigma-js",
        "color: gray; font-weight: normal",
    )
}

export const groupEnd = () => {
    console.groupEnd()
}
input.onPinPressed(TouchPin.P0, function () {
    basic.showLeds(`
        . # # # .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    radio.sendValue("P0", 30)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        // I am the receiver - send an ACK
        radio.sendNumber(2)
        // Display
        basic.showString("<- ")
    }
    if (receivedNumber == 2) {
        // Got an ACK
        basic.showString("< ")
    }
})
function logMood (mood: string) {
    columns[0] = datalogger.createCV("mood", mood)
    columns[1] = datalogger.createCV("light", input.lightLevel())
    columns[2] = datalogger.createCV("sound", input.soundLevel())
    columns[3] = datalogger.createCV("temperature", input.temperature())
    datalogger.logData(columns)
}
input.onButtonPressed(Button.AB, function () {
    logMood("angry")
})
input.onButtonPressed(Button.B, function () {
    logMood("sad")
})
radio.onReceivedValue(function (name, value) {
    if (name == "P0") {
        basic.showIcon(IconNames.Chessboard)
        basic.showString("" + (radio.receivedPacket(RadioPacketProperty.SerialNumber)))
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showLeds(`
        . # . . .
        . # # # #
        . . . . #
        . . . . #
        . . . . #
        `)
})
let columns: datalogger.ColumnValue[] = []
datalogger.mirrorToSerial(true)
datalogger.setColumns([
"mood",
"light",
"sound",
"temperature"
])
columns = [
datalogger.createCV("", 0),
datalogger.createCV("", 0),
datalogger.createCV("", 0),
datalogger.createCV("", 0)
]

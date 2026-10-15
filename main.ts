radio.onReceivedValueDeprecated(function (name, value) {
    if (name == "Turn") {
        RawTurn = value
        MappedTurn = pins.map(
        RawTurn,
        -90,
        90,
        -20,
        20
        )
        // MARS marsRover accepts -45 to 45 it seems, but driving at speed with high turn values seems to get arms flailing...
        MappedTurn = Math.constrain(MappedTurn, -20, 20)
    }
    if (name == "Drive") {
        RawDrive = value
        MappedDrive = pins.map(
        RawDrive,
        -90,
        90,
        -100,
        100
        )
        MappedDrive = Math.constrain(MappedDrive, -100, 100)
    }
    if (RawDrive == 0 && RawTurn == 0) {
        marsRover.stop(RVstopMode.Coast)
    } else {
        if (MappedDrive > 0) {
            marsRover.motor(RVmotor.Both, RVvector.Forward, MappedDrive)
        } else {
            marsRover.motor(RVmotor.Both, RVvector.Reverse, -1 * MappedDrive)
        }
        if (MappedTurn > 0) {
            marsRover.steer(RVdirection.Right, MappedTurn)
        } else {
            marsRover.steer(RVdirection.Left, -1 * MappedTurn)
        }
    }
    if (name == "Grabber") {
        RawGrabber = value
        if (RawGrabber == -999) {
        	
        } else {
            // -90 to 90 is possible on the mast, but it hits the cable!
            MappedGrabber = pins.map(
            RawGrabber,
            -90,
            90,
            -30,
            30
            )
            MappedGrabber = Math.constrain(MappedGrabber, -30, 30)
            marsRover.setServo(RVservos.Mast, MappedGrabber)
        }
    }
    if (name == "Spin") {
        rawSpin = value
        if (rawSpin == -999) {
        	
        } else {
            mappedSpin = pins.map(
            rawSpin,
            -90,
            90,
            -100,
            100
            )
            mappedSpin = Math.constrain(mappedSpin, -100, 100)
            if (mappedSpin > 0) {
                marsRover.spin(RVdirection.Right, mappedSpin)
            } else {
                marsRover.spin(RVdirection.Left, -1 * mappedSpin)
            }
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(groupNumber)
    makingChoice = true
    while (makingChoice) {
        basic.pause(200)
        if (input.logoIsPressed()) {
            makingChoice = false
            if (groupNumber <= -1) {
                groupNumber = groupNumber + 256
            }
            if (groupNumber >= 256) {
                groupNumber = groupNumber - 256
            }
            radio.setGroup(groupNumber)
            basic.showIcon(IconNames.Yes)
            basic.pause(200)
            basic.showLeds(`
                . # # # .
                . . # . .
                . . # . .
                # . . . #
                . # # # .
                `)
        } else if (input.buttonIsPressed(Button.A)) {
            groupNumber = groupNumber - 1
            basic.showNumber(groupNumber)
        } else if (input.buttonIsPressed(Button.B)) {
            groupNumber = groupNumber + 1
            basic.showNumber(groupNumber)
        }
    }
})
let makingChoice = false
let mappedSpin = 0
let rawSpin = 0
let MappedGrabber = 0
let RawGrabber = 0
let MappedDrive = 0
let RawDrive = 0
let MappedTurn = 0
let RawTurn = 0
let groupNumber = 0
groupNumber = 255
radio.setGroup(groupNumber)
basic.showLeds(`
    # . . . #
    # # . # #
    # . # . #
    # . . . #
    # . . . #
    `)
marsRover.ledRainbow()
basic.forever(function () {
	
})

Obloq.obloq_mqttCallbackUser( ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.Obloq_setup(
SERVERS.SER_CHINA,
"dfrobotYanfa",
"hidfrobot",
"HJZTNhw3fm",
"HyGp4hD2zm",
"rJq_biTXQ",
SerialPin.P1,
SerialPin.P2
)
Obloq.Obloq_startConnect()
basic.forever(() => {
    Obloq.Obloq_sendMessage("hello")
    basic.pause(5000)
})

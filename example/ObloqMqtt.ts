Obloq.obloq_mqttCallbackUser( ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.Obloq_setup(
"OPPO",
"12345678",
"ry-MOzFAPz",
"H1zzdztAwz",
"SkMaGKCDM",
SerialPin.P1,
SerialPin.P2
)
Obloq.Obloq_startConnect()
basic.forever(() => {
    Obloq.Obloq_sendMessage("hello")
    basic.pause(5000)
})

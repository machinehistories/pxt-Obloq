Obloq.Obloq_setup(
    "dfrobotYanfa",
    "hidfrobot",
    "ry-MOzFAPz",
    "H1zzdztAwz",
    "SkMaGKCDM",
    SerialPin.P1,
    SerialPin.P2

    )
    Obloq.obloq_mqttCallbackUser( ({ myparam: message }) =>  {
        basic.showString(message)
    })
Obloq.Obloq_connectWifi()
Obloq.Obloq_connectMqtt()
basic.forever(() => {
    Obloq.Obloq_sendMessage("hello")
    basic.pause(10000)
})

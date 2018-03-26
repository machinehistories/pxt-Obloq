Obloq.Obloq_setup(
    "dfrobotYanfa",
    "hidfrobot",
    "H1zzdztAwz",
    "ry-MOzFAPz",
    "SkMaGKCDM"
    )
    Obloq.obloq_mqttCallbackUser( ({ myparam: message }) =>  {
        basic.showString(message)
    })
Obloq.Obloq_serialInit(SerialPin.P2, SerialPin.P1)
Obloq.Obloq_connectWifi()
Obloq.Obloq_connectMqtt()
basic.forever(() => {
    Obloq.Obloq_sendMessage("hello")
    basic.pause(10000)
})

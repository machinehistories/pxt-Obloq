Obloq.obloq_mqttCallbackUser( ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.Obloq_setup(
"dfrobotYanfa",
"hidfrobot",
"r1xUSVUwsz",
"SJISVLvoz",
"BkMH48Djf",
SerialPin.P1,
SerialPin.P2
)
Obloq.Obloq_startConnect()
basic.forever(() => {
    Obloq.Obloq_sendMessage("hello")
    basic.pause(5000)
})

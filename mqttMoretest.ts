let message = ""
Obloq.obloq_mqttCallbackUser( ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.obloq_mqttCallbackUserMore(TOPIC.TOPIC_1,  ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.obloq_mqttCallbackUserMore(TOPIC.TOPIC_2,  ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.obloq_mqttCallbackUserMore(TOPIC.TOPIC_3,  ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.obloq_mqttCallbackUserMore(TOPIC.TOPIC_4,  ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.Obloq_setup(
"dfrobotYanfa",
"hidfrobot",
"HJZTNhw3fm",
"HyGp4hD2zm",
"rJq_biTXQ",
SerialPin.P1,
SerialPin.P2
)
Obloq.Obloq_add_topic(TOPIC.TOPIC_1, "Bkt_-i6mm")
Obloq.Obloq_add_topic(TOPIC.TOPIC_1, "ByG_bopQX")
Obloq.Obloq_add_topic(TOPIC.TOPIC_1, "HJlO-iaQQ")
Obloq.Obloq_add_topic(TOPIC.TOPIC_1, "SkTDbjp7Q")
Obloq.Obloq_startConnect(SERVERS.SER_CHINA)
basic.forever(() => {
    Obloq.Obloq_sendMessage("0")
    basic.pause(1000)
    Obloq.Obloq_sendMessageMore("1", TOPIC.TOPIC_1)
    basic.pause(1000)
    Obloq.Obloq_sendMessageMore("2", TOPIC.TOPIC_2)
    basic.pause(1000)
    Obloq.Obloq_sendMessageMore("3", TOPIC.TOPIC_3)
    basic.pause(1000)
    Obloq.Obloq_sendMessageMore("4", TOPIC.TOPIC_4)
    basic.pause(1000)
})

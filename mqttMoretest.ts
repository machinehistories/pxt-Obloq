let message = ""
Obloq.obloq_mqttCallbackUser( ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.obloq_mqttCallbackUserMore(TOPIC.topic_1,  ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.obloq_mqttCallbackUserMore(TOPIC.topic_2,  ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.obloq_mqttCallbackUserMore(TOPIC.topic_3,  ({ myparam: message }) =>  {
    basic.showString(message)
})
Obloq.obloq_mqttCallbackUserMore(TOPIC.topic_4,  ({ myparam: message }) =>  {
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
Obloq.Obloq_add_topic(TOPIC.topic_1, "Bkt_-i6mm")
Obloq.Obloq_add_topic(TOPIC.topic_2, "ByG_bopQX")
Obloq.Obloq_add_topic(TOPIC.topic_3, "HJlO-iaQQ")
Obloq.Obloq_add_topic(TOPIC.topic_4, "SkTDbjp7Q")
Obloq.Obloq_startConnect(SERVERS.China)
basic.forever(() => {
    Obloq.Obloq_sendMessage("0")
    basic.pause(1000)
    Obloq.Obloq_sendMessageMore("1", TOPIC.topic_1)
    basic.pause(1000)
    Obloq.Obloq_sendMessageMore("2", TOPIC.topic_2)
    basic.pause(1000)
    Obloq.Obloq_sendMessageMore("3", TOPIC.topic_3)
    basic.pause(1000)
    Obloq.Obloq_sendMessageMore("4", TOPIC.topic_4)
    basic.pause(1000)
})

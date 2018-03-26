let IOT_PWD = ""
let IOT_ID = ""
let PASSWORD = ""
let SSID = ""
let PORT = 0
let IOT_TOPIC = ""
let SERVER = ""
Obloq.obloq_mqttCallbackUser( ({ mye: e, myparam: param }) =>  {
    if (e == IOT_TOPIC) {
        basic.showString(param)
    }
    if (e == "MqttConneted") {
        Obloq.Obloq_subTopic(IOT_TOPIC)
    }
    if (e == "SubOk") {
        basic.showString("OK")
    }
})
SERVER = "iot.dfrobot.com.cn"
PORT = 1883
SSID = "dfrobotYanfa"
PASSWORD = "hidfrobot"
IOT_ID = "ry-MOzFAPz"
IOT_PWD = "H1zzdztAwz"
IOT_TOPIC = "SkMaGKCDM"
Obloq.Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
Obloq.Obloq_connectWifi(SSID, PASSWORD, 10000)
Obloq.Obloq_initMqtt(Callback.C1, SERVER, PORT)
Obloq.Obloq_connectMqtt(IOT_ID, IOT_PWD)
basic.forever(() => {
    Obloq.Obloq_sendMessage(IOT_TOPIC, "hello")
    basic.pause(5000)
})

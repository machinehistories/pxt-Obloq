let ip = ""
let port = 0
let ssid = ""
let item: string[] = []
let password = ""
password = "hidfrobot"
ssid = "dfrobotYanfa"
port = 8080
ip = "192.168.0.119"
Obloq.Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
Obloq.Obloq_connectWifi(ssid, password, 10000)
basic.showString(Obloq.Obloq_ifconfig())
Obloq.Obloq_initHttp(ip, port)
basic.forever(() => {
    item = Obloq.Obloq_httpGet("input?id=1&val=" + input.temperature(), 10000)
    if (item[0] == "200") {
        basic.showString(item[1])
    } else {
        basic.showString(item[0])
    }
    item = Obloq.Obloq_httpPost("input?id=1", "{\"val\":\"" + input.temperature() + "\"}", 10000)
    if (item[0] == "200") {
        basic.showString(item[1])
    } else {
        basic.showString(item[0])
    }
    basic.pause(1)
})

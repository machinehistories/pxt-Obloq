let ip = ""
let port = 0
let password = ""
let item: string[] = []
let ssid = ""
ssid = "dfrobotYanfa"
password = "hidfrobot"
port = 8080
ip = "192.168.0.123"
Obloq.Obloq_connectWifiExport(ssid, password)
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
    basic.pause(500)
})

/*！
 * @file Obloq/Obloq.ts
 * @brief DFRobot's obloq makecode library.
 * @n [Get the module here](http://www.dfrobot.com.cn/goods-1577.html)
 * @n Obloq is a serial port of WIFI connection module, Obloq can connect 
 *    to Microsoft Azure IoT and other standard MQTT protocol IoT.
 *
 * @copyright	[DFRobot](http://www.dfrobot.com), 2016
 * @copyright	GNU Lesser General Public License
 *
 * @author [email](1035868977@qq.com)
 * @version  V1.0
 * @date  2018-03-20
 */

let DEBUG = false
let MQTT_DEFAULT = true

//DFRobot easy iot
const EASY_IOT_SERVER_CHINA = "iot.dfrobot.com.cn"
const EASY_IOT_SERVER_GLOBAL = "iot.dfrobot.com"
const EASY_IOT_PORT = 1883
//other iot
const USER_IOT_SERVER = "-----------"
const USER_IOT_PORT = 0

//wifi
let OBLOQ_SSID        = ""
let OBLOQ_PASSWORD    = ""
//mqtt
let OBLOQ_MQTT_PORT   = 0
let OBLOQ_MQTT_SERVER = ""
let OBLOQ_IOT_PWD     = ""
let OBLOQ_IOT_ID      = ""
let OBLOQ_IOT_TOPIC: string[] = ["x","x","x","x","x"]
//http
let OBLOQ_HTTP_IP     = ""
let OBLOQ_HTTP_PORT   = 8080
//Connect to the WiFi IP address.
let IP = "0.0.0.0"
//Record state
let FIRST    = true
let initmqtt = false
let defobloq = false
//http
let myip     = ""
let myport   = 80
//mqtt
let myhost   = ""
let mymqport = 80
//callback function
let cb: Action[] = [null,null,null,null,null]
let mycb: Action[] = [null,null,null,null,null]
const TOPIC_NUM_MAX = 5
//Record commands and messages.
let e        = ""
let param    = ""
let diwifi   = "" 
//serial
let serialinit = false
//animation
let wifi_icon  = 1
let mqtt_icon  = 1
//serial pin
let Tx = SerialPin.P2
let Rx = SerialPin.P1
//event flag
let event = false
//mode
let mode = 0

enum TOPIC { 
    //% blockId="TOPIC_1" block="topic_1"
    TOPIC_1 = 1,
    //% blockId="TOPIC_2" block="topic_2"
    TOPIC_2 = 2,
    //% blockId="TOPIC_3" block="topic_3"
    TOPIC_3 = 3,
    //% blockId="TOPIC_4" block="topic_4"
    TOPIC_4 = 4
}
enum SERVERS { 
    //% blockId="SER_CHINA" block="China"
    SER_CHINA,
    //% blockId="SER_GLOBAL" block="Global"
    SER_GLOBAL
}

enum LIST { 
    //% blockId="T1" block="1"
    T1 = 1,
    //% blockId="T2" block="2"
    T2 = 2,
    //% blockId="T3" block="3"
    T3 = 3,
    //% blockId="T4" block="4"
    T4 = 4
}

/**
 *Obloq implementation method.
 */
//% weight=10 color=#008B00 icon="\uf1eb" block="Obloq"
namespace Obloq {
    const OBLOQ_STR_NONE = ""
    const OBLOQ_SUCCE_OK = 0
    const OBLOQ_SUCCE_ERR = 1
    const OBLOQ_WIFI_CONNECT_FAILURE = -2
    const OBLOQ_WIFI_CONNECT_TIMEOUT = -1
    const OBLOQ_MQTT_SUBTOPIC_TIMEOUT = -3
    const OBLOQ_MQTT_CONNECT_TIMEOUT = -4
    const OBLOQ_MQTT_CONNECT_FAILURE = -5
    
    const OBLOQ_MODE_MQTT = 2
    const OBLOQ_MODE_HTTP = 3

    const OBLOQ_TRUE = true
    const OBLOQ_FALSE = false

    export class Packeta {

        public constructor(top: TOPIC) { 

        }
        /**
         * Obloq receives commands.
         */
        public mye: string;
        /**
         * Obloq receives the message content.
         */
        public myparam: string;
    }

    //% advanced=true shim=Obloq::obloqreadString
    function obloqreadString(size: number): string {
        return OBLOQ_STR_NONE
    }

    //% advanced=true shim=Obloq::obloqgetRxBufferSize
    function obloqgetRxBufferSize(): number { 
        return OBLOQ_SUCCE_OK
    }

    //% advanced=true shim=Obloq::obloqSetTxBufferSize
    function obloqSetTxBufferSize(size: number): void {
        return 
    }

    //% advanced=true shim=Obloq::obloqSetRxBufferSize
    function obloqSetRxBufferSize(size: number): void {
        return 
    }    

    //% advanced=true shim=Obloq::obloqRxBufferedSize
    function obloqRxBufferedSize(): number {
        return OBLOQ_SUCCE_OK
    }    

    //% advanced=true shim=Obloq::obloqEventAfter
    function obloqEventAfter(len: number): void {
        return
    }

    //% advanced=true shim=Obloq::obloqEventOn
    function obloqEventOn(msg: string): void {
        return
    }       
    
    //% advanced=true shim=Obloq::obloqClearRxBuffer
    function obloqClearRxBuffer(): void {
        return
    } 

    //% advanced=true shim=Obloq::obloqClearTxBuffer
    function obloqClearTxBuffer(): void {
        return
    }     
    
    //% advanced=true shim=Obloq::obloqforevers
    function obloqforevers(a: Action): void {
        return
    }
    
    //% advanced=true shim=Obloq::obloqWriteString
    function obloqWriteString(text: string): void {
        return
    }

    //% advanced=true shim=Obloq::obloqDisDisplay
    function obloqDisDisplay(): void {
        return
    }

    //% advanced=true shim=Obloq::obloqEnDisplay
    function obloqEnDisplay(): void {
        return
    }    

    function Obloq_wifiIconShow(): void { 
        switch (wifi_icon) { 
            case 1: {
                basic.clearScreen()
                led.plot(0, 4)
                wifi_icon += 1
            } break;
            case 2: { 
                led.plot(0, 2)
                led.plot(1, 2)
                led.plot(2, 3)
                led.plot(2, 4)
                wifi_icon += 1
            } break;
            case 3: {
                led.plot(0, 0)
                led.plot(1, 0)
                led.plot(2, 0)
                led.plot(3, 1)
                led.plot(4, 2)
                led.plot(4, 3)
                led.plot(4, 4)
                wifi_icon = 1
            } break;
        }
    }

    function Obloq_mqttIconShow(): void { 
        switch (mqtt_icon) { 
            case 1: {
                basic.clearScreen()
                led.plot(4, 0)
                mqtt_icon += 1
            } break;
            case 2: { 
                led.plot(2, 0)
                led.plot(2, 1)
                led.plot(3, 2)
                led.plot(4, 2)
                mqtt_icon += 1
            } break;
            case 3: {
                led.plot(0, 0)
                led.plot(0, 1)
                led.plot(0, 2)
                led.plot(1, 3)
                led.plot(2, 4)
                led.plot(3, 4)
                led.plot(4, 4)
                mqtt_icon = 1
            } break;
        }
    }

    function Obloq_serialInit(): void{ 
        let item = ""
        //First send data through usb, avoid the first data scrambled.
        obloqWriteString("123")  
        item = serial.readString()
        item = serial.readString()
        item = serial.readString()
        serial.redirect(
            Tx,
            Rx,
            BaudRate.BaudRate9600
        )
        obloqSetTxBufferSize(300)
        obloqSetRxBufferSize(300)
        obloqWriteString("\r")
        item = serial.readString()
        serialinit = OBLOQ_TRUE
        obloqClearRxBuffer()
        obloqClearTxBuffer()
        onEvent()
    }

    /**
	 * Two parallel stepper motors are executed simultaneously(DegreeDual).
     * @param SERVER to SERVER ,eg: SERVERS.SER_CHINA
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_ID to IOT_ID ,eg: "yourIotId"
     * @param IOT_PWD to IOT_PWD ,eg: "yourIotPwd"
     * @param IOT_TOPIC to IOT_TOPIC ,eg: "yourIotTopic"
     * @param receive to receive ,eg: SerialPin.P1
     * @param send to send ,eg: SerialPin.P2
    */
    //% weight=102
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% SERVER.fieldEditor="gridpicker" SERVER.fieldOptions.columns=2
    //% blockId=Obloq_setup
    //% block="Obloq setup | Wi-Fi: | name : %SSID| password: %PASSWORD| IoT service: | Iot_id: %IOT_ID| Iot_pwd: %IOT_PWD| (default topic_0) Topic: %IOT_TOPIC| Pin set: | receiving data (green wire): %receive| sending data (blue wire): %send"
    export function Obloq_setup(/*wifi*/SSID: string, PASSWORD: string,
                                /*mqtt*/IOT_ID: string, IOT_PWD: string, IOT_TOPIC: string,
                                /*serial*/receive: SerialPin, send: SerialPin):
    void { 
        OBLOQ_SSID = SSID
        OBLOQ_PASSWORD = PASSWORD
        OBLOQ_IOT_PWD = IOT_PWD
        OBLOQ_IOT_ID = IOT_ID
        OBLOQ_IOT_TOPIC[0] = IOT_TOPIC
        Tx = send
        Rx = receive
        Obloq_serialInit()
    }

    /**
     * Disconnect the serial port.
    */
    //% weight=200
    //% blockId=Obloq_add_topic
    //% block="subscribe additional %top |: %IOT_TOPIC"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    //% advanced=true
    export function Obloq_add_topic(top: TOPIC, IOT_TOPIC: string): void {
        OBLOQ_IOT_TOPIC[top] = IOT_TOPIC
    }   

    /**
     * Disconnect the serial port.
    */
    //% weight=97
    //% blockGap=50
    //% blockId=Obloq_quit
    //% block="quit"
    //% advanced=true
    export function Obloq_quit(): void { 
        obloqWriteString("quit!\r")
    }

    /**
     * Send the ping.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=49
    //% blockId=Obloq_sendPing
    //% block="sendPing timeout|%time"
    //% advanced=true
    export function Obloq_sendPing(time: number): string { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|1|1|\r")
        if (!initmqtt) {
            let num = 0
            let item = ""
            while (OBLOQ_TRUE) {
                if (e == "Pingok") {
                    return "true"
                } else if (e == "timeout") { 
                    return "timeout"
                }
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) {
                    return "timeout"
                }
            }  
        } else { 
            return "true"
        }
        return "true"
    }


    /**
     * Get the software version.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=50
    //% blockId=Obloq_getVersion
    //% block="get version timeout %time"
    //% advanced=true
    export function Obloq_getVersion(time: number): string { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|1|2|\r")
        if (!initmqtt) {
            let num = 0
            let item = ""
            while (OBLOQ_TRUE) {
                if (e == "getVersion") {
                    return param
                } else if (e == "timeout") { 
                    return "timeout"
                }
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) {
                    return "timeout"
                }
            }  
        } else { 
            return "true"
        }
        return "true"
    }    
    

    /**
     * Heartbeat request.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=48
    //% blockId=Obloq_getHeartbeat
    //% block="get heartbeat timeout %time"
    //% advanced=true
    export function Obloq_getHeartbeat(time: number): string { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|1|3|" + time + "|\r")
        if (!initmqtt) {
            let num = 0
            let item = ""
            while (OBLOQ_TRUE) {
                if (e == "Heartbeat") {
                    return param
                } else if (e == "timeout") { 
                    return "timeout"
                }
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) {
                    return "timeout"
                }
            }  
        } else { 
            return "true"
        }
        return "true"
    }

    /**
     * Stop the heartbeat request.
    */
    //% weight=47
    //% blockId=Obloq_stopHeartbeat
    //% block="stop heartbeat"
    //% advanced=true
    export function Obloq_stopHeartbeat(): boolean { 
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|1|3|-1000|\r")
        return OBLOQ_TRUE
    }

    
    function Obloq_disconnectWifi(): void { 
        if (!serialinit) { 
            Obloq_serialInit()
        }
    }


    /**
     * Reconnect WiFi.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=99
    //% blockId=Obloq_reconnectWifi
    //% block="reconnectWifi timeout %time"
    //% advanced=true
    export function Obloq_reconnectWifi(time: number): boolean {
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|2|3|\r")
        if (!initmqtt) {
            while (OBLOQ_TRUE) {
                if (e == "WifiConnected") { 
                    IP = param
                    return OBLOQ_TRUE
                }
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) {
                    return OBLOQ_FALSE
                }
            }
        } else { 
            return OBLOQ_TRUE
        }
        return OBLOQ_TRUE
    }

    /**
     * connect Wifi.SSID(string):account; PWD(string):password;
     * time(ms): private long maxWait
    */
    //% weight=100
    //% blockId=Obloq_startConnect
    //% block="start connection | Servers: %SERVER"
    export function Obloq_startConnect(SERVER: SERVERS): void { 
        mode = OBLOQ_MODE_MQTT

        if (MQTT_DEFAULT) {
            if (SERVER == SERVERS.SER_CHINA) {
                OBLOQ_MQTT_SERVER = EASY_IOT_SERVER_CHINA
            } else if (SERVER == SERVERS.SER_GLOBAL) { 
                OBLOQ_MQTT_SERVER = EASY_IOT_SERVER_GLOBAL
            }   
            OBLOQ_MQTT_PORT = EASY_IOT_PORT
        } else { 
            OBLOQ_MQTT_SERVER = USER_IOT_SERVER
            OBLOQ_MQTT_PORT = USER_IOT_PORT
        }

        let ret = Obloq_connectWifi()
        if (DEBUG) { basic.showNumber(ret) }
        switch (ret) { 
            case OBLOQ_SUCCE_OK: {
                basic.showIcon(IconNames.Yes)
                basic.pause(500)
                basic.clearScreen()
             } break
            case OBLOQ_WIFI_CONNECT_TIMEOUT: { 
                Obloq_disconnectWifi()
                basic.showNumber(ret)
                diwifi = "PulishFailure"
                return
            } break
            case OBLOQ_WIFI_CONNECT_FAILURE: { 
                basic.showNumber(ret)
                basic.showIcon(IconNames.No)
                while (OBLOQ_TRUE) { basic.pause(10000) }
            } break
            case OBLOQ_SUCCE_ERR: { 
                basic.showNumber(ret)
                basic.showIcon(IconNames.No)
                while (OBLOQ_TRUE) { basic.pause(10000) }
            } break
        }
        ret = Obloq_connectIot();
        switch (ret) { 
            case OBLOQ_SUCCE_OK: {
                initmqtt = OBLOQ_TRUE
                basic.showIcon(IconNames.Yes)
                basic.pause(500)
                basic.clearScreen()
             } break
            case OBLOQ_MQTT_SUBTOPIC_TIMEOUT: { 
                FIRST = OBLOQ_TRUE
                Obloq_disconnectMqtt()
                basic.showNumber(ret)
                diwifi = "PulishFailure"
                return
            } break
            case OBLOQ_MQTT_CONNECT_TIMEOUT: { 
                FIRST = OBLOQ_TRUE
                Obloq_disconnectMqtt()
                basic.showNumber(ret)
                diwifi = "PulishFailure"
                return
            } break
            case OBLOQ_MQTT_CONNECT_FAILURE: { 
                basic.showNumber(ret)
                basic.showIcon(IconNames.No)
                while (OBLOQ_TRUE) { basic.pause(10000) }
            } break
            case OBLOQ_SUCCE_ERR: { 
                basic.showNumber(ret)
                basic.showIcon(IconNames.No)
                while (OBLOQ_TRUE) { basic.pause(10000) }
            } break
        }     
    }

    basic.forever(() => {
        if (DEBUG) { led.plot(0, 0) }
        basic.pause(150)
        if (diwifi == "PulishFailure") { 
            if (mode == OBLOQ_MODE_MQTT) { 
                if (OBLOQ_MQTT_SERVER = EASY_IOT_SERVER_CHINA) {
                    Obloq_startConnect(SERVERS.SER_CHINA)
                } else if (OBLOQ_MQTT_SERVER = EASY_IOT_SERVER_GLOBAL) {
                    Obloq_startConnect(SERVERS.SER_GLOBAL)
                } else { 
                    //do nothing
                }
            }
            if (initmqtt) { 
                diwifi = ""
            }
        }
        if (DEBUG) { led.unplot(0, 0) }
        basic.pause(150)
    })   

    /**
     * pin set
     * @param receive to receive ,eg: SerialPin.P1
     * @param send to send ,eg: SerialPin.P2
    */
    //% weight=101
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=Obloq_pinSet
    //% block="pin set| Receiving data (green wire): %receive| Sending data (blue wire): %send"
    //% advanced=true
    export function Obloq_pinSet(receive: SerialPin, send: SerialPin): void { 
        Tx = send
        Rx = receive
        Obloq_serialInit()
    }

    /**
     * connect Wifi.SSID(string):account; PWD(string):password;
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
    */
    //% weight=100
    //% blockId=Obloq_connectWifiExport
    //% block="wifi connect to| SSID %SSID| PASSWORD %PASSWORD"
    //% advanced=true
    export function Obloq_connectWifiExport(SSID: string, PASSWORD: string): void { 
        OBLOQ_SSID = SSID
        OBLOQ_PASSWORD = PASSWORD
        Obloq_connectWifi()
    }

    function Obloq_connectWifi(): number { 
        wifi_icon = 1
        let time = 10000
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (FIRST) {
            //serial init
            if (!serialinit) {
                Obloq_serialInit()
            }
            //show icon
            Obloq_wifiIconShow()
            for (let i = 0; i < 3; i++) {
                obloqWriteString("|1|1|\r")
                basic.pause(100)
            }
            obloqreadString(obloqgetRxBufferSize())
            obloqWriteString("|2|1|" + OBLOQ_SSID + "," + OBLOQ_PASSWORD + "|\r")
            FIRST = OBLOQ_FALSE
        }
        
        while (OBLOQ_TRUE) {
            if ((_timeout+1) % 3 == 0) { 
                Obloq_wifiIconShow()
            }
            if (e == "WifiConnected") {
                IP = param
                return OBLOQ_SUCCE_OK
            } else if (e == "DisConnected") { 
                return OBLOQ_WIFI_CONNECT_FAILURE
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) {
                //basic.showIcon(IconNames.No)
                return OBLOQ_WIFI_CONNECT_TIMEOUT 
            }
        }
        return OBLOQ_SUCCE_OK
    }

    /**
     * Get IP address.
    */
    //% weight=98
    //% blockId=Obloq_Obloq_ifconfig
    //% block="ipconfig"
    //% advanced=true
    export function Obloq_ipconfig(): string { 
        return IP
    }


    /**
     * Set the HTTP parameters.ip(string):ip address;port(number):The port number.
     * @param ip set ip addr, eg: 0.0.0.0
     * @param port set port, eg: 8080
    */
    //% weight=80
    //% blockId=Obloq_initHttp
    //% block="http set | ip %ip| port %port"
    //% advanced=true
    /*
    export function Obloq_initHttp(ip: string, port: number): void { 
        defobloq = OBLOQ_TRUE
        myip = ip
        myport = port
        initmqtt = OBLOQ_FALSE
    }*/

    /**
     * The HTTP get request.url(string):URL:time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=79
    //% blockId=Obloq_httpGet
    //% block="http get | url %url| timeout %time"
    //% advanced=true
    /*
    export function Obloq_httpGet(url: string, time: number): string[] { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|3|1|http://" + myip + ":" + myport + "/" + url + "|\r")
        //while((strncmp(buf,"|1|3|\r",strlen(buf)) == 0)){
        //    buf = readbuf(mp_obj_get_int(time));
        //  }
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            if (e == "200") {
                let list = ["200", param]
                return list
            } else if (e == "err") {
                let list = ["err", param]
                return list
            } else if (e == "|2|1|") {
                let list = ["999", "disconnet wifi"]
                return list
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) { 
                let list = ["408", "time out"]
                return list
            }
        }
        let list = ["408", "time out"]
        return list
    }*/






    /**
     * The HTTP post request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=78
    //% blockId=Obloq_httpPost
    //% block="http post | url %url| content %content| timeout %time"
    //% advanced=true
    /*
    export function Obloq_httpPost(url: string, content: string, time: number): string[] { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|3|2|http://" + myip + ":" + myport + "/" + url + "," + content + "|\r")
        //while((strncmp(buf,"|1|3|\r",strlen(buf)) == 0)){
        //    buf = readbuf(mp_obj_get_int(time));
        //  }
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            if (e == "200") {
                let list = ["200", param]
                return list
            } else if (e == "err") {
                let list = ["err", param]
                return list
            } else if (e == "|2|1|") {
                let list = ["999", "disconnet wifi"]
                return list
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) { 
                let list = ["408", "time out"]
                return list
            }
        }
        let list = ["408", "time out"]
        return list
    }*/


    /**
     * The HTTP put request,Obloq.put() can only be used for http protocol!
     * url(string): URL; content(string):content; time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=77
    //% blockId=Obloq_httpPut
    //% block="http put | url %url| content %content| timeout %time"
    //% advanced=true
    /*
    export function Obloq_httpPut(url: string, content: string, time: number): string[] {
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|3|3|http://"+myip+":"+myport+"/"+url+","+content+"|\r")
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            if (e == "200") {
                let list = ["200", param]
                return list
            } else if (e == "err") {
                let list = ["err", param]
                return list
            } else if (e == "|2|1|") {
                let list = ["999", "disconnet wifi"]
                return list
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) { 
                let list = ["408", "time out"]
                return list
            }
        }
        let list = ["408", "time out"]
        return list
    }*/




    /**
     * Delete an HTTP connection.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */ 
    //% weight=76
    //% blockGap=50
    //% blockId=Obloq_httpDelete
    //% block="http delete | url %url| content %content| timeout %time"
    //% advanced=true
    /*
    export function Obloq_httpDelete(url: string, content: string, time: number): string[] {
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|3|4|http://"+myip+":"+myport+"/"+url+","+content+"|\r")
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            if (e == "200") {
                let list = ["200", param]
                return list
            } else if (e == "err") {
                let list = ["err", param]
                return list
            } else if (e == "|2|1|") {
                let list = ["999", "disconnet wifi"]
                return list
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) { 
                let list = ["408", "time out"]
                return list
            }
        }
        let list = ["408", "time out"]
        return list
    }*/
    
    function Obloq_connectMqtt(): void { 
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|4|1|1|" + myhost + "|" + mymqport + "|" + OBLOQ_IOT_ID + "|" + OBLOQ_IOT_PWD + "|\r")
    }

    function Obloq_connectIot(): number {
        mqtt_icon = 1
        let iconnum = 0
        let _timeout = 0
        let __timeout = 0
        defobloq = OBLOQ_TRUE
        myhost = OBLOQ_MQTT_SERVER
        mymqport = OBLOQ_MQTT_PORT
        for (let i = 0; i < TOPIC_NUM_MAX; i++) { 
            mycb[i] = cb[i]
        }

        Obloq_connectMqtt()

        while (_timeout < 2000) { 
            if (_timeout % 50 == 0) { 
                Obloq_mqttIconShow()
                iconnum += 1;
            }
            if (e == "MqttConneted") {
                break
            } else if (e == "ConnectErr") { 
                OBLOQ_MQTT_CONNECT_FAILURE
            }
            basic.pause(1)
            _timeout += 1
        }
        if (_timeout >= 60000) { 
            //basic.showString("timeout!")
            return OBLOQ_MQTT_CONNECT_TIMEOUT 
        }
        for (let i = 0; i < TOPIC_NUM_MAX; i++) {
            if (OBLOQ_IOT_TOPIC[i] != "x") {
                Obloq_subTopic(OBLOQ_IOT_TOPIC[i])
            } else { 
                continue
            }
            __timeout = _timeout + 10000
            while (_timeout < __timeout) {
                if (_timeout % 50 == 0) {
                    Obloq_mqttIconShow()
                    iconnum += 1
                }
                if (iconnum > 6) {//动画两次以上
                    if (e == "SubOk") {
                        e = ""
                        break
                    }
                }
                basic.pause(1)
                _timeout += 1
            }
            if (_timeout >= __timeout) { 
                //basic.showString("timeout!")
                 return OBLOQ_MQTT_SUBTOPIC_TIMEOUT
             }
        }
        return OBLOQ_SUCCE_OK
        //basic.showString("ok")
    } 

    /**
     * Reconnect the MQTT.
    */
    //% weight=65
    //% blockId=Obloq_reconnectMqtt
    //% block="mqtt reconnect"
    //% advanced=true
    export function Obloq_reconnectMqtt(): void {
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|4|1|5|\r")
    }  

    /**
     * Disconnect the MQTT connection.
    */
    //% weight=66
    //% blockId=Obloq_disconnectMqtt
    //% block="mqtt disconnect"
    //% advanced=true
    export function Obloq_disconnectMqtt(): void { 
        if (!serialinit) { 
            Obloq_serialInit()
        }
    }   

    /**
     * Send a message.
     * @param top set top, eg: top
     * @param mess set mess, eg: mess
    */
    //% weight=68
    //% blockId=Obloq_sendMessage
    //% block="pubLish %mess |to topic_0"
    export function Obloq_sendMessage(mess: string): void { 
        if (!initmqtt) { 
            return
        }
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|4|1|3|"+OBLOQ_IOT_TOPIC[0]+"|"+mess+"|\r")
    }

    /**
     * Send a message.
     * @param top set top, eg: top
     * @param mess set mess, eg: mess
    */
    //% weight=190
    //% blockId=Obloq_sendMessageMore
    //% block="pubLish %mess |to %top"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    //% advanced=true
    export function Obloq_sendMessageMore(mess: string, top: TOPIC): void { 
        if (!initmqtt) { 
            return
        }
        if (!serialinit) { 
            Obloq_serialInit()
        }
        switch (top) { 
            case TOPIC.TOPIC_1: obloqWriteString("|4|1|3|" + OBLOQ_IOT_TOPIC[1] + "|" + mess + "|\r"); break;
            case TOPIC.TOPIC_2: obloqWriteString("|4|1|3|" + OBLOQ_IOT_TOPIC[2] + "|" + mess + "|\r"); break;
            case TOPIC.TOPIC_3: obloqWriteString("|4|1|3|" + OBLOQ_IOT_TOPIC[3] + "|" + mess + "|\r"); break;
            case TOPIC.TOPIC_4: obloqWriteString("|4|1|3|" + OBLOQ_IOT_TOPIC[4] + "|" + mess + "|\r"); break;
        }
    }

    /**
     * Subscribe to a Topic
     * @param top set top, eg: top
    */
    //% weight=67
    //% blockId=Obloq_subTopic
    //% advanced=true
    function Obloq_subTopic(topic: string): void { 
        if (!serialinit) { 
            Obloq_serialInit()
        }
        obloqWriteString("|4|1|2|" + topic + "|\r")
    }  

    function obloq_mqttCallbackMore(top: TOPIC, a: Action): void{
        switch (top) { 
            case TOPIC.TOPIC_1: cb[1] = a; break;
            case TOPIC.TOPIC_2: cb[2] = a; break;
            case TOPIC.TOPIC_3: cb[3] = a; break;
            case TOPIC.TOPIC_4: cb[4] = a; break;
        }
    }

    function obloq_mqttCallback(a: Action): void{
        cb[0] = a
    }

    /**
     * This is an MQTT listener callback function, which is very important.
     * The specific use method can refer to "example/ObloqMqtt.ts"
    */
    //% weight=62
    //% blockGap=50
    //% mutate=objectdestructuring
    //% mutateText=Packeta
    //% mutateDefaults="myparam:message"
    //% blockId=obloq_mqttCallbackUser block="on obloq received"
    export function obloq_mqttCallbackUser(cb: (packet: Packeta) => void) {
        obloq_mqttCallback(() => {
         /*   const packet = new Packeta();
            packet.mye = e
            packet.myparam = param;
            cb(packet)*/
        });
    }
//"Obloq.obloq_mqttCallbackUserMore|block": "在obloq收到消息时运行 %top |:",
    /**
     * This is an MQTT listener callback function, which is very important.
     * The specific use method can refer to "example/ObloqMqtt.ts"
    */
    //% weight=180
    //% blockGap=60
    //% mutate=objectdestructuring
    //% mutateText=Packeta
    //% mutateDefaults="myparam:constructor,myparam:message"
    //% blockId=obloq_mqttCallbackUserMore block="on obloq received %top |:"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    //% advanced=true
    export function obloq_mqttCallbackUserMore(cb: (packet: Packeta) => void) {
        obloq_mqttCallbackMore(TOPIC.TOPIC_1, () => {
           /* const packet = new Packeta();
            packet.mye = e
            packet.myparam = param;
            cb(packet)*/
        }); 
    }


    function obloqRecevice(): void {
        let size = obloqRxBufferedSize()
        //serial.writeNumber(size)
        if (size > 5) { // serial.writeNumber(1);
            let item = obloqreadString(size)
            //if (size > 10) {serial.writeString(item) }
            for (let i = 0; i < size; i++) {
                if (item.charAt(i) == '1') {
                    if (item.charAt(i + 1) == '|') {
                        if (item.charAt(i + 2) == '1') { //|1|1|
                            e = "Pingok"
                            param = ""
                            return
                        } else if (item.charAt(i + 2) == '2') { //|1|2|
                            let z = 0
                            let j = i + 4
                            for (i = i + 4; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            e = "getVersion"
                            param = item.substr(j, z)
                            return
                        } else if (item.charAt(i + 2) == '3') { //|1|3|
                            if (initmqtt) {
                                e = "Heartbeat"
                                param = "OK"
                            }
                            return
                        }
                    }
                } else if (item.charAt(i) == '2') {
                    if (item.charAt(i + 1) == '|') {
                        if (item.charAt(i + 2) == '3') { //|2|3|
                            let z = 0
                            let j = i + 4
                            for (i = i + 4; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            e = "WifiConnected"
                            param = item.substr(j, z)
                            return
                        } else if (item.charAt(i + 2) == '4') { //|2|4|
                            e = "DisConnected"
                            param = "fail"
                            return
                        } else if (item.charAt(i + 2) == '1') { //|2|1|
                            e = "|2|1|"
                            param = ""
                            if (initmqtt) {
                                led.stopAnimation()
                                basic.clearScreen()
                                FIRST = true
                                initmqtt = false
                                diwifi = "PulishFailure"
                            }
                            return
                        }
                    }
                } else if (item.charAt(i) == '3') {
                    if (item.charAt(i + 1) == '|') {
                        if (item.charAt(i + 2) == '2' && //|3|200|
                            item.charAt(i + 3) == '0' &&
                            item.charAt(i + 4) == '0' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            let j = i + 6
                            for (i = i + 6; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            e = "200"
                            param = item.substr(j, z)
                            return
                        } else if (item.charAt(i + 2) == 'e' && //|3|err|
                            item.charAt(i + 3) == 'r' &&
                            item.charAt(i + 4) == 'r' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            let j = i + 6
                            for (i = i + 6; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            e = "err"
                            param = item.substr(j, z)
                            return
                        }
                    }
                } else if (item.charAt(i) == '4') { // serial.writeNumber(2);
                    if (item.charAt(i + 1) == '|') {
                        if (item.charAt(i + 2) == '1') {   //|4|1|1|1|
                            if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '1' &&
                                item.charAt(i + 5) == '|' &&
                                item.charAt(i + 6) == '1' &&
                                item.charAt(i + 7) == '|'
                            ) {
                                e = "MqttConneted"
                                param = ""
                                // serial.writeNumber(size);
                                return
                            } else if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '2' && //|4|1|2|1|
                                item.charAt(i + 5) == '|' &&
                                item.charAt(i + 6) == '1' &&
                                item.charAt(i + 7) == '|'
                            ) {
                                e = "SubOk"
                                param = ""
                                return
                            } else if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '3' && //|4|1|3|1|
                                item.charAt(i + 5) == '|' &&
                                item.charAt(i + 6) == '1' &&
                                item.charAt(i + 7) == '|'
                            ) {  //led.plot(0, 1)
                                e = "PulishOk"
                                param = ""
                                return
                            } else if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '3' && //|4|1|3|2|
                                item.charAt(i + 5) == '|' &&
                                item.charAt(i + 6) == '2' &&
                                item.charAt(i + 7) == '|'
                            ) {  //led.plot(0, 1)
                                led.stopAnimation()
                                basic.clearScreen()
                                e = "PulishFailure"
                                param = ""
                                FIRST = true
                                initmqtt = false
                                diwifi = "PulishFailure"
                                return
                            } else if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '5' && //|4|1|5|
                                item.charAt(i + 5) == '|'
                            ) {    //led.plot(0, 0)                    //serial.writeNumber(size)
                                let z = 0
                                let j = i + 6
                                for (i = i + 6; i < size; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                e = item.substr(j, z)
                                z = 0
                                j = i + 1
                                for (i = i + 1; i < size; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                param = item.substr(j, z)///?????????
                                switch (e) { 
                                    case OBLOQ_IOT_TOPIC[0]: obloqforevers(mycb[0]); break;
                                    case OBLOQ_IOT_TOPIC[1]: obloqforevers(mycb[1]); break;
                                    case OBLOQ_IOT_TOPIC[2]: obloqforevers(mycb[2]); break;
                                    case OBLOQ_IOT_TOPIC[3]: obloqforevers(mycb[3]); break;
                                    case OBLOQ_IOT_TOPIC[4]: obloqforevers(mycb[4]); break;
                                }
                                break
                            }
                        } else if (item.charAt(i + 2) == '2') {
                            if (item.charAt(i + 3) == '|' &&  //|4|2|3|
                                item.charAt(i + 4) == '3' &&
                                item.charAt(i + 5) == '|'
                            ) {
                                e = "MqttConnectErr"
                                param = ""
                                return
                            } else if (item.charAt(i + 3) == '|') { //|4|2|
                                let z = 0
                                let j = i + 4
                                for (i = i + 4; i < size; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                e = "ConnectErr"
                                param = item.substr(j, z)
                                return
                            }
                        }
                    }
                } else if (item.charAt(i) == 't') {
                    if (item.charAt(i + 1) == 'i' &&
                        item.charAt(i + 2) == 'm' &&
                        item.charAt(i + 3) == 'e' &&
                        item.charAt(i + 4) == 'o' &&
                        item.charAt(i + 5) == 'u' &&
                        item.charAt(i + 6) == 't'
                    ) {
                        e = "timeout"
                        param = ""
                        return
                    }
                }
            }
            //serial.writeNumber(n);
            // serial.writeString("\r\n");
        }
            //onEvent()
    }

    function onEvent() {
        if (!serialinit) { 
            Obloq_serialInit()
        }
        event = OBLOQ_TRUE
        //obloqClearRxBuffer()
        //obloqClearTxBuffer()
        //obloqEventAfter(1)
        obloqEventOn("\r")
        control.onEvent(<number>32, <number>1, obloqRecevice); // register handler
    }    

/* !myself test function.!
    //% weight=1
    //% blockId=Obloq_test
    //% block="test"
    export function test(): void { 
        onEvent()
    }  
*/
}
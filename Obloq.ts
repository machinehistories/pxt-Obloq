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


//Connect to the WiFi IP address.
let IP = "0.0.0.0"

let FIRST = true
let initmqtt = false
let defobloq = false
//http
let myip = ""
let myport = 80
//mqtt
let myhost = ""
let mymqport = 80
//callback function
let cb: Action
let mycb: Action

let param = ""
let e = ""

let serialinit = false
/*
 *Fixed parameters are passed in.
 */
//%
enum Callback {
    //% block="callback"
    C1 = <number>1
}

/**
 *Obloq implementation method.
 */
//% weight=10 color=#008B00 icon="\uf1eb" block="Obloq"
namespace Obloq {
    const OBLOQ_STR_NONE = ""
    const OBLOQ_SUCCE_OK = 0
    const OBLOQ_TRUE = true
    const OBLOQ_FALSE = false

    export class Packeta {
        /**
         * The number payload if a number was sent in this packet (via ``sendNumber()`` or ``sendValue()``)
         * or 0 if this packet did not contain a number.
         */
        public mye: string;
        /**
         * The string payload if a string was sent in this packet (via ``sendString()`` or ``sendValue()``)
         * or the empty string if this packet did not contain a string.
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


    let IOT_PWD = ""
    let IOT_ID = ""
    let PASSWORD = ""
    let SSID = ""
    let PORT = 0
    let IOT_TOPIC = ""
    let SERVER = ""
    let ip = ""
    let port = 0
    /**
	 * Two parallel stepper motors are executed simultaneously(DegreeDual).
    */
    //% weight=102
    //% blockId=Obloq_setup
    //% block = "Obloq setup WIFI:| SSID: %SSID| PASSWORD: %PASSWORD| MQTT:| IOT_PWD: %IOT_PWD| IOT_ID: %IOT_ID| IOT_TOPIC: %IOT_TOPIC| MQTT_PORT: %MQTT_PORT| MQTT_SERVER: %MQTT_SERVER| HTTP: | HTTP_IP %HTTP_IP| HTTP_PORT %HTTP_PORT"
    export function Obloq_setup(/*wifi*/SSID: string,    PASSWORD: string,
                                         /*mqtt*/IOT_PWD: string, IOT_ID: string,    IOT_TOPIC: string, MQTT_PORT: number, MQTT_SERVER: string,
                                         /*http*/HTTP_IP: string, HTTP_PORT: number):
    void { 

    }
      

    /**
     * Initialization serial port
     * @param tx to tx, eg: SerialPin.P2
     * @param rx to tx, eg: SerialPin.P1
     * @param Baudrate to tx, eg: BaudRate.BaudRate9600
    */
    //% weight=101
    //% blockId=Obloq_serialInit
    //% block="serial init tx %tx| rx %rx|baudrate %Baudrate"
    export function Obloq_serialInit(tx: SerialPin, rx: SerialPin, Baudrate: BaudRate): void{ 
        let item = ""
        //First send data through usb, avoid the first data scrambled.
        obloqWriteString("123")  
        item = serial.readString()
        item = serial.readString()
        item = serial.readString()
        serial.redirect(
            tx,
            rx,
            Baudrate
        )
        obloqSetTxBufferSize(300)
        obloqSetRxBufferSize(300)
        obloqWriteString("\r")
        item = serial.readString()
        serialinit = OBLOQ_TRUE
        obloqClearRxBuffer()
        obloqClearTxBuffer()
    }

    /**
     * Disconnect the serial port.
    */
    //% weight=97
    //% blockGap=50
    //% blockId=Obloq_quit
    //% block="quit"
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
    export function Obloq_sendPing(time: number): string { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|1|1|\r")
        if (!initmqtt) {
            let num = 0
            let item = ""
            while (OBLOQ_TRUE) {
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '1') {
                            if (item.charAt(i - 1) == '|' &&//|1|1|
                                item.charAt(i + 1) == '|' &&
                                item.charAt(i + 2) == '1' &&
                                item.charAt(i + 3) == '|'
                            ) {
                                return "true"
                            }
                        } else if (item.charAt(i) == 't'&&//timeout
                            item.charAt(i+1) == 'i' &&
                            item.charAt(i+2) == 'm' &&
                            item.charAt(i+3) == 'e' &&
                            item.charAt(i+4) == 'o' &&
                            item.charAt(i+5) == 'u' &&
                            item.charAt(i+6) == 't'
                        ) { 
                            return "timeout"
                        }
                    }
                    return "false"
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
    export function Obloq_getVersion(time: number): string { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|1|2|\r")
        if (!initmqtt) {
            let num = 0
            let item = ""
            while (OBLOQ_TRUE) {
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '1') {
                            if (item.charAt(i - 1) == '|' &&//|1|2|
                                item.charAt(i + 1) == '|' &&
                                item.charAt(i + 2) == '2' &&
                                item.charAt(i + 3) == '|'
                            ) {
                                let j = i + 4
                                let z = 0
                                for (i = i + 4; i < num; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                return item.substr(j, z)
                            }
                        } else if (item.charAt(i) == 't'&&//timeout
                            item.charAt(i+1) == 'i' &&
                            item.charAt(i+2) == 'm' &&
                            item.charAt(i+3) == 'e' &&
                            item.charAt(i+4) == 'o' &&
                            item.charAt(i+5) == 'u' &&
                            item.charAt(i+6) == 't'
                        ) { 
                            return "timeout"
                        }
                    }
                    return "err"
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
    export function Obloq_getHeartbeat(time: number): string { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|1|3|" + time + "|\r")
        if (!initmqtt) {
            let num = 0
            let item = ""
            while (OBLOQ_TRUE) {
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '1') {
                            if (item.charAt(i - 1) == '|' &&//|1|3|
                                item.charAt(i + 1) == '|' &&
                                item.charAt(i + 2) == '3' &&
                                item.charAt(i + 3) == '|'
                            ) {
                                return "OK"
                            }
                        } else if (item.charAt(i) == 't'&&//timeout
                            item.charAt(i+1) == 'i' &&
                            item.charAt(i+2) == 'm' &&
                            item.charAt(i+3) == 'e' &&
                            item.charAt(i+4) == 'o' &&
                            item.charAt(i+5) == 'u' &&
                            item.charAt(i+6) == 't'
                        ) { 
                            return "timeout"
                        }
                    }
                    return "err"
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
    export function Obloq_stopHeartbeat(): boolean { 
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|1|3|-1000|\r")
        return OBLOQ_TRUE
    }



    /**
     * Reconnect WiFi.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=99
    //% blockId=Obloq_reconnectWifi
    //% block="reconnectWifi timeout %time"
    export function Obloq_reconnectWifi(time: number): boolean {
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|2|2|\r")
        if (!initmqtt) {
            let item = ""
            let num = 0
            let j = 0
            while (OBLOQ_TRUE) {
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '2') {
                            if (item.charAt(i - 1) == '|' &&
                                item.charAt(i + 1) == '|' &&
                                item.charAt(i + 2) == '3' &&
                                item.charAt(i + 3) == '|'
                            ) {
                                j = i + 2
                                let z = 0
                                let ip = ""
                                for (i = i + 2; i < num; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                ip = ""
                                ip = item.substr(j, z)
                                IP = ip
                                FIRST = false
                                //serial.writeString(IP);
                                //serial.writeString("\r\n");
                                return OBLOQ_TRUE
                            }
                        }
                    }
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
     * @param SSID name of the value stream, eg: SSID
     * @param PWD name of the value stream, eg: PASSWORD
     * @param time to timeout, eg: 10000
    */
    //% weight=100
    //% blockId=Obloq_connectWifi
    //% block="connect wifi to %SSID| %PWD| timeout %time"
    export function Obloq_connectWifi(SSID: string, PWD: string, time: number): void { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (FIRST) { 
            //let item = ""
            //serial.writeString("123")
            //item = serial.readString()
            //item = serial.readString()
            //item = serial.readString()
            // serial.redirect(
            //    SerialPin.P2,
            //    SerialPin.P1,
            //    BaudRate.BaudRate9600
            //)
            //obloqSetTxBufferSize(60)
            //obloqSetRxBufferSize(60)
            if (!serialinit) { 
                Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
            }
            for (let i = 0; i < 3; i++) {
                obloqWriteString("|1|1|\r")
                basic.pause(100)
            }
            
            obloqreadString(obloqgetRxBufferSize())
            basic.pause(10)
            obloqWriteString("|2|1|"+SSID+","+PWD+"|\r")
        }
        if (!initmqtt) {
            let item = ""
            let num = 0
            let j = 0
            while (OBLOQ_TRUE) {
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '3') {
                            if (item.charAt(i + 1) == '|' && //|2|3|
                                item.charAt(i - 1) == '|' &&
                                item.charAt(i - 2) == '2' &&
                                item.charAt(i - 3) == '|'
                            ) {
                                j = i + 2
                                let z = 0
                                let ip = ""
                                for (i = i + 2; i < num; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                ip = item.substr(j, z)
                                IP = ip
                                FIRST = OBLOQ_FALSE
                                //serial.writeString(IP);
                                //serial.writeString("\r\n");
                                return
                            }
                        }
                    }
                }
                /* serial.writeNumber(num)
                 serial.writeString("\r\n");
                 item = obloqreadString(num)
                 for (let i = 0; i < num; i++) { 
                     serial.writeString(item.charAt(i));
                     if (item.charAt(i) == '3') {
                         basic.pause(1000)
                         return
                     }
                 }
                 serial.writeString("\r\n");*/
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) { 
                    basic.showIcon(IconNames.No)
                    return
                }
            }
        }
        return
    }

    /**
     * Get IP address.
    */
    //% weight=98
    //% blockId=Obloq_Obloq_ifconfig
    //% block="ifconfig"
    export function Obloq_ifconfig(): string { 
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
    export function Obloq_initHttp(ip: string, port: number): void { 
        defobloq = true
        myip = ip
        myport = port
        initmqtt = OBLOQ_FALSE
    }

    /**
     * The HTTP get request.url(string):URL:time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=79
    //% blockId=Obloq_httpGet
    //% block="http get | url %url| timeout %time"
    export function Obloq_httpGet(url: string, time: number): string[] { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|3|1|http://" + myip + ":" + myport + "/" + url + "|\r")
        //while((strncmp(buf,"|1|3|\r",strlen(buf)) == 0)){
        //    buf = readbuf(mp_obj_get_int(time));
        //  }
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            num = obloqRxBufferedSize()
            //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
            if (num >= 5) {
                item = obloqreadString(num)
                for (let i = 0; i < num; i++) {
                    if (item.charAt(i) == '3') {
                        if (item.charAt(i - 1) == '|' && //|3|200|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '2' &&
                            item.charAt(i + 3) == '0' &&
                            item.charAt(i + 4) == '0' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            j = i + 6
                            for (i = i + 6; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let list = ["200", item.substr(j, z)]
                            return list
                        } else if (item.charAt(i - 1) == '|' && //|3|err|
                            item.charAt(i + 1) == '|'
                        ) {
                            let z = 0
                            j = i + 2
                            for (i = i + 2; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let err = item.substr(j, z)
                            let list = [err, ""]
                            return list
                        }
                    } else if (item.charAt(i) == '2') {
                        if (item.charAt(i - 1) == '|' && //|2|1|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '1' &&
                            item.charAt(i + 3) == '|'
                        ) {
                            let list = ["999", "disconnet wifi"]
                            return list
                        }
                    }
                }
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
    }






    /**
     * The HTTP post request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=78
    //% blockId=Obloq_httpPost
    //% block="http post | url %url| content %content| timeout %time"
    export function Obloq_httpPost(url: string, content: string, time: number): string[] { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|3|2|http://" + myip + ":" + myport + "/" + url + "," + content + "|\r")
        //while((strncmp(buf,"|1|3|\r",strlen(buf)) == 0)){
        //    buf = readbuf(mp_obj_get_int(time));
        //  }
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            num = obloqRxBufferedSize()
            //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
            if (num >= 5) {
                item = obloqreadString(num)
                for (let i = 0; i < num; i++) {
                    if (item.charAt(i) == '3') {
                        if (item.charAt(i - 1) == '|' && //|3|200|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '2' &&
                            item.charAt(i + 3) == '0' &&
                            item.charAt(i + 4) == '0' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            j = i + 6
                            for (i = i + 6; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let list = ["200", item.substr(j, z)]
                            return list
                        } else if (item.charAt(i - 1) == '|' && //|3|err|
                            item.charAt(i + 1) == '|'
                        ) {
                            let z = 0
                            j = i + 2
                            for (i = i + 2; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let err = item.substr(j, z)
                            let list = [err, ""]
                            return list
                        }
                    } else if (item.charAt(i) == '2') {
                        if (item.charAt(i - 1) == '|' && //|2|1|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '1' &&
                            item.charAt(i + 3) == '|'
                        ) {
                            let list = ["999", "disconnet wifi"]
                            return list
                        }
                    }
                }
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
    }


    /**
     * The HTTP put request,Obloq.put() can only be used for http protocol!
     * url(string): URL; content(string):content; time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=77
    //% blockId=Obloq_httpPut
    //% block="http put | url %url| content %content| timeout %time"
    export function Obloq_httpPut(url: string, content: string, time: number): string[] {
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|3|3|http://"+myip+":"+myport+"/"+url+","+content+"|\r")
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            num = obloqRxBufferedSize()
            //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
            if (num >= 5) {
                item = obloqreadString(num)
                for (let i = 0; i < num; i++) {
                    if (item.charAt(i) == '3') {
                        if (item.charAt(i - 1) == '|' && //|3|200|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '2' &&
                            item.charAt(i + 3) == '0' &&
                            item.charAt(i + 4) == '0' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            j = i + 6
                            for (i = i + 6; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let list = ["200", item.substr(j, z)]
                            return list
                        } else if (item.charAt(i - 1) == '|' && //|3|err|
                            item.charAt(i + 1) == '|'
                        ) {
                            let z = 0
                            j = i + 2
                            for (i = i + 2; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let err = item.substr(j, z)
                            let list = [err, ""]
                            return list
                        }
                    } else if (item.charAt(i) == '2') {
                        if (item.charAt(i - 1) == '|' && //|2|1|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '1' &&
                            item.charAt(i + 3) == '|'
                        ) {
                            let list = ["999", "disconnet wifi"]
                            return list
                        }
                    }
                }
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
    }




    /**
     * Delete an HTTP connection.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */ 
    //% weight=76
    //% blockGap=50
    //% blockId=Obloq_httpDelete
    //% block="http delete | url %url| content %content| timeout %time"
    export function Obloq_httpDelete(url: string, content: string, time: number): string[] {
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|3|4|http://"+myip+":"+myport+"/"+url+","+content+"|\r")
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            num = obloqRxBufferedSize()
            //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
            if (num >= 5) {
                item = obloqreadString(num)
                for (let i = 0; i < num; i++) {
                    if (item.charAt(i) == '3') {
                        if (item.charAt(i - 1) == '|' && //|3|200|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '2' &&
                            item.charAt(i + 3) == '0' &&
                            item.charAt(i + 4) == '0' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            j = i + 6
                            for (i = i + 6; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let list = ["200", item.substr(j, z)]
                            return list
                        } else if (item.charAt(i - 1) == '|' && //|3|err|
                            item.charAt(i + 1) == '|'
                        ) {
                            let z = 0
                            j = i + 2
                            for (i = i + 2; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let err = item.substr(j, z)
                            let list = [err, ""]
                            return list
                        }
                    } else if (item.charAt(i) == '2') {
                        if (item.charAt(i - 1) == '|' && //|2|1|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '1' &&
                            item.charAt(i + 3) == '|'
                        ) {
                            let list = ["999", "disconnet wifi"]
                            return list
                        }
                    }
                }
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
    }
    
/*  readbuf
    function readbuf(timeout: number): string { 
        let item = " "
        let num = 0
        let time = 0
        while (true) { 
            num = obloqRxBufferedSize()
            if (num) { 
                item = obloqreadString(num)
                break
            }
            basic.pause(1)
            time += 1
            if (time > timeout) { 
                item = "timeout"
                break
            }
        }
        return item
    }
*/

    /**
     * Set the MQTT related parameters.
     * callback(none):The default fixed parameter, the user does not care, 
     * the listening callback function calls the "callbackfunction" directly.
     * url(string): URL; port(number):The port number.
     * @param port set port, eg: 1883
    */
    //% weight=70
    //% blockId=Obloq_initMqtt
    //% block="mqtt set | callback %callback| url %url| port %port"
    export function Obloq_initMqtt(callback: Callback, url: string, port: number): void { 
        defobloq = OBLOQ_TRUE
        mycb = cb
        myhost = url;
        mymqport = port;
        initmqtt = OBLOQ_TRUE;

        onEvent()
    }    

    /**
     * Reconnect the MQTT.
    */
    //% weight=65
    //% blockId=Obloq_reconnectMqtt
    //% block="mqtt reconnect"
    export function Obloq_reconnectMqtt(): void {
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|4|1|5|\r")
    }  

    /**
     * Disconnect the MQTT connection.
    */
    //% weight=66
    //% blockId=Obloq_disconnectMqtt
    //% block="mqtt disconnect"
    export function Obloq_disconnectMqtt(): void { 
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
    }  

    /**
     * Connect the MQTT.
     * @param Iot_id set Iot_id, eg: Iot_id
     * @param Iot_pwd set Iot_pwd, eg: Iot_pwd
    */
    //% weight=69
    //% blockId=Obloq_connectMqtt
    //% block="mqtt connect | iot id %Iot_id| iot pwd %Iot_pwd"
    export function Obloq_connectMqtt(Iot_id: string, Iot_pwd: string): void { 
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|4|1|1|"+myhost+"|"+mymqport+"|"+Iot_id+"|"+Iot_pwd+"|\r")
    }  

    /**
     * Send a message.
     * @param top set top, eg: top
     * @param mess set mess, eg: mess
    */
    //% weight=68
    //% blockId=Obloq_sendMessage
    //% block="pubLish | top %top| mess %mess"
    export function Obloq_sendMessage(top: string, mess: string): void { 
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|4|1|3|"+top+"|"+mess+"|\r")
    }  

    /**
     * Subscribe to a Topic
     * @param top set top, eg: top
    */
    //% weight=67
    //% blockId=Obloq_subTopic
    //% block="subTopic | %top"
    export function Obloq_subTopic(top: string): void { 
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
        obloqWriteString("|4|1|2|"+top+"|\r")
    }  

    function obloq_mqttCallback(a: Action): void{
        cb = a
    }

    /**
     * This is an MQTT listener callback function, which is very important.
     * The specific use method can refer to "example/ObloqMqtt.ts"
    */
    //% weight=62
    //% blockGap=50
    //% mutate=objectdestructuring
    //% mutateText=Packeta
    //% mutateDefaults="mye:e,myparam:param"
    //% blockId=obloq_mqttCallbackUser block="callback function"
    export function obloq_mqttCallbackUser(cb: (packet: Packeta) => void) {
        obloq_mqttCallback(() => {
            const packet = new Packeta();
            packet.mye = e
            packet.myparam = param;
            cb(packet)
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
                    if (item.charAt(i - 1) == '|' &&
                        item.charAt(i + 1) == '|'
                    ) {
                        if (item.charAt(i + 2) == '1') { //|1|1|
                            e = "Pingok"
                            param = ""
                            break
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
                            break
                        } else if (item.charAt(i + 2) == '3') { //|1|3|
                            e = "Heartbeat"
                            param = "OK"
                            break
                        } 
                    }
                } else if (item.charAt(i) == '2') {
                    if (item.charAt(i - 1) == '|' &&
                        item.charAt(i + 1) == '|'
                    ) {
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
                            break
                        } else if (item.charAt(i + 2) == '4') { //|2|4|
                            e = "DisConnected"
                            param = "fail"
                            break
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
                                break
                            } else if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '2' && //|4|1|2|1|
                                item.charAt(i + 5) == '|' &&
                                item.charAt(i + 6) == '1' &&
                                item.charAt(i + 7) == '|'
                            ) {
                                e = "SubOk"
                                param = ""
                                break
                            } else if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '3' && //|4|1|3|1|
                                item.charAt(i + 5) == '|' &&
                                item.charAt(i + 6) == '1' &&
                                item.charAt(i + 7) == '|'
                            ) {  //led.plot(0, 1)
                                e = "PulishOk"
                                param = ""
                                break
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
                                break
                            }
                        } else if (item.charAt(i + 2) == '2') {
                            if (item.charAt(i + 3) == '|' &&  //|4|2|3|
                                item.charAt(i + 4) == '3' &&
                                item.charAt(i + 5) == '|'
                            ) {
                                e = "MqttConnectErr"
                                param = ""
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
                                break
                            }
                        }
                    }
                }
            }
            //serial.writeNumber(n);
            // serial.writeString("\r\n");
            obloqforevers(mycb)
        }
        //onEvent()
    }

    function onEvent() {
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate9600)
        }
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
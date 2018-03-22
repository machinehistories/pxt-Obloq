# Obloq

OBLOQ - IoT Module
![image](http://wiki.dfrobot.com.cn/images/7/71/OBLOQ%E5%BC%95%E8%84%9A%E8%AF%B4%E6%98%8E%E5%9B%BE.jpg)
---------------------------------------------------------

## Table of Contents

* [URL](#url)
* [Summary](#summary)
* [Blocks](#blocks)
* [Example](#example)
* [License](#license)

## URL
project URL: ```https://github.com/DFRobot/pxt-Obloq```

## Summary
Internet of things is the embedded system technology, mobile technology, web technology all together, the soul of its development is based on the user experience as the core, is characterized with hardware, network, platform, service and other different stakeholders in the field of industry cooperation or fusion directly.
Along with the development of the Internet of things, the heat increases, several mature Internet platform at home and abroad, but most of the Internet of things platform are geared to the needs of professional developers, complex operation, learn hard.To this end, we have launched the OBLOQ Internet of things module, which is equipped with DFRobot's own Internet of things platform, which greatly reduces the use threshold of the Internet of things.
OBLOQ is a serial port of WIFI connection module for receiving and sending Internet of things information.Compact size, low price, simple interface, plug and play, suitable for 3.3V~5V control system.Simple software programming, without complex basic knowledge, can quickly build a set of Internet of things applications.
Board firmware upgrade switch, easy to upgrade the firmware.

## Blocks
### 1.WIFI and SERIAL
![image](https://github.com/DFRobot/pxt-Obloq/blob/master/image/WIFI&SERIAL.png)
### 2.HTTP
![image](https://github.com/DFRobot/pxt-Obloq/blob/master/image/HTTP.png)
### 3.MQTT
![image](https://github.com/DFRobot/pxt-Obloq/blob/master/image/MQTT.png)
### 4.OTHER
![image](https://github.com/DFRobot/pxt-Obloq/blob/master/image/OTHER.png)

## Example
### 1.HTTP
![image](https://github.com/DFRobot/pxt-Obloq/blob/master/image/demoHTTP.png)

get code ```https://github.com/DFRobot/pxt-Obloq/blob/master/example/ObloqHttp.ts```

#### steps:
[Download server](http://docs.dfrobot.com.cn/Myweather1.3.1.rar)<br>
1.Install more than 2.7 versions of python on your computer.<br>
2.Install the flask: ```'pip install Flask'```.<br>
3.Initialize server:```'python webapp.py'```.<br>
4.Start Server: ```'python webapp.py'```.<br>
5.Set the WIFI ID and password in the program and set the server's IP address and port number.<br>
6.Connect the serial port of the microbit with the Obloq (tx to rx, rx to tx).<br>
7.Click to download and run.

### 2.MQTT
![image](https://github.com/DFRobot/pxt-Obloq/blob/master/image/demoMQTT.png)

get code: ```https://github.com/DFRobot/pxt-Obloq/blob/master/example/ObloqMqtt.ts```

Get the iot of things platform: [East IoT](http://iot.dfrobot.com.cn/).

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
```package
gamePad=github:DFRobot/pxt-Obloq
```

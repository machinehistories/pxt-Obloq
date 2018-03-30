#include "pxt.h"
using namespace pxt;
namespace Obloq {

    //%
    int obloqgetRxBufferSize(){
        return uBit.serial.getRxBufferSize();
    }

    //%
    StringData* obloqreadString(int size){
        int n = size;
        if (n == 0) return ManagedString("").leakData();
        return ManagedString(uBit.serial.read(n, MicroBitSerialMode::ASYNC)).leakData();
    }

    //%
    void obloqSetTxBufferSize(int size){
        if(size > 100) {
            size = 100;
        }
        uBit.serial.setTxBufferSize(size);
    }

    //%
    void obloqSetRxBufferSize(int size){
        if(size > 100) {
            size = 100;
        }
        uBit.serial.setRxBufferSize(size);
    }

    //%
    int obloqRxBufferedSize(){
        return uBit.serial.rxBufferedSize();
    }

    //%
    void obloqEventAfter(int len){
        uBit.serial.eventAfter(len, MicroBitSerialMode::ASYNC);
    }

    //%
    void obloqEventOn(StringData* msg){
        uBit.serial.eventOn(msg, MicroBitSerialMode::ASYNC);
    }

    //%
    void obloqClearRxBuffer(){
        uBit.serial.clearRxBuffer();
    }

    //%
    void obloqClearTxBuffer(){
        uBit.serial.clearTxBuffer();
    }

    //%    
    void forever_stubs(void *a) {
        runAction0((Action)a);
    }

    //%
    void obloqforevers(Action a) {
      if (a != 0) {
        incr(a);
        create_fiber(forever_stubs, (void*)a);
      }
    }

    //%
    void obloqWriteString(StringData *text) {
      if (!text) {
          return;
      }
      uBit.serial.send(ManagedString(text));
    }

    //%
    void obloqDisDisplay() {
        uBit.display.disable();
    }

    //%
    void obloqEnDisplay() {
        uBit.display.enable();
    }

}
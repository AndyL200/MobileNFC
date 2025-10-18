import serial.tools.list_ports

STATUS_DEACTIVATE = "Unavailable"
START_KEY = "NFCSTART"


def listenOnPort(val : int):
    portList = []
    ports = serial.tools.list_ports.comports()
    serialInst = serial.Serial()
    portVar = None


    for onePort in ports:
        portList.append(onePort)
        print(str(onePort))
        if isinstance(onePort, str) and onePort.startswith("COM" + str(val)):
            portVar = "COM" + str(val)
    
    if not portVar:
        print("COM Port not found")
        return

    serialInst.baudrate = 115200
    serialInst.port = portVar
    serialInst.open()
    serialIn = ""
    #1000 bytes should be more than enough
    while len(serialIn) < 1000:
        if serialInst.in_waiting:
            #read bytes
            packet = serialInst.readline()
            dec = packet.decode('utf')
            print(dec)
            serialIn += dec
            if dec == STATUS_DEACTIVATE:
                break
        if serialInst.closed:
            break
    
    lines = serialIn.split('\n')
    #should be a string already decoded as unicode 8 characters
    data = None
    for l in lines:
        if l.startswith(START_KEY):
            data = l[len(START_KEY):]
    if not data:
        print("APDU data not found")
        return

    with open("TNumber.txt", 'a', encoding='utf-8') as f:
        f.write(data)



if __name__ == "__main__":
    listenOnPort(input("Select Port: COM"))
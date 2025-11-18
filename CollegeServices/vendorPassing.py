import serial.tools.list_ports
import json

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

    def extract_json_between_braces(s: str):
        start = s.find('{')
        if start == -1:
            return None
        depth = 0
        for i in range(start, len(s)):
            ch = s[i]
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    return s[start:i+1]
        return None
    #should be a string already decoded as unicode 8 characters
    data = None
    for l in lines:
        if l.startswith(START_KEY):
            json_str = extract_json_between_braces(l[len(START_KEY):])
            if json_str:
                try:
                    data = json.loads(json_str)
                    break
                except json.JSONDecodeError:
                    print("JSON decode failed for extracted text:", json_str)
                    continue
    if not data:
        print("APDU data not found")
        return

    with open("TNumber.json", 'w', encoding='utf-8') as f:
        json.dump(data, f)


if __name__ == "__main__":
    listenOnPort(input("Select Port: COM"))
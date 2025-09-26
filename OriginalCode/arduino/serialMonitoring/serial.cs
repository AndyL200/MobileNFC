using System;
using System.Text;
using System.Text.Json;
using System.IO;
using System.IO.Ports;

namespace myNameIs
{
    public class writtenObject
    {
        public string first { get; set; }
        public string second { get; set; }

        public byte third { get; set; }

        public string fourth { get; set; }

        public writtenObject(string first, string second, byte third, string fourth)
        {
            this.first = first;
            this.second = second;
            this.third = third;
            this.fourth = fourth;
        }

        public string toStringJson()
        {
            return JsonSerializer.Serialize(this);
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            string port = "COM5";
            int baud = 115200;
            writtenObject w = new writtenObject("name", "json", 13, "old");
            string json = w.toStringJson();
            System.Console.WriteLine(json);
            File.WriteAllText("data.json", json);
            byte[] jsonBytes = Encoding.UTF8.GetBytes(json);

            try
            {
                using (SerialPort serialPort = new SerialPort(port, baud))
                {
                    serialPort.Open();
                    serialPort.Write(jsonBytes, 0, jsonBytes.Length);
                    serialPort.Close();
                }
                System.Console.WriteLine("Data sent successfully.");
            }
            catch (Exception ex)
            {
                System.Console.WriteLine("Error: " + ex.Message);
            }
            return;
        }
    }
}
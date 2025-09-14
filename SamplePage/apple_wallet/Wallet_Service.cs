using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using SamplePage.apple_wallet.TemplateConfig;

namespace apple_wallet

{
    public class Wallet_Service
    {
        //change the env names so the github scrapers don't come looking
        private string client_user = Environment.GetEnvironmentVariable("UBUZNARME") ?? "";
        private string client_password = Environment.GetEnvironmentVariable("PEAZAR") ?? "";


        public AppleWalletConfiguration _appleWalletConfiguration; 
        public Wallet_Service(AppleWalletConfiguration appleWalletConfiguration)
        {
            _appleWalletConfiguration = appleWalletConfiguration;
        }
        public async Task<HttpResponseMessage> CreateWalletPass(string orderId, string eventId)
        {
            hashedSerialNumber = await RequestPass(orderId, eventId);
            if (hashedSerialNumber == -1)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
            //maybe use the integer values for different error codes
            return new HttpResponseMessage()
            {
                Content = new ByteArrayContent(passBundle)
                {
                    Headers =
                    {
                        ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/vnd.apple.pkpass"),
                        ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment; filename=tickets.pkpass.zip; filename*=UTF-8''tickets.pkpass.zip")
                    }
                },
                StatusCode = HttpStatusCode.OK
            };
        }
        //these parameters may be subject to change
        private async Task<int> RequestPass(string orderId, string eventId)
        {
            //using passsource api
            using HttpClient client = new HttpClient();
            string login_url = "https://api.passsource.com/v1/passes";
            try
            {
                HttpResponseMethod response = await client.GetAsync(url);
                //status code between 200 and 299
                response.EnsureSuccessStatusCode();

                string body = await response.Content.ReadAsStringAsync();
                Console.WriteLine(body);

            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("Exception : ", +e.Message);
                return -1;
            }

            var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(body);
            if (dict == null)
            {
                return -1;
            }

            int clientHash = dict["clientHash"] as int;
            if (clientHash == null)
            {
                return -1;
            }
            //TODO clean this up
            string client_templates_url = "";
            try
            {
                response = await client.GetAsync(client_templates_url);
                response.EnsureSuccessStatusCode();
                body = await response.Content.ReadAsStringAsync();

                Console.WriteLine(body);
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("Exception : ", +e.Message);
                return -1;
            }

            dict = JsonSerializer.Deserialize<Dictionary<string, object>>(body);
            int l = dict["templates"].Length as string[];
            if (dict == null || l == 0)
            {
                return -1;
            }

            //bad practice
            TemplateConfig[] templates = new TemplateConfig[l];
            for (int i = 0; i < templates.Length; ++i)
            {
                //as of right now dict["templates"][i] is an object
                templates[i] = JsonSerializer.Deserialize<TemplateConfig>(dict["templates"][i].ToString());
            }

            TemplateConfig selectedTemplate = templates[0];
            int temp_hash = selectedTemplate.templateHash;

            try
            {
                reponse = await client.GetAsync("");
                reponse.EnsureSuccessStatusCode();
                body = await response.Content.ReadAsStringAsync();

                Console.WriteLine(body);
            }

            catch (HttpRequestException e)
            {
                Console.WriteLine("Exception : ", +e.Message);
                return -1;
            }
            dict = JsonSerializer.Deserialize<Dictionary<string, object>>(body);
            int hashedSerial = dict["hashedSerialNumber"] as int;
            return hashedSerial;


        }
    }
}
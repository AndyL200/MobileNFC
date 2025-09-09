using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;
using myNameIs;
using Passbook.Generator;

namespace apple_wallet

{
    public class Functions
    {
        public HttpResponseMessage Default(string orderId, string eventId)
        {
            PassGeneratorRequest request = GetPassRequest(orderId, eventId);
            var generator = new PassGenerator();
            var passBundle = generator.Generate(request);

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
        private async Task<PassGeneratorRequest> GetPassRequest(string orderId, string eventId)
        {
            var eventName = "Sample Event";
            var ticketType = "ID";
            var date = DateTime.Now;

            var icon = await _appleWalletConfiguration.GetIcon();
            var logo = await _appleWalletConfiguration.GetLogo();
            var request = new PassGeneratorRequest
            {
                Style = PassStyle.Generic,
                PassTypeIdentifier = _appleWalletConfiguration.PassTypeIdentifier,
                SerialNumber = serialNumber,
                GroupingIdentifier = eventId.ToString(),
                BackgroundColor = "rgb(255,255,255)",
                LabelColor = "rgb(0,0,0)",
                ForegroundColor = "rgb(0,0,0)",
                Images =
                {
                    {PassbookImage.Icon, icon },
                    {PassbookImage.Icon2X, icon},
                    {PassbookImage.Icon3X, icon},
                    {PassbookImage.Logo, logo},
                    {PassbookImage.Logo2X, logo},
                    {PassbookImage.Icon3X, icon}
                },
                Description = _appleWalletConfiguration.Description,
                AppleWWDRCACertificate = _appleWalletConfiguration.AppleWWDRCACertificate(),
                PassbookCertificate = _appleWalletConfiguration.PassbookCertificate()

            };
            writtenObject w = new writtenObject();
            request.Nfc = new Nfc(w.toStringJson(), "");
        }
        
    }
}
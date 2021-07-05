using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Infrastructure.Email
{
    public class EmailSender
    {
        private readonly IConfiguration _config;
        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            var client = new SendGridClient(_config["SendGrid:Key"]);
            var sendGridMessage = new SendGridMessage
            {
                From = new EmailAddress("sudimayenge@gmail.com", _config["SendGrid:User"]),
                Subject = emailSubject,
                PlainTextContent = message,
                HtmlContent = message
            };

            sendGridMessage.AddTo(new EmailAddress(userEmail));
            await client.SendEmailAsync(sendGridMessage);
        }
    }
}
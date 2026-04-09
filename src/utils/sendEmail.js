const {SendEmailCommand} = require("@aws-sdk/client-ses");
const {sesClient} = require("./sesClient");


const createSendEmailCommand = (toAddress, fromAddress, userName, interestingUserName) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <body style="font-family: Arial, sans-serif; color: #333;">
                <h2>You've Got a New Connection!</h2>
                <p>Hi ${userName},</p>
                <p><strong>${interestingUserName}</strong> is interested in connecting with you on DevTinder!</p>
                <p>Check out their profile and decide if you'd like to accept or decline this connection request.</p>
                <p style="margin-top: 20px;">
                  <a href="http://localhost:5173/requests" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    View Connection Requests
                  </a>
                </p>
                <p style="margin-top: 20px; font-size: 12px; color: #666;">
                  Best regards,<br>
                  The DevTinder Team
                </p>
              </body>
            </html>
          `,
        },
        Text: {
          Charset: "UTF-8",
          Data: `Hi ${userName},\n\n${interestingUserName} is interested in connecting with you on DevTinder!\n\nCheck out their profile and decide if you'd like to accept or decline this connection request.\n\nBest regards,\nThe DevTinder Team`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `${interestingUserName} is interested in connecting with you!`,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async (toUserName, fromUserName) => {
  const sendEmailCommand = createSendEmailCommand(
    "kschrn2220@gmail.com",
    "devtinder.support@gmail.com",
    toUserName,fromUserName
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };
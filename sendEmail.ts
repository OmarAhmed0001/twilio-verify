import mailgun from "mailgun-js";

const apiKey: string = "47c6d70e37b9701819d1631a68ad33ba-8c9e82ec-8678e4c1";
const domain: string = "sandbox70efa1986f5447f2acf430f3c89bbcbf.mailgun.org";
// const url = `https://api.mailgun.net/v3/${domain}/messages`;
const mg = mailgun({ apiKey, domain });

interface MessageData {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  text: string
): Promise<void> => {
  const messageData: MessageData = {
    from,
    to,
    subject,
    text,
  };

  try {
    const result = await mg.messages().send(messageData);
    console.log("Email sent successfully:", result);
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

// Example usage
const exampleFrom: string = "Excited User <oa1476@fayoum.edu.eg>";
const exampleTo: string = "omarahmed26062000@gmail.com";
const exampleSubject: string = "Hello";
const exampleText: string = "Testing some Mailgun awesomeness!";

sendEmail(exampleFrom, exampleTo, exampleSubject, exampleText)
  .then(() => {
    console.log("Email sent successfully");
  })
  .catch((err) => {
    console.error("Failed to send email:", err.message);
  });

const express = require("express");
const twilio = require("twilio");
const crypto = require("crypto");

const serviceSid = "VA4f47f3b44792a8d5a7da4d2f7bb6430f";
const accountSid = "AC8de792a58ff4a871f0723c56d55d7d4e";
const authToken = "84161949af2381179b6a1596bc8df6fc";
const client = twilio(accountSid, authToken);

const app = express();

app.use(express.json()); // Parse JSON requests

// Generate a random verification code
function generateVerificationCode() {
  const code = crypto.randomBytes(4).toString("hex");
  return code.toUpperCase();
}

// Send a verification code to a phone number
app.post("/send-verification-code", async (req, res) => {
  const { phoneNumber } = req.body; // Extract phoneNumber from the request body

  try {
    if (!serviceSid) {
      throw new Error("TWILIO_VERIFY_SERVICE_SID is not defined");
    }

    // Generate a verification code
    const verificationCode = generateVerificationCode();

    // Send the verification code
    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({
        from: "+12058998410",
        customFriendlyName: "My Verify Service",
        to: phoneNumber,
        code: verificationCode,
        channel: "sms",
      });

    // Respond with the verification SID and status
    res.status(200).send({
      sid: verification.sid,
      status: verification.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

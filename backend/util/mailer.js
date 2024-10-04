const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    const { to, subject, password, name } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "devkayasth1611@gmail.com",
        pass: "fatd kdha mlbu kpja", // Update with your actual password or app-specific password
      },
    });

    const mailOptions = {
      from: "devkayasth1611@gmail.com",
      to,
      subject,
      html: `
        <html>
          <head>
            <style>
              body {
                background-color: lightblue;
                color: darkblue;
              }
              .container {
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 10px;
                max-width: 600px;
                margin: auto;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome to Our Platform, ${name}!</h1>
              <p>We are excited to have you on board. Here are your login details:</p>
              <p><strong>Email:</strong> ${to}</p>
              <p><strong>Password:</strong> ${password}</p>
              <p>Please keep your credentials safe and secure. We hope you enjoy using our platform!</p>
              <p>Best Regards,<br/>The Team</p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send({ message: "Error sending email" });
  }
};

module.exports = sendMail;

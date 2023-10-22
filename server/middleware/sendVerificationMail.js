const { createMailTransporter } = require("./createMailTransport");

const sendVerificationMail = (user) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: "'RoroStore' <wissamabdalwhab.97@gmail.com>",
    to: user.email,
    subject: "Verify your Email...",
    html: `<p> Hello ${user.name}, Verify your email by Clicking this Link...</p>
        <a href='https://roro-style.vercel.app/verified-email?emailToken=${user.emailToken}'>Verify your Email</a>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verify Email Sent");
    }
  });
};

module.exports = { sendVerificationMail };

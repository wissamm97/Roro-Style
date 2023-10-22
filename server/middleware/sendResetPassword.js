const { createMailTransporter } = require("./createMailTransport");

const sendResetPassword = (user) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: "RoroStore' <wissamabdalwhab.97@gmail.com>",
    to: user.email,
    subject: "Reset Your Password",
    html: `<p> Hello ${user.name},Clicking this Link To Create a new password</p>
        <a href='https://roro-style.vercel.app/change-password?emailToken=${user.emailToken}'>Verify your Email</a>
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

module.exports = { sendResetPassword };

const { createMailTransporter } = require("./createMailTransport");

const sendMessage = (messagec) => {
  const transporter = createMailTransporter();
  const mailOptions = {
    from: `${messagec.email}`,
    to: "wissamabdalwhab.97@gmail.com",
    subject: `${messagec.title}`,
    html: `<h2>${messagec.name}</h2><br><p>${messagec.message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verify Email Sent");
    }
  });
};

module.exports = { sendMessage };

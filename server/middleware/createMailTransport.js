const nodemailer = require("nodemailer");

const createMailTransporter = () => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smpt.gmai.com",
    port: 465,
    auth: {
      user: "wissamabdalwhab.97@gmail.com",
      pass: "tzvm idcn jyro atof",
    },
  });
  return transport;
};

module.exports = { createMailTransporter };

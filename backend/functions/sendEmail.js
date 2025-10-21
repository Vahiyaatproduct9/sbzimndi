import Mail from "../libs/nodemailer.js";
export default async function sendMail({ to, subject, html, body }) {
  const info = await Mail.sendMail({
    from: "SbziMndi Community<kishordebnath123123@gmail.com>",
    to,
    subject,
    text: body,
    html,
  });
  return info;
}

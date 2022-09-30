import Mail from "../lib/Mail";

export default {
  key: "RegistrationMail",
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: "Queue Test <queue@queuetest.com>",
      to: `${user.name} <${user.email}>`,
      subject: "User registration",
      html: `Hello, ${user.name}, welcome to the queuing system.`,
    });
  },
};

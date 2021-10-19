export default {
  key: 'UserReport',
  options: {
    delay: 5000,
  },
  async handle({ data }) {
    const { user } = data;

    console.log(user);
  },
};
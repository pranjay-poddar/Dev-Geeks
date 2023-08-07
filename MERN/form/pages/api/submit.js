import mongoose from 'mongoose';
import FormData from './models/formData';
import CONFIG from '../../src/_utils/config';

const url = CONFIG.MONGO_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MONGODB Successfully connected")
})

export default async function handler(req, res) {

  console.log("I am API SUBMIT");

  if (req.method === 'POST') {

    const data = req.body;

    try {
      const existingEmail = await FormData.findOne({ email: data.email });
      if (existingEmail) {
        return res.status(409).json({ message: 'Form already submitted.' });
      }
      let formDataObj = new FormData(data);
      await formDataObj.save();
      res.status(200).json({ message: 'Submitted successfully!' });
    }
    catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Error saving form data!' });
    }
  }
  else if (req.method === 'GET') {

    const { id, info } = req.query

    try {

      if (id === CONFIG.SuperID && info === CONFIG.SuperPass) {
        const formData = await FormData.find({});
        return res.status(200).json(formData);
      }
      return res.status(301).json({ message: 'Invalid!' });
    }
    catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Error form data!' });
    }

  }
  else {
    res.status(405).end(); // Method Not Allowed
  }
}
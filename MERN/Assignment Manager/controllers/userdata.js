const Form = require('../models/form');

const getFormData = async (req, res) => {

    const data = req.body;
    
    try {
        const formData = await Form.findOne({ email: data.email });

        if(formData) {
            res.status(201).json({formData : formData});
        }
        else {
            res.status(401).json({error : 'You have not made any submission yet'})
        }

    } catch (error) {
        return res.status(500).json({ error: "500 Internal Error" });
    }
}

const saveFormData = async (req, res) => {
    
    const data = req.body;

    try {
        const formData = await Form.findOne({ email: data.email });

        if(formData) {
            Form.findByIdAndUpdate(
                formData.id,
                data,
                { new: true },
                function (err, doc)
                {
                    if (err)
                    {
                      return res.status(500).json({ error: "NO user with such id" });
                    } else
                    {
                      return res.status(200).json({ formData: doc });
                    }
                }
            )
        } else {
            const newForm = new Form(data);
            await newForm.save();
            return res.status(200).json({ formData: newForm });
        }

    } catch (error) {
        return res.status(500).json({ error: "500 Internal Error" });
    }
}

module.exports = {
    getFormData,
    saveFormData
}

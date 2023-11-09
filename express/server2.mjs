import express from 'express';
import open from 'open';
import cors from 'cors';

const app = express();

const PORT = 4000;


app.use(express.json());
app.use(cors());


  app.post('/api/email', (req, res) => {
   const {email, subject, message} = req.body;

    const emailTo = email;
    const emailsubject = subject;
    const emailmessage = message;


    const mailUrl = `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(emailsubject)}&body=${encodeURIComponent(emailmessage)}`;

    (async () => {
      try {
        await open(mailUrl);
        console.log(`Opened default email client with the email address`);
        res.json({
          message : "successful"
      })
      } catch (error) {
        console.error('Error opening email client:', error);
        res.json({
          message : "Error opening email client"
      })
      }
    })();
    });


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
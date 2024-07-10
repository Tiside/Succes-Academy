const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { firstName, email, text } = req.body;

  // Настройка Nodemailer
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com', // Здесь укажите вашу почту
      pass: 'your-password' // Здесь укажите пароль от почты
    }
  });

  let mailOptions = {
    from: 'your-email@gmail.com', // Здесь укажите вашу почту
    to: 'SuccesAcademyc@gmail.com', // Здесь укажите получателя
    subject: 'Nowa Wiadomość od Kursy-Strona',
    text: `Imię: ${firstName}\nEmail: ${email}\nWiadomość: ${text}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const sgMail = require('@sendgrid/mail');

const PORT = process.env.PORT || 3000;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@example.com';
const TO_EMAIL = process.env.TO_EMAIL || process.env.FROM_EMAIL || '';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static site (optional) - useful for local testing
app.use(express.static(path.join(__dirname, '..')));

const dataDir = path.join(__dirname, 'data');
const messagesFile = path.join(dataDir, 'messages.json');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, '[]');

function saveMessage(record) {
  const current = JSON.parse(fs.readFileSync(messagesFile, 'utf8') || '[]');
  current.push(record);
  fs.writeFileSync(messagesFile, JSON.stringify(current, null, 2));
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Champs manquants' });
    }

    const record = {
      name,
      email,
      subject: subject || '',
      message,
      receivedAt: new Date().toISOString()
    };

    // Try send via SendGrid if configured
    if (SENDGRID_API_KEY && TO_EMAIL) {
      const mail = {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: subject ? `Contact: ${subject}` : 'Nouveau message depuis le portfolio',
        text: `De: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>De:</strong> ${name} &lt;${email}&gt;</p><p><strong>Sujet:</strong> ${subject || '-'} </p><p>${message}</p>`
      };

      await sgMail.send(mail);
      // also save locally
      saveMessage({ ...record, sentBy: 'sendgrid' });

      return res.json({ ok: true, source: 'sendgrid' });
    }

    // Fallback: save locally
    saveMessage({ ...record, sentBy: 'local' });
    return res.json({ ok: true, source: 'local' });

  } catch (err) {
    console.error('Error /api/contact', err);
    return res.status(500).json({ ok: false, error: 'Erreur serveur' });
  }
});

// health
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

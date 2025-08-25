const express = require('express');
const { getHistory, sendMessage } = require('../controllers/chatController');
const { uploadFaq,askFaq } = require('../controllers/faqController');
const formidable = require('formidable');
const fs = require('fs').promises;

const router = express.Router();

router.get('/history/:sessionId', getHistory);
router.post('/message', sendMessage);

// FAQ upload endpoint
router.post('/upload-faq', (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = files.file ? files.file[0] : null;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    req.file = {
      buffer: await fs.readFile(file.filepath),
      originalname: file.originalFilename,
      mimetype: file.mimetype
    };

    await fs.unlink(file.filepath);

    uploadFaq(req, res);
  });
});

router.post('/ask-faq', askFaq);

module.exports = router;
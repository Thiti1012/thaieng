const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/translate', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "No text provided" });
    }

    try {
        const response = await axios.post(
            "https://api.aiforthai.in.th/xiaofan-en-th/th2en",
            { text },
            {
                headers: {
                    "apikey": "shLGw5xHtKTjS7fkXroIMTIGmGzfTMzC",
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Backend API Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// รัน listen เฉพาะตอนรันในเครื่อง Local
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

// Export app ออกไปให้ Vercel ใช้งาน
module.exports = app;
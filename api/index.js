const axios = require('axios');

module.exports = async (req, res) => {
    const query = req.url.split('?')[1];
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        if (query === 'random-Flirt') {
            // Hinglish Flirting Lines ke liye source
            const response = await axios.get('https://raw.githubusercontent.com/Social-Siddharth/Hinglish-Flirt-API/main/flirt.json');
            const data = response.data;
            const random = data[Math.floor(Math.random() * data.length)];
            
            res.status(200).json({
                quote: random.line,
                writer: "Oye_Buggu",
                TG: "https://t.me/Tera_Paglu"
            });
        } else {
            // Normal English Quotes
            const response = await axios.get('https://zenquotes.io/api/random');
            res.status(200).json({
                quote: response.data[0].q,
                writer: response.data[0].a,
                TG: "https://t.me/Tera_Paglu"
            });
        }
    } catch (e) {
        res.status(500).json({ error: "Madarchod Api Churana Chahta Hai" });
    }
};

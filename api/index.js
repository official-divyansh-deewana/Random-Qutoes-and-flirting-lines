const axios = require('axios');

module.exports = async (req, res) => {
    const url = req.url;
    
    // Headers setup
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        // 1. Agar koi query parameter na ho (Welcome Page)
        if (!url.includes('?')) {
            return res.status(200).json({
                status: "Success",
                message: "Welcome to Divyansh Deewana api",
                how_to_use: {
                    quotes: "Add '?random' to get English quotes",
                    flirting: "Add '?random-Flirt' to get Flirting lines"
                },
                example: "https://random-qutoes-and-flirting-lines.vercel.app/?random-Flirt",
                TG: "t.me/tera_paglu"
            });
        }

        // 2. TARGET: Flirting Lines (PopCat API)
        if (url.includes('random-Flirt')) {
            const response = await axios.get('https://api.popcat.xyz/pickuplines');
            
            return res.status(200).json({
                quote: response.data.pickupline, // PopCat se line uthayi
                writer: "Oye_Buggu",
                TG: "t.me/tera_paglu"
            });
        } 

        // 3. TARGET: English Quotes (ZenQuotes)
        else if (url.includes('random')) {
            const response = await axios.get('https://zenquotes.io/api/random');
            
            return res.status(200).json({
                quote: response.data[0].q,
                writer: response.data[0].a,
                TG: "t.me/tera_paglu"
            });
        }

        // 4. Default 404
        else {
            res.status(404).json({ error: "Invalid Parameter! Please use ?random or ?random-Flirt" });
        }

    } catch (e) {
        res.status(500).json({ 
            error: "API down hai ya connection fail ho gaya!",
            message: e.message 
        });
    }
};

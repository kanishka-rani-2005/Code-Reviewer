const aiService = require('../services/ai.service')


async function getReview(req, res) {
    const code = req.body.code
    if (!code) {
        return res.status(400).send("Code is required")
    }

    try {
        const response = await aiService.generateContent(code)
        return res.send(response)
    } catch (err) {
        console.error('Error in getResponse:', err)
        return res.status(500).send('Internal server error')
    }
}


module.exports = { getReview }
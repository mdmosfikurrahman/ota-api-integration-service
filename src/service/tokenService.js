const { getSabreToken } = require('../utils/tokenProvider');

const fetchToken = async (req, res) => {
    try {
        const tokenData = await getSabreToken();
        res.json(tokenData);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { fetchToken };

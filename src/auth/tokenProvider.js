const axios = require('axios');

const getSabreToken = async () => {
    try {
        const base_url = "https://api.cert.platform.sabre.com";
        const username = "596420";
        const PseudoCityCode = "AO0L";
        const client_domain = "AA";
        const password = "ak19tstc";

        const JSON_Username = `V1:${username}:${PseudoCityCode}:${client_domain}`;
        const username_base64 = Buffer.from(JSON_Username).toString('base64');
        const password_base64 = Buffer.from(password).toString('base64');
        const Key_Generate = `${username_base64}:${password_base64}`;
        const Token = Buffer.from(Key_Generate).toString('base64');

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${Token}`,
        };

        const curl_url = `${base_url}/v2/auth/token?grant_type=client_credentials`;

        const response = await axios.post(curl_url, {}, { headers });
        return response.data;
    } catch (error) {
        console.error("Error getting Sabre token:", error.message);
        throw new Error("Failed to obtain access token");
    }
};

module.exports = { getSabreToken };

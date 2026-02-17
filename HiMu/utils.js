const axios = require('axios');

const fse = require('fs-extra');

module.exports = {

    getStreamFromURL: async function(url) {

        try {

            const response = await axios({

                url,

                method: 'GET',

                responseType: 'stream', 

                headers: { 'User-Agent': 'Telegram Bot' } 

            });

            return response.data; 

        } catch (error) {

            console.error(`❌ Error fetching stream:`, error.message);

            throw new Error("Failed to fetch stream from URL.");

        }

    },

    loadVerifiedUsers: async (filePath) => {

        try {

            return fse.existsSync(filePath) ? await fse.readJson(filePath) : {};

        } catch (error) {

            console.error("❌ Error loading verified users data:", error.message);

            return {};

        }

    },

    saveVerifiedUsers: async (filePath, data) => {

        try {

            await fse.writeJson(filePath, data, { spaces: 2 });

        } catch (error) {

            console.error("❌ Error saving verified users data:", error.message);

        }

    }

};
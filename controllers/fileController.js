'use strict';
const axios = require('axios');
const xlsx = require('xlsx');
const token = 'Bearer aSuperSecretKey';


const httpClient = axios.create({
    baseURL: 'https://echo-serv.tbxnet.com/v1/secret',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token
    }
});

module.exports = {

    async get(req, res, next) {
        try {
            const fileName = req.query.fileName;
            const files = await httpClient.get('/files').then(response => response.data);
            files.files = fileName ? files.files.filter(file => file.includes(fileName)) : files.files;
            const outputsFiles = [];

            for (const file of files.files) {
                let outputs = await httpClient.get(`/file/${file}`)
                    .then(response => ({ status: response.status, data: response.data }))
                    .catch(error => ({ status: error.response.status, data: error.response.data }));

                if (outputs.status !== 200) {
                    continue;
                }

                outputs = outputs.data || '';
                outputs = xlsx.read(outputs, { type: 'string' });
                const sheet = outputs.SheetNames[0];
                outputs = xlsx.utils.sheet_to_json(outputs.Sheets[sheet])
                outputs = outputs.filter(output => output.file && output.text && output.number && output.hex);

                if (outputs.length === 0) {
                    continue;
                }

                outputsFiles.push({
                    file,
                    lines: outputs.map(output => ({ text: output.text, number: output.number, hex: output.hex }))
                });
            }

            res.status(200).json(outputsFiles);
        } catch (error) {
            next(error);
        }
    },

    async list(req, res, next) {
        try {
            const files = await httpClient.get('/files').then(response => response.data);
            res.json(files);
        } catch (error) {
            next(error);
        }
    }
}
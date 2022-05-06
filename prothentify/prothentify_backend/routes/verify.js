const express = require('express');
const ver = express.Router();
const ref = require('../services/firestoreDb');
const axios = require('axios');
const urlencode = require('urlencode');
const ipfs = require('../services/ipfsClient');
const { decode } = require('../services/crypt');

let obj = [];

const traverseBlocks = async(cid) => {
    do {
        const stream = ipfs.cat(cid);
        let data = ''
        for await (const chunk of stream) {
            data += chunk.toString()
        }
        data = JSON.parse(data)
        obj.push(data)
        cid = data.parent;
    }   while(cid != null);
}

ver.post('/qrcode', async(req, res) => {
    try {
        let qrResult;
        const qr64 = req.body.qrCode.split(',')[1];
        const response = await axios.get(`https://qr-ende.herokuapp.com/decode/${urlencode(qr64)}`);
        qrResult = JSON.parse(response.data);
        const decoded = await decode(qrResult.encoded, Buffer.from(qrResult.iv.data));
        const stream = ipfs.cat(decoded.toString());
        let data = ''
        for await (const chunk of stream) {
            data += chunk.toString()
        }
        data = JSON.parse(data)
        if(qrResult.encoded && qrResult.iv) {
            if(data && data.entity === 'manufacturer') {
                const userRef = ref.collection("products").doc(data.identifier);
                const doc = await userRef.get();
                await traverseBlocks(doc.data().curNode);
                if(obj.at(-1).entity === 'manufacturer' && obj.at(-2).parent === decoded.toString()) {
                    res.status(200).send({ verification: true, block: obj});
                }
                else {
                    res.status(200).send({ verification: false });
                }
                obj = []
            }
            else {
                res.status(200).send({ verification: false });
            }
        }
        else {
            res.status(200).send({ verification: false });
        }

    }
    catch(err) {
        console.log(err);
        res.status(200).send({ verification: false });
    }
})

module.exports = ver;
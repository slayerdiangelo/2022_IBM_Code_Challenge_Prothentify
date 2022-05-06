const express = require('express');
const ref = require('../services/firestoreDb');
const ipfs = require('../services/ipfsClient');
const sel = express.Router();
const axios = require('axios');
const urlencode = require('urlencode')
const { decode } = require('../services/crypt');

sel.post('/qrcode', async(req, res) => {
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
                res.status(200).send({ verification: true, en: qrResult });
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

sel.post('/retailer-customer', async(req, res) => {
    try {
        const en = req.body.en;
        let entity = req.body.entity;
        const decoded = await decode(en.encoded, Buffer.from(en.iv.data));
        const stream = ipfs.cat(decoded.toString());
        let data = ''
        for await (const chunk of stream) {
            data += chunk.toString()
        }
        data = JSON.parse(data)
        const userRef = ref.collection("products").doc(data.identifier);
        const doc = await userRef.get();
        const prevNode = doc.data().curNode;
        entity.parent = prevNode;
        const  { cid } = await ipfs.add(JSON.stringify(entity));
        await ref.collection('products').doc(data.identifier).update({ curNode: cid.toString()});
        res.status(200).send({ message: 'block created' });
    }
    catch(err) {
        console.log(err);
        res.status(200).send({ verification: false });
    }
})
module.exports = sel;
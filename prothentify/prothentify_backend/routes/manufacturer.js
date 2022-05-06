const express = require('express');
const ipfs = require('../services/ipfsClient');
const crypto = require('crypto');
const QRCode = require('qrcode');
const ref = require('../services/firestoreDb');
const { encode } = require('../services/crypt');
const man = express.Router();


const randomIdentifier = (size = 10) => {
    var identifier = crypto.randomBytes(size).toString("hex").slice(0, size);
    var pat = /([0-9a-z]{3})([0-9a-z]{4})([0-9a-z]{3})/;
    return identifier.replace(pat, "$1-$2-$3");
  };

man.post('/product-details', async (req, res) => {
    try {
        let newProduct = req.body;
        newProduct.identifier = randomIdentifier();
        newProduct.parent = null;
        const  { cid } = await ipfs.add(JSON.stringify(newProduct));
        const en = await encode(cid.toString());
        const generateQR = await QRCode.toDataURL(JSON.stringify(en));
        res.status(200).send({ message: 'ok', code: generateQR });
        await ref.collection('products').doc(newProduct.identifier).set({ curNode: cid.toString()});
    }
    catch (err) {
        console.log(err)
    }
})


module.exports = man;

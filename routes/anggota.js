const express = require('express');
const router = express.Router();
const Anggota = require('../models/Anggota');

function result(succ, msg, details) {
  if (details) {
    return {
      success: succ,
      message: msg,
      data: details
    };
  } else {
    return {
      success: succ,
      message: msg
    };
  }
}

router.get('/', async (req, res) => {
  try {
    const post = await Post.aggregate([{
      $lookup: {
          from: 'user',
          localField: 'user_id',
          foreignField: '_id',
          as: 'userData'
        }
      },
      {
        $project: {
            userData: 0,
            _id: 0
        }
      }
    ])

    if (anggota.length > 0) {
      res.status(200).json(result(1, 'Retrieve Data Success', anggota));
    } else {
      res.status(404).json(result(0, 'Zero Data!'));
    }
  } catch (error) {
    res.status(500).json(result(0, error.message));
  }
});

router.post('/', async (req, res) => {
  const inputAnggota = new Anggota({
    foto: req.body.foto,
    email: req.body.email,
    nama: req.body.nama,
    npm: req.body.npm,
    prodi: req.body.prodi,
    sabuk: req.body.sabuk,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    tinggi_badan: req.body.tinggi_badan,
    berat_badan: req.body.berat_badan,
    nomor_whatsapp: req.body.nomor_whatsapp
  });
  try {
    const anggota = await inputAnggota.save();
    res.status(200).json(result(1, 'Insert Anggota Successful'));
  } catch (error) {
    res.status(500).json(result(0, error.message));
  }
});

router.put('/', async (req, res) => {
  const data = {
    id: req.body.id,
    foto: req.body.foto,
    email: req.body.email,
    nama: req.body.nama,
    npm: req.body.npm,
    prodi: req.body.prodi,
    sabuk: req.body.sabuk,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    tinggi_badan: req.body.tinggi_badan,
    berat_badan: req.body.berat_badan,
    nomor_whatsapp: req.body.nomor_whatsapp
  };
  try {
    const post = await Post.updateOne({ 
      _id: data.id,
    }, data)

    if (anggota.matchedCount > 0) {
      res.status(200).json(result(1, 'Updated Anggota Success!'));
    } else {
      res.status(404).json(result(0, 'Anggota not found!'));
    }
  } catch (error) {
    res.status(500).json(result(0, error.message));
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.deleteOne({
      _id: req.params.id
    })

    if (anggota.deletedCount > 0) {
      res.status(200).json(result(1, 'Deleted Anggota Success!'));
    } else {
      res.status(404).json(result(0, 'Anggota not found!'));
    }
  } catch (error) {
    res.status(500).json(result(0, error.message));
  }
});

module.exports = router;

const express = require('express');
const tf = require('@tensorflow/tfjs'); // Ubah sesuai dengan nama pustaka TensorFlow.js yang digunakan

const app = express();
const port = 3000; 

// endpoint untuk mendapatkan model berdasarkan nama
app.get('/model', async (req, res) => {
  const modelName = req.query.name;

  // Verifikasi dan validasi nama model
  if (!modelName || typeof modelName !== 'string') {
    return res.status(400).json({ error: 'Invalid model name' });
  }

  try {
    // Lakukan logika untuk mencari path model berdasarkan nama
    const modelPath = findModelPathByName(modelName);

    // Jika model ditemukan, load model menggunakan tf.loadModel
    if (modelPath) {
      const model = await tf.loadModel(`file://${modelPath}`);
      return res.json({ model });
    }

    // Jika model tidak ditemukan, kirimkan respons dengan status 404 Not Found
    return res.status(404).json({ error: 'Model not found' });
  } catch (error) {
    // Tangani kesalahan jika terjadi kesalahan saat loading model
    console.error('Failed to load model:', error);
    return res.status(500).json({ error: 'Failed to load model' });
  }
});

// Fungsi untuk mencari path model berdasarkan nama
function findModelPathByName(modelName) {
  // Lakukan operasi pencarian path model berdasarkan nama
  // ...
  // Contoh implementasi sederhana:
  const modelPaths = {
    hum_avg: '/model/hum_avg/humavg_tflite',
    rain_rate: '/model/rain_rate/rain_rate.tflite',
    temp_max: '/model/temp_max/temp_max.tflite',
    temp_min: '/model/temp_min/temp_min.tflite',
    temp_avg: '/model/temp_avg/model.json',
    windspeed: '/model/windspeed_avg/windspeed_avg.tflite'
  };
  return modelPaths[modelName];
};

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});

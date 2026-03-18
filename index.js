const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Endpoint del chat
app.post('/chat', async (req, res) => {
  try {
    console.log("Pregunta recibida:", req.body.pregunta);

    const result = await model.generateContent(req.body.pregunta);
    const response = await result.response;

    res.json({ respuesta: response.text() });
  } catch (error) {
    console.error("ERROR DETECTADO:", error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
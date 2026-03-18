const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();

app.use(express.json());

// Configuración de Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
  const { pregunta } = req.body;
  try {
    // USAMOS EL NOMBRE ESTÁNDAR QUE FUNCIONA SIEMPRE
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(pregunta);
    const response = await result.response;
    res.json({ respuesta: response.text() });
  } catch (error) {
    console.error("ERROR DETECTADO:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send("¡Servidor activo y listo para recibir preguntas!");
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
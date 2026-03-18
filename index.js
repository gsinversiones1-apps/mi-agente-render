const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

// Configuramos la conexión con Gemini usando tu API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Esta es la ruta para chatear
app.post('/chat', async (req, res) => {
  const { pregunta } = req.body;
  
  if (!pregunta) {
    return res.status(400).json({ error: "Debes enviar una pregunta" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(pregunta);
    const response = await result.response;
    res.json({ respuesta: response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al conectar con la IA", detalles: error.message });
  }
});

// Página principal de confirmación
app.get('/', (req, res) => {
  res.send('¡Agente con Gemini operando correctamente!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
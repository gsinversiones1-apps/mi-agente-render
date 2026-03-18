// Configuración de Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Usando variable de entorno para la API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// IMPORTANTE: Cambia esta línea
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // ← CAMBIA AQUÍ

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
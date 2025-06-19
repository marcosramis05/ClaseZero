export default async function handler(req, res) {
  const { message, asignatura } = req.body;

  const promptSistema = `Eres un experto profesor universitario en la asignatura de ${asignatura}. Explica con claridad para estudiantes.`;

  const respuesta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: promptSistema },
        { role: "user", content: message }
      ]
    })
  });

  const data = await respuesta.json();
  res.status(200).json({ respuesta: data.choices[0].message.content });
}
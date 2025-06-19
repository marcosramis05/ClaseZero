import { useState } from 'react';

export default function Home() {
  const [asignatura, setAsignatura] = useState("Álgebra Lineal");
  const [mensaje, setMensaje] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const enviarPregunta = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: mensaje, asignatura })
    });
    const data = await res.json();
    setRespuesta(data.respuesta);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">ClaseZero - Asistente por Asignatura</h1>

      <label className="block mb-2 font-semibold">Selecciona una asignatura:</label>
      <select 
        onChange={(e) => setAsignatura(e.target.value)} 
        className="mb-4 p-2 border rounded w-full"
      >
        <option>Álgebra Lineal</option>
        <option>Cálculo</option>
        <option>Psicología General</option>
      </select>

      <label className="block mb-2 font-semibold">Escribe tu pregunta:</label>
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        rows={4}
        placeholder="Ej: ¿Qué es una matriz identidad?"
      />

      <button 
        onClick={enviarPregunta} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Preguntar a la IA
      </button>

      {respuesta && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Respuesta:</h2>
          <p className="whitespace-pre-line">{respuesta}</p>
        </div>
      )}
    </div>
  );
}
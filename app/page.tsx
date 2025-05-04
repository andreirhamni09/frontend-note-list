'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import axios from "axios";

interface OpenAIResponse {
  choices: {
    text: string;
  }[];
}



export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<OpenAIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleAsk = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const result = await axios.post("http://localhost:8000/api/ask", { prompt });

      setResponse(result.data); // Menyimpan hasil respons dari OpenAI
    } catch (error) {
      console.error("Error fetching data from OpenAI", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Ask OpenAI</h1>

      {/* Input untuk prompt */}
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your question"
        className="mb-4"
      />

      {/* Button untuk mengirimkan request */}
      <Button onClick={handleAsk} disabled={loading} className="mb-4">
        {loading ? "Loading..." : "Ask"}
      </Button>

      {/* Menampilkan hasil dari OpenAI */}
      {response && (
        <Card className="p-4">
          <h2 className="text-xl font-semibold">Response from OpenAI:</h2>
          
          <Textarea value={response?.choices?.[0]?.text} readOnly className="min-h-[150px]" />
        </Card>
      )}
    </div>
  )
}

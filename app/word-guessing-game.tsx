'use client'

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HelpCircle, Bot } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define interfaces for our types
interface HistoryItem {
  input: string;
  response: string;
}

export default function WordGuessingGame() {
  const [input, setInput] = useState<string>('')
  const [responses, setResponses] = useState<string[]>([])
  const [similarity, setSimilarity] = useState<number>(0)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [answer, setAnswer] = useState<string>('')
  const [correctWord] = useState<string>('example') // This would normally be set randomly or from an API

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Placeholder for game logic
    const newResponse = `Response to: ${input}`
    setResponses(prev => [...prev, newResponse])
    setHistory(prev => [...prev, { input, response: newResponse }])
    setSimilarity(Math.random() * 100) // Placeholder: replace with actual similarity calculation
    setInput('')
  }

  const handleGetHint = () => {
    // Placeholder for hint logic
    const hint = "This is a hint for the secret word."
    setResponses(prev => [...prev, hint])
    setHistory(prev => [...prev, { input: "Get Hint", response: hint }])
  }

  const handleThrowTowel = () => {
    setAnswer(correctWord)
    const message = `The correct word was: ${correctWord}`
    setResponses(prev => [...prev, message])
    setHistory(prev => [...prev, { input: "Throw Towel", response: message }])
  }

  const handleRestart = () => {
    setResponses([])
    setHistory([])
    setSimilarity(0)
    setAnswer('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <header className="p-4 bg-purple-100 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-800">Word Guessing Game</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-purple-800 hover:bg-purple-200"><HelpCircle /></Button>
          </DialogTrigger>
          <DialogContent className="bg-pink-50">
            <DialogHeader>
              <DialogTitle className="text-purple-800">How to Play</DialogTitle>
              <DialogDescription className="text-purple-600">
                Ask yes/no questions or make guesses to figure out the secret word. The graph and similarity score will help guide your guesses.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>

      <main className="flex-grow p-4 flex flex-col lg:flex-row gap-4">
        <div className="flex-grow space-y-4">
          <Progress value={similarity} className="w-full bg-blue-100" />

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Ask a question or make a guess"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-yellow-50 border-yellow-200 focus:border-yellow-300 focus:ring-yellow-200"
            />
            <Button type="submit" className="bg-green-200 text-green-800 hover:bg-green-300">Go</Button>
          </form>

          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-500" />
            <Card className="bg-blue-50 border-blue-200 flex-grow">
              <CardContent className="p-4 h-40 overflow-y-auto">
                {responses.map((response, index) => (
                  <p key={index} className="mb-2 text-blue-800">{response}</p>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2 text-orange-800">History</h2>
              <ScrollArea className="h-20 w-full overflow-x-auto">
                <div className="min-w-full">
                  {history.map((item, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium text-orange-700">{item.input}</p>
                      <p className="text-sm text-orange-600">{item.response}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3 flex flex-col gap-4">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2 text-red-800">Answer</h2>
              <p className="text-2xl font-bold text-red-700">{answer || "???"}</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2 text-green-800">Similarity Score</h2>
              <p className="text-2xl font-bold text-green-700">{similarity.toFixed(2)}%</p>
            </CardContent>
          </Card>

          <Card className="flex-grow bg-purple-50 border-purple-200">
            <CardContent className="p-4 h-full">
              <h2 className="font-semibold mb-2 text-purple-800">Graph Visualization</h2>
              {/* Placeholder for graph visualization */}
              <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-700">
                Graph Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="p-4 bg-purple-100 flex justify-center space-x-4">
        <Button
          onClick={handleGetHint}
          className="bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
        >
          Get Hint
        </Button>
        <Button
          onClick={handleThrowTowel}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Throw Towel
        </Button>
        <Button
          onClick={handleRestart}
          className="bg-red-200 text-red-800 hover:bg-red-300"
        >
          Restart Game
        </Button>
      </footer>
    </div>
  )
}

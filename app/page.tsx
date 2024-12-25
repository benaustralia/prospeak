'use client'

import React, { useState } from 'react';
import { Music } from 'lucide-react';

export default function Home() {
  // Exercise content - add or modify words here
  const words = [
    { word: 'ease', syllables: 1, note: 'one syllable' },
    { word: 'easy', syllables: 2, note: 'two syllables' },
    { word: 'easily', syllables: 3, note: 'three syllables' }
  ];

  // State management
  const [currentWord, setCurrentWord] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  // Handle user's syllable guess
  const handleGuess = (syllableCount) => {
    if (!showAnswer) {
      setUserGuess(syllableCount);
      if (syllableCount === words[currentWord].syllables) {
        setScore(prev => prev + 1);
      }
      setShowAnswer(true);
    }
  };

  // Move to next word
  const nextWord = () => {
    if (currentWord < words.length - 1) {
      setCurrentWord(prev => prev + 1);
      setUserGuess(null);
      setShowAnswer(false);
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Exercise header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600">
            Exercise 1.A: Basic Syllable Counting (v1.0)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Introducing syllables with ease/easy pattern
          </p>
        </div>
        
        {/* Main exercise area */}
        <div className="text-center mb-6">
          {/* Display current word */}
          <div className="text-4xl font-bold mb-4">{words[currentWord].word}</div>
          
          {/* Syllable choice buttons */}
          <div className="flex justify-center gap-4 mb-4">
            {[1, 2, 3].map(num => (
              <button
                key={num}
                onClick={() => handleGuess(num)}
                disabled={showAnswer}
                className={`w-12 h-12 rounded-full flex items-center justify-center
                  ${userGuess === num 
                    ? showAnswer
                      ? userGuess === words[currentWord].syllables
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Feedback area */}
          {showAnswer && (
            <div className={`p-4 rounded-lg ${
              userGuess === words[currentWord].syllables
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}>
              <p className="font-medium">
                {words[currentWord].word} has {words[currentWord].syllables} syllable
                {words[currentWord].syllables > 1 ? 's' : ''}.
              </p>
              <p className="text-sm mt-1">{words[currentWord].note}</p>
            </div>
          )}
        </div>

        {/* Music of English pattern */}
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <Music className="inline-block w-5 h-5 mr-2 text-purple-600" />
          <span className="font-medium text-purple-800">
            {currentWord === 0 
              ? "How do you spell 'ease'? → E-A-S-E"
              : "How do you spell 'easy'? → E-A-S-Y"}
          </span>
        </div>

        {/* Navigation button */}
        {showAnswer && currentWord < words.length - 1 && (
          <button
            onClick={nextWord}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next Word
          </button>
        )}
      </div>
    </main>
  );
}
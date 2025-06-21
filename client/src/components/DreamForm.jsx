import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDreams } from '../features/dreamThunks'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const DreamForm = () => {
  const navigate = useNavigate()
  const [mood, setMood] = useState('')
  const [tags, setTags] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description) return alert('Title and description are required')

    const newDream = {
      title,
      description,
      mood,
      tags: tags.split(',').map(tag => tag.trim()),
      date: new Date().toISOString()
    }

    try {
      await dispatch(addDreams(newDream)).unwrap()
      toast.success('Dream added Successfully')
      setTitle('')
      setDescription('')
      setMood('')
      setTags('')
      navigate('/dreams')
    } catch (err) {
      toast.error('Failed to add')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-800 drop-shadow-sm">
          ✨ Log Your Dream
        </h2>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Dream Title"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80"
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe your dream..."
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80"
        />

        <input
          value={mood}
          onChange={e => setMood(e.target.value)}
          type="text"
          placeholder="Mood? (e.g. 😎,😋,😫)"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80"
        />

        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          🚀 Add Dream
        </button>
      </form>
    </div>
  )
}

export default DreamForm

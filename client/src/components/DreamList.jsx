import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDreams, editDreams, fetchDreams } from '../features/dreamThunks'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const DreamList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const dreams = useSelector(state => state.dreams.allDreams)
  console.log(dreams);
  
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mood: '',
    tags: ''
  })

  useEffect(() => {
    dispatch(fetchDreams())
  }, [dispatch])

  const backToHome = () => {
    navigate('/')
  }

  const startEdit = (dream) => {
    setEditingId(dream.id)
    setFormData({
      title: dream.title,
      description: dream.description,
      mood: dream.mood || '',
      tags: dream.tags ? dream.tags.join(', ') : ''
    })
  }

  const deleteDream = async (id) => {
    try {
      await dispatch(deleteDreams(id)).unwrap()
      toast.success("Dream deleted!")
    } catch (err) {
      toast.error("Failed to delete dream")
    }
  }

  const handleUpdate = async (id) => {
    const updated = {
      id,
      title: formData.title,
      description: formData.description,
      mood: formData.mood,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
    }
    try {
      await dispatch(editDreams(updated)).unwrap()
      toast.success("Dream edited successfully")
      setEditingId(null)
    } catch (err) {
      toast.error("Failed to edit dream.")
    }
  }

  if (dreams.length === 0) {
    return (
      <div className="text-center mt-8 space-y-4">
        <p className="text-gray-500 text-lg mt-8">No dreams yet... 🌌</p>
        <button
          onClick={backToHome}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow transition duration-200"
        >
          ⬅️ Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {dreams.map(dream => (
        <div key={dream.id} className="bg-white p-5 rounded-2xl shadow-md relative transition duration-200 hover:shadow-lg">
          {editingId === dream.id ? (
            <>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-2"
              />
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-2"
              />
              <input
                type="text"
                value={formData.mood}
                onChange={e => setFormData({ ...formData, mood: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-2"
              />
              <input
                type="text"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                className="w-full border px-3 py-2 rounded mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => handleUpdate(dream.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Save ✅
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                >
                  Cancel ❌
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-purple-800">{dream.title}</h3>
              <p className="text-gray-700 mt-1">{dream.description}</p>
              <div className="flex flex-wrap gap-3 text-sm mt-3">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  Mood: {dream.mood || '🤷‍♀️'}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  Tags: {dream.tags?.join(', ') || 'None'}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(dream.date).toLocaleString()}
              </div>
              <div className="absolute top-3 right-4 flex gap-3 text-lg">
                <button
                  onClick={() => startEdit(dream)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteDream(dream.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default DreamList

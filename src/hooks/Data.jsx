import { useEffect, useState } from 'react'
import { URL } from '../../utils/url.js'

const Data = (link) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!link) return

    const abortController = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${URL}${link}`, {
          signal: abortController.signal
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
          console.error('Error fetching data:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      abortController.abort()
    }
  }, [link])

  return { data, loading, error }
}

export default Data

import { useState, useEffect, createContext } from 'react'
import { buildApiUrl } from '../config/api'

// Create the AuthContext
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(buildApiUrl('/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        const { user: userData, token: userToken } = data.data
        
        // Store in state
        setUser(userData)
        setToken(userToken)
        
        // Store in localStorage
        localStorage.setItem('token', userToken)
        localStorage.setItem('user', JSON.stringify(userData))
        
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  // Register function
  const register = async (firstName, middleName, lastName, email, password) => {
    try {
      const response = await fetch(buildApiUrl('/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName, 
          middleName: middleName || null, 
          lastName, 
          email, 
          password 
        }),
      })

      const data = await response.json()

      if (data.success) {
        const { user: userData, token: userToken } = data.data
        
        // Store in state
        setUser(userData)
        setToken(userToken)
        
        // Store in localStorage
        localStorage.setItem('token', userToken)
        localStorage.setItem('user', JSON.stringify(userData))
        
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint if token exists
      if (token) {
        await fetch(buildApiUrl('/logout'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear state and localStorage regardless of API call success
      setUser(null)
      setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  // Get user profile
  const getUserProfile = async () => {
    try {
      if (!token) return null

      const response = await fetch(buildApiUrl('/me'), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.success) {
        const userData = data.data.user
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return userData
      } else {
        // Token might be invalid, logout user
        logout()
        return null
      }
    } catch (error) {
      console.error('Get profile error:', error)
      logout()
      return null
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    getUserProfile,
    isAuthenticated: !!user && !!token
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

# Environment Variables Setup

This document explains how to set up environment variables for the Travel Itinerary Planner frontend.

## 📁 Files Created

- `.env` - Contains your actual environment variables (DO NOT commit to git)
- `.env.example` - Template file showing required variables (safe to commit)
- `src/config/api.js` - Centralized API configuration

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL for all API calls | `http://localhost:5000/api` |
| `VITE_API_AUTH_URL` | Base URL for authentication endpoints | `http://localhost:5000/api/auth` |
| `VITE_LOGIN_ENDPOINT` | Login endpoint path | `/login` |
| `VITE_REGISTER_ENDPOINT` | Register endpoint path | `/register` |
| `VITE_LOGOUT_ENDPOINT` | Logout endpoint path | `/logout` |
| `VITE_PROFILE_ENDPOINT` | Get profile endpoint path | `/me` |
| `VITE_UPDATE_PROFILE_ENDPOINT` | Update profile endpoint path | `/profile` |
| `VITE_CHANGE_PASSWORD_ENDPOINT` | Change password endpoint path | `/change-password` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_NAME` | Application name | `Travel Itinerary Planner` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

## 🚀 Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the values in `.env`:**
   - Change `VITE_API_BASE_URL` to your backend URL
   - Change `VITE_API_AUTH_URL` to your auth endpoints URL
   - Update other endpoints if your backend uses different paths

3. **For production:**
   ```env
   VITE_API_BASE_URL=https://your-api-domain.com/api
   VITE_API_AUTH_URL=https://your-api-domain.com/api/auth
   ```

## 🔒 Security Notes

- **Never commit `.env` to version control**
- **Use `.env.example` as a template**
- **All Vite environment variables must start with `VITE_`**
- **Environment variables are exposed to the client-side code**

## 📝 Usage in Code

The API configuration is centralized in `src/config/api.js`:

```javascript
import { buildApiUrl } from '../config/api'

// Build full API URL
const loginUrl = buildApiUrl('/login')
// Results in: http://localhost:5000/api/auth/login
```

## 🔄 Development vs Production

### Development
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_AUTH_URL=http://localhost:5000/api/auth
```

### Production
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_API_AUTH_URL=https://api.yourdomain.com/api/auth
```

## 🛠️ Troubleshooting

1. **Environment variables not loading:**
   - Ensure variables start with `VITE_`
   - Restart the development server
   - Check for typos in variable names

2. **API calls failing:**
   - Verify the backend server is running
   - Check the API URLs in your `.env` file
   - Ensure CORS is configured on the backend

3. **Build issues:**
   - Make sure all required environment variables are set
   - Check that the `.env` file is in the root of the frontend directory

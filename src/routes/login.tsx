import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import Logo from '../components/logo'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      navigate({ to: '/' })
    } catch {
      setError('Неверный email или пароль')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Login card */}
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/[0.07] backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl shadow-black/20 p-10">
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="mb-5 transition-transform duration-300 hover:scale-105">
              <Logo />
            </div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Межгород
            </h1>
            <p className="text-sm text-slate-400 mt-1.5">
              Войдите в панель управления
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-[fadeIn_0.2s_ease-out]">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-xs font-medium text-slate-400 uppercase tracking-wider pl-1">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-slate-500 text-sm outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-white/8 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-password" className="text-xs font-medium text-slate-400 uppercase tracking-wider pl-1">
                Пароль
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-slate-500 text-sm outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-white/8 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Вход...
                </span>
              ) : (
                'Войти'
              )}
            </button>
          </form>
        </div>

        {/* Subtle footer */}
        <p className="text-center text-xs text-slate-600 mt-6">
          © 2026 Межгород
        </p>
      </div>
    </div>
  )
}

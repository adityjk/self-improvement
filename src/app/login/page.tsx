'use client'

import { useState } from 'react'
import { supabase } from '@/src/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            router.push('/dashboard')
            router.refresh()
        }

        setLoading(false)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className='mt-2 text-gray-600'>Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className='mt-8 space-y-6'>
                    {error && (
                        <div className='rounded bg-red-50 p-3 text-sm text text-red-600'>{error}</div>
                    )}

                    <div>
                        <label htmlFor="email" className='block text-sm font-medium'>Email</label>
                        <input 
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-1 block w-full rounded border border-gray-300 px-3 py-2'
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className='block text-sm font-medium'>Password</label>
                        <input 
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <button
                    type='submit'
                    disabled={loading}
                    className="w-full rounded bg-blue-600 ox-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className='text-center text-sm'>Don't have an account?{''}
                    <Link href="/signup" className='text-blue-600 hover:underline'>
                        SIgn Up
                    </Link>
                </p>
            </div>
        </main>
    )
}
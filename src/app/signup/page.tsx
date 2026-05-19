'use client'

import { useState } from 'react'
import { supabase } from '@/src/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const router = useRouter()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage('Check your email for confirmation link!')
        }

        setLoading(false)
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-4'>
            <div className='w-full max-w-md space-y-8'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Get Started</h1>
                    <p className='mt-2 text-gray-600'>Create your account</p>
                </div>

                <form onSubmit={handleSignUp} className='mt-8 space-y-6'>
                    {error && (
                        <div className='rounded bg-red-50 p-3 text-sm text-red-600'>
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className='rounded bg-green-50 p-3 text-sm text-green-600'>
                            {message}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className='block text-sm font-medium'>
                            Email
                        </label>
                        <input 
                        id='email'
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-1 block w-full rounded border border-grat-300 px- py-2'
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className='block text-sm fonr-medium'>Password</label>
                        <input 
                        id='password'
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-1 block w-full rounded border border-gray-300 px-3 py-2'
                        />
                    </div>

                    <button 
                    type='submit'
                    disabled={loading}
                    className='w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50'
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <p className='text-center text-sm'>
                    Already have an account?{''}
                    <Link href='/login' className='text-blue-600 hover:underline'>Sign In</Link>
                </p>
            </div>
        </main>
    )
}
'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

import Input from '@/components/input/input';

import '../globals.css'
import './layout.css'

const SetPasswordForm = () => {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const searchParams = useSearchParams()
  const token = searchParams.get('id')
  const router = useRouter()

  const handleRegister = async () => {
    if(password == repeatPassword) {

      await fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/set-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: username,
          email: email,
          password: password
        })
      })

      router.push('/?password-updated=1')

    }
    else {
      toast.error('The password values is not equals')
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/user-activate?id=${token}`);
        const data = await response.json();
        
        setUsername(data.username);
        setEmail(data.email);

      } catch (error) {
        console.error('Erro ao validar token:', error);
      }
    }

    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Active your account</h2>
        <form>
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Input type="password" placeholder="Repeat password" onChange={(e) => setRepeatPassword(e.target.value)} />
          <input
            type="button"
            value="Submit"
            className="submit_register"
            onClick={handleRegister}
          />
        </form>
      </div>
    </div>
  )
}

const SetPassword = () => {
  return (
    <>
      <ToastContainer /> 
      <Suspense fallback={<div>Loading...</div>}>
        <SetPasswordForm />
      </Suspense>
    </>
  )
}

export default SetPassword
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '@/firebase'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Alert from '@/components/ui/Alert'
import PageHeading from '@/components/ui/PageHeading'

const schema = yup.object().shape({
  email: yup.string().label('Email').required().email(),
  password: yup.string().label('Password').required(),
})

function ScreenLogin() {
  const [message, setMessage] = useState('')
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    const { email, password } = data

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user

        // user.updateProfile({ displayName: 'Bryan Lam' })

        history.push('/')
      })
      .catch((error) => {
        setMessage(error.message)
      })
  }

  return (
    <>
      <PageHeading title="Sign in to your account" />
      <div className="flex flex-col justify-center py-8 bg-base sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 shadow bg-base-200 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {message && <Alert type="error" message={message} />}

              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email address</span>
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`input input-bordered ${
                    errors.email && 'input-error'
                  }`}
                />
                {errors.email && (
                  <span className="mt-1 text-xs text-error">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className={`input input-bordered ${
                    errors.password && 'input-error'
                  }`}
                />
                {errors.password && (
                  <span className="mt-1 text-xs text-error">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    {...register('rememberMe')}
                    className="w-4 h-4 text-base border-gray-300 rounded focus:ring-base"
                  />
                  <label htmlFor="rememberMe" className="block ml-2 text-sm">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    onClick={() => auth.sendPasswordResetEmail()}
                    className="font-medium hover:text-accent-content link"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div> */}

              <div>
                <button type="submit" className="btn btn-secondary btn-block">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScreenLogin

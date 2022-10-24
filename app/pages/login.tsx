import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { loginWithCredentials } from '../utils/login'
import { Input } from '../components/Input'
import { Checkbox } from '../components/Checkbox'
import { Language } from '../hooks/useLanguage'
import { withTranslation } from '../hocs/withTranslation'
import type { Translations, PropsWithTranslation } from '../hocs/withTranslation'

import HelpwaveLogo from '../icons/Helpwave'

type LoginTranslation = {
  signInHeader: string,
  contactSubheader: {
    or: string,
    contactUs: string,
    getAccess: string
  },
  username: string,
  password: string,
  stayLoggedIn: string,
  forgotPassword: string,
  signIn: string
}

const defaultLoginTranslation: Translations<LoginTranslation> = {
  [Language.EN]: {
    signInHeader: 'Sign in to your organization',
    contactSubheader: {
      or: 'Or ',
      contactUs: 'contact us',
      getAccess: ' to get access.'
    },
    username: 'Username',
    password: 'Password',
    stayLoggedIn: 'Remember me',
    forgotPassword: 'Forgot your password?',
    signIn: 'Sign in'
  },
  [Language.DE]: {
    signInHeader: 'Melden Sie sich bei Ihrer Organisation an',
    contactSubheader: {
      or: 'Oder ',
      contactUs: 'kontaktieren Sie uns',
      getAccess: ' um Zugang zu erhalten.'
    },
    username: 'Benutzername',
    password: 'Passwort',
    stayLoggedIn: 'Angemeldet bleiben',
    forgotPassword: 'Passwort vergessen?',
    signIn: 'Anmelden'
  }
}

const LoginPage: NextPage<PropsWithTranslation<LoginTranslation>> = ({ translation }) => {
  const router = useRouter()
  const [rememberMe, setRememberMe] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // TODO: input validation?
    loginWithCredentials({ username: '', password: '', shouldRetrieveRefreshToken: rememberMe })
      .then(({ accessToken, refreshToken }) => {
        if (refreshToken !== null) {
          Cookies.set('jwt-refresh-token', refreshToken)
        }
        Cookies.set('jwt-access-token', accessToken)

        if (router.query.back) {
          router.back()
        } else {
          router.push('/')
        }
      })
      .catch(err => {
        // TODO: somehow display error messages
        console.log(err)
      })
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <HelpwaveLogo className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{translation.signInHeader}</h2>
            <p className="mt-4 text-center text-sm text-gray-600">
                {translation.contactSubheader.or}
                <Link href="/contact" passHref>
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    {translation.contactSubheader.contactUs}
                  </a>
                </Link>
                {translation.contactSubheader.getAccess}
              </p>
            </div>
          <form onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col mt-8 space-y-4 items-center">
              <div className="w-80">
                <Input id="login:username" required autoComplete="username" placeholder={translation.username} label={translation.username} value={username} onChange={setUsername} />
              </div>
              <div className="w-80">
                <Input id="login:password" required autoComplete="current-password" placeholder={translation.password} label={translation.password} value={password} onChange={setPassword} />
              </div>

              <div className="flex items-center justify-between w-80">
                <Checkbox id="login:remember-me" label={translation.stayLoggedIn} onChange={setRememberMe} checked={rememberMe} />
                <div className="text-sm">
                  <Link href="/forgot-password" passHref>
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">{translation.forgotPassword}</a>
                  </Link>
                </div>
              </div>

              <div className="w-80">
                <button onClick={handleLogin} type="submit" className="bg-indigo-500 py-2 px-4 text-sm font-medium text-white rounded-md w-full hover:bg-indigo-600 focus:outline-none focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2">
                  {translation.signIn}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withTranslation(LoginPage, defaultLoginTranslation)

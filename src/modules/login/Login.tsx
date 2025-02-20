import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { setWindowClass } from '@app/utils/helpers'
import { Checkbox } from '@profabric/react-components'
import { Form, InputGroup } from 'react-bootstrap'
import { Button } from '@app/styles/common'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'

const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [t] = useTranslation()

  const handleLogin = async () => {
    setAuthLoading(true)
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        username,
        password,
      })

      if (response) {
        const responseData = response.data.data
        toast.success('Login berhasil!')

        if (responseData.is_complete) {
          navigate('/')
          localStorage.setItem('user_data', JSON.stringify(responseData.user))
        } else {
          navigate(`/complete_data/${responseData.user.user_id}`)
        }
      } else {
        toast.error('Login gagal. Periksa kembali kredensial Anda.')
      }
    } catch (error: any) {
      console.error('Login Error:', error.response?.data || error) // Menampilkan error di console

      toast.error(
        error.response?.data?.message || 'Terjadi kesalahan saat login.'
      )
    } finally {
      setAuthLoading(false)
    }
  }

  setWindowClass('hold-transition login-page')

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>DEL </b>
            <span>Library</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('login.label.signIn')}</p>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <Form.Control
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
              />
            </InputGroup>
          </div>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <Form.Control
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </InputGroup>
          </div>

          <div className="row">
            <div className="col-8">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={false} />
                <label style={{ margin: 0, paddingLeft: '4px' }}>
                  {t('login.label.rememberMe')}
                </label>
              </div>
            </div>
            <div className="col-4">
              <Button loading={isAuthLoading} onClick={handleLogin}>
                {t('login.button.signIn.label')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

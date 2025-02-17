import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, InputGroup } from 'react-bootstrap'
import { Button } from '@app/styles/common'
import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { toast } from 'react-toastify'
import { setCurrentUser } from '@store/reducers/auth'
import { useAppDispatch } from '@store/store'

export default function CompleteData() {
  const { id } = useParams()
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSaveData = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/complete-data`, {
        name: name,
        user_id: id,
      })

      if (response.status === 200) {
        toast.success(response.data.message)
        dispatch(setCurrentUser(response.data.data))
        navigate('/')
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <div
      className={
        'w-100 vh-100 d-flex align-items-center justify-content-center'
      }
    >
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <Link to="/" className="h1">
              <b>DEL </b>
              <span>Library</span>
            </Link>
          </div>
          <div className="card-body">
            <p className="login-box-msg">
              Lengkapi nama kamu sesuai dengan CIS.
            </p>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Username"
                />
              </InputGroup>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => {
                  handleSaveData().then()
                }}
              >
                Save Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

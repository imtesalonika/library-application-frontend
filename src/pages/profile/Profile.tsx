import { ContentHeader } from '@components'
import { Button } from '@app/styles/common'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '@app/utils/env'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user_data')!)
  )
  const navigate = useNavigate()

  const handleGetUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/${currentUser?.id}`)

      console.log(response)

      if (response.status === 200) {
        localStorage.setItem('user_data', JSON.stringify(response.data.data))
        setCurrentUser(response.data.data)
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
    }
  }

  useEffect(() => {
    handleGetUser().then()
  }, [])

  return (
    <>
      <ContentHeader title="Profile" />
      <section className="content">
        <div className="container-fluid">
          <div
            className="card mx-auto p-4 text-center shadow-sm border-0"
            style={{ maxWidth: '600px', borderRadius: '12px' }}
          >
            {/* Foto Profil */}
            <div className="d-flex justify-content-center">
              <img
                src={
                  `${apiUrl}/${currentUser?.foto_profil}` ||
                  '/img/default-profile.png'
                }
                alt="User profile"
                className="border border-secondary p-2 rounded-circle"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </div>

            {/* Detail Profil */}
            <ul className="list-group text-start mt-3">
              <li className="list-group-item d-flex justify-content-between">
                <strong>Nama Pengguna :</strong> <span>{currentUser.name}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Alamat Email :</strong> <span>{currentUser.email}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Username :</strong> <span>{currentUser.username}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Role :</strong> <span>{currentUser.role}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Status :</strong>{' '}
                <span>
                  {currentUser.status === 1 ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </li>
            </ul>

            {/* Tombol Aksi */}
            <div
              className="d-flex justify-content-center mt-4"
              style={{
                gap: 5,
              }}
            >
              <Button
                onClick={() => {
                  navigate('/edit-profile')
                }}
                variant="primary"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile

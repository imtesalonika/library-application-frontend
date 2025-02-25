import { ContentHeader } from '@components'
import { Button } from '@app/styles/common'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem('user_data')!)
  const [fotoProfil, setFotoProfil] = useState<File | undefined>()
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem('user_data')!).name
  )
  const navigate = useNavigate()

  const handleGetUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/${currentUser?.id}`)

      console.log(response)

      if (response.status === 200) {
        localStorage.setItem('user_data', JSON.stringify(response.data.data))
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
    }
  }

  const handleUpdateUser = async () => {
    const formData = new FormData()
    formData.append('id', currentUser.id)
    formData.append('name', name)
    formData.append('picture', fotoProfil!)

    try {
      const response = await axios.put(`${apiUrl}/api/users`, formData)

      if (response.status === 200) {
        toast.success(response.data.message)
        handleGetUser().then()
        navigate('/profile')
      }
    } catch (e: any) {
      toast.error(e.response.data.message)
    }
  }

  return (
    <>
      <ContentHeader title="Edit Profile" />
      <section className="content">
        <div className="container-fluid">
          <div
            className="card mx-auto p-4 shadow-sm border-0"
            style={{ maxWidth: '600px', borderRadius: '12px' }}
          >
            {/* Foto Profil */}
            <div className="d-flex justify-content-center">
              <img
                src={
                  currentUser?.foto_profil
                    ? `${apiUrl}/${currentUser?.foto_profil}`
                    : '/img/default-profile.png'
                }
                alt="User profile"
                className="border border-secondary p-2 rounded-circle"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </div>

            <div className="form-group col-sm">
              <label>Foto Profil</label>
              <br />
              <input
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files![0]
                  if (selectedFile) {
                    setFotoProfil(selectedFile)
                  }
                }}
                className={'border p-1 rounded-lg w-100 bg-white'}
              />
              {/*<span className={'text-danger'}>{gambarErr}</span>*/}
            </div>

            <div className="form-group col-sm">
              <label>Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                className="form-control"
              />
              {/*<span className={'text-danger'}>{banyakBukuErr}</span>*/}
            </div>
            <Button
              onClick={() => {
                handleUpdateUser().then()
              }}
              variant="primary"
            >
              Simpan
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditProfile

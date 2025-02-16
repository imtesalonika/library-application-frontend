import { ArrowLeft } from 'react-bootstrap-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function AddPengumumanPage() {
  const { id } = useParams()
  const [file, setFile] = useState<File | undefined>()
  const [fileErr, setFileErr] = useState<string>()
  const [judul, setJudul] = useState<string>('')
  const [judulErr, setJudulErr] = useState<string>('')
  const [isi, setIsi] = useState<string>('')
  const [isiErr, setIsiErr] = useState<string>('')
  const [kategori, setKategori] = useState<string>('')
  const [kategoriErr, setKategoriErr] = useState<string>('')
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const handleSavePengumuman = async () => {
    try {
      const formData = new FormData()
      formData.append('files', file!)
      formData.append('judul', judul)
      formData.append('isi', isi)
      formData.append('kategori', kategori)

      const response = await axios.post(`${apiUrl}/api/pengumuman`, formData)

      if (response.status === 200) {
        navigate('/pengumuman')
      }
    } catch (e: any) {
      MySwal.fire({
        text: e.response.data.message,
        icon: 'error',
        title: 'Gagal!',
      }).then()
      console.log(e)
    }
  }

  const handleGetPengumuman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pengumuman/${id}`)

      if (response.status === 200) {
        const tempDataPengumuman = response.data.data
        console.log(tempDataPengumuman)
        setJudul(tempDataPengumuman.judul)
        setIsi(tempDataPengumuman.isi)
        setKategori(tempDataPengumuman.kategori)
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  const handleUpdatePengumuman = async () => {
    const formData = new FormData()
    formData.append('files', file!)
    formData.append('judul', judul)
    formData.append('isi', isi)
    formData.append('kategori', kategori)

    try {
      const response = await axios.patch(
        `${apiUrl}/api/pengumuman/${id}`,
        formData
      )

      if (response.status === 200) {
        const tempResponseUpdate = response.data.data
        console.log(tempResponseUpdate)
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (id) {
      handleGetPengumuman().then()
    }
  }, [])

  return (
    <div>
      <h2 className={'font-weight-bold ml-3 pt-3'}>Pengumuman</h2>

      <div
        className={'d-flex align-items-center bg-white px-3 py-1 mb-3'}
        style={{ gap: 10 }}
      >
        <Link
          to={'/pengumuman'}
          className={
            'd-flex flex-column align-items-sm-center justify-content-center rounded-circle'
          }
          style={{
            backgroundColor: '#87C1FF',
            width: '40px',
            height: '40px',
          }}
        >
          <ArrowLeft size={'30'} color={'#3722AE'} />
        </Link>

        <span
          style={{
            color: '#3722AE',
          }}
          className={'text-lg'}
        >
          {id ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
        </span>
      </div>

      <div className={'px-5'}>
        <div className="mb-3" style={{ width: '49%' }}>
          <label>File</label>
          <br />
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files![0])
            }}
            className={'border p-1 rounded-lg w-100 bg-white'}
          />
          <span className="text-danger">{fileErr}</span>
        </div>
        <div className={'w-100'}>
          <div className={'row'}>
            <div className="form-group col-sm-6">
              <label>Judul Pengumuman</label>
              <input
                type="text"
                onChange={(e: any) => {
                  setJudul(e.target.value)
                }}
                value={judul}
                className="form-control"
              />
              <span className="text-danger">{judulErr}</span>
            </div>
          </div>

          <div className={'row'}>
            <div className="form-group col-sm-6">
              <label>Isi Pengumuman</label>
              <textarea
                className="form-control"
                value={isi}
                onChange={(e: any) => {
                  setIsi(e.target.value)
                }}
              ></textarea>
              <span className="text-danger">{isiErr}</span>
            </div>
          </div>

          <div className={'row'}>
            <div className="form-group col-sm-6">
              <label>Kategori</label>
              <input
                type="text"
                value={kategori}
                onChange={(e: any) => {
                  setKategori(e.target.value)
                }}
                className="form-control"
              />
              <span className="text-danger">{kategoriErr}</span>
            </div>
          </div>
        </div>

        <button
          className={'btn btn-success mb-3'}
          onClick={() => {
            if (judul.trim() === '') {
              setJudulErr('Tidak boleh kosong')
              return
            }

            if (isi.trim() === '') {
              setIsiErr('Tidak boleh kosong')
              return
            }

            if (kategori.trim() === '') {
              setKategoriErr('Tidak boleh kosong')
              return
            }

            if (id) {
              handleUpdatePengumuman().then()
            } else {
              handleSavePengumuman().then()
            }
          }}
        >
          {id ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  )
}

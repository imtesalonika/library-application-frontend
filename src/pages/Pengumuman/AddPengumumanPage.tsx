import { ArrowLeft } from 'react-bootstrap-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Dropzone from 'react-dropzone'

export function AddPengumumanPage() {
  const { id } = useParams()
  // const [file, setFile] = useState<File | undefined>()
  // const [fileErr, setFileErr] = useState<string>()
  const [judul, setJudul] = useState<string>('')
  const [judulErr, setJudulErr] = useState<string>('')
  const [isi, setIsi] = useState<string>('')
  const [isiErr, setIsiErr] = useState<string>('')
  const [kategori, setKategori] = useState<string>('')
  const [kategoriErr, setKategoriErr] = useState<string>('')
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleAddFile = (acceptedFiles: any) => {
    setUploadedFiles(acceptedFiles)
  }

  const handleSavePengumuman = async () => {
    try {
      const formData = new FormData()
      uploadedFiles.forEach((file: any) => {
        formData.append('files', file) // 'files' adalah nama field yang diterima server
      })
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
    uploadedFiles.forEach((file: any) => {
      formData.append('files', file) // 'files' adalah nama field yang diterima server
    })
    formData.append('judul', judul)
    formData.append('isi', isi)
    formData.append('kategori', kategori)

    try {
      const response = await axios.put(
        `${apiUrl}/api/pengumuman/${id}`,
        formData
      )

      if (response.status === 200) {
        navigate('/pengumuman')
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
          {/*<input*/}
          {/*  type="file"*/}
          {/*  onChange={(e) => {*/}
          {/*    setFile(e.target.files![0])*/}
          {/*  }}*/}
          {/*  className={'border p-1 rounded-lg w-100 bg-white'}*/}
          {/*/>*/}
          <Dropzone onDrop={handleAddFile}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="dropzone border border-primary rounded p-4 bg-light text-center"
                  style={{ cursor: 'pointer' }}
                >
                  <input {...getInputProps()} />
                  <div className="d-flex flex-column align-items-center">
                    <i className="fas fa-cloud-upload-alt fa-3x mb-2 text-primary"></i>
                    <p className="mb-0 text-muted">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>

          {/* Menampilkan nama file yang di-upload */}
          {uploadedFiles.length > 0 && (
            <div className="mt-3">
              <h5>Uploaded Files:</h5>
              <ul>
                {uploadedFiles.map((file: any, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={'w-100'}>
          <div className={'row'}>
            <div className="form-group col-sm-6">
              <label>Judul Pengumuman</label>
              <input
                type="text"
                onChange={(e: any) => {
                  setJudul(e.target.value)
                  setJudulErr('')
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
                  setIsiErr('')
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
                  setKategoriErr('')
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

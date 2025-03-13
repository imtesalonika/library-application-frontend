import { ArrowLeft, Trash } from 'react-bootstrap-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Dropzone from 'react-dropzone'
import { formatWaktu } from '@app/services/format-waktu'

export function AddPengumumanPage() {
  const { id } = useParams()
  const [judul, setJudul] = useState<string>('')
  const [judulErr, setJudulErr] = useState<string>('')
  const [isi, setIsi] = useState<string>('')
  const [isiErr, setIsiErr] = useState<string>('')
  const [kategori, setKategori] = useState<string>('')
  const [kategoriErr, setKategoriErr] = useState<string>('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [oldFiles, setOldFiles] = useState<any[]>([])
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const handleAddFile = (acceptedFiles: File[]) => {
    setUploadedFiles([...uploadedFiles, ...acceptedFiles])
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles]
    newFiles.splice(index, 1)
    setUploadedFiles(newFiles)
  }

  const handleSavePengumuman = async () => {
    // Validasi form
    if (judul.trim() === '') {
      setJudulErr('Judul tidak boleh kosong')
      return
    }
    if (isi.trim() === '') {
      setIsiErr('Isi tidak boleh kosong')
      return
    }
    if (kategori.trim() === '') {
      setKategoriErr('Kategori tidak boleh kosong')
      return
    }

    try {
      const formData = new FormData()
      uploadedFiles.forEach((file) => {
        formData.append('files', file) // Tambahkan file ke FormData
      })
      formData.append('judul', judul)
      formData.append('isi', isi)
      formData.append('kategori', kategori)

      const response = await axios.post(`${apiUrl}/api/pengumuman`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set header untuk upload file
        },
      })

      if (response.status === 200) {
        MySwal.fire({
          text: 'Pengumuman berhasil ditambahkan!',
          icon: 'success',
          title: 'Sukses!',
        }).then(() => {
          navigate('/pengumuman')
        })
      }
    } catch (e: any) {
      MySwal.fire({
        text: e.response?.data?.message || 'Terjadi kesalahan',
        icon: 'error',
        title: 'Gagal!',
      })
      console.error(e)
    }
  }

  const handleUpdatePengumuman = async () => {
    const formData = new FormData()
    uploadedFiles.forEach((file) => {
      formData.append('files', file)
    })
    formData.append('judul', judul)
    formData.append('isi', isi)
    formData.append('kategori', kategori)
    formData.append('oldFiles', JSON.stringify(oldFiles))

    try {
      const response = await axios.patch(
        `${apiUrl}/api/pengumuman/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.status === 200) {
        MySwal.fire({
          text: 'Pengumuman berhasil diperbarui!',
          icon: 'success',
          title: 'Sukses!',
        }).then(() => {
          navigate('/pengumuman')
        })
      }
    } catch (e: any) {
      MySwal.fire({
        text: e.response?.data?.message || 'Terjadi kesalahan',
        icon: 'error',
        title: 'Gagal!',
      })
      console.error(e)
    }
  }

  const handleGetPengumuman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pengumuman/${id}`)
      if (response.status === 200) {
        const tempDataPengumuman = response.data.data
        setJudul(tempDataPengumuman.judul)
        setIsi(tempDataPengumuman.isi)
        setKategori(tempDataPengumuman.kategori)
        if (tempDataPengumuman.file) {
          setOldFiles(tempDataPengumuman.file)
        }
      }
    } catch (e: any) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (id) {
      handleGetPengumuman().then()
    }
  }, [id])

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
        {/* Form Upload File */}
        <div className="mb-3" style={{ width: '49%' }}>
          <label>File</label>
          <br />
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
        </div>

        {/* Menampilkan file yang diunggah */}
        {uploadedFiles.length > 0 && (
          <div className="mt-3">
            <h5>Selected Files:</h5>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>
                  {file.name}{' '}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <Trash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Menampilkan file lama (jika dalam mode edit) */}
        {oldFiles.length > 0 && (
          <div className="mt-3">
            <h5>Current Files at Announcement:</h5>
            <table className={'table table-bordered table-hover mt-3'}>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {oldFiles.map((file, index) => (
                  <tr key={index}>
                    <td>{file.originalFilename}</td>
                    <td>
                      <button
                        className={'btn btn-danger'}
                        onClick={() => {
                          const newFiles = [...oldFiles]
                          newFiles.splice(index, 1)
                          setOldFiles(newFiles)
                        }}
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form Input Judul, Isi, dan Kategori */}
        <div className={'w-100'}>
          <div className={'row'}>
            <div className="form-group col-sm-6">
              <label>Judul Pengumuman</label>
              <input
                type="text"
                onChange={(e) => {
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
                onChange={(e) => {
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
                onChange={(e) => {
                  setKategori(e.target.value)
                  setKategoriErr('')
                }}
                className="form-control"
              />
              <span className="text-danger">{kategoriErr}</span>
            </div>
          </div>
        </div>

        {/* Tombol Simpan/Update */}
        <button
          className={'btn btn-success mb-3'}
          onClick={() => {
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

import { ArrowLeft } from 'react-bootstrap-icons'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { isStringContainsNumber } from '@app/utils/is-string-contains-number'

export function AddBookPage() {
  const { id } = useParams()
  const [judulBuku, setJudulBuku] = useState('')
  const [judulBukuErr, setJudulBukuErr] = useState('')
  const [jumlahHalaman, setJumlahHalaman] = useState(0)
  const [jumlahHalamanErr, setJumlahHalamanErr] = useState('')
  const [penulis, setPenulis] = useState('')
  const [penulisErr, setPenulisErr] = useState('')
  const [bahasa, setBahasa] = useState('')
  const [bahasaErr, setBahasaErr] = useState('')
  const [penerbit, setPenerbit] = useState('')
  const [penerbitErr, setPenerbitErr] = useState('')
  const [edisi, setEdisi] = useState('')
  const [edisiErr, setEdisiErr] = useState('')
  const [tahunTerbit, setTahunTerbit] = useState(0)
  const [tahunTerbitErr, setTahunTerbitErr] = useState('')
  const [isbn, setIsbn] = useState('')
  const [isbnErr, setisbnErr] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [lokasiErr, setLokasiErr] = useState('')
  const [abstrak, setAbstrak] = useState('')
  const [abstrakErr, setAbstrakErr] = useState('')
  const [banyakBuku, setBanyakBuku] = useState(0)
  const [banyakBukuErr, setBanyakBukuErr] = useState('')
  const [gambar, setGambar] = useState<any>(undefined)
  const [gambarErr, setGambarErr] = useState<string>('')
  const [oldGambar, setOldGambar] = useState<string>('')
  const navigation = useNavigate()
  const MySwal = withReactContent(Swal)

  const getBookData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/book/${id}`)
      setJudulBuku(response.data.data.judul)
      setPenulis(response.data.data.penulis)
      setPenerbit(response.data.data.penerbit)
      setTahunTerbit(response.data.data.tahun_terbit)
      setIsbn(response.data.data.isbn)
      setJumlahHalaman(response.data.data.jumlah_halaman)
      setBahasa(response.data.data.bahasa)
      setEdisi(response.data.data.edisi)
      setAbstrak(response.data.data.abstrak)
      setLokasi(response.data.data.lokasi)
      setBanyakBuku(response.data.data.banyak_buku)
      setOldGambar(response.data.data.gambar)
    } catch (e: any) {
      console.log(e)
    }
  }

  const handleSaveBuku = async () => {
    try {
      const formData = new FormData()
      formData.append('judul', judulBuku)
      formData.append('penulis', penulis)
      formData.append('penerbit', penerbit)
      formData.append('tahun_terbit', `${tahunTerbit}`)
      formData.append('isbn', isbn)
      formData.append('jumlah_halaman', `${jumlahHalaman}`)
      formData.append('bahasa', bahasa)
      formData.append('edisi', edisi)
      formData.append('abstrak', abstrak)
      formData.append('status', banyakBuku > 0 ? 'true' : 'false')
      formData.append('gambar', gambar)
      formData.append('lokasi', lokasi)
      formData.append('banyak_buku', banyakBuku.toString())

      const response = await axios.post(`${apiUrl}/api/book`, formData)

      if (response.status === 200) {
        navigation('/book')
      }
    } catch (e: any) {
      MySwal.fire({
        title: 'Failed!',
        text: e.response.data.message,
        icon: 'error',
      })
      console.log(e)
    }
  }

  const handleUpdateBuku = async () => {
    try {
      const formData = new FormData()
      formData.append('judul', judulBuku)
      formData.append('penulis', penulis)
      formData.append('penerbit', penerbit)
      formData.append('tahun_terbit', `${tahunTerbit}`)
      formData.append('isbn', isbn)
      formData.append('jumlah_halaman', `${jumlahHalaman}`)
      formData.append('bahasa', bahasa)
      formData.append('edisi', edisi)
      formData.append('abstrak', abstrak)
      formData.append('lokasi', lokasi)
      formData.append('status', banyakBuku > 0 ? 'true' : 'false')
      formData.append('gambar', gambar)
      formData.append('banyak_buku', banyakBuku.toString())

      const response = await axios.put(`${apiUrl}/api/book/${id}`, formData)

      if (response.status === 200) {
        navigation('/book')
      }
    } catch (e: any) {
      MySwal.fire({
        title: 'Failed!',
        text: e.response.data.message,
        icon: 'error',
      })
      console.log(e)
    }
  }

  useEffect(() => {
    if (id) {
      getBookData().then()
    }
  }, [])

  return (
    <div>
      <h1 className={'ml-3 pt-3'}>Buku</h1>

      <div
        className={'d-flex align-items-center bg-white px-3 py-1 mb-3'}
        style={{ gap: 10 }}
      >
        <div
          className={
            'd-flex flex-column align-items-sm-center justify-content-center rounded-circle'
          }
          style={{
            backgroundColor: '#87C1FF',
            width: '40px',
            height: '40px',
          }}
          onClick={() => {
            navigation('/book')
          }}
        >
          <ArrowLeft size={'30'} color={'#3722AE'} />
        </div>

        <span
          style={{
            color: '#3722AE',
          }}
          className={'text-lg'}
        >
          {id ? 'Edit Buku' : 'Tambah Buku'}
        </span>
      </div>

      <div className={'px-5'}>
        <div className={'w-100'}>
          <div className={'row'}>
            <div className="form-group col-sm">
              <label>File</label>
              <br />
              {oldGambar && oldGambar !== 'null' ? (
                <img
                  src={`${apiUrl}/${oldGambar}`}
                  alt="old-cover"
                  style={{
                    width: 150,
                  }}
                />
              ) : (
                ''
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const selectedFile = e.target.files![0]
                  if (selectedFile) {
                    const allowedTypes = [
                      'image/jpeg',
                      'image/png',
                      'image/gif',
                    ]

                    if (!allowedTypes.includes(selectedFile.type)) {
                      setGambarErr(
                        'Hanya file gambar (JPEG, PNG) yang diperbolehkan!'
                      )
                      e.target.value = '' // Reset input jika tidak valid
                      return
                    }

                    setGambar(selectedFile)
                  }
                }}
                className={'border p-1 rounded-lg w-100 bg-white'}
              />
              <span className={'text-danger'}>{gambarErr}</span>
            </div>

            <div className="form-group col-sm">
              <label>Banyak Buku</label>
              <input
                type="number"
                value={banyakBuku}
                min={0}
                onChange={(e) => {
                  setBanyakBuku(+e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{banyakBukuErr}</span>
            </div>
          </div>

          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Judul Buku</label>
              <input
                type="text"
                value={judulBuku}
                onChange={(e) => {
                  setJudulBuku(e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{judulBukuErr}</span>
            </div>

            <div className="form-group col-sm">
              <label>Jumlah Halaman</label>
              <input
                type="number"
                value={jumlahHalaman}
                min={0}
                onChange={(e) => {
                  setJumlahHalaman(+e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{jumlahHalamanErr}</span>
            </div>
          </div>

          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Penulis</label>
              <input
                type="text"
                value={penulis}
                onChange={(e) => {
                  setPenulis(e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{penulisErr}</span>
            </div>

            <div className="form-group col-sm">
              <label>Bahasa</label>
              <input
                type="text"
                value={bahasa}
                onChange={(e) => {
                  setBahasa(e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{bahasaErr}</span>
            </div>
          </div>

          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Penerbit</label>
              <input
                type="text"
                value={penerbit}
                onChange={(e) => {
                  setPenerbit(e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{penerbitErr}</span>
            </div>

            <div className="form-group col-sm">
              <label>Edisi</label>
              <input
                type="text"
                value={edisi}
                onChange={(e) => {
                  setEdisi(e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{edisiErr}</span>
            </div>
          </div>

          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Tahun Terbit</label>
              <input
                type="number"
                value={tahunTerbit}
                min={0}
                onChange={(e) => {
                  setTahunTerbit(+e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{tahunTerbitErr}</span>
            </div>

            <div className="form-group col-sm">
              <label>Status</label>
              <select
                value={banyakBuku > 0 ? 'true' : 'false'}
                className="form-control"
              >
                <option value={'true'}>Tersedia</option>
                <option value={'false'}>Tidak Tersedia</option>
              </select>
            </div>
          </div>

          <div className={'row'}>
            <div className="form-group col-sm">
              <label>ISBN</label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => {
                  setIsbn(e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{isbnErr}</span>
            </div>

            <div className="form-group col-sm">
              <label>Abstrak</label>
              <input
                type="text"
                value={abstrak}
                onChange={(e) => {
                  setAbstrak(e.target.value)
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{abstrakErr}</span>
            </div>
          </div>

          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Lokasi</label>
              <input
                type="text"
                value={lokasi}
                onChange={(e) => {
                  setLokasi(e.target.value)
                  setLokasiErr('')
                }}
                className="form-control"
              />
              <span className={'text-danger'}>{lokasiErr}</span>
            </div>
          </div>
        </div>

        <button
          className={'btn btn-success mb-3'}
          onClick={() => {
            setJudulBukuErr('')
            setPenulisErr('')
            setBahasaErr('')
            setPenerbitErr('')
            setEdisiErr('')
            setisbnErr('')
            setAbstrakErr('')
            setGambarErr('')
            setTahunTerbitErr('')
            setJumlahHalamanErr('')
            setBanyakBukuErr('')
            setLokasiErr('')

            if (judulBuku === '') {
              setJudulBukuErr('Tidak boleh kosong')
              return
            }
            if (penulis === '') {
              setPenulisErr('Tidak boleh kosong')
              return
            }
            if (isStringContainsNumber(penulis)) {
              setPenulisErr('Tidak boleh mengandung angka!')
              return
            }
            if (bahasa === '') {
              setBahasaErr('Tidak boleh kosong')
              return
            }
            if (isStringContainsNumber(bahasa)) {
              setBahasaErr('Tidak boleh mengandung angka!')
              return
            }
            if (penerbit === '') {
              setPenerbitErr('Tidak boleh kosong')
              return
            }
            if (isStringContainsNumber(penerbit)) {
              setPenerbitErr('Tidak boleh mengandung angka!')
              return
            }
            if (edisi === '') {
              setEdisiErr('Tidak boleh kosong')
              return
            }
            if (isbn === '') {
              setisbnErr('Tidak boleh kosong')
              return
            }
            if (abstrak === '') {
              setAbstrakErr('Tidak boleh kosong')
              return
            }
            if (jumlahHalaman === 0 || jumlahHalaman === null) {
              setJumlahHalamanErr('Tidak boleh kosong')
              return
            }
            if (tahunTerbit === 0 || tahunTerbit === null) {
              setTahunTerbitErr('Tidak boleh kosong')
              return
            }
            if (banyakBuku === null) {
              setBanyakBukuErr('Tidak boleh kosong')
              return
            }

            console.log(banyakBuku)

            if (banyakBuku < 0) {
              setBanyakBukuErr('Tidak boleh negatif')
              return
            }

            if (jumlahHalaman < 0) {
              setJumlahHalamanErr('Tidak boleh negatif')
              return
            }

            if (tahunTerbit < 0) {
              setTahunTerbitErr('Tidak boleh negatif')
              return
            }
            if (id) {
              handleUpdateBuku().then()
            } else {
              handleSaveBuku().then()
            }
          }}
        >
          Simpan
        </button>
      </div>
    </div>
  )
}

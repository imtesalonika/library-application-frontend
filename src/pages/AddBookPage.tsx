import { ArrowLeft } from 'react-bootstrap-icons'
import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function AddBookPage() {
  const [judulBuku, setJudulBuku] = useState('')
  const [jumlahHalaman, setJumlahHalaman] = useState('')
  const [penulis, setPenulis] = useState('')
  const [bahasa, setBahasa] = useState('')
  const [penerbit, setPenerbit] = useState('')
  const [edisi, setEdisi] = useState('')
  const [tahunTerbit, setTahunTerbit] = useState('')
  const [isbn, setIsbn] = useState('')
  const [abstrak, setAbstrak] = useState('')
  const [status, setStatus] = useState('')
  const [banyakBuku, setBanyakBuku] = useState(0)
  const [gambar, setGambar] = useState<any>(undefined)
  const navigation = useNavigate()
  const MySwal = withReactContent(Swal)

  const handleSaveBuku = async () => {
    try {
      const formData = new FormData()
      formData.append('judul', judulBuku)
      formData.append('penulis', penulis)
      formData.append('penerbit', penerbit)
      formData.append('tahun_terbit', tahunTerbit)
      formData.append('isbn', isbn)
      formData.append('jumlah_halaman', jumlahHalaman)
      formData.append('bahasa', bahasa)
      formData.append('edisi', edisi)
      formData.append('abstrak', abstrak)
      formData.append('status', banyakBuku > 0 ? 'true' : 'false')
      formData.append('gambar', gambar)
      formData.append('banyak_buku', banyakBuku.toString())

      const response = await axios.post(`${apiUrl}/api/book`, formData)

      if (response.status === 200) {
        navigation('/books')
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

  return (
    <div>
      <h2 className={'font-weight-bold ml-3 pt-3'}>Buku</h2>

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
            navigation('/books')
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
          Tambah Buku
        </span>
      </div>

      <div className={'px-5'}>
        <div className={'w-100'}>
          <div className={'row'}>
            <div className="form-group col-sm">
              <label>File</label>
              <br />
              <input
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files![0]
                  if (selectedFile) {
                    setGambar(selectedFile) // Set file ke state
                    console.log('File terpilih:', selectedFile)
                  } else {
                    console.log('Tidak ada file yang dipilih')
                  }
                }}
                className={'border p-1 rounded-lg w-100 bg-white'}
              />
            </div>

            <div className="form-group col-sm">
              <label>Banyak Buku</label>
              <input
                type="text"
                value={banyakBuku}
                onChange={(e) => {
                  setBanyakBuku(+e.target.value)
                }}
                className="form-control"
              />
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
            </div>

            <div className="form-group col-sm">
              <label>Jumlah Halaman</label>
              <input
                type="text"
                value={jumlahHalaman}
                onChange={(e) => {
                  setJumlahHalaman(e.target.value)
                }}
                className="form-control"
              />
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
            </div>
          </div>

          <div className={'row'}>
            <div className="form-group col-sm">
              <label>Tahun Terbit</label>
              <input
                type="text"
                value={tahunTerbit}
                onChange={(e) => {
                  setTahunTerbit(e.target.value)
                }}
                className="form-control"
              />
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
            </div>
          </div>
        </div>

        <button
          className={'btn btn-success mb-3'}
          onClick={() => {
            handleSaveBuku().then()
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}

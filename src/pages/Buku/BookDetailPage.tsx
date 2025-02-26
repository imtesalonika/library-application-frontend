import { useEffect, useState } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'

export function BookDetailPage() {
  const { id } = useParams()
  const [bookData, setBookData] = useState<any>()

  const getBookData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/book/${id}`)
      console.log(response.data.data)
      setBookData(response.data.data)
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    getBookData().then()
  }, [])

  return (
    <div className={'p-4 bg-white'}>
      <div className={'d-flex flex-column mb-3 w-100'} style={{ gap: 10 }}>
        <Link to={'/book'}>
          <button
            className="btn btn-success d-flex align-items-center"
            style={{
              gap: 3,
            }}
          >
            <ArrowLeft /> Back
          </button>
        </Link>

        {/*Bagian gambar cover*/}
        <div className={'d-flex justify-content-center'}>
          <img
            className={'border rounded-lg'}
            src={
              bookData?.gambar && bookData?.gambar !== 'null'
                ? `${apiUrl}/${bookData?.gambar}`
                : '/img/placeholder_buku.jpg'
            }
            alt={'gambar-cover'}
            style={{
              width: '100%',
              maxWidth: 400,
            }}
          />
        </div>

        {/*Bagian data teks*/}
        <div className={'d-flex justify-content-center mt-3'}>
          <div
            style={{
              maxWidth: '80%',
              width: '100%',
            }}
          >
            <table className="table">
              <tbody>
                <tr>
                  <th>Judul</th>
                  <td>:</td>
                  <td>{bookData?.judul}</td>
                </tr>
                <tr>
                  <th>Penulis</th>
                  <td>:</td>
                  <td>{bookData?.penulis}</td>
                </tr>
                <tr>
                  <th>Penerbit</th>
                  <td>:</td>
                  <td>{bookData?.penerbit}</td>
                </tr>
                <tr>
                  <th>Tahun Terbit</th>
                  <td>:</td>
                  <td>{bookData?.tahun_terbit}</td>
                </tr>
                <tr>
                  <th>ISBN</th>
                  <td>:</td>
                  <td>{bookData?.isbn ? bookData?.isbn : '-'}</td>
                </tr>
                <tr>
                  <th>Lokasi</th>
                  <td>:</td>
                  <td>{bookData?.lokasi ? bookData?.lokasi : '-'}</td>
                </tr>
                <tr>
                  <th>Jumlah Halaman</th>
                  <td>:</td>
                  <td>{bookData?.jumlah_halaman}</td>
                </tr>
                <tr>
                  <th>Bahasa</th>
                  <td>:</td>
                  <td>{bookData?.bahasa}</td>
                </tr>
                <tr>
                  <th>Edisi</th>
                  <td>:</td>
                  <td>{bookData?.edisi}</td>
                </tr>
                <tr>
                  <th>Abstrak</th>
                  <td>:</td>
                  <td>{bookData?.abstrak ? bookData?.abstrak : '-'}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>:</td>
                  <td>{bookData?.status}</td>
                </tr>
                <tr>
                  <th>Banyak Buku</th>
                  <td>:</td>
                  <td>{bookData?.banyak_buku}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

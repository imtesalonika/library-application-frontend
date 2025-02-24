import { useEffect, useState } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'

export function DetailTAPage() {
  const { id } = useParams()
  const [tugasakhirData, setTugasAkhirData] = useState<any>()

  const getTugasAkhirData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/tugasakhir/${id}`)
      setTugasAkhirData(response.data.data)
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    getTugasAkhirData().then()
  }, [])

  return (
    <div className={'p-4 bg-white'}>
      <div className={'d-flex flex-column mb-3 w-100'} style={{ gap: 10 }}>
        <Link to={'/tugasakhir'}>
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
              tugasakhirData?.gambar
                ? `${apiUrl}/${tugasakhirData?.gambar}`
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
                  <td>{tugasakhirData?.judul}</td>
                </tr>
                <tr>
                  <th>Penulis</th>
                  <td>:</td>
                  <td>{tugasakhirData?.penulis}</td>
                </tr>
                <tr>
                  <th>Pembimbing</th>
                  <td>:</td>
                  <td>{tugasakhirData?.pembimbing}</td>
                </tr>
                <tr>
                  <th>Fakultas</th>
                  <td>:</td>
                  <td>{tugasakhirData?.fakultas}</td>
                </tr>
                <tr>
                  <th>Prodi</th>
                  <td>:</td>
                  <td>{tugasakhirData?.prodi}</td>
                </tr>
                <tr>
                  <th>Kata Kunci</th>
                  <td>:</td>
                  <td>{tugasakhirData?.katakunci}</td>
                </tr>
                <tr>
                  <th>Abstrak</th>
                  <td>:</td>
                  <td>
                    {tugasakhirData?.abstrak ? tugasakhirData?.abstrak : '-'}
                  </td>
                </tr>
                <tr>
                  <th>Lokasi</th>
                  <td>:</td>
                  <td>{tugasakhirData?.lokasi}</td>
                </tr>
                <tr>
                  <th>Tahun Ajaran</th>
                  <td>:</td>
                  <td>{tugasakhirData?.tahun}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

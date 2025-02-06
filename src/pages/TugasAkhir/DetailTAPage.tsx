import { useEffect, useState } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'

export function DetailTAPage() {
//   const { id } = useParams()
//   const [bookData, setBookData] = useState<any>()

//   const getBookData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/book/${id}`)
//       setBookData(response.data.data)
//     } catch (e: any) {
//       console.log(e)
//     }
//   }

//   useEffect(() => {
//     getBookData().then()
//   }, [])

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
            src="/img/logo.png"
            // src={`${apiUrl}/${bookData?.gambar}`}
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
                  <td>Pembangunan Aplikasi Auto Grading Del Code Checker Menggunakan Unity Game Engine: Studi Kasus Institut Teknologi Del</td>
                </tr>
                <tr>
                  <th>Penulis</th>
                  <td>:</td>
                  <td>Sondang Kevin Sihaloho - 11S190044
                  Bintang Lumban Raja - 11S19033</td>
                </tr>
                <tr>
                  <th>Pembimbing</th>
                  <td>:</td>
                  <td>Arie Satia Dharma, S.T., M.Kom
                  Tahan HJ Sihombing, S.Pd., M. App Ling (TESOL)</td>
                </tr>
                <tr>
                  <th>Fakultas</th>
                  <td>:</td>
                  <td>Fakultas Teknik Informatika dan Elektro</td>
                </tr>
                <tr>
                  <th>Prodi</th>
                  <td>:</td>
                  <td>Informatika</td>
                </tr>
                <tr>
                  <th>Kata Kunci</th>
                  <td>:</td>
                  <td>Auto Grading, Code Checker, Unity, Game Engineering</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { ArrowLeft } from 'react-bootstrap-icons'

export function PengumumanDetailPage() {
  const { id } = useParams()
  const [pengumumanData, setPengumumanData] = useState<any>()
  const [files, setFiles] = useState<any>()

  const getPengumuman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pengumuman/${id}`)
      setPengumumanData(response.data.data)
      if (response.data.data.file) {
        setFiles(JSON.parse(response.data.data.file))
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPengumuman().then()
  }, [])

  return (
    <div className={'p-4 bg-white'}>
      <div className={'d-flex flex-column mb-3 w-100'} style={{ gap: 10 }}>
        <h3>
          <span className={'text-danger font-weight-bold'}>
            [{pengumumanData?.kategori}]
          </span>{' '}
          <span className={'text-primary font-weight-bold'}>
            {pengumumanData?.judul}
          </span>
        </h3>

        <Link to={'/pengumuman'}>
          <button
            className="btn btn-success d-flex align-items-center"
            style={{
              gap: 3,
            }}
          >
            <ArrowLeft /> Back
          </button>
        </Link>

        <p>{pengumumanData?.isi}</p>

        {pengumumanData?.file ? (
          <table className={'table table-bordered table-hover mt-3'}>
            <thead>
              <tr>
                <th>Nama File</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {files.map((row: any, index: number) => (
                <tr key={index}>
                  <td>
                    <a href={`${apiUrl}/${row.location}`}>
                      {row.originalFilename}
                    </a>
                  </td>
                  <td>{row.fileSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

import DataTable from 'datatables.net-react'
import DT, { Config } from 'datatables.net-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-buttons-bs4'
import { useEffect, useState } from 'react'
import {
  Plus,
  PencilSquare,
  Trash,
  BoxArrowUpRight,
} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'

DataTable.use(DT)

export function PengumumanPage() {
  const [dataPengumuman, setDataPengumuman] = useState<any>([])

  const getDataPengumuman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pengumuman`)
      console.log(response.data.data)

      setDataPengumuman(response.data.data)
    } catch (e: any) {
      console.log(e.response.data.message)
    }
  }

  useEffect(() => {
    getDataPengumuman().then()
  }, [])

  return (
    <div className={'p-4 bg-white'}>
      <h2>Berita</h2>
      <div className={'d-flex mb-3 w-100'} style={{ gap: 10 }}>
        <Link to={'/addberita'}>
          <button
            className="btn btn-success d-flex align-items-center"
            style={{
              gap: 3,
            }}
          >
            <Plus /> Add Berita
          </button>
        </Link>
      </div>

      <table className={'table table-bordered table-hover mt-3'}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Judul Berita</th>
            <th>Kategori</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {dataPengumuman.map((row: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.judul}</td>
              <td>{row.isi}</td>
              <td>
                <div className="btn-group" role="group" style={{ gap: '5px' }}>
                  <button className="btn btn-success btn-sm">
                    <BoxArrowUpRight />
                  </button>
                  <button className="btn btn-warning btn-sm">
                    <PencilSquare />
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

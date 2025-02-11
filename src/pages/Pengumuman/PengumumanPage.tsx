import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-buttons-bs4'
import { useEffect, useState } from 'react'
import {
  Plus,
  PencilSquare,
  Trash,
  BoxArrowUpRight,
} from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '@app/utils/env'
import { formatWaktu } from '@app/services/format-waktu'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

DataTable.use(DT)

export function PengumumanPage() {
  const [dataPengumuman, setDataPengumuman] = useState<any>([])
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  const getDataPengumuman = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/pengumuman`)

      setDataPengumuman(response.data.data)
    } catch (e: any) {
      console.log(e.response.data.message)
    }
  }

  const handleRemovePengumuman = async (id: number) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/pengumuman/${id}`)

      if (response.status === 200) {
        MySwal.fire({
          text: response.data.message,
          icon: 'success',
          title: 'Sukses!',
        }).then()
        getDataPengumuman().then()
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

  useEffect(() => {
    getDataPengumuman().then()
  }, [])

  return (
    <div className={'p-4 bg-white'}>
      <h2>Pengumuman</h2>
      <div className={'d-flex mb-3 w-100'} style={{ gap: 10 }}>
        <Link to={'/pengumuman/add'}>
          <button
            className="btn btn-success d-flex align-items-center"
            style={{
              gap: 3,
            }}
          >
            <Plus /> Add Pengumuman
          </button>
        </Link>
      </div>

      <table className={'table table-bordered table-hover mt-3'}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Judul Pengumuman</th>
            <th>Isi Pengumuman</th>
            <th>Kategori</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {dataPengumuman.length > 0 ? (
            dataPengumuman.map((row: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.judul}</td>
                <td>{row.isi}</td>
                <td>{row.kategori}</td>
                <td>{formatWaktu(row.created_at)}</td>
                <td>{formatWaktu(row.updated_at)}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    style={{ gap: '5px' }}
                  >
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        navigate(`/pengumuman/${row.id}`)
                      }}
                    >
                      <BoxArrowUpRight />
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        navigate(`/pengumuman/edit/${row.id}`)
                      }}
                    >
                      <PencilSquare />
                    </button>
                    <button
                      onClick={() => {
                        handleRemovePengumuman(row.id).then()
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                Tidak ada data!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

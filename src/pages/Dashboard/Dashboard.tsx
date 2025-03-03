import { apiUrl } from '@app/utils/env'
import { ContentHeader, SmallBox } from '@components'
import {
  faUsers,
  faBook,
  faExchangeAlt,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [todayVisitor, setTodayVisitor] = useState(0);
  const [dataPeminjaman, setDataPeminjaman] = useState(0);
  const [bookData, setBookData] = useState(0);
  const [usersData, setUsersData] = useState(0);

  const getVisitorInfo = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/visitor`);
      setTodayVisitor(response.data.data.length);
    } catch (e) {
      console.log(e);
    }
  }

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users`);
      setUsersData(response.data.data.length);
    } catch (e) {
      console.log(e);
    }
  }

  const getBookData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/book`)
      setBookData(response.data.data.length)
    } catch (e: any) {
      console.log(e)
    }
  }

  const getDataPeminjaman = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/pinjam-buku`);

        if (response.status === 200) {
            setDataPeminjaman(response.data.data.length);
            console.log('Data peminjaman berhasil diambil:', response.data.data); // Tambahkan log
        }
    } catch (e: any) {
        toast.error(e.response.data.message);
        console.error('Gagal mengambil data peminjaman:', e); // Tambahkan log error
    }
};

  useEffect(() => {
    getVisitorInfo().then();
    getDataPeminjaman().then();
    getBookData().then();
    getAllUsers().then();
  }, [])

  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Total Users */}
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Total Users"
                text={`${usersData}`}
                navigateTo="/dashboard/user-management"
                variant="info"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faUsers}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>

            {/* Total Books */}
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Total Books"
                text={`${bookData}`}
                navigateTo="/book"
                variant="success"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faBook}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>

            {/* Books Borrowed Report */}
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Total Books Borrowed"
                text={`${dataPeminjaman}`}
                navigateTo="/dashboard/borrowed-books-report"
                variant="warning"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faExchangeAlt}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>

            {/* Visitors */}
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Visitors Today"
                text={`${todayVisitor }`}
                navigateTo="/dashboard/visitor-report"
                variant="danger"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

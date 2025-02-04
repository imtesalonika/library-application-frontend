import { useState } from 'react';
import { ContentHeader } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Table, Button } from 'react-bootstrap';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { name: 'Albert Sagala, S.T, M.T', username: 'albert', email: 'albert@del.ac.id', role: 'Dosen Program Studi S1 Elektro', phone: '08213222425' },
    { name: 'Anggait Saud Parulian, S.T.,Kom.', username: 'anggait', email: 'anggait.parulian@del.ac.id', role: 'Member of BAA', phone: '08213222425' },
    { name: 'Ardiles Sinaga, S.T., M.T.', username: 'ardiles', email: 'ardiles.sinaga@del.ac.id', role: 'Ketua Program Studi D4 Teknologi Rekayasa Perangkat Lunak', phone: '09213222425' },
  ]);

  return (
    <div>
      <ContentHeader title="Pengaturan Pengguna" />

      <div className="mb-3">
        <Button variant="success" className="me-2">
          <FontAwesomeIcon icon={faPlus} /> Tambah Pengguna Secara Manual
        </Button>
        <Button variant="primary" className="me-2">Daftar Pengguna yang Diziinkan</Button>
        <Button variant="warning">Daftar Tindakan yang Tertunda</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Nama Pengguna</th>
            <th>Alamat Email</th>
            <th>Role</th>
            <th>No. Telepon</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>
              <td>
                <Button variant="success" className="me-2">
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button variant="danger">
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
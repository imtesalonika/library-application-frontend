import { ContentHeader } from '@components';
import { Image } from '@profabric/react-components';
import { Button } from '@app/styles/common';
import { useAppSelector } from '@app/store/store';

const Profile = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <>
      <ContentHeader title="Profile" />
      <section className="content">
        <div className="container-fluid">
          <div className="card mx-auto p-4 text-center shadow-sm border-0" style={{ maxWidth: '600px', borderRadius: '12px' }}>
            {/* Foto Profil */}
            <div className="d-flex justify-content-center">
              <Image
                rounded
                src={currentUser?.photoURL || '/img/default-profile.png'}
                alt="User profile"
                className="border border-secondary p-2 rounded-circle"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </div>

            {/* Nama dan Role */}
            <h3 className="mt-3">{currentUser?.displayName || 'Pustakawan'}</h3>
            <p className="text-muted mb-3">Pustakawan</p>

            {/* Detail Profil */}
            <ul className="list-group text-start">
              <li className="list-group-item d-flex justify-content-between">
                <strong>Nama Pengguna:</strong> <span>Tesalonika Sitopu</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Nomor Telepon:</strong> <span>082165646255</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Alamat Email:</strong> <span>tesalonikasitopu@gmail.com</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Role:</strong> <span>Pustakawan</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Mulai Aktif Pada:</strong> <span>Sat, 18 May 2024</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Terakhir Dilihat:</strong> <span>3 mnts ago</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Alamat IP:</strong> <span>127.0.0.1</span>
              </li>
            </ul>

            {/* Tombol Aksi */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              <Button variant="primary">Ubah Gambar Profil</Button>
              <Button variant="secondary">Sunting Profil</Button>
              <Button variant="warning">Ganti Kata Sandi</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;

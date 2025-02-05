import { useState } from "react";
import axios from "axios";
import { apiUrl } from "@app/utils/env";

export function AddTAPage() {
    const [formData, setFormData] = useState({
        judul: "",
        kataKunci: "",
        penulis: "",
        abstrak: "",
        pembimbing: "",
        fakultas: "",
        prodi: ""
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveBuku = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/tugasakhir`, formData);
            alert("Tugas Akhir berhasil ditambahkan!");
            console.log(response.data);
        } catch (error) {
            console.error("Error saat menyimpan Tugas Akhir:", error);
            alert("Terjadi kesalahan saat menyimpan Tugas Akhir.");
        }
    };

    return (
        <div>
            <h2 className={'font-weight-bold ml-3 pt-3'}>Tugas Akhir</h2>
            <div className={'px-5'}>
                <div className={'w-100'}>
                    <div className={'row'}>
                        <div className="form-group col-sm">
                            <label>Judul Tugas Akhir</label>
                            <input type="text" className="form-control" name="judul" value={formData.judul} onChange={handleChange} />
                        </div>
                        <div className="form-group col-sm">
                            <label>Kata Kunci</label>
                            <input type="text" className="form-control" name="kataKunci" value={formData.kataKunci} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="form-group col-sm">
                            <label>Penulis</label>
                            <input type="text" className="form-control" name="penulis" value={formData.penulis} onChange={handleChange} />
                        </div>
                        <div className="form-group col-sm">
                            <label>Abstrak</label>
                            <textarea className="form-control" name="abstrak" value={formData.abstrak} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Pembimbing</label>
                            <input type="text" className="form-control" name="pembimbing" value={formData.pembimbing} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Fakultas</label>
                            <select className="form-control" name="fakultas" value={formData.fakultas} onChange={handleChange}>
                                <option value="">Pilih Fakultas</option>
                                <option value="FITE">FITE</option>
                                <option value="FTI">FTI</option>
                                <option value="FTB">FTB</option>
                                <option value="Vokasi">Vokasi</option>
                            </select>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="form-group col-sm-6">
                            <label>Prodi</label>
                            <select className="form-control" name="prodi" value={formData.prodi} onChange={handleChange}>
                                <option value="">Pilih Prodi</option>
                                <option value="Informatika">Informatika</option>
                                <option value="Teknik Elektro">Teknik Elektro</option>
                                <option value="Sistem Informasi">Sistem Informasi</option>
                                <option value="Teknik Bioproses">Teknik Bioproses</option>
                                <option value="Manajemen Rekayasa">Manajemen Rekayasa</option>
                                <option value="Teknik Metalurgi">Teknik Metalurgi</option>
                                <option value="Teknologi Informasi">Teknologi Informasi</option>
                                <option value="Teknologi Komputer">Teknologi Komputer</option>
                                <option value="Teknologi Rekayasa Perangkat Lunak">Teknologi Rekayasa Perangkat Lunak</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button className={'btn btn-success mb-3'} onClick={handleSaveBuku}>
                    Save
                </button>
            </div>
        </div>
    );
}

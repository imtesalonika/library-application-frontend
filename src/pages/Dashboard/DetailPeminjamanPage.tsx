import { useState } from "react";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function DetailPeminjamanPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const maxPagesToShow = 3;

    const bookData = Array.from({ length: 36 }, (_, i) => ({
        nomor: i + 1,
        judul: `Judul Buku ${i + 1}`,
        periode: `01-01-2024 - 15-01-2024`
    }));

    const totalPages = Math.ceil(bookData.length / itemsPerPage);
    const currentData = bookData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    return (
        <div className="p-4 bg-white">
            <h2>Detail Peminjaman</h2>
            <div className="d-flex justify-content-between mb-3">
                <Button variant="primary">Download</Button>
                <Form.Control type="text" placeholder="Search..." style={{ width: "250px" }} />
            </div>
            <Table bordered hover className="text-center">
                <thead className="table-dark">
                    <tr>
                        <th style={{ width: "10%" }}>Nomor</th>
                        <th style={{ width: "60%" }}>Judul Buku</th>
                        <th style={{ width: "30%" }}>Periode Peminjaman</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((book, index) => (
                        <tr key={index}>
                            <td>{book.nomor}</td>
                            <td>{book.judul}</td>
                            <td>{book.periode}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-end">
                <Pagination>
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                    {[...Array(endPage - startPage + 1)].map((_, i) => (
                        <Pagination.Item key={startPage + i} active={startPage + i === currentPage} onClick={() => setCurrentPage(startPage + i)}>
                            {startPage + i}
                        </Pagination.Item>
                    ))}
                    {endPage < totalPages && (
                        <Pagination.Next onClick={() => setCurrentPage(endPage + 1)} />
                    )}
                </Pagination>
            </div>
        </div>
    );
}
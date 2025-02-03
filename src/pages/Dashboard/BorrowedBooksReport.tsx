import { useState } from "react";
import { ContentHeader } from "@components";

const BorrowedBooksReport = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([
    { month: "January", count: 120 },
    { month: "February", count: 95 },
    { month: "March", count: 110 },
    { month: "April", count: 130 },
    { month: "May", count: 150 },
  ]);

  return (
    <div>
      <ContentHeader title="Borrowed Books Report" />

      <section className="content">
        <div className="container-fluid">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Month</th>
                <th>Books Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((data, index) => (
                <tr key={index}>
                  <td>{data.month}</td>
                  <td>{data.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BorrowedBooksReport;

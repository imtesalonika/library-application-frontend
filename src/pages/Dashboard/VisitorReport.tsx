import { ContentHeader } from "@components";
import { useState } from "react";

const VisitorReport = () => {
  // Data dummy untuk laporan pengunjung berdasarkan jam
  const [visitorData] = useState([
    { hour: "08:00 - 09:00", count: 50 },
    { hour: "09:00 - 10:00", count: 80 },
    { hour: "10:00 - 11:00", count: 60 },
    { hour: "11:00 - 12:00", count: 40 },
    { hour: "12:00 - 13:00", count: 30 },
    { hour: "13:00 - 14:00", count: 70 },
    { hour: "14:00 - 15:00", count: 10 },
    { hour: "15:00 - 16:00", count: 100 },
  ]);

  return (
    <div>
      <ContentHeader title="Visitor Report" />

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Visitor Report by Hour</h3>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Hour</th>
                    <th>Visitors</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.hour}</td>
                      <td>{data.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitorReport;

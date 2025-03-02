import { apiUrl } from "@app/utils/env";
import { ContentHeader } from "@components";
import axios from "axios";
import { useEffect, useState } from "react";

const VisitorReport = () => {
  const [visitorData, setVisitorData] = useState<any>([]);

  const groupByHour = (data: any) => {
    const result = [
      { hour: "00:00 - 01:00", count: 0 },
      { hour: "01:00 - 02:00", count: 0 },
      { hour: "02:00 - 03:00", count: 0 },
      { hour: "03:00 - 04:00", count: 0 },
      { hour: "04:00 - 05:00", count: 0 },
      { hour: "05:00 - 06:00", count: 0 },
      { hour: "06:00 - 07:00", count: 0 },
      { hour: "07:00 - 08:00", count: 0 },
      { hour: "08:00 - 09:00", count: 0 },
      { hour: "09:00 - 10:00", count: 0 },
      { hour: "10:00 - 11:00", count: 0 },
      { hour: "11:00 - 12:00", count: 0 },
      { hour: "12:00 - 13:00", count: 0 },
      { hour: "14:00 - 15:00", count: 0 },
      { hour: "15:00 - 16:00", count: 0 },
      { hour: "16:00 - 17:00", count: 0 },
      { hour: "17:00 - 18:00", count: 0 },
      { hour: "18:00 - 19:00", count: 0 },
      { hour: "19:00 - 20:00", count: 0 },
      { hour: "20:00 - 21:00", count: 0 },
      { hour: "21:00 - 22:00", count: 0 },
      { hour: "22:00 - 23:00", count: 0 },
      { hour: "23:00 - 24:00", count: 0 },
    ];
  
    data.forEach(({ visit_time }: any) => {
      const date = new Date(visit_time);
      const hour = date.getUTCHours(); // Ambil jam dalam UTC
  
      // Sesuaikan dengan zona waktu jika perlu
      const localHour = hour + 7; // Contoh: UTC+7 (WIB)
      
      // Temukan rentang jam yang sesuai
      const index = result.findIndex(({ hour }) => {
        const [start, end] = hour.split(" - ").map(h => parseInt(h));
        return localHour >= start && localHour < end;
      });
  
      if (index !== -1) {
        result[index].count++;
      }
    });
  
    return result;
  };

  const getVisitorInfo = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/visitor`);
      setVisitorData(groupByHour(response.data.data));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getVisitorInfo().then();
  }, [])

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
                  {visitorData.map((data: any, index: number) => (
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

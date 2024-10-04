import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";  // Corrected import for charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

// Register the required elements for the charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from API (same as in UserTable)
    axios.get("http://localhost:3000/users/user")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data for dashboard!", error);
      });
  }, []);

  const barChartData = {
    labels: users.map(user => user.fullName),
    datasets: [
      {
        label: "Users by Phone Number",
        data: users.map(user => parseInt(user.phoneNumber)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Users with Address", "Users without Address"],
    datasets: [
      {
        data: [
          users.filter(user => user.address).length,
          users.filter(user => !user.address).length,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard-section">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Users by Phone Numbers</h5>
                  <Bar data={barChartData} />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Users with Address</h5>
                  <Pie data={pieChartData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

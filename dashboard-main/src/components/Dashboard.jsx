// Dashboard.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  faCalendar,
  faBell,
  faArrowLeft,
  faClipboardCheck,
  faUser,
  faTachometerAlt,
  faCog
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {

  const [formData, setFormData] = useState([]);

  const navigate = useNavigate();

  const [searchOption, setSearchOption] = useState("default");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8085/requests/getAllVouchers`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [formData]);
  

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update the time every second

    return () => {
      clearInterval(timer);
    };
  }, []);

  const dateOptions = { day: "numeric", month: "long", year: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

  const [selectedAllMUs, setSelectedAllMUs] = useState("");

  const handleRequests = (e) => {
    
    setSelectedAllMUs(e.target.value);
  };

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filters = (request) => {
    if (searchOption === 'default') {
      return true;
    } else if (searchOption === 'candidateName') {
      return request.candidateName === searchValue;
    } else if (searchOption === 'plannedExamDate') {
      return request.plannedExamDate === searchValue;
    } else if (searchOption === 'cloudPlatform') {
      return request.cloudPlatform === searchValue;
    } else if (searchOption === 'cloudExam') {
      return request.cloudExam === searchValue;
    }
  };

  const handleAssigneVoucherClick = (email,examName) => {
    navigate(`/voucher-dashboard/${email}/${examName}`);
    
  };

  return (
    <div className="headd" >

      <div className="navbar" style={{backgroundColor: "rgb(112, 183, 184)"}}>

      <div className="user-info">
          <p id="name">Welcome!!</p>
          <p id="date">
            {currentTime.toLocaleTimeString(undefined, timeOptions)}{" "}
            {currentTime.toLocaleDateString(undefined, dateOptions)}
          </p>
        </div>
        <input type="text" className="search-box" placeholder="Search" />
        <div className="user-info">
          <p ><FontAwesomeIcon icon={faUser} /> Name</p>
        </div>
        {/* <p id="profile">Kadin Septimus</p> */}
      </div>            {/*nav bar div*/}

      {/* <div className="back">
            <Link to='/' style={{"color":"blue"}}>  {" "} <FontAwesomeIcon icon={faArrowLeft} />Back </Link>
      </div> */}

    <div className="wrap">

      <div className="dashboard-container">

        <div className="dashboard-dropdown">
        <select className='search-text' value={searchOption} onChange={handleSearchOptionChange}>
            <option value="default">Search </option>
            <option value="candidateName">Search Candidate</option>
            <option value="plannedExamDate">Search Exam Date</option>
            <option value="cloudPlatform">Search By Cloud</option>
            <option value="cloudExam">Search By Exam name</option>

          </select>
          {(searchOption === 'candidateName' || searchOption === 'plannedExamDate' || searchOption === 'cloudPlatform' || searchOption === 'cloudExam') && (
            <input type="text" value={searchValue} placeholder="Search..." onChange={handleSearchInputChange} />
          )}
        </div>

        <div className="dashboard-dropdown">
          <select value={selectedAllMUs} onChange={handleRequests}>
            <option value="">All Requests</option>
            <option value="Assigned">Assigned</option>
            <option value="Pending">Pending</option>
           
          </select>
        </div>

        <div className="right-corner">
          
        </div>

      </div> {/* dashboard container*/}

      <div className="table-div">
        <table className="dashboard-table">
          <thead>
            <tr>
            <th>Name</th>
                  <th>Email</th>
                  <th>Cloud</th>
                  <th>Exam</th>
                  <th>DoSelect Score</th>
                  <th>Voucher code</th>
                  <th>Issued Date</th>
                  <th>Expiry Date</th>
                  <th>Exam Date</th>
                  <th>Result</th>
                  <th>Actions</th>
            </tr>
          </thead>

          <tbody>
              {formData.filter(filters).map((row, index) => (
                  <tr key={index}>
                    <td>{row.candidateName}</td>
                    <td>{row.candidateEmail}</td>
                    <td>{row.cloudPlatform}</td>
                    <td>{row.cloudExam}</td>
                    <td>{row.doSelectScore}</td>
                    <td>{row.voucherCode}</td>
                    <td>{row.voucherIssueLocalDate}</td>
                    <td>{row.voucherExpiryLocalDate}</td>
                    <td>{row.plannedExamDate}</td>
                    <td>{row.examResult}</td>
                    <td>
                      <button style={{backgroundColor: "#e3c449", fontSize: "12px", height: "40px"}} onClick={() => handleAssigneVoucherClick(row.candidateEmail,row.cloudExam)}>Assign voucher</button>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>

      </div>  {/* wrap div */}

      <div>
        <footer className="footer-div"> 
          <p>Capgemini 2023, All rights reserved.</p>
        </footer>
      </div>

      <div className="left-column">
        <h2 className="heading">Voucher Dashboard</h2>

        <hr />

        <div className="row">

        <div className="left-row">
        <p><Link to={'/dashboard'} style={{"color":"white"}}> 
          <FontAwesomeIcon icon={faTachometerAlt} size="1x" />  Dashboard</Link></p>
        </div>

        <div className="left-row">
        <p><Link to={'/vouchers'} style={{"color":"white"}}> 
          <FontAwesomeIcon icon={faClipboardCheck} size="1x" />  Vouchers</Link></p>
        </div>

        <div className="left-row">
          <p style={{"color":"white"}}><FontAwesomeIcon icon={faUser} /> Profile</p>
        </div>

        <div className="left-row" style={{marginTop: "200px", alignItems: "center"}}>
          <button style={{backgroundColor: "#0c17b8", fontSize: "15px", height: "32px", width: "100px"}}><Link to={'/logout'} style={{"color":"white"}}>
            <FontAwesomeIcon icon={faArrowLeft} /> Logout</Link></button>
        </div>

        </div> {/*row div*/}

      </div> {/* left-column div */}
    </div>
  );
}

export default Dashboard;

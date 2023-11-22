// Dashboard.js
import React, { useState, useEffect,useRef } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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

import { Link, useParams, useNavigate } from "react-router-dom";

function VoucherDashboard() {

  const [searchOption, setSearchOption] = useState("default");
  const [searchValue, setSearchValue] = useState("");

  const [vouchers, setVouchers] = useState([]);

  const {email, exam } = useParams();

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);


  useEffect(() => {
    axios.get(`http://localhost:9091/voucher/vouchersByExamName/${exam}`)
      .then(response => {
        console.log(response.data);
        setVouchers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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

  const [expiredVouchers, setExpiredVouchers] = useState([]);

  const handleSearchOptionChange = async (event) => {
    const selectedOption = event.target.value;
    setSearchOption(selectedOption);

    if (selectedOption === 'Expired') {
      try {
        const response = await axios.get('http://localhost:9091/voucher/getAllExpiredVouchers');
        setVouchers(response.data);
      } catch (error) {
        console.error(error);
        // Handle error appropriately (e.g., show an error message)
      }
    } else if (selectedOption === 'Available') {
        try {
          const response = await axios.get('http://localhost:9091/voucher/getAllVouchers');
          setVouchers(response.data);
        } catch (error) {
          console.error(error);
          // Handle error appropriately (e.g., show an error message)
        }
      }
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleAssignVoucherClick = async () => {
    try{
        const response = await axios.post(`http://localhost:9091/voucher/assign`);
      //  console.log(response.data);
        // alert("Voucher Assigned Successfully!!!");
        navigate("/dashboard");
        } catch(error){
            console.error(error.response.data);
            alert(error.data);
        }
  };

//   localhost:8084/voucher/getAllExpiredVouchers



const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0]);
};

const handleFileUpload = async () => {
  try {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Send the file to the backend
    const response = await axios.post('http://localhost:9091/voucher/addVouchers', formData);

    console.log('Backend Response:', response.data);

    // Assuming response.data contains the array of vouchers
    const vouchersArray = response.data;

    // Now you can save the array of vouchers to your state or perform other actions
    setVouchers(vouchersArray);

    alert('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file', error);

    if (error.response) {
      // The request was made and the server responded with a status code
      alert(`Error: ${error.response.data}`);
    } else if (error.request) {
      // The request was made but no response was received
      alert('Error: No response from the server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      alert('Error: Something went wrong.');
    }
  }
};





  return (
    <div className="headd">

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
          <p><FontAwesomeIcon icon={faUser} /> Name</p>
        </div>
        {/* <p id="profile">Kadin Septimus</p> */}
       
      </div>            {/*nav bar div*/}

    <div className="wrap">

      <div className="dashboard-container">

        <div className="dashboard-dropdown">
        <select className='search-text' value={searchOption} onChange={handleSearchOptionChange}>
            <option value="default">Apply Filters </option>
            <option value="Expired">Expired Vouchers</option>
            <option value="Available">Available Vouchers</option>

          </select>
          {/* {(searchOption === 'Name' || searchOption === 'ExamDate' || searchOption === 'farmLocation' || searchOption === 'sellerName') && (
            <input type="text" value={searchValue} placeholder="Search..." onChange={handleSearchInputChange} />
          )} */}
        </div>

        <div className="right-corner"></div>
        <button
  style={{ backgroundColor: "rgb(58, 184, 68)", fontSize: "13px", height: "40px", width: "100px" }}
  onClick={() => fileInputRef.current.click()}
>
  Add voucher
</button>
<input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="table-div">
          
            <table className="dashboard-table">
              <thead>
                <tr>
                  
                  <th>Cloud</th>
                  <th>Exam</th>
                  <th>Voucher Code</th>
                  <th>Issue Date</th>
                  <th>Expiry Date</th>
                  <th>Issued To</th>
                  <th>Actions</th>
                  
                </tr>
              </thead>

              <tbody>
                {vouchers.map((row, index) => (
                  <tr key={index}>
                    <td>{row.cloudPlatform}</td>
                    <td>{row.examName}</td>
                    <td>{row.voucherCode}</td>
                    <td>{row.issuedDate}</td>
                    <td>{row.expiryDate}</td>
                    <td>{row.issuedTo}</td>
                    <td><button style={{backgroundColor: "#e3c449", fontSize: "12px", height: "40px"}} onClick={() => handleAssignVoucherClick()}>Assign</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>

      <div>
        <footer className="footer-div">
          <p>Capgemini 2022, All rights reserved.</p>
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

        </div>

      </div>
    </div>
  );
}

export default VoucherDashboard;
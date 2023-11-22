// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios'
// import Alert from 'react-bootstrap/Alert';
// import {

//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,

// }
// from 'mdb-react-ui-kit';
// import 'bootstrap/dist/css/bootstrap.css'
// //import "../assets/uselogincss.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { useDispatch } from 'react-redux';
// import { login } from '../features/auth';

// function UserLogin() {
//   const [show, setShow] = useState(true);
//   const [showSuccess, setShowSuccess] = useState(false);
//   //const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleLogin = async ()=>{

//     var payload = {
//       "userEmail": String(document.getElementById('useremail').value),
//       "password" : String(document.getElementById('password').value),
//   }

//   var url = "http://localhost:9092/app/login"
//   try {
//     const response = await axios.post(url,payload);
//     const res = response.data;
//     // alert("Login Successfully")
//     setShow(true)
//     setShowSuccess(true)
//     // navigate('/adminhome')
    
//     dispatch(login(res));
//     if(res.roles[0]==='ROLE_USER')
//     {
//       setTimeout(() => {
//         setShowSuccess(false);
//         navigate('/userhome') // Redirect to userhome
//       }, 1000);

//       // navigate('/userhome')

//     }else if(res.roles[0]==='ROLE_ADMIN')
//     {
//       setTimeout(() => {
//         setShowSuccess(false);
//         navigate('/adminhome') // Redirect to userhome
//       }, 1000);
//       // navigate('/adminhome')
//     }

// } catch (error) {
//     // alert(error);
//     setShow(false);
// }

//   }


//   return (
//     <div className='container'>

//       <Alert variant="success" show={showSuccess} className='mt-2' onClose={() => setShowSuccess(false)} dismissible>
//                  <Alert.Heading>Logged In Successfully</Alert.Heading>
//       </Alert>

//       <Alert variant="danger" show={!show} className='mt-2' onClose={() => setShow(true)} dismissible>
//         <Alert.Heading>Wrong UserEmail or Password</Alert.Heading>
//       </Alert>
//     <MDBContainer fluid className='p-10'>

//       <MDBRow>

//         <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

//           <h1 className="my-5 display-3 fw-bold ls-tight px-3">
//             The best way to <br />
//             <span className="text-primary">book a train ticket</span>
//           </h1>

//           <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
//             Using this service you can easily book train tickets
//           </p>

//         </MDBCol>

//         <MDBCol md='6'>

//         <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
//             <MDBCardBody className='p-5 w-100 d-flex flex-column'>

//               <h2 className="fw-bold mb-2 text-center">Sign in</h2>
//               <p className="text-white-50 mb-3">Please enter your login and password!</p>

//               <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='useremail' type='email' size="lg"/>
//               <MDBInput wrapperClass='mb-4 w-100' label='Password' id='password' type='password' size="lg"/>

//               <button className='btn btn-primary' onClick={handleLogin}>
//                 Sign in
//               </button> 
//               <center style={{padding:5}}>Dont have an account?<Link to="/userregister">Register Here</Link></center>
//             </MDBCardBody>
//           </MDBCard>

//         </MDBCol>

//       </MDBRow>

//     </MDBContainer>
//     </div>
//   );
// }

// export default UserLogin;
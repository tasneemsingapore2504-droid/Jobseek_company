// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function Admin() {
//   /* ================= TABLE DEFINITIONS (EXACT SAME) ================= */

//   const TABLES = {
//     "Company Register": [
//       "Company Name",
//       "Company email",
//       "Website",
//       "Password",
//       "Repeat password",
//     ],
//     "Candidate Register": [
//       "Candidate Name",
//       "Email",
//       "Phone",
//       "Dob",
//       "Password",
//       "Repeat password",
//     ],
//     "Apply Form": [
//       "First Name",
//       "Last Name",
//       "Mother Name",
//       "Father Name",
//       "Email",
//       "Phone number",
//       "Company Name",
//       "Applied Position",
//       "Add DOB",
//       "Add work status",
//       "Add current city",
//       "Address",
//       "Experience",
//       "Upload resume",
//       "Any other Document",
//     ],
//     "Candidate Profile": [
//       "Candidate ID",
//       "First Name",
//       "Last Name",
//       "Gender",
//       "Mother Name",
//       "Father Name",
//       "Phone number",
//       "Age",
//       "Add DOB",
//       "Add current city",
//       "Address",
//       "Pincode",
//       "Highest qualification",
//       "University",
//       "Percentage",
//       "Experience",
//       "Skills",
//       "Certificates",
//       "Upload resume",
//       "Any other Document",
//     ],
//     "Company Profile": [
//       "Employer ID",
//       "Company Name",
//       "Website",
//       "Email",
//       "Phone number",
//       "Address",
//       "Company size",
//       "Branch details",
//       "Status",
//     ],
//     "Interview Form": [
//       "Candidate Name",
//       "Employer ID",
//       "Candidate ID",
//       "Company Name",
//       "Interview Date",
//       "Interview time",
//       "Interview place",
//       "Applied Position",
//       "Selection",
//     ],
//     "Job Post": [
//       "Job ID",
//       "Employer ID",
//       "Candidate ID",
//       "Title",
//       "Description",
//       "Requirements",
//       "Salary",
//       "Job type",
//       "Work mode",
//       "Education",
//       "Country",
//       "State",
//       "City",
//       "Status",
//     ],
//   };

//   /* ================= STATES ================= */

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentTable, setCurrentTable] = useState(null);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loginData, setLoginData] = useState({ id: "", pass: "" });
//   const [loginError, setLoginError] = useState(false);

//   const [database, setDatabase] = useState(
//     Object.keys(TABLES).reduce((acc, key) => {
//       acc[key] = [];
//       return acc;
//     }, {}),
//   );

//   /* ================= LOGIN ================= */

//   const handleLogin = () => {
//     if (loginData.id === "Tasneem" && loginData.pass === "Tasneem5253") {
//       setIsLoggedIn(true);
//       setLoginError(false);
//     } else {
//       setLoginError(true);
//     }
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setCurrentTable(null);
//     setLoginData({ id: "", pass: "" });
//   };

//   /* ================= FORM HANDLING ================= */

//   const handleChange = (field, value, file = false) => {
//     if (file) {
//       setFormData({ ...formData, [field]: value.name });
//     } else {
//       setFormData({ ...formData, [field]: value });
//     }
//   };

//   const saveData = () => {
//     const updated = [...database[currentTable]];

//     if (editingIndex !== null) {
//       updated[editingIndex] = formData;
//     } else {
//       updated.push(formData);
//     }

//     setDatabase({ ...database, [currentTable]: updated });
//     setFormData({});
//     setEditingIndex(null);
//   };

//   const deleteRow = (index) => {
//     const updated = [...database[currentTable]];
//     updated.splice(index, 1);
//     setDatabase({ ...database, [currentTable]: updated });
//   };

//   const editRow = (index) => {
//     setFormData(database[currentTable][index]);
//     setEditingIndex(index);
//   };

//   /* ================= LOGIN SCREEN ================= */

//   if (!isLoggedIn) {
//     return (
//       <div className="d-flex vh-100 justify-content-center align-items-center bg-success">
//         <div className="card p-4" style={{ width: "350px" }}>
//           <h4 className="text-center">Admin Login</h4>

//           <input
//             className="form-control mb-2"
//             placeholder="Admin ID"
//             value={loginData.id}
//             onChange={(e) => setLoginData({ ...loginData, id: e.target.value })}
//           />

//           <input
//             type="password"
//             className="form-control mb-2"
//             placeholder="Password"
//             value={loginData.pass}
//             onChange={(e) =>
//               setLoginData({ ...loginData, pass: e.target.value })
//             }
//           />

//           {loginError && (
//             <div className="alert alert-danger py-2">
//               Invalid ID or Password
//             </div>
//           )}

//           <button className="btn btn-success w-100" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ================= ADMIN PANEL ================= */

//   return (
//     <div className="d-flex">
//       {/* Sidebar */}
//       <div
//         className="bg-dark text-white p-3"
//         style={{ width: "250px", minHeight: "100vh" }}
//       >
//         <h5>JobSeek Admin</h5>
//         <hr />

//         <button
//           className="btn btn-sm btn-light w-100 mb-2"
//           onClick={() => setCurrentTable(null)}
//         >
//           Dashboard
//         </button>

//         {Object.keys(TABLES).map((table) => (
//           <button
//             key={table}
//             className="btn btn-sm btn-outline-light w-100 mb-2"
//             onClick={() => {
//               setCurrentTable(table);
//               setFormData({});
//               setEditingIndex(null);
//             }}
//           >
//             {table}
//           </button>
//         ))}

//         <button className="btn btn-sm btn-danger w-100 mt-3" onClick={logout}>
//           Logout
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex-grow-1 p-4">
//         {!currentTable && (
//           <div className="row">
//             {Object.keys(database).map((table) => (
//               <div key={table} className="col-md-4 mb-3">
//                 <div className="card p-3 text-center">
//                   <h6>{table}</h6>
//                   <h3>{database[table].length}</h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {currentTable && (
//           <>
//             <div className="d-flex justify-content-between mb-3">
//               <h4>{currentTable}</h4>
//               <button
//                 className="btn btn-success"
//                 onClick={() => {
//                   setFormData({});
//                   setEditingIndex(null);
//                   setShowForm(true);
//                 }}
//               >
//                 Add
//               </button>
//             </div>

//             {/* Form */}

//             <div className="card p-3 mb-3">
//               <h6>
//                 {editingIndex !== null ? "Edit" : "Add"} {currentTable}
//               </h6>

//               <div className="row">
//                 {TABLES[currentTable].map((field) => (
//                   <div className="col-md-6 mb-2" key={field}>
//                     {field.toLowerCase().includes("upload") ||
//                     field.toLowerCase().includes("document") ||
//                     field.toLowerCase().includes("resume") ? (
//                       <input
//                         type="file"
//                         className="form-control"
//                         onChange={(e) =>
//                           handleChange(field, e.target.files[0], true)
//                         }
//                       />
//                     ) : (
//                       <input
//                         className="form-control"
//                         placeholder={field}
//                         value={formData[field] || ""}
//                         onChange={(e) => handleChange(field, e.target.value)}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <button className="btn btn-primary mt-2 me-2" onClick={saveData}>
//                 Save
//               </button>

//               <button
//                 className="btn btn-secondary mt-2"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingIndex(null);
//                   setFormData({});
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>

//             {/* Table */}
//             <table className="table table-bordered">
//               <thead className="table-dark">
//                 <tr>
//                   {TABLES[currentTable].map((field) => (
//                     <th key={field}>{field}</th>
//                   ))}
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {database[currentTable].length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={TABLES[currentTable].length + 1}
//                       className="text-center"
//                     >
//                       No Data
//                     </td>
//                   </tr>
//                 ) : (
//                   database[currentTable].map((row, index) => (
//                     <tr key={index}>
//                       {TABLES[currentTable].map((field) => (
//                         <td key={field}>{row[field]}</td>
//                       ))}
//                       <td>
//                         <button
//                           className="btn btn-sm btn-warning me-2"
//                           onClick={() => editRow(index)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => deleteRow(index)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Admin() {
  /* ================= TABLE STRUCTURE ================= */

  const TABLES = {
    "Company Register": [
      "Company Name",
      "Company email",
      "Website",
      "Password",
      "Repeat password",
    ],

    "Apply Form": [
      "First Name",
      "Last Name",
      "Mother Name",
      "Father Name",
      "Email",
      "Phone number",
      "Company Name",
      "Applied Position",
      "Add DOB",
      "Add work status",
      "Add current city",
      "Address",
      "Experience",
      "Upload resume",
      "Any other Document",
    ],

    "Candidate Profile": [
      "Candidate ID",
      "First Name",
      "Last Name",
      "Gender",
      "Mother Name",
      "Father Name",
      "Phone number",
      "Age",
      "Add DOB",
      "Add current city",
      "Address",
      "Pincode",
      "Highest qualification",
      "University",
      "Percentage",
      "Experience",
      "Skills",
      "Certificates",
      "Upload resume",
      "Any other Document",
    ],

    "Company Profile": [
      "Employer ID",
      "Company Name",
      "Website",
      "Email",
      "Phone number",
      "Address",
      "Company size",
      "Branch details",
      "Status",
    ],

    "Interview Form": [
      "Candidate Name",
      "Employer ID",
      "Candidate ID",
      "Company Name",
      "Interview Date",
      "Interview time",
      "Interview place",
      "Applied Position",
      "Selection",
    ],

    "Job Post": [
      "Job ID",
      "Employer ID",
      "Candidate ID",
      "Title",
      "Description",
      "Requirements",
      "Salary",
      "Job type",
      "Work mode",
      "Education",
      "Country",
      "State",
      "City",
      "Status",
    ],
  };

  /* ================= FIELD MAPPING ================= */

  const MAP = {
    "Apply Form": {
      "First Name": "fname",
      "Last Name": "lname",
      "Mother Name": "mname",
      "Father Name": "faname",
      Email: "email",
      "Phone number": "pnum",
      "Company Name": "cname",
      "Applied Position": "apPos",
      "Add DOB": "dob",
      "Add work status": "addws",
      "Add current city": "addcc",
      Address: "address",
      Experience: "experience",
      "Upload resume": "uploadRes",
      "Any other Document": "anyDoc",
    },

    "Candidate Profile": {
      "First Name": "fname",
      "Last Name": "lname",
      Gender: "gender",
      "Mother Name": "mname",
      "Father Name": "faname",
      Email: "email",
      "Phone number": "phone",
      Age: "age",
      "Add DOB": "dob",
      "Add current city": "city",
      Address: "address",
      Pincode: "pincode",
      "Highest qualification": "qualification",
      University: "university",
      Percentage: "percentage",
      Experience: "experience",
      Skills: "skills",
      Certificates: "certificates",
      "Upload resume": "resume",
      "Any other Document": "documents",
    },

    "Company Profile": {
      "Company Name": "cname",
      Website: "website",
      Email: "cemail",
      "Phone number": "cpnum",
      Address: "address",
      "Company size": "csize",
      "Branch details": "branch",
      Status: "status",
    },
    "Interview Form": {
      "Company Name": "cname",
      "Interview Date": "intDate",
      "Interview Time": "intTime",
      "Interview Place": "intPlace",
      "Candidate Name": "candidateName",
      "Applied Position": "apPos",
      Selection: "selection",
    },
    "Job Post": {
      Company: "company",
      Title: "title",
      Description: "description",
      Requirement: "requirement",
      Qualification: "qualification",
      Skills: "skills",
      Salary: "salary",
      "Job Type": "jobType",
      "Last Date": "lastDate",
      "Work Mode": "workMode",
      Country: "country",
      State: "state",
      City: "city",
      Link: "link",
    },
  };

  /* ================= API ROUTES ================= */

  const API = {
    "Company Register": "http://localhost:5000/api/companyregister",
    "Candidate Register": "http://localhost:5000/api/candidateregister",
    "Apply Form": "http://localhost:5000/api/applyform",
    "Candidate Profile": "http://localhost:5000/api/candidateprofile",
    "Company Profile": "http://localhost:5000/api/companyprofile",
    "Interview Form": "http://localhost:5000/api/interviewform",
    "Job Post": "http://localhost:5000/api/jobpost",
  };

  /* ================= STATES ================= */

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState({ id: "", pass: "" });
  const [loginError, setLoginError] = useState(false);

  const [currentTable, setCurrentTable] = useState(null);

  const [database, setDatabase] = useState(() => {
    const init = {};
    Object.keys(TABLES).forEach((t) => (init[t] = []));
    return init;
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  /* ================= LOGIN ================= */

  // const handleLogin = () => {
  //   if (login.id === "Tasneem" && login.pass === "Tasneem5253") {
  //     setIsLoggedIn(true);
  //     setLoginError(false);
  //   } else {
  //     setLoginError(true);
  //   }
  // };

  /* ================= FETCH DATA ================= */

  const fetchData = async (table) => {
    try {
      const res = await axios.get(API[table]);

      setDatabase((prev) => ({
        ...prev,
        [table]: res.data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentTable) {
      fetchData(currentTable);
    }
  }, [currentTable]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (field, value, file = false) => {
    let key = field;

    if (MAP[currentTable]) {
      key = MAP[currentTable][field];
    }

    if (file) {
      setFormData({ ...formData, [key]: value.name });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  /* ================= SAVE ================= */

  const saveData = async () => {
    try {
      if (editingId) {
        await axios.put(API[currentTable] + "/" + editingId, formData);
      } else {
        await axios.post(API[currentTable], formData);
      }

      fetchData(currentTable);
    } catch (err) {
      console.log(err);
    }

    setShowForm(false);
    setFormData({});
    setEditingId(null);
  };

  /* ================= DELETE ================= */

  const deleteRow = async (id) => {
    await axios.delete(API[currentTable] + "/" + id);

    fetchData(currentTable);
  };

  /* ================= EDIT ================= */

  const editRow = (row) => {
    setFormData(row);
    setEditingId(row._id);
    setShowForm(true);
  };

  /* ================= LOGIN SCREEN ================= */

  // if (!isLoggedIn) {
  //   return (
  //     <div className="d-flex vh-100 justify-content-center align-items-center bg-success">
  //       <div className="card p-4" style={{ width: "350px" }}>
  //         <h4 className="text-center">Admin Login</h4>

  //         <input
  //           className="form-control mb-2"
  //           placeholder="Admin ID"
  //           value={login.id}
  //           onChange={(e) => setLogin({ ...login, id: e.target.value })}
  //         />

  //         <input
  //           type="password"
  //           className="form-control mb-2"
  //           placeholder="Password"
  //           value={login.pass}
  //           onChange={(e) => setLogin({ ...login, pass: e.target.value })}
  //         />

  //         {loginError && (
  //           <div className="alert alert-danger">Invalid Login</div>
  //         )}

  //         <button className="btn btn-success w-100" onClick={handleLogin}>
  //           Login
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  /* ================= ADMIN PANEL ================= */

  return (
    <div className="d-flex">
      {/* SIDEBAR */}

      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h5>Admin Panel</h5>

        <hr />

        <button
          className="btn btn-light w-100 mb-2"
          onClick={() => setCurrentTable(null)}
        >
          Dashboard
        </button>

        {Object.keys(TABLES).map((table) => (
          <button
            key={table}
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => {
              setCurrentTable(table);
              setShowForm(false);
            }}
          >
            {table}
          </button>
        ))}
      </div>

      {/* MAIN */}

      <div className="flex-grow-1 p-4" style={{ overflowX: "auto" }}>
        {/* DASHBOARD */}

        {!currentTable && (
          <div className="row">
            {Object.keys(TABLES).map((table) => (
              <div key={table} className="col-md-4 mb-3">
                <div className="card p-3 text-center">
                  <h6>{table}</h6>

                  <h3>{database[table]?.length}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TABLE PAGE */}

        <>
          <div className="d-flex justify-content-between mb-3">
            <h4>{currentTable}</h4>
            {currentTable !== "Candidate Profile" && (
              <button
                className="btn btn-success"
                onClick={() => {
                  setFormData({});
                  setEditingId(null);
                  setShowForm(true);
                }}
              >
                Add
              </button>
            )}
          </div>

          {/* FORM */}

          {showForm && (
            <div
              className="card p-3 mb-3"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <div className="row">
                {TABLES[currentTable].map((field) => (
                  <div className="col-md-6 mb-2" key={field}>
                    {field.toLowerCase().includes("upload") ? (
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) =>
                          handleChange(field, e.target.files[0], true)
                        }
                      />
                    ) : (
                      <input
                        className="form-control"
                        placeholder={field}
                        value={
                          MAP[currentTable]
                            ? formData[MAP[currentTable][field]] || ""
                            : formData[field] || ""
                        }
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <button className="btn btn-primary mt-2 me-2" onClick={saveData}>
                Save
              </button>

              <button
                className="btn btn-secondary mt-2"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {/* TABLE */}

          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                {TABLES[currentTable]?.map((field) => (
                  <th key={field}>{field}</th>
                ))}
                {currentTable !== "Candidate Profile" && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {!database[currentTable] ||
              database[currentTable].length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      (TABLES[currentTable]?.length || 0) +
                      (currentTable === "Candidate Profile" ? 1 : 0)
                    }
                    className="text-center"
                  >
                    No Data
                  </td>
                </tr>
              ) : (
                database[currentTable]?.map((row) => (
                  <tr key={row._id}>
                    {TABLES[currentTable]?.map((field) => (
                      <td key={field}>
                        {MAP[currentTable]
                          ? row[MAP[currentTable][field]]
                          : row[field]}
                      </td>
                    ))}

                    <td>
                      <>
                        {currentTable !== "Candidate Profile" && (
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => editRow(row)}
                          >
                            Edit
                          </button>
                        )}

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteRow(row._id)}
                        >
                          Delete
                        </button>
                      </>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
}

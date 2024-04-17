import React, { useEffect, useState } from "react";
import { ModalDialog } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Label } from "reactstrap";

function Data({refresh}) {
  const [activeMenuItem, setActiveMenuItem] = useState('default'); // Set a default active menu item
  //alert(refresh);
  
  return (
    // <div>
    //   <Banks banks={banks} onUpdateCustomer={onUpdateCustomer} onDeleteBank={onDeleteBank} />
    // </div>
    <div>
      <h4>Saved Data</h4>
    {/* Your menu items */}
    <button className="mr-1 mb-3 border-0" onClick={() => setActiveMenuItem('item1')}>Blood Banks</button>
    <button className="mr-1 border-0" onClick={() => setActiveMenuItem('item2')}>Operations</button>
    <button className="mr-1 border-0" onClick={() => setActiveMenuItem('item3')}>Users</button>
    <button className="mr-1 border-0" onClick={() => setActiveMenuItem('item4')}>Clients</button>
    <button className="border-0" onClick={() => setActiveMenuItem('item5')}>Blood</button>
    {/* ... other menu items ... */}

    {/* Render content based on the active menu item */}
    {activeMenuItem === 'item1' && <BanksItem />}
    {activeMenuItem === 'item2' && <OperationsItem />}
    {/* {activeMenuItem === 'item2' && <UsersItem />} */}
    {activeMenuItem === 'item3' && <Users />}
    {/* {activeMenuItem === 'item4' && <ClientsItem />}
    {activeMenuItem === 'item5' && <OperationsItem />} */}
    {/* ... other content based on menu items ... */}
  </div>
  );
}

// Banks

function BanksItem() {
  const [banks, setBanks] = useState([]);
  console.log(localStorage.getItem('token'));

  useEffect(() => {
    fetch("https://localhost:7178/api/BloodBank/GetBanks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setBanks(data);
      });
  }, []);

  function onUpdateCustomer(updatedCustomer) {
    const updatedCustomers = banks.map((bank) =>
      bank.bloodBankID === updatedCustomer.bloodBankID ? updatedCustomer : bank
    );
    setBanks(updatedCustomers);
  }

  function onDeleteBank(bloodBankID) {
    fetch(`https://localhost:7178/api/BloodBank/DeleteBloodBank/${bloodBankID}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          const updatedBanks = banks.filter((bank) => bank.bloodBankID !== bloodBankID);
          setBanks(updatedBanks);
          console.log("Bank deleted successfully!");
        } else {
          console.error("Error deleting bank");
        }
      })
      .catch((error) => {
        console.error("Error deleting bank:", error.message);
      });
  }

  return (
    <div>
      <Banks banks={banks} onUpdateCustomer={onUpdateCustomer} onDeleteBank={onDeleteBank} />
    </div>
  );
}

function Banks({ banks, onUpdateCustomer, onDeleteBank }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    bloodBankID: "",
    name: "",
    address: "",
    workTime: "",
  });

  function handleCustomerUpdate(updatedCustomer) {
    setIsEditing(false);
    onUpdateCustomer(updatedCustomer);
  }

  function handleChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  function changeEditState(bank) {
    if (bank.bloodBankID === editForm.bloodBankID) {
      setIsEditing((isEditing) => !isEditing); // hides the form
    } else if (isEditing === false) {
      setIsEditing((isEditing) => !isEditing); // shows the form
    }
  }

  function captureEdit(clickedCustomer) {
    let filtered = banks.filter((bank) => bank.bloodBankID === clickedCustomer.bloodBankID);
    setEditForm(filtered[0]);
  }

  return (
    <div>
      <button className="mb-2 btn btn-outline-secondary" onClick={() => AddBank()}>
        Add Bank
      </button>
      {isEditing ? <EditBank editForm={editForm} handleChange={handleChange} handleCustomerUpdate={handleCustomerUpdate} /> : null}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Bank ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Work Time</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank) => (
            <Bank
              key={bank.bloodBankID}
              bank={bank}
              captureEdit={captureEdit}
              changeEditState={changeEditState}
              onDeleteBank={onDeleteBank}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bank({ bank, captureEdit, changeEditState, onDeleteBank }) {
  const { bloodBankID, name, address, workTime } = bank;

  return (
    <tr key={bloodBankID}>
      <td>{bloodBankID}</td>
      <td>{name}</td>
      <td>{address}</td>
      <td>{workTime}</td>
      <td>
        <button
          className="border-0"
          onClick={() => {
            captureEdit(bank);
            changeEditState(bank);
          }}
        >
          Edit
        </button>
        <button className="border-0 text-danger ml-2" onClick={() => onDeleteBank(bank.bloodBankID)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function EditBank({ editForm, handleCustomerUpdate, handleChange }) {
  const { bloodBankID, name, address, workTime } = editForm;

  function handleEditForm(e) {
    e.preventDefault();
    fetch(`https://localhost:7178/api/BloodBank/UpdateBank/${bloodBankID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editForm),
    })
      .then((resp) => {
        if (resp.status === 204) {
          // No Content, consider it a success
          handleCustomerUpdate(editForm);
        } else {
          return resp.json(); // Continue with normal JSON processing
        }
      })
      .then((updatedCustomer) => {
        if (updatedCustomer) {
          handleCustomerUpdate(updatedCustomer);
        }
      })
      .catch((error) => {
        console.error("Error updating bank:", error.message);
      });
  }
  return (
    <div>
      <h4>Edit Blood Bank</h4>
      <form onSubmit={handleEditForm}>
        <input type="text" name="name" value={name} onChange={handleChange} />
        <input type="text" name="address" value={address} onChange={handleChange} />
        <input type="text" name="workTime" value={workTime} onChange={handleChange} />
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
}

function AddBank() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    workTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7178/api/BloodBank/AddBloodBank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Bank added successfully!");
      } else {
        // Handle error response
        console.error("Error adding bank");
      }
    } catch (error) {
      console.error("Error adding bank:", error.message);
    }
  };

  return (
    <div>
      <h4>Add Blood Bank</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        <input type="text" name="workTime" value={formData.workTime} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// Operations

function OperationsItem() {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7178/api/DonationOperation/GetOperations")
      .then((resp) => resp.json())
      .then((data) => {
        setOperations(data);
      });
  }, []);

  function onUpdateCustomer(updatedCustomer) {
    const updatedCustomers = operations.map((operation) =>
      operation.operationID === updatedCustomer.operationID ? updatedCustomer : operation
    );
    setOperations(updatedCustomers);
  }

  function onDeleteBank(bloodBankID) {
    fetch(`https://localhost:7178/api/BloodBank/DeleteBloodBank/${bloodBankID}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          const updatedBanks = operations.filter((bank) => bank.bloodBankID !== bloodBankID);
          setOperations(updatedBanks);
          console.log("Bank deleted successfully!");
        } else {
          console.error("Error deleting bank");
        }
      })
      .catch((error) => {
        console.error("Error deleting bank:", error.message);
      });
  }

  return (
    <div>
      <Operations operations={operations} onUpdateCustomer={onUpdateCustomer} onDeleteBank={onDeleteBank} />
    </div>
  );
}

function Operations({ operations, onUpdateCustomer, onDeleteBank }) {
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    operationID: "",
    collection: "",
    volume: "",
    transfusion: "",
    bankID: "",
    bank: "",
    donorID: "",
    patientID: "",
    expiration: "",
    status: ""
  });

  function handleCustomerUpdate(updatedCustomer) {
    setIsEditing(false);
    onUpdateCustomer(updatedCustomer);
  }

  function handleChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  function changeEditState(bank) {
    if (bank.bloodBankID === editForm.operationID) {
      setIsEditing((isEditing) => !isEditing); // hides the form
    } else if (isEditing === false) {
      setIsEditing((isEditing) => !isEditing); // shows the form
    }
  }

  function captureEdit(clickedCustomer) {
    let filtered = operations.filter((operation) => operation.donationOperationID === clickedCustomer.donationOperationID);
    //    let filtered = operations.filter((operation) => operation.operationID === clickedCustomer.operationID);
    setEditForm(filtered[0]);
  }

  return (
    <div>
      {isEditing ? <EditOperation editForm={editForm} handleChange={handleChange} handleCustomerUpdate={handleCustomerUpdate} setShow={setIsEditing} /> : null}
      <table className="table table-striped" style={{fontSize: '13px'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Collection</th>
            <th>Volume</th>
            <th>Transfusion</th>
            <th>Bank ID</th>
            <th>Bank</th>
            <th>Donor ID</th>
            <th>Donor</th>
            <th>Patient ID</th>
            <th>Patient</th>
            <th>Expiration</th>
            <th>Status</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((operation) => (
            <Operation
              key={operation.operationID}
              operation={operation}
              captureEdit={captureEdit}
              changeEditState={changeEditState}
              onDeleteBank={onDeleteBank}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Operation({ operation, captureEdit, changeEditState, onDeleteBank }) {
  const {
    donationOperationID,
    collectionTime,
    volume,
    transfusionTime,
    bloodBankID,
    bank,
    donorID,
    donor,
    patientID,
    patient,
    expiryTime,
    status,
  } = operation;

  return (
    <tr key={donationOperationID}>
      <td>{donationOperationID}</td>
      <td>{collectionTime}</td>
      <td>{volume}</td>
      <td>{transfusionTime}</td>
      <td>{bloodBankID}</td>
      <td>{bank}</td>
      <td>{donorID}</td>
      <td>{donor && donor.user && donor.user.username}</td>
      <td>{patientID}</td>
      <td>{patient && patient.user && patient.user.username}</td>
      <td>{expiryTime}</td>
      <td>{status}</td>
      <td>
        {/* Edit and Delete buttons moved inside the Modify column */}
        <button
          className="border-0 mb-2"
          onClick={() => {
            captureEdit(operation);
            changeEditState(operation);
          }}
        >
          Edit
        </button>
        <button
          className="border-0 text-danger"
          onClick={() => onDeleteBank(operation.operationID)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

function EditOperation({ editForm, handleCustomerUpdate, handleChange, setShow }) {
  const { donationOperationID, collectionTime, volume, transfusionTime, expiryTime, status, bloodBankID, donorID, patientID } = editForm;

  const statusOptions = ["Pending", "In Progress", "Completed", "Failed", "string", "Processing"]; // Add the possible status values

  const handleClose = () => setShow(false);
  
  function handleEditForm(e) {
    e.preventDefault();
    fetch(`https://localhost:7178/api/DonationOperation/UpdateOperation/${donationOperationID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editForm),
    })
      .then((resp) => {
        if (resp.status === 204) {
          // No Content, consider it a success
          handleCustomerUpdate(editForm);
        } else if (resp.ok) {
          return resp.json(); // Continue with normal JSON processing
        } else {
          throw new Error(`Unexpected response status: ${resp.status}`);
        }
      })
      .then((updatedCustomer) => {
        if (updatedCustomer) {
          handleCustomerUpdate(updatedCustomer);
        }
      })
      .catch((error) => {
        console.error("Error updating operation:", error.message);
      });
      window.location.reload();
  }
  
  return (
    <div  
      className="modal show"
      style={{ display: 'block', top: '20%'}}
    >
      <ModalDialog style={{boxShadow: '4px 4px 10px grey'}}>
        <Modal.Header>
          <h4>Operation №{donationOperationID}</h4>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleEditForm}>
            <div className="row">
            <div className="col-md-6">
              <Label>
                Collection Time: 
              </Label>
              <input className="mb-2" type="text" name="collectionTime" value={collectionTime} onChange={handleChange} />
              <Label>
                Volume:
              </Label>
                <input className="mb-2" type="text" name="volume" value={volume} onChange={handleChange} />
              <Label>
                Transfusion Time:
              </Label>
              <input className="mb-2" type="text" name="transfusionTime" value={transfusionTime} onChange={handleChange} />
              <Label>
                Expiry Time:
              </Label>
              <input className="mb-2" type="text" name="expiryTime" value={expiryTime} onChange={handleChange} />
            </div>
            
            <div className="col-md-6">
              <Label>
                Status:
              </Label>
              <select className="mb-2" style={{padding: '2.5px 35px'}} name="status" value={status} onChange={handleChange}>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              <Label>
                Bank ID:
              </Label>
              <input className="mb-2" type="text" name="bloodBankID" value={bloodBankID} onChange={handleChange} />
              <Label>
                Donor ID:
              </Label>
              <input className="mb-2" type="text" name="donorID" value={donorID} onChange={handleChange} />
              <Label>
                Patient ID:
              </Label>
              <input className="mb-2" type="text" name="patientID" value={patientID} onChange={handleChange} />
            </div>
            </div>
            
          </form>
        </Modal.Body>
      
        <Modal.Footer style={{float: 'left'}}>
          <button className="btn-primary border-0" type="submit">Submit Changes</button>
          <button className="btn-secondary border-0" onClick={handleClose}>Cancel</button>
        </Modal.Footer>
      </ModalDialog>
    </div>
  );
}

// Users

// function UsersItem() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("https://localhost:7178/api/DonationOperation/GetOperations")
//       .then((resp) => resp.json())
//       .then((data) => {
//         setUsers(data);
//       });
//   }, []);

//   function onUpdateCustomer(updatedCustomer) {
//     const updatedCustomers = users.map((user) =>
//       user.userID === updatedCustomer.ueserID ? updatedCustomer : user
//     );
//     setUsers(updatedCustomers);
//   }

//   function onDeleteBank(userID) {
//     fetch(`https://localhost:7178/api/BloodBank/DeleteBloodBank/${userID}`, {
//       method: "DELETE",
//     })
//       .then((resp) => {
//         if (resp.ok) {
//           const updatedBanks = users.filter((user) => user.userID !== userID);
//           setUsers(updatedBanks);
//           console.log("Bank deleted successfully!");
//         } else {
//           console.error("Error deleting bank");
//         }
//       })
//       .catch((error) => {
//         console.error("Error deleting bank:", error.message);
//       });
//   }

//   return (
//     <div>
//       <Users users={users} onUpdateCustomer={onUpdateCustomer} onDeleteBank={onDeleteBank} />
//     </div>
//   );
// }

// function Users({ users, onUpdateCustomer, onDeleteBank }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     userID: '',
//     username: '',
//     name: '',
//     surname: '',
//     patronymic: '',
//     role: '',
//     email: '',
//     password: ''
//   });

//   function handleCustomerUpdate(updatedCustomer) {
//     setIsEditing(false);
//     onUpdateCustomer(updatedCustomer);
//   }

//   function handleChange(e) {
//     setEditForm({
//       ...editForm,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function changeEditState(bank) {
//     if (bank.bloodBankID === editForm.bloodBankID) {
//       setIsEditing((isEditing) => !isEditing); // hides the form
//     } else if (isEditing === false) {
//       setIsEditing((isEditing) => !isEditing); // shows the form
//     }
//   }

//   function captureEdit(clickedCustomer) {
//     let filtered = users.filter((bank) => bank.bloodBankID === clickedCustomer.bloodBankID);
//     setEditForm(filtered[0]);
//   }

//   return (
//     <div>
//       <button className="mb-2 btn btn-outline-secondary" onClick={() => AddBank()}>
//         Add Bank
//       </button>
//       {isEditing ? <EditBank editForm={editForm} handleChange={handleChange} handleCustomerUpdate={handleCustomerUpdate} /> : null}
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Bank ID</th>
//             <th>Name</th>
//             <th>Address</th>
//             <th>Work Time</th>
//             <th>Modify</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <User
//               key={user.userID}
//               bank={user}
//               captureEdit={captureEdit}
//               changeEditState={changeEditState}
//               onDeleteBank={onDeleteBank}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function User({ operation, captureEdit, changeEditState, onDeleteBank }) {
//   const { donationOperationID, collectionTime, volume, transfusionTime, bloodBankID, bank, donorID, donor, patientID, patient, expiryTime, status } = operation;

//   return (
//     <tr key={donationOperationID}>
//     <td>{donationOperationID}</td>
//     <td>{collectionTime}</td>
//     <td>{volume}</td>
//     <td>{transfusionTime}</td>
//     <td>{bloodBankID}</td>
//     <td>{bank}</td>
//     <td>{donorID}</td>
//     <td>{donor}</td>
//     <td>{patientID}</td>
//     <td>{patient}</td>
//     <td>{expiryTime}</td>
//     <td>{status}</td>
//     <td>
//       {/* Edit and Delete buttons moved inside the Modify column */}
//       <button
//         className="border-0"
//         onClick={() => {
//           captureEdit(operation);
//           changeEditState(operation);
//         }}
//       >
//         Edit
//       </button>
//       <button className="border-0 text-danger ml-2" onClick={() => onDeleteBank(operation.operationID)}>
//         Delete
//       </button>
//     </td>
//   </tr>
//   );
// }

function Users() {
  const [activeMenuItem, setActiveMenuItem] = useState('default');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(activeMenuItem);
  }, [activeMenuItem]);

  const fetchData = (menuItem) => {
      fetch("https://localhost:7178/api/Users/GetUsers")
        .then((resp) => resp.json())
        .then((data) => {
          setData(data);
        });
    // Add similar blocks for other menu items as needed
  };

  const renderTable = () => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Patronymic</th>
            {/* Add other properties here based on the fetched data */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.userID}</td>
              <td>{item.username}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.patronymic}</td>
              {/* Render other properties here based on the fetched data */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {/* Render content based on the active menu item */}
        <div>
          <h5>Users</h5>
          {renderTable()}
        </div>
      {activeMenuItem === 'item5' && <div>Blood content</div>}
    </div>
  );
}

// Clients



export default Data;
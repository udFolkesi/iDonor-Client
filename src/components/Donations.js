import React, { useState, useEffect } from "react";

function Donations() {
  const [activeMenuItem, setActiveMenuItem] = useState("item1");
  const [donors, setDonors] = useState([]);
  //const [patients, setPatients] = useState([]);
  const [bloodGroupQuery, setBloodGroupQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchedDonors, setSearchedDonors] = useState([]);

  useEffect(() => {
    // Fetch data from the server using a GET request
    fetch("https://localhost:7178/api/DonationOperation/GetOperations")
      .then((response) => response.json())
      .then((data) =>  setDonors(data));
      //.then((data) => setPatients(data));
  }, []); // Run the effect only once when the component mounts
  
  const handleBloodGroupChange = (event) => {
    setBloodGroupQuery(event.target.value);
    if(event.target.value != '') {
      handleSearch(event.target.value);
    }
    else {
      fetch("https://localhost:7178/api/DonationOperation/GetOperations")
      .then((response) => response.json())
      .then((data) =>  setDonors(data));
    }
  };

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    setDonors((prevDonors) => {
      const sortedDonors = [...prevDonors].sort((a, b) => {
        const volumeA = a.volume;
        const volumeB = b.volume;
        return sortOrder === "asc" ? volumeA - volumeB : volumeB - volumeA;
      });
      return sortedDonors;
    });
  };

  const handleSearch = (bloodGroup) => {
    // Fetch data from the server using a GET request with the search query
    fetch(`https://localhost:7178/api/DonationOperation/SearchOperations/search?bloodGroup=${bloodGroup}&clients=Donors`)
    .then((response) => response.json())
    .then((data) => {
      setDonors(data); //setDonors
    })
    .catch((error) => console.error("Error fetching data:", error));
    console.log(donors);
    //console.log(data);
  };

  const handleRequestDonation = (donationOperationID) => {
    const selectedDonor = donors.find((donor) => donor.donationOperationID === donationOperationID);
console.log(selectedDonor);
    fetch(
      `https://localhost:7178/api/DonationOperation/UpdateOperation/${donationOperationID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // You might need to include additional headers like authentication tokens
        },
        body: JSON.stringify({
          ...selectedDonor,
          patientID: localStorage.getItem('userId'), ////actual id!!!!!!!!!
          status: "Processing",
          // Add other properties if needed
        }),
      }
    );
  };

  
  const handleOfferHelp = (amount) => {
    // Handle the offer help action, for example, submit the amount to the backend
    console.log(`Offering help with amount: ${amount} ml`);
    const requestData = {
      collectionTime: "2024-02-03T10:53:08.028Z",
      volume: amount,
      transfusionTime: "2024-02-03T10:53:08.028Z",
      status: "Processing",
      expiryTime: "2024-02-03T10:53:08.028Z",
    };

    fetch(
      `https://localhost:7178/api/DonationOperation/AddDonationOperation?bankId=${1}&donorId=${5}&patientId=${3}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You might need to include additional headers like authentication tokens
        },
        body: JSON.stringify(requestData),
      }
    );
  };

  const handleRequestHelp = (amount) => {
    // Handle the offer help action, for example, submit the amount to the backend
    console.log(`Offering help with amount: ${amount} ml`);
    const requestData = {
      collectionTime: "2024-02-03T10:53:08.028Z",
      volume: amount,
      transfusionTime: "2024-02-03T10:53:08.028Z",
      status: "Processing",
      expiryTime: "2024-02-03T10:53:08.028Z",
    };

    fetch(
      `https://localhost:7178/api/DonationOperation/AddDonationOperation?bankId=${1}&donorId=${5}&patientId=${3}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You might need to include additional headers like authentication tokens
        },
        body: JSON.stringify(requestData),
      }
    );
  };

  return (
    <div className="container mt-5">
      <h4>Donations</h4>
      <div className="btn-group mr-3 mb-3 d-flex justify-content-between align-items-center">
        <div>
          <button
            className={`btn ${activeMenuItem === "item1" ? "btn-secondary" : "btn-light"}`}
            onClick={() => setActiveMenuItem("item1")}
          >
            Donors
          </button>
          <button
            className={`btn ${activeMenuItem === "item2" ? "btn-secondary" : "btn-light"}`}
            onClick={() => setActiveMenuItem("item2")}
          >
            Patients
          </button>
        </div>
        <div className="d-flex justify-content-end">
          <label className="mr-2 mt-2">Sort:</label>
          <button className="btn btn-light" onClick={handleSortChange}>
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
      </div>

      {/* Sorting and Searching UI */}
      <div className="mb-3">
        <input
          type="text"
          className="ml-3 form-control"
          placeholder="Search by blood group"
          value={bloodGroupQuery}
          onChange={handleBloodGroupChange}
        />
        {/* <button className="btn btn-primary ml-2" onClick={handleSearch}>
          Search
        </button> */}
      </div>

      {/* Offer Help and Request Help buttons */}
      {activeMenuItem === "item1" && localStorage.getItem("role") == "Donor" && (
        <OfferHelpButton onOfferHelp={handleOfferHelp} />
      )}
      {activeMenuItem === "item2" && localStorage.getItem("role") == "Patient" && (
        <RequestHelpButton onOfferHelp={handleRequestHelp} />
      )}

      {/* Display donor data as cards */}
      {activeMenuItem === "item1" && donors.length > 0 && (
        <div className="row">
          {donors
            .filter((donor) => /*donor.patientID === null &&*/ donor.status != "Processing")
            .map((donor) => (
              <div key={donor.id} className="col-md-6">
                <DonorCard
                  donorData={donor}
                  //onOfferHelp={handleOfferHelp}
                  onRequestDonation={handleRequestDonation}
                  activeItem={activeMenuItem}
                />
              </div>
            ))}
        </div>
      )}

      {activeMenuItem === "item2" && donors.length > 0 && (
        <div className="row">
          {donors
            /*.filter((patient) => patient.donorID === null)*/
            .map((patient) => (
              <div key={patient.id} className="col-md-6">
                <DonorCard 
                donorData={patient} 
                onOfferHelp={handleOfferHelp} 
                activeItem={activeMenuItem}/>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

function DonorCard({ donorData, onOfferHelp, onRequestDonation,  activeItem }) {
  const { 
    donationOperationID,
    donor: { blood: { bloodGroup } },
    donor: { blood: { rhesusFactor } }, 
    volume 
  } = donorData;
  // !!!! клиент же может быть и донором и пациентом, а в опреации принимают усатие два человека

  return (
    <div key={donationOperationID} className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Item {donationOperationID}</h5>
        <p className="card-text">Blood Group: {bloodGroup}</p>
        <p className="card-text">Rhesus Factor: {rhesusFactor}</p>
        <p className="card-text">Volume: {volume}</p>

        {localStorage.getItem('role') == 'Patient' && activeItem == "item1" && (
          <button
          className="btn btn-primary"
          onClick={() => {
            onRequestDonation(donationOperationID);
          }}
        >
          Request Donation
        </button>
        )}

        {localStorage.getItem('role') == 'Donor' && activeItem == "item2" && (
          <button
          className="btn btn-primary"
          onClick={() => {
            onOfferHelp(donationOperationID);
          }}
        >
          Offer Donation
        </button>
        )}
      </div>
    </div>
  );
}

function OfferHelpButton({ onOfferHelp }) {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleOfferHelp = () => {
    // Validate the amount (you can add more validation logic)
    if (amount && parseFloat(amount) > 0) {
      onOfferHelp(parseFloat(amount));
      // Optionally, you can reset the amount input field after successful submission
      setAmount("");
    } else {
      alert("Please enter a valid amount.");
    }
  };
  return (
    <div>
      <button className="float-right btn btn-outline-primary" onClick={() => handleOfferHelp()}>
        Offer Help
      </button>
      <div className="float-right mr-3 ml-3">
        <input
          type="number"
          placeholder="Amount (ml)"
          value={amount}
          onChange={handleAmountChange}
          className="form-control"
        />
      </div>
    </div>
  );
}

function RequestHelpButton({ onOfferHelp }) {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleOfferHelp = () => {
    // Validate the amount (you can add more validation logic)
    if (amount && parseFloat(amount) > 0) {
      onOfferHelp(parseFloat(amount));
      // Optionally, you can reset the amount input field after successful submission
      setAmount("");
    } else {
      alert("Please enter a valid amount.");
    }
  };
  return (
    <div>
      <button className="float-right btn btn-outline-primary" onClick={() => handleOfferHelp()}>
        Request Help
      </button>
      <div className="float-right mr-3">
        <input
          type="number"
          placeholder="Amount (ml)"
          value={amount}
          onChange={handleAmountChange}
          className="form-control"
        />
      </div>
    </div>
  );
}

export default Donations;

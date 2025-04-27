// import React, { useState, useEffect } from "react"; 
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import "../App.css";

// function SubService() {
//   const { subServiceId } = useParams();  // Get subservice ID from URL
//   const [cart, setCart] = useState({});
//   const [service, setService] = useState({}); // Store the selected service as an object
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchService = async () => {
//       if (!subServiceId) {
//         setError("Invalid subservice ID");
//         setLoading(false);
//         return;
//       }
  
//       try {
//         const response = await axios.get(`http://localhost:3000/subservices/subservice/${subServiceId}`);
//         console.log("Service response:", response.data);
//         if (response.data && response.data.data) {
//           setService(response.data.data);
//         } else {
//           setError("Subservice not found");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load subservice details");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchService();
//   }, [subServiceId]);

//   const handleAddService = (serviceName) => {
//     setCart((prevCart) => ({
//       ...prevCart,
//       [serviceName]: (prevCart[serviceName] || 0) + 1,
//     }));
//   };

//   const handleRemoveService = (serviceName) => {
//     setCart((prevCart) => {
//       if (prevCart[serviceName] > 1) {
//         return { ...prevCart, [serviceName]: prevCart[serviceName] - 1 };
//       } else {
//         const { [serviceName]: _, ...rest } = prevCart;
//         return rest;
//       }
//     });
//   };

//   if (loading) return <div className="loading-spinner">Loading...</div>;
//   if (error) return <p>{error}</p>;
//   if (!service.subServiceName) return <p>Service not found</p>;

//   return (
//     <div className="container">
//       <div className="center_text">
//         <h2 className="title1">Add Painting Services</h2>
//         <p className="text-muted mb-5">
//           Select and customize your painting services. Choose from various categories and add the ones you need!
//         </p>
//       </div>

//       <section className="mb-5">
//         <h3 className="text-primary mb-3 title1">{service.subServiceName}</h3>
//         <div className="row">
//           <div className="col-md-6">
//             <p>{service.description}</p>
//           </div>
//           <div className="col-md-6">
//             {service.subSubServices && service.subSubServices.length > 0 ? (
//               <ul className="list-group">
//                 {service.subSubServices.map((subService) => (
//                   <li key={subService} className="list-group-item">
//                     {subService}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No sub-subservices available for this service</p>
//             )}
//           </div>
//         </div>
//         <div className="d-flex justify-content-start align-items-center">
//           <button
//             className="btn btn-success me-3"
//             onClick={() => handleAddService(service.subServiceName)}
//           >
//             Add Service
//           </button>
//           <button
//             className="btn btn-danger me-2"
//             onClick={() => handleRemoveService(service.subServiceName)}
//             disabled={!cart[service.subServiceName]}
//           >
//             Remove
//           </button>
//         </div>
//       </section>

//       <div className="mt-5">
//         <Link to="/cart" state={{ cart }} className="btn btn-primary">
//           View Selected Services ({Object.values(cart).reduce((a, b) => a + b, 0)})
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default SubService;
import React, { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

function SubService() {
  const { serviceId } = useParams();  // Get service ID from URL
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubServices = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/subservices/subservice/${serviceId}`);
        if (response.data && response.data.data) {
          setSubServices(response.data.data);
        } else {
          setError("No subservices available for this service");
        }
      } catch (err) {
        setError("Failed to load subservices");
      } finally {
        setLoading(false);
      }
    };

    fetchSubServices();
  }, [serviceId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='subservices_container'>
      <h2 className="subservice_title">Subservices for {serviceId}</h2>
      <div className="subservice_list">
        {subServices.map(subservice => (
          <div key={subservice._id} className="subservice_card">
            <h4>{subservice.subServiceName}</h4>
            <p>{subservice.description}</p>
            <ul>
              {subservice.subSubServices.map((subSub, index) => (
                <li key={index}>{subSub}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubService;

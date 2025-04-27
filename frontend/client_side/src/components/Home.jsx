import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const serviceContainerRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const scrollContainer = serviceContainerRef.current;
    let scrollAmount = 0;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const scrollInterval = setInterval(() => {
      if (scrollAmount < maxScroll) {
        scrollAmount += 200;
        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollAmount = 0;
        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 5000);

    return () => clearInterval(scrollInterval); 
  }, []);

  const handleBackNavigation = (event) => {
    const isAuthenticated = sessionStorage.getItem("token");
    if (isAuthenticated) {
      event.preventDefault(); // Prevent default back navigation
      const confirmLogout = window.confirm("You are already logged in. Do you want to log out?");
      if (confirmLogout) {
        sessionStorage.clear(); // Clear session storage
        alert("You have been logged out.");
        navigate("/login"); // Redirect to login page
      }
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", handleBackNavigation);

    // Prevent user from going back using history API
    window.history.pushState(null, null, window.location.href);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, []);

  return (
    <div>
      <div className="banner_section">
        <div className="container">
          <div id="main_slider" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="banner_taital">Home Services</h1>
                      <p className="banner_text">
                        To provide every homeowner with convenient access to trusted and reliable home services, ensuring a comfortable, safe, and well-maintained living environment.
                      </p>
                      <div className="read_bt">
                        <Link to="/Appointment">Book Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="section_title"><center>Our Services</center></span>
      <div className="services_section">
        <div className="service_items" ref={serviceContainerRef}>
          <div className="service_item">
            <Link to="/Plumber">
              <img src="../plumber1.png" alt="Plumbing" className="service_image" />
              <h3>Plumbing</h3>
            </Link>
          </div>
          <div className="service_item">
            <Link to="/Electrician">
              <img src="../ele1.png" alt="Electrical" className="service_image" />
              <h3>Electrical</h3>
            </Link>
          </div>
          <div className="service_item">
            <Link to="/Cleaning">
              <img src="../clean2.png" alt="Cleaning" className="service_image" />
              <h3>Cleaning</h3>
            </Link>
          </div>
          <div className="service_item">
            <Link to="/Event">
              <img src="../event1.png" alt="Event" className="service_image" />
              <h3>Event</h3>
            </Link>
          </div>
          <div className="service_item">
            <Link to="/Mason">
              <img src="../mason3.png" alt="Mason" className="service_image" />
              <h3>Mason</h3>
            </Link>
          </div>
          <div className="service_item">
            <Link to="/Painter">
              <img src="../paint2.png" alt="Painter" className="service_image" />
              <h3>Painter</h3>
            </Link>
          </div>
          <div className="service_item">
            <Link to="/SwiftMove">
              <img src="../pack2.png" alt="Swift Move" className="service_image" />
              <h3>Swift Move</h3>
            </Link>
          </div>
          <div className="service_item">
            <Link to="/Carpenters">
              <img src="../carpenter2.png" alt="Carpenters" className="service_image" />
              <h3>Carpenters</h3>
            </Link>
          </div>
        </div>
      </div>

      <div className="partner_section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="partner_title">Get Your Service Now!</h2>
              <p className="partner_text">
                Home services refer to professional services provided at a residence, such as cleaning, repairs, maintenance, and installations.
              </p>
              <div className="partner_buttons">
                <Link to="/join-as-executive" className="partner_btn">
                  Join now as Executive
                </Link>
                <Link to="/join-as-franchise-holder" className="partner_btn">
                  Join now as Franchise holder
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <img src="../home.png" alt="Service Partner" className="partner_image" />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how_it_works_section">
        <div className="container">
          <h2 className="how_it_works_title">How It Works</h2>
          <p className="how_it_works_description">3 simple steps to home service convenience</p>
          <div className="row">
            <div className="col-md-4">
              <div className="step_box">
                <img src="../step1.png" alt="Step 1" className="step_image" />
                <h3>Step 1</h3>
                <p>Book Online or by Phone</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step_box">
                <img src="../step2.png" alt="Step 2" className="step_image" />
                <h3>Step 2</h3>
                <p>Get Booking Details</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step_box">
                <img src="../step3.png" alt="Step 3" className="step_image" />
                <h3>Step 3</h3>
                <p>Pay After Work is Done</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta_section">
        <div className="container">
          <h2 className="cta_title">Ready to Get Started?</h2>
          <p>Book an appointment today and experience quality home services.</p>
          <div className="cta_btn">
            <Link to="/service">Book Your Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

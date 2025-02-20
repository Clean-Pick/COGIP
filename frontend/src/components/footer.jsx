import { NavLink } from "react-router-dom";

function Footer() {

    return (
      <footer>
        <div className="container mx-auto px-15 font-cogip-inter">

          <div className="flex justify-between items-center mr-30 m-20  border-t-2 border-cogip-yellow -ml-[-55px] font-cogip-roboto">
            <h1><NavLink to="/" className="text-4xl font-bold border-4 border-cogip-yellow px-2 py-1 ml-5">COGIP</NavLink></h1>
            
            <div className="mt-20">
              <section>
                <p className="flex mb-4 ml-5 gap-7">
                  <img src="/index/maps.svg" alt="Location" className="" />
                  <span>Square des Martyrs, 6000 Charleroi</span>
                </p>
              </section>

              <section className="flex gap-6">
                <div className="flex gap-6 ml-5">
                  <img src="/index/phone.svg" alt="Phone" className="" />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex gap-2 ml-25">
                  <img src="/index/fax.svg" alt="Fax" className="" />
                  <span className="ml-4">(123) 456-7890</span>
                </div>
              </section>

              <section className="flex mt-12 gap-17">
                <p>Social Media</p>
                  <div  className="flex justify-between items-center gap-6 scale-130">
                  <a href="#"><img src="/index/facebook.svg" alt="Facebook" /></a>
                  <a href="#"><img src="/index/twitter.svg" alt="Twitter" /></a>
                  <a href="#"><img src="/index/linkedin.svg" alt="Linkedin" /></a>
                  <a href="#"><img src="/index/Youtube.svg" alt="Youtube" /></a>
                  <a href="#"><img src="/index/instagram.svg" alt="Insta" /></a>
                  <a href="#"><img src="/index/GooglePlus.svg" alt="Google+" /></a>
                  <a href="#"><img src="/index/Pinterest.svg" alt="Pinterest" /></a>
                  <a href="#"><img src="/index/RSS.svg" alt="RSS" /></a>
                  </div>
              </section>

            </div>
          </div>

          <div className="flex justify-between items-center mb-10">
            <nav className="m-4">
              <ul className="flex justify-center uppercase gap-12 text-sm">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/invoices" >Invoices</NavLink></li>
                <li><NavLink to="/companies">Companies</NavLink></li>
                <li><NavLink to="/contacts">Contacts</NavLink></li>
                <li><NavLink to="#">Privacy Policy</NavLink></li>
              </ul>
            </nav>
              <p>Copyright &copy; 2022 • COGIP Inc.</p>
          </div>


        </div>
      </footer>
    );
  }
  
  export default Footer;
  
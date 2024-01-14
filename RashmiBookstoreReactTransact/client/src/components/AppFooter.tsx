import '../assets/css/AppFooter.css'
import '../assets/css/AppHeader.css'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';



function AppFooter(){
    return(
        <footer className="container">
            <section className="contact-us-directions">
                <p>ContactUs</p>
                <p>Directions</p>
            </section>
            <section className="social-media-icons-copyright">
                <section className = "social-media-icons">
                <FontAwesomeIcon icon={faTwitter} style={{color:'white',fontSize: '25px',padding:'0.2em'}}/>
                <FontAwesomeIcon icon={faInstagram} style={{color:'white',fontSize: '25px',padding:'0.2em'}}/>
                </section>

            <section className="copyright" style={{color:'white',padding:'0.2em',position:'relative',bottom:'1px'}}>
                <p>
                    © 2023, PunnyPages.com. or its affiliates
                </p>
            </section>

            </section>
        </footer>
    )
}
export default AppFooter;













// import '../assets/css/AppFooter.css'
// import '../assets/css/global.css'
// import {Link} from "react-router-dom";
//
//
//
// function AppFooter(){
// return(
//   <footer className="container">
//     <section className="links">
//       <Link to="/">about</Link>
//       <Link to="/">contact</Link>
//       <Link to="/">directions</Link>
//     </section>
//     <section className="social-media-icons">
//       <Link to="/" className="button">Facebook</Link>
//       <Link to="/" className="button">Twitter</Link>
//     </section>
//   </footer>
// )
// }
// export default AppFooter;

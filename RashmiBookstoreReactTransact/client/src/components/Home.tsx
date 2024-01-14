


import '../assets/css/Home.css'
import "../assets/css/AppHeader.css"
import { Link } from 'react-router-dom';
import backgroundImage from '../images/site/background-image.jpg'



function Home() {
    return (

        <div>
        <main>
            <section className="body-books"  style={{backgroundImage: './../assets/images/site/background-image.jpg'}}>
                <section className="text-cta">
                    <p>
                        Welcome to Punny Pages!
                        If you are an avid reader or a beginner,
                        you are at the right place.
                        Browse through our amazing collection to find the right book for your everyday mood!
                    </p>
                    <Link to ="/categories/Biography and Autobiography">
                    <button  className= "CTA">SHOP NOW!</button>
                    </Link>
                </section>
            <section className="container-book-images">
                <div>
                    <Link to="/">
                        <img
                            src={require('../assets/images/site/atomichabits.jpeg')}
                            alt="suggested"
                            width="150px"
                            height="200px"
                            style={{
                                transform: "translateX(-20%) scale(0.8)", // Start off-screen to the left
                                transition: "transform 0.5s ease-in-out", // Add the transition property
                                opacity: 1, // Ensure the image is initially visible
                                padding: '2px',
                            }}
                            onLoad={(e) => {
                                const image = e.target as HTMLImageElement;
                                setTimeout(() => {
                                    image.style.transform = "translateX(0) scale(1)"; // Slide in from the left
                                }, 0);
                            }}
                        />
                    </Link>

                    <p style={{position:'relative',left: '30px',right:'0.5px',top:'5px'}}>Suggested</p>
                </div>
                <div >
                    <Link to="/">
                        <img
                            src={require('../assets/images/site/must-reads.jpg')}
                            alt="suggested"
                            width="150px"
                            height="200px"
                            style={{
                                transform: "translateX(-20%) scale(0.8)", // Start off-screen to the left
                                transition: "transform 0.5s ease-in-out", // Add the transition property
                                opacity: 1, // Ensure the image is initially visible
                                padding: '2px',
                            }}
                            onLoad={(e) => {
                                const image = e.target as HTMLImageElement;
                                setTimeout(() => {
                                    image.style.transform = "translateX(0) scale(1)"; // Slide in from the left
                                }, 0);
                            }}
                        />
                    </Link>
                    <p style={{position:'relative',left: '20px',right:'0.5px',top:'5px'}}>Must Reads</p>
                </div>
                <div>
                    <Link to="/">
                        <img
                            src={require('../assets/images/site/Romance-book3.jpeg')}
                            alt="suggested"
                            width="150px"
                            height="200px"
                            style={{
                                transform: "translateX(-20%) scale(0.8)", // Start off-screen to the left
                                transition: "transform 0.5s ease-in-out", // Add the transition property
                                opacity: 1, // Ensure the image is initially visible

                            }}
                            onLoad={(e) => {
                                const image = e.target as HTMLImageElement;
                                setTimeout(() => {
                                    image.style.transform = "translateX(0) scale(1)"; // Slide in from the left
                                }, 0);
                            }}
                        />
                    </Link>
                    <p style={{position:'relative',left: '19px',right:'10px',top:'3px',bottom:'3px'}}>New Releases</p>
                </div>

                <div>
                    <Link to="/">
                        <img
                            src={require('../assets/images/site/Romance-book1.jpeg')}
                            alt="suggested"
                            width="150px"
                            height="200px"
                            style={{
                                transform: "translateX(-20%) scale(0.8)", // Start off-screen to the left
                                transition: "transform 0.5s ease-in-out", // Add the transition property
                                opacity: 1, // Ensure the image is initially visible

                            }}
                            onLoad={(e) => {
                                const image = e.target as HTMLImageElement;
                                setTimeout(() => {
                                    image.style.transform = "translateX(0) scale(1)"; // Slide in from the left
                                }, 0);
                            }}
                        />
                    </Link>
                    <p style={{position:'relative',left: '30px',right:'0.5px',top:'5px'}}>Best Sellers</p>
                </div>

            </section>
                <section/>
            </section>
        </main>
        </div>
    )
}

export default Home;

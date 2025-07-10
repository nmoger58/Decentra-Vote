import NavBar from "../components/NavBar/NavBar";
import { VotingProvider } from "../context/Voter.js";
import "../styles/globals.css";

//INTERNAL IMPORT

const MyApp = ({ Component, pageProps }) => (
    <VotingProvider>
        <div>
        <NavBar />
        <div>
            <Component {...pageProps} />
        </div>
        
        </div>
    </VotingProvider>
)

export default MyApp;

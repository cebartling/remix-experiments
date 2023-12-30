import {ReactNode} from "react";
import NavBar from "../../components/navigation/NavBar";

export default function LandingPageLayout({children}: { children: ReactNode }) {

    return (
        <div>
            <NavBar/>
            {children}
        </div>
    );
}
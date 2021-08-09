import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Dashboard from "../screens/Dashboard";
import GetStarted from "../screens/GetStarted";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";



export default function AppRouter() {

    return <>
        <Router>
            <Switch>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/">
                    <GetStarted />
                </Route>
            </Switch>
        </Router>

    </>


}



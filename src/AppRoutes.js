import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import RegistrationForm from "./components/SignIn";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import ToggleElement from "./components/test";
import Profile from "./components/Profile";
import Data from "./components/Data";
import Donations from "./components/Donations";
import Reports from "./components/Reports";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/registration',
    element: <RegistrationForm />
  },
  {
    path: '/sign-up-form',
    element: <SignUp />
  },
  {
    path: '/log-in-form',
    element: <LogIn />
  },
  {
    path: '/test',
    element: <ToggleElement />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/data',
    element: <Data />
  },
  {
    path: '/donations',
    element: <Donations />
  },
  {
    path: '/reports',
    element: <Reports />
  }
];

export default AppRoutes;
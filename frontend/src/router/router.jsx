import { createBrowserRouter } from 'react-router-dom';
import LayoutMain from  '../layouts/LayoutMain';
import HomePage from '../pages/HomePage';
import LearnPage from '../pages/LearnPage';
import TranscribePage from '../pages/TranscribePage';
import ContactPage from '../pages/ContactPage';


export const ROUTER = createBrowserRouter([
    {
        path: "",
        element: <LayoutMain />,
        children:[
            {
                path:"",
                element: <HomePage />
            },
            {
                path:"learn",
                element: <LearnPage/>
            },
            {
                path:"transcribe",
                element: <TranscribePage/>
            },
            {
                path:"contact",
                element: <ContactPage/>
            }
        ]
    }
]);
/* eslint-disable no-unused-vars */
import { createBrowserRouter } from 'react-router-dom';
import LayoutMain from  '../layouts/LayoutMain';
import HomePage from '../pages/HomePage';
import LearnPage from '../pages/LearnPage';
import TranscribePage from '../pages/TranscribePage';
import ContactPage from '../pages/ContactPage';
import { localH, websocketURL, ngrok } from '../components/utils/utils';

const URL = localH;
const URL_CONTACT = localH;

export const ROUTER = createBrowserRouter([
    {
        path: "",
        element: <LayoutMain />,
        children:[
            {
                path:"",
                element: <HomePage/>
            },
            {
                path:"learn",
                element: <LearnPage URL={URL}/>
            },
            {
                path:"transcribe",
                element: <TranscribePage URL={URL}/>
            },
            {
                path:"contact",
                element: <ContactPage URL={URL_CONTACT}/>
            }
        ]
    }
]);
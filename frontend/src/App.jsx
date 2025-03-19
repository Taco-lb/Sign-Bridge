import { Component } from 'react'
import { RouterProvider } from 'react-router-dom';
import { ROUTER } from './router/router'

export default class App extends Component {
    render(){
        return(
            <>
                <RouterProvider router={ROUTER}/>
            </>  
        );
    }
}
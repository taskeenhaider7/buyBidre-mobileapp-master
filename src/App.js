import React from 'react'
import Router from './router/Router'
// import Home from './components/Home'
class App extends React.Component{
    
    render(){
        console.disableYellowBox = true;
        return(
            <Router/>
        )
    }
}
export default App
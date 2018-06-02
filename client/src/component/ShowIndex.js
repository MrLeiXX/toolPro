import React, { Component } from 'react';

class ShowIndex extends Component {

    componentDidMount() {
        var script= document.createElement('script'); 
        script.type= 'text/javascript'; 
        script.src= '/link/indexcanvas.js';
        document.body.appendChild(script);
    }
    render() {
        return (
            <div className="canv" style={{marginLeft: 240, overflow: "hidden",margin: 0, padding: 0}}>
                <canvas id="canvas" style={{marginBottom: "-4px", padding: 0}}></canvas>
            </div>
        )
    }
}

export default ShowIndex;
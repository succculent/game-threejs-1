import _ from 'lodash';
import './style.css';
import * as THREE from 'three'
import Guidance from './assets/Guidance.mp3'
// import song2 from './assets/song2.mp3'
// import song3 from './assets/song3.mp3'
// import song4 from './assets/song4.mp3'
// import song5 from './assets/song5.mp3'
import AudioInstance from './Components/Audio.js'
import Renderer from './Components/Renderer.js' 
// import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'
import Popup from './Components/Popup.js'
import scene1 from './Scenes/scene1.js'

function component() {
    /*
     * Page Setup
     */
    const element = document.createElement( 'div' );
    var canvas = document.createElement( 'canvas' );
    canvas.classList.add( 'webgl' );
    element.appendChild( canvas );

    var sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    let A = new AudioInstance( 2048 );
    A.loadTrack( Guidance );
    element.appendChild( A.audio );

    let scene = new scene1( sizes, A );

    let p = new Popup( "Guidance", "Samuel Organ" );
    p.activate();

    let R = new Renderer( canvas, sizes );

    // document.body.appendChild( VRButton.createButton( R ) );

    window.addEventListener('mousemove', (event) =>
    {
        scene.RC.mouse.x = event.clientX / sizes.width * 2 - 1
        scene.RC.mouse.y = - (event.clientY / sizes.height) * 2 + 1
    });
    window.addEventListener('click', () =>
    {
        if(scene.RC.INTERSECTED)
        {
            // console.log(scene.RC.INTERSECTED);
            scene.O.onClick( scene.RC.INTERSECTED );
        }
    });
    window.addEventListener( 'resize', ( ) =>
    {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        scene.resize( sizes );
    });

    const clock = new THREE.Clock( );
    const tick = ( ) =>
    {   
        var deltaTime = clock.getDelta( );
        var elapsedTime = clock.getElapsedTime( );
        p.update( deltaTime );
        A.onTick( );
        R.render( scene.scene, scene.C.camera );
        scene.tick( deltaTime, elapsedTime, A );
        window.requestAnimationFrame( tick );
    };
    tick( );

    return element;
}

document.body.appendChild( component() );
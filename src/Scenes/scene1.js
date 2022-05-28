import * as THREE from 'three'
import Objects from '../Components/Objects.js'
import Camera from '../Components/Camera.js'
import Lights from '../Components/Lights.js'
import Raycaster from '../Components/Raycaster.js'

export default class scene1
{
    constructor( sizes, A )
    {
        //member variables
        //create scene
        this.scene = new THREE.Scene( );
        this.scene.background = new THREE.Color( 1, 0, 0 );
        //create objects
        this.O = new Objects( );
        this.O.objects( this.scene );
        //create camera
        this.C = new Camera( );
        this.C.createCamera( sizes );
        //add lights
        this.L = new Lights( );
        this.L.lights( this.scene );
        //add raycaster
        this.RC = new Raycaster( );
        //debug
    }
    resize( sizes )
    {
        // Update camera
        this.C.resize( sizes );
    }
    tick( deltaTime, elapsedTime, A )
    {
        //update camera position
        this.C.tick( elapsedTime, deltaTime );
        //objects
        this.O.tick( A, deltaTime );
        //lights
        this.L.tick( elapsedTime );
        //raycaster
        this.RC.tick( this.C.camera, this.O.spheres );
    }
};
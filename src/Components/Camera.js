import * as THREE from 'three'

export default class Camera
{
    constructor( )
    {
        
    }
    createCamera( sizes ) {
        //camera
        this.camera = new THREE.PerspectiveCamera( 50, sizes.width / sizes.height, 0.1, 1000 );
        this.camera.position.set( 0, 15, 40 );
        this.camera.lookAt( 0, 15, 0 );
    }
    resize( sizes )
    {
        this.camera.aspect = sizes.width / sizes.height;
        this.camera.updateProjectionMatrix( );
    }
    tick( elapsedTime, deltaTime ) {
    }
};
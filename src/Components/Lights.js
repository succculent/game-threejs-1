import * as THREE from 'three'

export default class Lights
{
    constructor( )
    {
        this.unitZ = new THREE.Vector3( 0, 0, 1 );
    }
    lights( scene )
    {
        //light plate
        this.mainLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
		this.mainLight.position.set( -4, 1, 1 );
		scene.add( this.mainLight );

        //splotlight
        this.spotLight = new THREE.SpotLight( 0xffffff, 0.7 );
		this.spotLight.position.set( 0, 0, 50 );
        this.spotLight.castShadow = true;
        //Set up shadow properties for the light
        this.spotLight.shadow.mapSize.width = 2048; // default
        this.spotLight.shadow.mapSize.height = 2048; // default
        this.spotLight.shadow.camera.near = 0.5; // default
        this.spotLight.shadow.camera.far = 500; // default
		scene.add( this.spotLight );

        // //hemisphere light
        // this.colorLight = new THREE.HemisphereLight( 0xffff00, 0x0000ff, 0.8 );
        // this.colorLight.needsUpdate
        // scene.add( this.colorLight );

        // //ambient light
        // var ambient = new THREE.AmbientLight( 0xffffff, 0.02 );
        // scene.add( ambient );
    }
    tick( elapsedTime )
    {
        // this.colorLight.rotateOnAxis(this.unitZ, Math.PI*elapsedTime)
    }
};
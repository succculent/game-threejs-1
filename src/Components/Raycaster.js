import * as THREE from 'three'

export default class Raycaster
{
    constructor( )
    {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.INTERSECTED = null;
    }
    tick( camera, spheres ) {
        //change this to be controller if controller is active
        this.raycaster.setFromCamera( this.mouse, camera );
        for ( let index in spheres ) {
            const intersects = this.raycaster.intersectObjects( spheres );
            if ( intersects.length > 0 ) { //if there is an intersection
                if ( this.INTERSECTED != intersects[ intersects.length - 1 ]) { //if this intersection was not already set
                    this.INTERSECTED = intersects[ intersects.length - 1 ]; 
                }
            } else { //no intersection
                this.INTERSECTED = null; //change so there is no intersected
            }
        }
    }
};
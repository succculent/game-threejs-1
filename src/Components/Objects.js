import * as THREE from 'three'
import vertexFairy from '../shaders/vertexFairy.glsl'
import fragmentFairy from '../shaders/fragmentFairy.glsl'
import vertexCircles from '../shaders/vertexCirlces.glsl'
import fragmentCircles from '../shaders/fragmentCirlces.glsl'
import vertexVoronoi from '../shaders/vertexVoronoi.glsl'
import fragmentVoronoi from '../shaders/fragmentVoronoi.glsl'

export default class Objects
{
    constructor() 
    {

    }
    //SCENE 1
    objects( scene )
    {
        this.spheres = [];
        this.sphereState = [];
        this.spherePositions = [[[-40, 0, -45], [-40, 10, -45]]
                                ,[[-31, 0, -40], [-31, 10, -40]]
                                ,[[-22, 0, -20], [-22, 10, -20]]
                                ,[[-13, 0, -25], [-13, 10, -25]]
                                ,[[4, 0, -35], [4, 10, -35]]
                                ,[[15, 0, -25], [15, 10, -25]]
                                ,[[26, 0, -20], [26, 10, -20]]
                                ,[[37, 0, -40], [37, 10, -40]]
                                ,[[48, 0, -45], [48, 10, -45]]
                                ];
        for ( let index in this.spherePositions ) {
            this.createSphere( scene, this.spherePositions[ index ][ 0 ] );
            console.log( this.spherePositions[ index ][ 0 ][ 1 ] )
        }
        // for ( let index in this.spheres ) this.sphereMeshes.push( this.spheres[ index ].sphereMesh );
        this.createBackground( scene );
    }
    createBackground( scene )
    {
        var backWallGeometry = new THREE.BoxGeometry( 400, 400, 2 );
        var sideWallGeometry = new THREE.BoxGeometry( 2, 200, 200 );
        var bottomGeometry = new THREE.BoxGeometry( 400, 10, 400 );

        var wallMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF
        });
        var floorMaterial = new THREE.MeshLambertMaterial({
            color: 0x888888
        });

        this.group = new THREE.Group();
        var obj_ =   [
                    //  [sideWallGeometry, wallMaterial, [50, 0, 0], [true, true]]  //right
                    ,[backWallGeometry, wallMaterial, [0, 0, -100], [false, true]] //back
                    // ,[sideWallGeometry, wallMaterial, [-50, 0, 0], [true, true]]  //left
                    // ,[bottomGeometry, wallMaterial, [0, -50, 0], [false, true]]   //bottom
                    // ,[backWallGeometry, wallMaterial, [0, 0, 600], [true, true]] //lights
                    ];

        for ( let index in obj_ ){
            var temp = new THREE.Mesh( obj_[index][0] , obj_[index][1] );
            temp.position.set( obj_[index][2][0], obj_[index][2][1], obj_[index][2][2] );
            temp.castShadow = obj_[index][3][0];
            temp.receiveShadow = obj_[index][3][1];
            this.group.add( temp );
        }
        scene.add( this.group );
    }
    tick( A, deltaTime )
    {
        for ( let index in this.spheres ) this.sphereTick( deltaTime, index );
    }
    //state -1 disabled
    //state 0 bottom
    //state 1 moving up
    //state 2 moving down
    createSphere( scene, position )
    {
        var sphereGeometry = new THREE.SphereGeometry( 2 );
        var sphereMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xFFFFFF
            ,emissive: 0x091909
            ,roughness: 0.2
            ,metalness: 0.902
            ,reflectivity: 1
        });
        var sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial );
        sphereMesh.position.set( position[ 0 ], position[ 1 ], position[ 2 ] );
        sphereMesh.castShadow = true;
        sphereMesh.recieveShadow = true;
        this.spheres.push( sphereMesh );
        this.sphereState.push( 0 );
        scene.add( sphereMesh );
    }
    onClick( obj_ )
    {
        console.log( obj_.object.position );
        var objPos = (obj_.object.position.x < 0) ? obj_.object.position.x * -1 : obj_.object.position.x;
        console.log( objPos );
        var index = ( objPos + 100 ) % 10;
        console.log( index );
        if ( this.sphereState[ index ] == 0 ) {
            this.sphereState[ index ] = 1;
        }
    }
    sphereTick( deltaTime, index )
    {
        if ( this.sphereState[ index ] == 1 ) {
            console.log("state:1 index:" + index);
            var tPosition = this.spherePositions[ index ][ 1 ];
            if ( this.spheres[ index ].position.y < tPosition[ 1 ] ) this.spheres[ index ].position.y += deltaTime * 50;
            if ( this.spheres[ index ].position.y >= tPosition[ 1 ] ) {
                this.spheres[ index ].position.set( tPosition[ 0 ], tPosition[ 1 ], tPosition[ 2 ] );
                this.sphereState[ index ] = 2;
            }
        }
        else if ( this.sphereState[ index ] == 2 ) {
            console.log("state:2 index:" + index);
            var bPosition = this.spherePositions[ index ][ 0 ];
            if ( this.spheres[ index ].position.y > bPosition[ 1 ] ) this.spheres[ index ].position.y -= deltaTime * 10;
            if ( this.spheres[ index ].position.y <= bPosition[ 1 ] ) {
                this.spheres[ index ].position.set( bPosition[ 0 ], bPosition[ 1 ], bPosition[ 2 ] );
                this.sphereState[ index ] = 0;
            }
        }
    }
};
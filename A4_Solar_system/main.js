var sunUniforms, sun;
var mercury,venus,earth,mars,jupiter,saturn,uranus,neptune,pluto
var moon, marsPhobos, marsDemios;
var jupiterMoons = [], saturnMoons = [], uranusMoons = [], neptuneMoons = [], plutoMoons = [];
var mercuryOrbit,venusOrbit,earthOrbit,marsOrbit,jupiterOrbit,saturnOrbit,uranusOrbit,neptuneOrbit,plutoOrbit;
var saturnRing1, saturnRing2, saturnRing3;
var uranusRing1, uranusRing2, uranusRing3, uranusRing4, uranusRing5;
var uranusRing, asterRing;
var pointLight, controls, scene, camera, renderer, scene;
var planetSegments = 48;
var mercuryData = createPlanetData(88, 0.00993, 20, "mercury", "img/mercurymap.jpg", 0.5, planetSegments);
var venusData = createPlanetData(225,0.00496,25,"venus","img/venusmap.jpg",0.7,planetSegments);
var earthData = createPlanetData(365.2564, 0.024, 30, "earth", "img/earth.jpg", 1, planetSegments);
var moonData = createPlanetData(29.5, 0.01, 2.8, "moon", "img/moon.jpg", 0.2, planetSegments);
var marsData = createPlanetData(687,0.0242, 35, "mars", "img/mars_1k_color.jpg", 0.8, planetSegments);
var marsPhobosData = createPlanetData(29.5, 0.01, 2, "phobos", "img/phobosbump.jpg", 0.1, planetSegments);
var marsDemiosData = createPlanetData(32, 0.03, 2.5, "demios", "img/deimosbump.jpg", 0.15, planetSegments);
var jupiterData = createPlanetData(700,0.0125,53,"jupiter","img/jupitermap.jpg",4,planetSegments);
var jupiterMoonsData = []
for(let i = 29; i < 41; i+=0.5){
    let tempData = createPlanetData(i, 0.03, 4.6, "jupiterMoon", "img/phobosbump.jpg", 0.15, planetSegments);
    jupiterMoonsData.push(tempData)
}
var saturnData = createPlanetData(720,0.0125,65,"saturn","img/saturnmap.jpg",3.3,planetSegments);
var saturnMoonsData = []
for(let i = 29; i < 41; i+=0.5){
    let tempData = createPlanetData(i, 0.03, 3.6, "saturnMoon", "img/deimosbump.jpg", 0.15, planetSegments);
    saturnMoonsData.push(tempData)
}
var uranusData = createPlanetData(740, 0.012, 80, "uranus","img/uranusmap.jpg",2,planetSegments);
var uranusMoonsData = []
for(let i = 29; i < 37; i+=0.5){
    let tempData = createPlanetData(i, 0.03, 2.6, "uranusMoon", "img/phobosbump.jpg", 0.1, planetSegments);
    uranusMoonsData.push(tempData)
}
var neptuneData = createPlanetData(780,0.0115, 90, "neptune","img/neptunemap.jpg",1.8,planetSegments);
var neptuneMoonsData = []
for(let i = 29; i < 34; i+=0.5){
    let tempData = createPlanetData(i, 0.03, 2, "neptuneMoon", "img/deimosbump.jpg", 0.1, planetSegments);
    neptuneMoonsData.push(tempData)
}
var plutoData = createPlanetData(800, 0.01, 97, "pluto", "img/plutomap1k.jpg",0.4,planetSegments);
var plutoMoonsData = []
for(let i = 29; i < 32; i+=0.5){
    let tempData = createPlanetData(i, 0.03, 0.5, "plutoMoon", "img/phobosbump.jpg", 0.05, planetSegments);
    plutoMoonsData.push(tempData)
}
var orbitData = {value: 200, runOrbit: true, runRotation: true};
var clock = new THREE.Clock();

/** 
 * This eliminates the redundance of having to type property names for a planet object.
 * @param {type} myOrbitRate decimal
 * @param {type} myRotationRate decimal
 * @param {type} myDistanceFromAxis decimal
 * @param {type} myName string
 * @param {type} myTexture image file path
 * @param {type} mySize decimal
 * @param {type} mySegments integer
 * @returns {createPlanetData.mainAnonym$0}
 */
function createPlanetData(myOrbitRate, myRotationRate, myDistanceFromAxis, myName, myTexture, mySize, mySegments) {
    return {
        orbitRate: myOrbitRate
        , rotationRate: myRotationRate
        , distanceFromAxis: myDistanceFromAxis
        , name: myName
        , texture: myTexture
        , size: mySize
        , segments: mySegments
    };
}

/** 
 * create a visible ring and add it to the scene.
 * @param {type} size decimal
 * @param {type} innerDiameter decimal
 * @param {type} facets integer
 * @param {type} myColor HTML color
 * @param {type} name string
 * @param {type} distanceFromAxis decimal
 * @returns {THREE.Mesh|myRing}
 */
function getRing(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ring1Geometry = new THREE.RingGeometry(size, innerDiameter, facets);
    var ring1Material = new THREE.MeshBasicMaterial({color: myColor, side: THREE.DoubleSide});
    var myRing = new THREE.Mesh(ring1Geometry, ring1Material);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

/** 
 * Used to create a three dimensional ring. This takes more processing power to 
 * run that getRing(). So use this sparingly, such as for the outermost ring of
 * Saturn.
 * @param {type} size decimal
 * @param {type} innerDiameter decimal
 * @param {type} facets integer
 * @param {type} myTexture HTML color
 * @param {type} name string
 * @param {type} distanceFromAxis decimal
 * @returns {THREE.Mesh|myRing}
 */
function getAsterRing(size, innerDiameter, facets, myTexture, name, distanceFromAxis) {
    var ringGeometry = new THREE.RingGeometry(size, innerDiameter, facets, facets);
    var texture = new THREE.TextureLoader().load(myTexture);
    var ringMaterial = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide,opacity:1.5,transparent: true});
    myRing = new THREE.Mesh(ringGeometry, ringMaterial);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

/**
 * Simplifies the creation of materials used for visible objects.
 * @param {type} type
 * @param {type} color
 * @param {type} myTexture
 * @returns {THREE.MeshStandardMaterial|THREE.MeshLambertMaterial|THREE.MeshPhongMaterial|THREE.MeshBasicMaterial}
 */
function getMaterial(type, color, myTexture) {
    var materialOptions = {
        color: color === undefined ? 'rgb(255, 255, 255)' : color,
        map: myTexture === undefined ? null : myTexture
    };

    switch (type) {
        case 'basic':
            return new THREE.MeshBasicMaterial(materialOptions);
        case 'lambert':
            return new THREE.MeshLambertMaterial(materialOptions);
        case 'phong':
            return new THREE.MeshPhongMaterial(materialOptions);
        case 'standard':
            return new THREE.MeshStandardMaterial(materialOptions);
        default:
            return new THREE.MeshBasicMaterial(materialOptions);
    }
}

/*
 *  Draws all of the orbits to be shown in the scene.
 * @returns {undefined}
 */
function createVisibleOrbits() {
    var orbitWidth = 0.1;
    mercuryOrbit = getRing(mercuryData.distanceFromAxis + orbitWidth
        , mercuryData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "mercuryOrbit"
        , 0);
    venusOrbit = getRing(venusData.distanceFromAxis + orbitWidth
        , venusData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "venusOrbit"
        , 0);
    earthOrbit = getRing(earthData.distanceFromAxis + orbitWidth
        , earthData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "earthOrbit"
        , 0);
    marsOrbit = getRing(marsData.distanceFromAxis + orbitWidth
        , marsData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "marsOrbit"
        , 0);
    jupiterOrbit = getRing(jupiterData.distanceFromAxis + orbitWidth
        , jupiterData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "jupiterOrbit"
        , 0);
    saturnOrbit = getRing(saturnData.distanceFromAxis  + orbitWidth
        , saturnData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "saturnOrbit"
        ,0);
    uranusOrbit = getRing(uranusData.distanceFromAxis  + orbitWidth
        , uranusData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "uranusOrbit"
        ,0);
    neptuneOrbit = getRing(neptuneData.distanceFromAxis  + orbitWidth
        , neptuneData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "neptuneOrbit"
        ,0);
    plutoOrbit = getRing(plutoData.distanceFromAxis  + orbitWidth
        , plutoData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "plutoOrbit"
        ,0);
}

/** 
 * Simplifies the creation of a sphere.
 * @param {type} material THREE.SOME_TYPE_OF_CONSTRUCTED_MATERIAL
 * @param {type} size decimal
 * @param {type} segments integer
 * @returns {getSphere.obj|THREE.Mesh}
 */
function getSphere(material, size, segments) {
    var geometry = new THREE.SphereGeometry(size, segments, segments);
    var obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;

    return obj;
}

/**
 * Creates a planet and adds it to the scene.
 * @param {type} myData data for a planet object
 * @param {type} x integer
 * @param {type} y integer
 * @param {type} z integer
 * @param {type} myMaterialType string that is passed to getMaterial()
 * @returns {getSphere.obj|THREE.Mesh|loadTexturedPlanet.myPlanet}
 */
function loadTexturedPlanet(myData, x, y, z, myMaterialType) {
    var myMaterial;
    var passThisTexture;

    if (myData.texture && myData.texture !== "") {
        passThisTexture = new THREE.TextureLoader().load(myData.texture);
    }
    if (myMaterialType) {
        myMaterial = getMaterial(myMaterialType, "rgb(255, 255, 255 )", passThisTexture);
    } else {
        myMaterial = getMaterial("lambert", "rgb(255, 255, 255 )", passThisTexture);
    }

    myMaterial.receiveShadow = true;
    myMaterial.castShadow = true;
    var myPlanet = getSphere(myMaterial, myData.size, myData.segments);
    myPlanet.receiveShadow = true;
    myPlanet.name = myData.name;
    scene.add(myPlanet);
    myPlanet.position.set(x, y, z);

    return myPlanet;
}

/**
 * Simplifies creating a light that disperses in all directions.
 * @param {type} intensity decimal
 * @param {type} color HTML color
 * @returns {THREE.PointLight|getPointLight.light}
 */
function getPointLight(intensity, color) {
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
}

/** 
 * Move the planet around its orbit, and rotate it.
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @param {type} stopRotation optional set to true for rings
 * @returns {undefined}
 */
function movePlanet(myPlanet, myData, myTime, stopRotation) {
    if (orbitData.runRotation && !stopRotation) {
        myPlanet.rotation.y += myData.rotationRate;
    }
    if (orbitData.runOrbit) {
        myPlanet.position.x = Math.cos(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
        myPlanet.position.z = Math.sin(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
    }
}
function moveRingPlanet(myPlanet, myData, myTime, stopRotation) {
    if (orbitData.runRotation && !stopRotation) {
        myPlanet.rotation.z += myData.rotationRate;
    }
    if (orbitData.runOrbit) {
        myPlanet.position.x = Math.cos(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
        myPlanet.position.z = Math.sin(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
    }
}
/**
 * Move the moon around its orbit with the planet, and rotate it.
 * @param {type} myMoon
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @returns {undefined}
 */
function moveMoon(myMoon, myPlanet, myData, myTime) {
    movePlanet(myMoon, myData, myTime);
    if (orbitData.runOrbit) {
        myMoon.position.x = myMoon.position.x + myPlanet.position.x;
        myMoon.position.z = myMoon.position.z + myPlanet.position.z;
    }
}

/**
 * This function is called in a loop to create animation.
 * @param {type} renderer
 * @param {type} scene
 * @param {type} camera
 * @param {type} controls
 * @returns {undefined}
 */
function update(renderer, scene, camera, controls) {
    pointLight.position.copy(sun.position);
    controls.update();

    var time = Date.now();
    movePlanet(mercury,mercuryData,time);
    movePlanet(venus,venusData,time);
    movePlanet(earth, earthData, time);
    //movePlanet(ring, earthData, time);
    moveMoon(moon, earth, moonData, time);
    movePlanet(mars,marsData, time);
    moveMoon(marsPhobos,mars,marsPhobosData,time);
    moveMoon(marsDemios,mars,marsDemiosData,time);
    asterRing.rotation.z += 0.0024;
    movePlanet(jupiter,jupiterData,time);
    for(let i = 0; i < jupiterMoons.length;i++){
        moveMoon(jupiterMoons[i],jupiter,jupiterMoonsData[i],time);
    }
    movePlanet(saturn,saturnData,time);
    moveRingPlanet(saturnRing1,saturnData,time);
    moveRingPlanet(saturnRing2,saturnData,time);
    moveRingPlanet(saturnRing3,saturnData,time);
    for(let i = 0; i < saturnMoons.length;i++){
        moveMoon(saturnMoons[i],saturn,saturnMoonsData[i],time);
    }
    movePlanet(uranus,uranusData,time);
    moveRingPlanet(uranusRing1,uranusData,time);
    moveRingPlanet(uranusRing2,uranusData,time);
    moveRingPlanet(uranusRing3,uranusData,time);
    moveRingPlanet(uranusRing4,uranusData,time);
    moveRingPlanet(uranusRing5,uranusData,time);
    for(let i = 0; i < uranusMoons.length;i++){
        moveMoon(uranusMoons[i],uranus,uranusMoonsData[i],time);
    }
    movePlanet(neptune,neptuneData,time);
    for(let i = 0; i < neptuneMoons.length;i++){
        moveMoon(neptuneMoons[i],neptune,neptuneMoonsData[i],time);
    }
    movePlanet(pluto,plutoData,time);
    for(let i = 0; i < plutoMoons.length;i++){
        moveMoon(plutoMoons[i],pluto,plutoMoonsData[i],time);
    }
    var delta = 5 * clock.getDelta();
    sunUniforms[ "time" ].value += 0.2 * delta;
    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * This is the function that starts everything.
 * @returns {THREE.Scene|scene}
 */
function init() {
    // Create the camera that allows us to view into the scene.
    camera = new THREE.PerspectiveCamera(
            45, // field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            1, // near clipping plane
            1000 // far clipping plane
            );
    camera.position.z = 100;
    camera.position.x = -70;
    camera.position.y = 70;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Create the scene that holds all of the visible objects.
    scene = new THREE.Scene();

    // Create the renderer that controls animation.
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Attach the renderer to the div element.
    document.getElementById('webgl').appendChild(renderer.domElement);

    // Create controls that allows a user to move the scene with a mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load the images used in the background.
    var path = 'cubemap/';
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    reflectionCube.format = THREE.RGBFormat;

    // Attach the background cube to the scene.
    scene.background = reflectionCube;

    // Create light from the sun.
    pointLight = getPointLight(1.5, "rgb(255, 220, 180)");
    scene.add(pointLight);

    // Create light that is viewable from all directions.
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    // Create the sun.
    var sunMaterial = getMaterial("basic", "rgb(255,255,0)");
    var textureLoader = new THREE.TextureLoader();
    sunUniforms = {
        "fogDensity": { value: 0.45 },
        "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
        "time": { value: 1.0 },
        "uvScale": { value: new THREE.Vector2( 2.0, 1 ) },
        "texture1": { value: textureLoader.load( 'img/cloud.png' ) },
        "texture2": { value: textureLoader.load( 'img/lavatile.jpg' ) }
    };
    sunUniforms[ "texture1" ].value.wrapS = sunUniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
    sunUniforms[ "texture2" ].value.wrapS = sunUniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;
    var sun_material = new THREE.ShaderMaterial( {
        uniforms: sunUniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );
    sun = getSphere(sunMaterial, 15, 48);
    sunMesh = new THREE.Mesh(new THREE.SphereGeometry(16,48,48),sun_material);
    sunMesh.rotation.x = 0.3;
    scene.add(sun);
    scene.add(sunMesh);

    // Create the glow of the sun.
    var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: new THREE.ImageUtils.loadTexture("img/glow.png")
                , useScreenCoordinates: false
                , color: 0xFFCA27
                , transparent: false
                , blending: THREE.AdditiveBlending
            });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(70, 70, 1.0);
    sun.add(sprite); // This centers the glow at the sun.

    // Create the Earth, the Moon, and a ring around the earth.
    mercury = loadTexturedPlanet(mercuryData,mercuryData.distanceFromAxis,0 ,0);
    venus = loadTexturedPlanet(venusData,venusData.distanceFromAxis,0,0);
    earth = loadTexturedPlanet(earthData, earthData.distanceFromAxis, 0, 0);
    moon = loadTexturedPlanet(moonData, moonData.distanceFromAxis, 0, 0);
    mars = loadTexturedPlanet(marsData,marsData.distanceFromAxis,0,0);
    marsPhobos = loadTexturedPlanet(marsPhobosData,marsPhobosData.distanceFromAxis,-1,0);
    marsDemios = loadTexturedPlanet(marsDemiosData,marsDemiosData.distanceFromAxis,1,0);
    asterRing = getAsterRing(40, 45, 480, 'img/asterRing.png','asterRing',0);
    jupiter = loadTexturedPlanet(jupiterData,jupiterData.distanceFromAxis,0,0);
    for(let i = 0; i < jupiterMoonsData.length;i++){
        let jupMoonY = getRandomArbitrary(-jupiterMoonsData[i].distanceFromAxis,jupiterMoonsData[i].distanceFromAxis)
        let jupMoon = loadTexturedPlanet(jupiterMoonsData[i],jupiterMoonsData[i].distanceFromAxis,jupMoonY,0);
        jupiterMoons.push(jupMoon);
    }
    saturn = loadTexturedPlanet(saturnData,saturnData.distanceFromAxis,0,0);
    saturnRing1 = getRing(7.55,8, 480, 0xADAA91 , "saturnRing1",saturnData.distanceFromAxis);
    saturnRing2 = getRing(4.8,7.5,480, 0x88866F, "saturnRing2",saturnData.distanceFromAxis);
    saturnRing3 = getRing(4,4.5,480, 0x474746, "saturnRing3",saturnData.distanceFromAxis);
    for(let i = 0; i < saturnMoonsData.length;i++){
        let satMoonY = getRandomArbitrary(-saturnMoonsData[i].distanceFromAxis,saturnMoonsData[i].distanceFromAxis)
        let satMoon = loadTexturedPlanet(saturnMoonsData[i],saturnMoonsData[i].distanceFromAxis,satMoonY,0);
        saturnMoons.push(satMoon);
    }
    uranus = loadTexturedPlanet(uranusData,uranusData.distanceFromAxis,0,0);
    uranusRing1 = getRing(2.4,2.5,480,0x000F1E,"uranusRing1",uranusData.distanceFromAxis);
    uranusRing2 = getRing(3,3.05,480,0x869BAD,"uranusRing2",uranusData.distanceFromAxis);
    uranusRing3 = getRing(3.1,3.15,480,0xAAB7C2, "uranusRing3",uranusData.distanceFromAxis);
    uranusRing4 = getRing(3.2,3.25,480,0xC9D2DA, "uranusRing4",uranusData.distanceFromAxis);
    uranusRing5 = getRing(3.3,3.35,480,0xD9DCDF, "uranusRing5",uranusData.distanceFromAxis);
    for(let i = 0; i < uranusMoonsData.length;i++){
        let uraMoonY = getRandomArbitrary(-uranusMoonsData[i].distanceFromAxis,uranusMoonsData[i].distanceFromAxis)
        let uraMoon = loadTexturedPlanet(uranusMoonsData[i],uranusMoonsData[i].distanceFromAxis,uraMoonY,0);
        uranusMoons.push(uraMoon);
    }
    neptune = loadTexturedPlanet(neptuneData,neptuneData.distanceFromAxis,0,0);
    for(let i = 0; i < neptuneMoonsData.length;i++){
        let nepMoonY = getRandomArbitrary(-neptuneMoonsData[i].distanceFromAxis,neptuneMoonsData[i].distanceFromAxis)
        let nepMoon = loadTexturedPlanet(neptuneMoonsData[i],neptuneMoonsData[i].distanceFromAxis,nepMoonY,0);
        neptuneMoons.push(nepMoon);
    }
    pluto = loadTexturedPlanet(plutoData,plutoData.distanceFromAxis,0,0);
    for(let i = 0; i < plutoMoonsData.length;i++){
        let pluMoonY = getRandomArbitrary(-plutoMoonsData[i].distanceFromAxis,plutoMoonsData[i].distanceFromAxis)
        let pluMoon = loadTexturedPlanet(plutoMoonsData[i],plutoMoonsData[i].distanceFromAxis,pluMoonY,0);
        plutoMoons.push(pluMoon);
    }
    //ring = getRing(1.8, 0.05, 480, 0x757064, "ring", earthData.distanceFromAxis);
    // Create the visible orbit that the Earth uses.
    createVisibleOrbits();
    // Create the GUI that displays controls.
    var gui = new dat.GUI();
    var folder1 = gui.addFolder('light');
    folder1.add(pointLight, 'intensity', 0, 10);
    var folder2 = gui.addFolder('speed');
    folder2.add(orbitData, 'value', 0, 500);
    folder2.add(orbitData, 'runOrbit', 0, 1);
    folder2.add(orbitData, 'runRotation', 0, 1);

    // Start the animation.
    update(renderer, scene, camera, controls);
}

// Start everything.
init();

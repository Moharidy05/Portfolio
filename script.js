document.addEventListener('DOMContentLoaded', function() {
    initLogo3D();
    initNeuralNetworkBackground(); 
    initProjectViewers();
    setupSmoothScrolling();
    setupContactForm();
});

// ==========================================
// mouse tracking
// ==========================================
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (e) => {

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ==========================================
// neural network
// ==========================================
function initLogo3D() {
    const container = document.getElementById('logo-3d');
    if (!container) return;
    
    while(container.firstChild) container.removeChild(container.firstChild);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    

    const size = 50; 
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    

    const neuralNetGroup = new THREE.Group();
    scene.add(neuralNetGroup);


    const nodeGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x06b6d4 }); 
    const nodes = [];
    const nodePositions = [];
    const nodeCount = 12; 

    for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

        const x = (Math.random() - 0.5) * 2.2;
        const y = (Math.random() - 0.5) * 2.2;
        const z = (Math.random() - 0.5) * 2.2;
        node.position.set(x, y, z);
        
        nodes.push(node);
        nodePositions.push(node.position);
        neuralNetGroup.add(node);
    }


    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x8b5cf6, 
        transparent: true, 
        opacity: 0.5 
    });
    const linePositions = [];


    for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
            const dist = nodePositions[i].distanceTo(nodePositions[j]);

            if (dist < 1.8) {
                linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
                linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
            }
        }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    neuralNetGroup.add(lines);

    camera.position.z = 4;


    function animate() {
        requestAnimationFrame(animate);
        neuralNetGroup.rotation.y += 0.008; 
        neuralNetGroup.rotation.x += 0.004; 
        neuralNetGroup.rotation.z += 0.002; 
        renderer.render(scene, camera);
    }
    animate();
}

// ==========================================
// neural network background
// ==========================================
function initNeuralNetworkBackground() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    camera.position.z = 80;
    const particleCount = 120; 
    const particles = [];
    const geometry = new THREE.SphereGeometry(0.3, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });

    for (let i = 0; i < particleCount; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random()*200-100, Math.random()*100-50, Math.random()*100-50);
        mesh.velocity = new THREE.Vector3((Math.random()-0.5)*0.05, (Math.random()-0.5)*0.05, (Math.random()-0.5)*0.05);
        scene.add(mesh);
        particles.push(mesh);
    }

    const lineMat = new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.15 });

    function animate() {
        requestAnimationFrame(animate);
        

        camera.position.x += (mouse.x * 10 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 10 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);


        particles.forEach(p => {
            p.position.add(p.velocity);


            if (p.position.x < -100 || p.position.x > 100) p.velocity.x *= -1;
            if (p.position.y < -50 || p.position.y > 50) p.velocity.y *= -1;


            const mouseWorld = new THREE.Vector3(mouse.x * 100, mouse.y * 50, 0); 
            const distToMouse = p.position.distanceTo(mouseWorld);
            if(distToMouse < 20) {

                const repulsion = p.position.clone().sub(mouseWorld).normalize().multiplyScalar(0.2);
                p.position.add(repulsion);
            }
        });


        scene.children.forEach(c => { if (c.type === 'LineSegments') scene.remove(c); });
        const positions = [];
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dist = particles[i].position.distanceTo(particles[j].position);
                if (dist < 25) {
                    positions.push(particles[i].position.x, particles[i].position.y, particles[i].position.z);
                    positions.push(particles[j].position.x, particles[j].position.y, particles[j].position.z);
                }
            }
        }
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        scene.add(new THREE.LineSegments(lineGeo, lineMat));
        
        renderer.render(scene, camera);
    }
    animate();
    

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ==========================================
// visualizer
// ==========================================
function initProjectViewers() {
    const config = [
        { id: 'project-heart', color: 0xef4444, type: 'heart', link: 'project-heart.html' },
        { id: 'project-eog', color: 0x10b981, type: 'wave', link: 'project-eog.html' },
        { id: 'project-stormy', color: 0x06b6d4, type: 'pool', link: 'project-stormy.html' },
        { id: 'project-signal', color: 0x8b5cf6, type: 'signal', link: 'project-signal.html' }
    ];

    config.forEach(proj => {
        const container = document.getElementById(proj.id);
        if (!container) return;

        while(container.firstChild) container.removeChild(container.firstChild);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        camera.position.z = 5;

        let obj;
        
        if(proj.type === 'heart') {
            obj = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), new THREE.MeshPhongMaterial({ color: proj.color, wireframe: true }));
        } 
        else if (proj.type === 'wave') {
            obj = new THREE.Mesh(new THREE.TorusKnotGeometry(0.9, 0.3, 100, 16), new THREE.MeshPhongMaterial({ color: proj.color, wireframe: true }));
        } 
        else if (proj.type === 'pool') {
            const geometry = new THREE.PlaneGeometry(3.5, 3.5, 20, 20);
            const material = new THREE.MeshPhongMaterial({ color: proj.color, wireframe: true, side: THREE.DoubleSide });
            obj = new THREE.Mesh(geometry, material);
            obj.rotation.x = -Math.PI / 3; 
        }
        else if (proj.type === 'signal') {
            const numPoints = 100;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(numPoints * 3);
            
            for (let i = 0; i < numPoints; i++) {
                const x = (i / numPoints) * 5 - 2.5;
                positions[i * 3] = x;
                positions[i * 3 + 1] = 0;
                positions[i * 3 + 2] = 0;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const material = new THREE.LineBasicMaterial({ color: proj.color, linewidth: 2 });
            obj = new THREE.Line(geometry, material);
        }
        
        scene.add(obj);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        container.style.cursor = 'grab';
        container.addEventListener('mousedown', () => { 
            isDragging = true; 
            container.style.cursor = 'grabbing'; 
        });
        
        window.addEventListener('mouseup', () => { 
            isDragging = false; 
            container.style.cursor = 'grab'; 
        });
        
        container.addEventListener('dblclick', () => {
            window.location.href = proj.link;
        });

        container.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaMove = { 
                    x: e.offsetX - previousMousePosition.x, 
                    y: e.offsetY - previousMousePosition.y 
                };

                if (proj.type === 'pool') {
                    obj.rotation.z += deltaMove.x * 0.005; 
                    obj.rotation.x += deltaMove.y * 0.005; 
                } else {
                    obj.rotation.y += deltaMove.x * 0.01;
                    obj.rotation.x += deltaMove.y * 0.01;
                }
            }
            previousMousePosition = { x: e.offsetX, y: e.offsetY };
        });

        function animate(t) {
            requestAnimationFrame(animate);
            
            if (!isDragging) {
                if(proj.type === 'heart') {
                    const pulse = Math.pow(Math.sin(t * 0.006), 10) * 0.1 + 1;
                    obj.scale.setScalar(pulse);
                    obj.rotation.y += 0.005;
                } 
                else if (proj.type === 'wave') {
                    obj.rotation.z += 0.01;
                    obj.rotation.y += 0.005;
                } 
                else if (proj.type === 'pool') {
                    obj.rotation.z += 0.002; 
                    
                    const positionAttribute = obj.geometry.attributes.position;
                    const vertex = new THREE.Vector3();
                    for (let i = 0; i < positionAttribute.count; i++) {
                        vertex.fromBufferAttribute(positionAttribute, i);
                        const waveZ = Math.sin(vertex.x * 2 + t * 0.002) * 0.15 + Math.cos(vertex.y * 1.5 + t * 0.002) * 0.15;
                        positionAttribute.setZ(i, waveZ);
                    }
                    positionAttribute.needsUpdate = true;
                    obj.geometry.computeVertexNormals(); 
                }
                else if (proj.type === 'signal') {
                    const positions = obj.geometry.attributes.position.array;
                    const count = obj.geometry.attributes.position.count;
                    
                    for (let i = 0; i < count; i++) {
                        const x = positions[i * 3];
                        positions[i * 3 + 1] = Math.sin(x * 2 + t * 0.003) * 0.8;
                    }
                    obj.geometry.attributes.position.needsUpdate = true;
                    obj.rotation.y = Math.sin(t * 0.0005) * 0.3;
                }
            }
            renderer.render(scene, camera);
        }
        animate(0);
    });
}

// ==========================================
// scrolling
// ==========================================
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href.startsWith('#') || (href.includes('index.html') && href.includes('#'))) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const target = document.getElementById(targetId);
                if(target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                } else if (!window.location.href.includes('index.html')) {
                    window.location.href = href;
                }
            }
        });
    });
}

// ==========================================
// form
// ==========================================
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            const serviceID = 'service_b1dktuq'; 
            const templateID = 'template_aqv1m2g'; 

            emailjs.sendForm(serviceID, templateID, this)
                .then(function() {
                    btn.innerText = 'Message Sent!';
                    btn.style.backgroundColor = '#10b981'; 
                    alert('Thank you! Your message has been sent successfully.');
                    form.reset();
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 3000);
                }, function(error) {
                    btn.innerText = 'Failed';
                    btn.style.backgroundColor = '#ef4444'; 
                    alert('Failed to send message. Please check your Template ID and Public Key.');
                    console.error('EmailJS Error:', error);
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }
}
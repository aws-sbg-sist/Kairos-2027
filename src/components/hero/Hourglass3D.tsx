'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hourglass3DProps {
  onFallback?: () => void;
}

export const Hourglass3D: React.FC<Hourglass3DProps> = ({ onFallback }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    const width = mountRef.current.clientWidth || 400;
    const height = mountRef.current.clientHeight || 400;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      mountRef.current.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('[Hourglass3D] WebGL initialization failed, switching to SVG fallback:', e);
      setHasError(true);
      onFallback?.();
      return;
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const purplePoint = new THREE.PointLight(0xa855f7, 2.5, 20);
    purplePoint.position.set(2, 3, 4);
    scene.add(purplePoint);

    const cyanPoint = new THREE.PointLight(0x38bdf8, 2.0, 20);
    cyanPoint.position.set(-3, -2, 3);
    scene.add(cyanPoint);

    // Group for the Hourglass Assembly
    const hourglassGroup = new THREE.Group();
    scene.add(hourglassGroup);

    // Glass Material with violet/cyan iridescence
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0e7ff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0.55,
      ior: 1.5,
      reflectivity: 0.8,
    });

    const glowRimMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // Top & Bottom End Caps
    const capGeom = new THREE.CylinderGeometry(1.6, 1.6, 0.14, 32);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x2e1065,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x581c87,
      emissiveIntensity: 0.4,
    });

    const topCap = new THREE.Mesh(capGeom, capMat);
    topCap.position.y = 2.0;
    hourglassGroup.add(topCap);

    const bottomCap = new THREE.Mesh(capGeom, capMat);
    bottomCap.position.y = -2.0;
    hourglassGroup.add(bottomCap);

    // Upper Cone
    const coneGeom = new THREE.ConeGeometry(1.5, 1.9, 32, 1, true);
    const upperCone = new THREE.Mesh(coneGeom, glassMat);
    upperCone.rotation.x = Math.PI;
    upperCone.position.y = 0.98;
    hourglassGroup.add(upperCone);

    const upperConeWire = new THREE.Mesh(coneGeom, glowRimMat);
    upperConeWire.rotation.x = Math.PI;
    upperConeWire.position.y = 0.98;
    hourglassGroup.add(upperConeWire);

    // Lower Cone
    const lowerCone = new THREE.Mesh(coneGeom, glassMat);
    lowerCone.position.y = -0.98;
    hourglassGroup.add(lowerCone);

    const lowerConeWire = new THREE.Mesh(coneGeom, glowRimMat);
    lowerConeWire.position.y = -0.98;
    hourglassGroup.add(lowerConeWire);

    // Central Constriction Portal / Ring
    const centerRingGeom = new THREE.TorusGeometry(0.22, 0.05, 16, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const centerRing = new THREE.Mesh(centerRingGeom, ringMat);
    centerRing.rotation.x = Math.PI / 2;
    hourglassGroup.add(centerRing);

    // Outer Celestial Orbit Ring (Iconic KAIROS motif)
    const orbitGeom = new THREE.TorusGeometry(2.35, 0.04, 16, 64);
    const orbitMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x9333ea,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.1,
    });
    const orbitRing = new THREE.Mesh(orbitGeom, orbitMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.rotation.y = Math.PI / 6;
    scene.add(orbitRing);

    // Satellite Spheres on Orbit Ring
    const satGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const sat1 = new THREE.Mesh(satGeom, satMat);
    const sat2 = new THREE.Mesh(satGeom, new THREE.MeshBasicMaterial({ color: 0xc084fc }));
    scene.add(sat1);
    scene.add(sat2);

    // Falling Cosmic Particles (Time Sand)
    const particleCount = 280;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Particles starting in top bulb or falling through neck
      particlePositions[i * 3] = (Math.random() - 0.5) * 0.8;
      particlePositions[i * 3 + 1] = Math.random() * 2.8 - 1.4; // Y between -1.4 and 1.4
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      particleVelocities[i] = 0.015 + Math.random() * 0.025;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd8b4fe,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    hourglassGroup.add(particles);

    // Ambient Starfield Particles
    const starCount = 350;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 16;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const starfield = new THREE.Points(starGeom, starMat);
    scene.add(starfield);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 0.8;
      mouseY = (y / rect.height) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      hourglassGroup.rotation.y = elapsedTime * 0.25 + targetX * 0.5;
      hourglassGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.08 - targetY * 0.5;

      // Orbit ring spin
      orbitRing.rotation.z = -elapsedTime * 0.35;
      orbitRing.rotation.y = Math.sin(elapsedTime * 0.2) * 0.2 + Math.PI / 6;

      // Position satellite points along orbit
      const angle1 = elapsedTime * 0.8;
      sat1.position.x = Math.cos(angle1) * 2.35;
      sat1.position.y = Math.sin(angle1) * 1.6;
      sat1.position.z = Math.sin(angle1) * 1.2;

      const angle2 = angle1 + Math.PI;
      sat2.position.x = Math.cos(angle2) * 2.35;
      sat2.position.y = Math.sin(angle2) * 1.6;
      sat2.position.z = Math.sin(angle2) * 1.2;

      // Animate falling sand particles
      const positions = particleGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] -= particleVelocities[i];
        
        // As particles fall through the neck (y ~ 0), constrict them
        const y = positions[i * 3 + 1];
        if (Math.abs(y) < 0.3) {
          positions[i * 3] *= 0.95;
          positions[i * 3 + 2] *= 0.95;
        }

        // Reset particle to top cone when it hits bottom cap
        if (positions[i * 3 + 1] < -1.8) {
          positions[i * 3 + 1] = 1.8;
          positions[i * 3] = (Math.random() - 0.5) * 1.1;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 1.1;
        }
      }
      particleGeom.attributes.position.needsUpdate = true;

      // Starfield subtle drift
      starfield.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onFallback]);

  if (hasError) {
    return null;
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="3D Interactive KAIROS Hourglass Motif"
    />
  );
};

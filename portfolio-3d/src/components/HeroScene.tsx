"/home/ubuntu/portfolio-3d/src/components/HeroScene.tsx"

```tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// Simple Laptop Model
function Laptop(props: any) {
  const group = useRef<THREE.Group>(null!);
  // Floating animation
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = props.position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} {...props}>
      {/* Screen */}
      <Box args={[0.8, 0.5, 0.05]} position={[0, 0.25, -0.05]}>
        <meshStandardMaterial color="#333333" />
      </Box>
      {/* Keyboard Base */}
      <Box args={[0.8, 0.05, 0.4]} position={[0, 0, 0.175]}>
        <meshStandardMaterial color="#555555" />
      </Box>
      <Text
        position={[0, 0.25, 0.001]} // Slightly in front of the screen
        rotation={[-Math.PI / 20,0,0]}
        fontSize={0.05}
        color="#00ff00" // Green terminal text
        anchorX="center"
        anchorY="middle"
        font="/fonts/AnonymousPro-Regular.ttf" // Assuming a monospace font is available or will be added
      >
        Welcome
      </Text>
    </group>
  );
}

// Simple Desk Model
function Desk(props: any) {
  return (
    <Box {...props}>
      <meshStandardMaterial color="#8B4513" /> {/* Brown color for wood */}
    </Box>
  );
}

export default function HeroScene() {
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#1a1a2e' }}> {/* Dark blue background */}
      <Canvas camera={{ position: [0, 1.5, 3], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff"/>

        <Desk args={[2, 0.1, 1]} position={[0, 0, 0]} /> {/* Desk: width, height, depth */}
        
        <Laptop position={[0, 0.6, 0]} rotation={[0, Math.PI / 12, 0]}/>

        <OrbitControls enableZoom={true} enablePan={true} />

        {/* Floor plane - optional for context */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </Canvas>
    </div>
  );
}
```

I will also need to add a font file for the "Welcome" text. I'll search for a suitable open-source monospace font and add it.
For now, I'll create a placeholder `fonts` directory and note that a font file like `AnonymousPro-Regular.ttf` should be placed there. The Text component from Drei will try to load it. If not found, it will use a default font.

Next, I'll create the directory for fonts.



// Placeholder for Project Navigation - to be integrated into the main scene or a dedicated section
function ProjectNavigation() {
  const projects = [
    { id: 1, title: "Full-stack Web App 1", category: "Full-stack Web Apps", position: [-1.5, 1, -2] },
    { id: 2, title: "AI / ML Project 1", category: "AI / ML Projects", position: [1.5, 1, -2] },
    // Add more projects as needed
  ];

  return (
    <>
      {projects.map((project) => (
        <Box key={project.id} args={[0.7, 0.4, 0.1]} position={project.position as [number, number, number]}>
          <meshStandardMaterial color="#007bff" />
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.05}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.6}
            textAlign="center"
            font="/fonts/AnonymousPro-Regular.ttf"
          >
            {project.title}
          </Text>
        </Box>
      ))}
    </>
  );
}

// Modify HeroScene to include ProjectNavigation (example integration)
// For a real implementation, this would likely be a separate route/view or a more complex scene graph.
export default function HeroScene() {
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#1a1a2e' }}> {/* Dark blue background */}
      <Canvas camera={{ position: [0, 1.5, 5], fov: 60 }}> {/* Adjusted camera for broader view */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff"/>

        <Desk args={[2, 0.1, 1]} position={[0, 0, 0]} /> {/* Desk: width, height, depth */}
        
        <Laptop position={[0, 0.6, 0]} rotation={[0, Math.PI / 12, 0]}/>

        {/* <ProjectNavigation /> */}
        {/* Commented out for now, will integrate properly based on navigation flow */}
        {/* For now, the hero scene is the focus. Project navigation will be a distinct view or interaction. */}

        <OrbitControls enableZoom={true} enablePan={true} />

        {/* Floor plane - optional for context */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </Canvas>
    </div>
  );
}




// Tech Animation Background Component
function TechAnimationBackground() {
  const group = useRef<THREE.Group>(null!);
  const techLogos = [
    { name: "React", color: "#61DAFB", position: [3, 1, -5] },
    { name: "Python", color: "#3776AB", position: [-3, 2, -6] },
    { name: "Node.js", color: "#339933", position: [0, 3, -7] },
    { name: "Next.js", color: "#000000", position: [2, -1, -4] },
    { name: "Three.js", color: "#000000", position: [-2, -1.5, -5] },
    // Add more logos as needed
  ];

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.05;
      group.current.children.forEach((child, index) => {
        // Individual bobbing animation for each logo
        child.position.y = techLogos[index].position[1] + Math.sin(clock.getElapsedTime() * 0.5 + index) * 0.2;
      });
    }
  });

  return (
    <group ref={group}>
      {techLogos.map((tech, index) => (
        <group key={index} position={tech.position as [number, number, number]}>
          <Text
            fontSize={0.3}
            color={tech.color}
            anchorX="center"
            anchorY="middle"
            font="/fonts/AnonymousPro-Regular.ttf"
          >
            {tech.name}
          </Text>
        </group>
      ))}
    </group>
  );
}

// Modify HeroScene to include TechAnimationBackground
export default function HeroScene() {
  return (
    <div style={{ height: "100vh", width: "100vw", background: "#1a1a2e" }}>
      <Canvas camera={{ position: [0, 1.5, 5], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />

        <Desk args={[2, 0.1, 1]} position={[0, 0, 0]} />
        <Laptop position={[0, 0.6, 0]} rotation={[0, Math.PI / 12, 0]} />
        
        <TechAnimationBackground />

        <OrbitControls enableZoom={true} enablePan={true} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </Canvas>
    </div>
  );
}


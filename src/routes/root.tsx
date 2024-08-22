import { Outlet } from 'react-router-dom';
import NavBar from '../components/nav-bar/nav-bar';
import { Canvas } from '@react-three/fiber';
import { Stars } from '../components/stars/stars';

export default function Root() {
    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -1,
                    pointerEvents: 'none',
                    background: '#000000',
                }}
            >
                <Stars />
            </Canvas>
            <NavBar />
            <Outlet />
        </>
    );
}

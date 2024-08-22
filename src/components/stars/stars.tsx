import { PointMaterial, Points } from "@react-three/drei";
import { PointsProps, useFrame } from "@react-three/fiber";
import { random } from "maath";
import { useRef, useState } from "react";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

export function Stars(props: GroupProps) {
    const ref = useRef<THREE.Points>(null);
    const [sphere] = useState(
        () =>
            random.inSphere(new Float32Array(7000), {
                radius: 2.5,
            }) as Float32Array
    );

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled={false}
                {...(props as PointsProps)}
            >
                <PointMaterial
                    transparent
                    color="#ffa0e0"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

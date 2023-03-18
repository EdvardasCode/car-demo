import { OrbitControls, useGLTF, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import {
  CuboidCollider,
  CylinderCollider,
  Debug,
  Physics,
  RigidBody,
} from "@react-three/rapier"
import { useRef } from "react"
import Lights from "./Lights.jsx"

export default function Experience() {
  const rightWheel = useRef()
  const body = useRef()
  const leftWheel = useRef()
  console.log(leftWheel.current)
  const [subscribeKeys, getKeys] = useKeyboardControls()

  const group = useRef()
  const { nodes, materials } = useGLTF(
    "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/police-car/model.gltf"
  )

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys()

    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 5 * delta
    const torqueStrength = 1 * delta

    if (forward) {
      impulse.z -= impulseStrength
      torque.x -= impulseStrength
    }
    if (backward) {
      impulse.z += impulseStrength
      torque.x += impulseStrength
    }
    if (leftward) {
      impulse.x -= impulseStrength
      torque.z += impulseStrength
    }
    if (rightward) {
      impulse.x += impulseStrength
      torque.z -= impulseStrength
    }
    // body.current.applyImpulse(impulse)
    body.current.applyTorqueImpulse(impulse)
  })

  const car = useGLTF("./car.gltf")
  return (
    <>
      <OrbitControls makeDefault />
      <Lights />

      <group ref={group} dispose={null}>
        <mesh
          geometry={nodes.Mesh_grill001.geometry}
          material={nodes.Mesh_grill001.material}
        />
        <mesh
          geometry={nodes.Mesh_grill001_1.geometry}
          material={nodes.Mesh_grill001_1.material}
        />
        <mesh
          geometry={nodes.Mesh_grill001_2.geometry}
          material={nodes.Mesh_grill001_2.material}
        />
        <mesh
          geometry={nodes.Mesh_grill001_3.geometry}
          material={nodes.Mesh_grill001_3.material}
        />
        <mesh
          geometry={nodes.Mesh_body008.geometry}
          material={materials.paintWhite}
        />
        <mesh
          geometry={nodes.Mesh_body008_1.geometry}
          material={nodes.Mesh_body008_1.material}
        />
        <mesh
          geometry={nodes.Mesh_body008_2.geometry}
          material={nodes.Mesh_body008_2.material}
        />
        <mesh
          geometry={nodes.Mesh_body008_3.geometry}
          material={materials.lightFront}
        />
        <mesh
          geometry={nodes.Mesh_body008_4.geometry}
          material={nodes.Mesh_body008_4.material}
        />
        <mesh
          geometry={nodes.Mesh_body008_5.geometry}
          material={materials.window}
        />
        <mesh
          geometry={nodes.Mesh_body008_6.geometry}
          material={materials.carTire}
        />
        <mesh
          geometry={nodes.Mesh_body008_7.geometry}
          material={nodes.Mesh_body008_7.material}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontRight010.geometry}
          material={nodes.Mesh_wheel_frontRight010.material}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontRight010_1.geometry}
          material={nodes.Mesh_wheel_frontRight010_1.material}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontRight011.geometry}
          material={nodes.Mesh_wheel_frontRight011.material}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontRight011_1.geometry}
          material={nodes.Mesh_wheel_frontRight011_1.material}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontRight012.geometry}
          material={nodes.Mesh_wheel_frontRight012.material}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontRight012_1.geometry}
          material={nodes.Mesh_wheel_frontRight012_1.material}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontRight009.geometry}
          material={nodes.Mesh_wheel_frontRight009.material}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontRight009_1.geometry}
          material={nodes.Mesh_wheel_frontRight009_1.material}
        />
      </group>

      <Physics>
        <Debug />
        <RigidBody friction={0} colliders={false} ref={body}>
          <CuboidCollider args={[0.3, 0.4, 1]} position={[0, 0.1, 0]} />
          <CylinderCollider
            ref={rightWheel}
            args={[0.1, 0.2]}
            position={[0.45, -0.32, 0.7]}
            rotation={[0, 0, Math.PI * 0.5]}
          />
          <CylinderCollider
            ref={leftWheel}
            args={[0.1, 0.2]}
            position={[-0.45, -0.32, 0.7]}
            rotation={[0, 0, Math.PI * 0.5]}
          />
          <CylinderCollider
            args={[0.1, 0.2]}
            position={[0.45, -0.32, -0.6]}
            rotation={[0, 0, Math.PI * 0.5]}
          />
          <CylinderCollider
            args={[0.1, 0.2]}
            position={[-0.45, -0.32, -0.6]}
            rotation={[0, 0, Math.PI * 0.5]}
          />
          <primitive object={car.scene} />
        </RigidBody>
        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.2} scale-x={10} scale-z={10}>
            <boxGeometry />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  )
}

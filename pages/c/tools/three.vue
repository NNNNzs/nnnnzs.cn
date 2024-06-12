<template>
  <div ref="bodyRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import * as THREE from "three"

const bodyRef = ref<HTMLElement>()

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.Renderer

onMounted(() => {
  scene = new THREE.Scene()
  const { width, height } = bodyRef.value!.getBoundingClientRect()
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)

  bodyRef.value!.appendChild(renderer.domElement)
  // 几何体
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  // 材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // 方块
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(1, 0, 0)
  ]
  // 线
  const geometryLine = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line(geometryLine, lineMaterial)
  scene.add(line)

  camera.position.z = 5

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  animate()
})
</script>

<style scoped></style>

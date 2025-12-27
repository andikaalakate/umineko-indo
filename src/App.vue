<template>
  <div @contextmenu.prevent class="select-none cursor-default">
    <RouterView />
  </div>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue'

function preventZoom(e) {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
  }
}

function preventContextMenu(e) {
  e.preventDefault()
}

function preventKeys(e) {
  const blockedKeys = [
    'F12',
    'I', // Ctrl+Shift+I
    'J', // Ctrl+Shift+J
    'C', // Ctrl+Shift+C
    'U'  // Ctrl+U
  ]

  if (
    e.ctrlKey && e.shiftKey && blockedKeys.includes(e.key)
    || (e.ctrlKey && blockedKeys.includes(e.key))
    || e.key === 'F12'
  ) {
    e.preventDefault()
  }
}

function preventDrag(e) {
  e.preventDefault()
}

function preventSelect(e) {
  e.preventDefault()
}

onMounted(() => {
  // zoom
  window.addEventListener('wheel', preventZoom, { passive: false })
  window.addEventListener('keydown', preventKeys)

  // klik kanan
  document.addEventListener('contextmenu', preventContextMenu)

  // drag & select
  document.addEventListener('dragstart', preventDrag)
  document.addEventListener('selectstart', preventSelect)
})

onUnmounted(() => {
  window.removeEventListener('wheel', preventZoom)
  window.removeEventListener('keydown', preventKeys)

  document.removeEventListener('contextmenu', preventContextMenu)
  document.removeEventListener('dragstart', preventDrag)
  document.removeEventListener('selectstart', preventSelect)
})

</script>

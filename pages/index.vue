<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 p-8 animate-fadeIn">
    <section class="text-center space-y-6 mb-16">
      <h2 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-500 animate-pulse">
        Dynamic Text Generator
      </h2>
      <p class="text-xl text-blue-600/70 max-w-2xl mx-auto">
        Transform your ideas into structured content effortlessly
      </p>
    </section>

    <main class="max-w-4xl mx-auto space-y-8">
      <!-- Input Fields Card -->
      <div class="backdrop-blur-sm bg-white/60 rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-blue-100/50 transition-all duration-300">
        <div class="space-y-6">
          <!-- Dynamic Fields -->
          <div v-for="field in fields" :key="field.id" 
               class="space-y-2 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-all duration-300 group">
            <div class="flex justify-between items-center">
              <label :for="'field-' + field.id" class="text-sm font-medium text-blue-700">
                {{ field.label }}
              </label>
              <button @click="removeField(field.id)" 
                      class="opacity-0 group-hover:opacity-100 text-sm px-4 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-300"
                      v-if="fields.length > 0">
                Remove
              </button>
            </div>
            <input
              :id="'field-' + field.id"
              v-model="field.value"
              type="text"
              :placeholder="field.placeholder"
              class="w-full px-4 py-3 rounded-lg bg-white/80 border border-blue-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
            />
          </div>

          <!-- Add Field Button -->
          <button @click="showAddFieldModal = true" 
                  class="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
            <span class="text-xl">+</span> Add New Field
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4">
        <button @click="convertToTxt" 
                class="flex-1 px-6 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          Generate Text File
        </button>
      </div>

      <!-- Preview Section -->
      <div v-if="previewText" 
           class="backdrop-blur-sm bg-white/60 rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-blue-100/50 transition-all duration-300 space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-blue-800">Preview</h3>
          <div class="flex gap-4 items-center">
            <button
              @click="toggleChase"
              class="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              {{ isChasing ? 'Stop' : 'Chase Me' }}
            </button>
          </div>
        </div>
        <div class="bg-blue-50/50 rounded-xl p-6">
          <pre class="text-blue-800 whitespace-pre-wrap">{{ previewText }}</pre>
        </div>
      </div>

      <!-- Floating Download Button -->
      <a
        v-if="previewText && buttonVisible"
        ref="downloadButton"
        :href="downloadLink"
        download="converted.txt"
        @click="handleDownload"
        class="fixed px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm shadow-md z-50 cursor-pointer select-none"
        :style="buttonStyle"
      >
        Download
      </a>

      <!-- Add Field Modal -->
      <div v-if="showAddFieldModal" 
           class="fixed inset-0 bg-blue-900/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
        <div class="bg-white rounded-2xl p-8 shadow-2xl border border-blue-100 w-full max-w-md">
          <h3 class="text-xl font-medium text-blue-800 mb-6">Add New Field</h3>
          <input
            v-model="newFieldLabel"
            type="text"
            placeholder="Enter field label"
            class="w-full px-4 py-3 rounded-lg bg-blue-50/50 border border-blue-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 mb-6"
          />
          <div class="space-y-3">
            <button @click="addField(newFieldLabel); showAddFieldModal = false; newFieldLabel = ''" 
                    class="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg">
              Add Field
            </button>
            <button @click="showAddFieldModal = false" 
                    class="w-full px-4 py-3 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useDynamicFields } from '~/composables/useDynamicFields'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { fields, addField, removeField } = useDynamicFields()
const previewText = ref('')
const downloadLink = ref(null)
const showAddFieldModal = ref(false)
const newFieldLabel = ref('')
const isChasing = ref(false)
const downloadButton = ref(null)
const mousePos = ref({ x: 0, y: 0 })
const buttonPos = ref({ x: 100, y: 100 })
const buttonVisible = ref(true)
let animationFrameId = null

// Track mouse position
const handleMouseMove = (e) => {
  mousePos.value = { x: e.clientX, y: e.clientY }
  if (isChasing.value) {
    updateButtonPosition()
  }
}

const buttonStyle = computed(() => ({
  position: 'fixed',
  left: `${buttonPos.value.x}px`,
  top: `${buttonPos.value.y}px`,
  transform: 'translate(-50%, -50%)',
  transition: isChasing.value ? 'none' : 'all 0.3s ease'
}))

const toggleChase = () => {
  isChasing.value = !isChasing.value
  if (isChasing.value) {
    startChasing()
  } else {
    stopChasing()
  }
}

const startChasing = () => {
  // Initialize button position
  buttonPos.value = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
  updateButtonPosition()
}

const stopChasing = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  // Reset button position
  buttonPos.value = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
}

const updateButtonPosition = () => {
  if (!isChasing.value) return

  const dx = mousePos.value.x - buttonPos.value.x
  const dy = mousePos.value.y - buttonPos.value.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  if (distance < 200) { // Detection radius
    const angle = Math.atan2(dy, dx)
    const speed = Math.min(20, 300 / distance) // Faster when cursor is closer
    
    // Calculate new position
    let newX = buttonPos.value.x - Math.cos(angle) * speed
    let newY = buttonPos.value.y - Math.sin(angle) * speed
    
    // Get button dimensions
    const buttonWidth = downloadButton.value?.offsetWidth || 0
    const buttonHeight = downloadButton.value?.offsetHeight || 0
    
    // Add padding from edges
    const padding = 10
    
    // Boundary checking with padding
    newX = Math.max(buttonWidth / 2 + padding, Math.min(window.innerWidth - buttonWidth / 2 - padding, newX))
    newY = Math.max(buttonHeight / 2 + padding, Math.min(window.innerHeight - buttonHeight / 2 - padding, newY))
    
    buttonPos.value = { x: newX, y: newY }
  }
  
  animationFrameId = requestAnimationFrame(updateButtonPosition)
}

const handleDownload = (event) => {
  if (isChasing.value) {
    event.preventDefault()
  }
}

const convertToTxt = () => {
  const content = fields.value
    .map(field => `${field.label}:\n${field.value}\n`)
    .join('\n')
  previewText.value = content
  const blob = new Blob([content], { type: 'text/plain' })
  downloadLink.value = URL.createObjectURL(blob)
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>
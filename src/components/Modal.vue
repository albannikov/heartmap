<script setup>
  import { ref } from 'vue';

  // Components
  import Button from './Button.vue';

  // Emits
  const emit = defineEmits(['close']);

  // Props
  const props = defineProps({
    title: {
      type: String,
      default: 'This is the default tile!',
      reuired: false,
    }
  });

  // Data
  const coords = ref([
    62.134265, 
    77.458448
  ]);

  // Methods
  /**
   * 
   */
  const onClose = () => {
    emit('close');
  }

  /**
   * 
   */
  const onSave = () => {
    console.log(`Сохраняю координаты ${coords.value[0]} ${coords.value[1]}`);
  }

  /**
   * 
   */
  const onMapClick = (e) => {
    if (e.originalEvent) {
      coords.value = e.get('coords');
    }
  };
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          {{ title }}
          <slot name="header" />

          <button
            type="button"
            class="btn-close"
            @click="onClose"
            aria-label="Close modal"
          >
            x
          </button>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <yandex-map 
              :coords="coords" 
              :settings="settings" 
              :zoom="14"
              @click="(e) => onMapClick(e)"
            >
              <ymap-marker 
                marker-id="123" 
                :coords="coords"
                hint-content="some hint"
              ></ymap-marker>
            </yandex-map>

            <div>
              <input v-model="coords[0]">
              <input v-model="coords[1]">
            </div>
            <div>
              <Button @click="onSave">
                Сохранить точку
              </Button>
            </div>
           
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            I'm the default footer!

            <button
              type="button"
              class="btn-green"
              @click="onClose"
              aria-label="Close modal"
            >
              Close me!
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style>
  .ymap-container {
    height: 600px;
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
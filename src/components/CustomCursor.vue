<template>
  <div v-if="!isMobile" class="custom-cursor">
    <div 
      ref="cursorDot" 
      class="cursor-dot"
      :class="{ 'cursor-hover': isHovering, 'cursor-click': isClicking }"
    ></div>
    <div 
      ref="cursorRing" 
      class="cursor-ring"
      :class="{ 'cursor-hover': isHovering, 'cursor-click': isClicking }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'CustomCursor',
  data() {
    return {
      isMobile: false,
      isHovering: false,
      isClicking: false,
      mouseX: 0,
      mouseY: 0,
      dotX: 0,
      dotY: 0,
      ringX: 0,
      ringY: 0,
      animationFrame: null
    }
  },
  mounted() {
    // Detect mobile/touch devices
    this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!this.isMobile) {
      this.initCursor();
    }
  },
  beforeUnmount() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (!this.isMobile) {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mousedown', this.handleMouseDown);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  },
  methods: {
    initCursor() {
      // Hide default cursor
      document.body.style.cursor = 'none';
      
      // Add event listeners
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mouseup', this.handleMouseUp);
      
      // Detect interactive elements
      this.setupInteractiveElements();
      
      // Start animation loop
      this.animate();
    },
    
    handleMouseMove(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      // Update dot position instantly
      this.dotX = this.mouseX;
      this.dotY = this.mouseY;
      
      // Check if hovering over interactive element
      const target = e.target;
      this.checkHover(target);
    },
    
    handleMouseDown() {
      this.isClicking = true;
      setTimeout(() => {
        this.isClicking = false;
      }, 150);
    },
    
    handleMouseUp() {
      this.isClicking = false;
    },
    
    checkHover(target) {
      const interactiveSelectors = [
        'a', 'button', 'input', 'textarea', 'select',
        '[role="button"]', '.cursor-pointer', '.item-card',
        '.contact-card', '.nav-link', '.nav-link-mobile',
        'router-link', '.item-tech', '.cert-card'
      ];
      
      let isInteractive = false;
      
      // Check if target or parent is interactive
      let element = target;
      for (let i = 0; i < 3; i++) {
        if (!element) break;
        
        // Check classes
        if (element.classList) {
          interactiveSelectors.forEach(selector => {
            if (selector.startsWith('.')) {
              const className = selector.slice(1);
              if (element.classList.contains(className)) {
                isInteractive = true;
              }
            } else if (element.tagName && element.tagName.toLowerCase() === selector.toLowerCase()) {
              isInteractive = true;
            }
          });
          
          // Check for cursor pointer style
          const computedStyle = window.getComputedStyle(element);
          if (computedStyle.cursor === 'pointer') {
            isInteractive = true;
          }
        }
        
        if (isInteractive) break;
        element = element.parentElement;
      }
      
      this.isHovering = isInteractive;
    },
    
    setupInteractiveElements() {
      // Add cursor-pointer class to all interactive elements if needed
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      interactiveElements.forEach(el => {
        if (!el.classList.contains('cursor-pointer')) {
          el.classList.add('cursor-pointer');
        }
      });
    },
    
    animate() {
      // Smooth ring animation with lag
      const ringLag = this.isHovering ? 0.25 : 0.15;
      const dx = this.mouseX - this.ringX;
      const dy = this.mouseY - this.ringY;
      
      this.ringX += dx * ringLag;
      this.ringY += dy * ringLag;
      
      // Apply magnetic attraction when hovering
      if (this.isHovering) {
        const magneticStrength = 0.4;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
          const attraction = Math.min(distance * magneticStrength, 20);
          this.ringX += (dx / distance) * attraction;
          this.ringY += (dy / distance) * attraction;
        }
      }
      
      // Update positions using transform for better performance
      if (this.$refs.cursorDot) {
        this.$refs.cursorDot.style.transform = `translate(${this.dotX}px, ${this.dotY}px) translate(-50%, -50%)`;
      }
      
      if (this.$refs.cursorRing) {
        this.$refs.cursorRing.style.transform = `translate(${this.ringX}px, ${this.ringY}px) translate(-50%, -50%)`;
      }
      
      this.animationFrame = requestAnimationFrame(this.animate);
    }
  }
}
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.cursor-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent);
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease, transform 0.1s ease-out;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.6), 0 0 20px rgba(var(--accent-rgb), 0.3);
  will-change: transform;
}

.cursor-ring {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
              border-width 0.3s ease,
              opacity 0.3s ease;
  box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.4), 
              inset 0 0 10px rgba(var(--accent-rgb), 0.1);
  backdrop-filter: blur(3px);
  will-change: transform, width, height;
}

.cursor-dot.cursor-hover {
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%) scale(1.5);
  box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.9), 0 0 30px rgba(var(--accent-rgb), 0.5);
}

.cursor-ring.cursor-hover {
  width: 60px;
  height: 60px;
  border-width: 3px;
  box-shadow: 0 0 30px rgba(var(--accent-rgb), 0.6), 
              inset 0 0 15px rgba(var(--accent-rgb), 0.15);
}

.cursor-dot.cursor-click {
  transform: translate(-50%, -50%) scale(0.7);
  transition: transform 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.cursor-ring.cursor-click {
  width: 35px;
  height: 35px;
  border-width: 2px;
  transition: width 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.55), 
              height 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.55), 
              border-width 0.1s ease;
}

/* Ensure cursor is visible on both themes */
[data-theme="mono"] .cursor-dot {
  background-color: var(--accent);
  box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.7), 0 0 25px rgba(var(--accent-rgb), 0.4);
}

[data-theme="mono"] .cursor-ring {
  border-color: var(--accent);
  box-shadow: 0 0 25px rgba(var(--accent-rgb), 0.5), 
              inset 0 0 12px rgba(var(--accent-rgb), 0.15);
}

[data-theme="mono"] .cursor-dot.cursor-hover {
  box-shadow: 0 0 25px rgba(var(--accent-rgb), 1), 0 0 35px rgba(var(--accent-rgb), 0.6);
}

[data-theme="mono"] .cursor-ring.cursor-hover {
  box-shadow: 0 0 35px rgba(var(--accent-rgb), 0.7), 
              inset 0 0 18px rgba(var(--accent-rgb), 0.2);
}
</style>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
});
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-lg font-normal transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
      {
        'bg-primary text-white hover:bg-primary-dark shadow-sm': variant === 'primary',
        'bg-secondary text-primary hover:bg-opacity-90 shadow-sm': variant === 'secondary',
        'border-2 border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline',
        'text-primary hover:bg-primary/10': variant === 'ghost',
      },
      {
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-6 py-2.5 text-base': size === 'md',
        'px-8 py-3.5 text-lg': size === 'lg',
      },
    ]"
  >
    <slot />
  </button>
</template>

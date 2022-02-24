<template>
  <svg
    id="my-icon"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 290 290"
  >
    <circle
      class="circle"
      cx="145"
      cy="145"
      r="124.67"
      style="
        fill: #f7ac00;
        stroke: #edf1f5;
        stroke-miterlimit: 10;
        stroke-width: 20px;
      "
    />
    <polyline
      class="checkmark"
      points="88.75 148.26 124.09 183.6 201.37 106.32"
      style="
        fill: none;
        stroke: #f7ac00;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 25px;
      "
    />
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box',
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    iconColor: {
      type: String,
      default: '',
    },
  },
}
</script>
<style scoped>
.circle {
  animation: circle-animation 0.5s ease-out forwards;
  animation-delay: 0.15s;
}

.checkmark {
  animation: checkmark-animation 0.8s ease-out forwards;
  animation-delay: 0.25s;
}

#my-icon .circle {
  opacity: 0;
  transform: scale(0.1);
  transform-origin: center;
}

#my-icon .checkmark {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transform-origin: center;
  stroke: #edf1f5;
}

@keyframes circle-animation {
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes checkmark-animation {
  40% {
    transform: scale(1);
  }
  55% {
    stroke: #cfd8dc;
    transform: scale(1.5);
  }
  70% {
    transform: scale(1);
  }
  100% {
    stroke-dashoffset: 0;
    transform: scale(1);
    stroke: #ffffff;
  }
}
/* https: ; //rafaltomal.com/svg-guide/ */
/* https://css-tricks.com/svg-line-animation-works/ */
</style>

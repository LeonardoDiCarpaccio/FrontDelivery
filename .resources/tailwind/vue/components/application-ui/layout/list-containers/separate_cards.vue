<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <ul class="space-y-3">
    <li v-for="item in items" :key="item.id" class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
      <!-- Your content -->
    </li>
  </ul>
</template>

<script>
const items = [
  { id: 1 },
  // More items...
]

export default {
  setup() {
    return {
      items,
    }
  },
}
</script>
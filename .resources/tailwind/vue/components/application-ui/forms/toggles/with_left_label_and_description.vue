<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <SwitchLabel as="span" class="flex-grow flex flex-col" passive>
      <span class="text-sm font-medium text-gray-900">Available to hire</span>
      <span class="text-sm text-gray-500">Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.</span>
    </SwitchLabel>
    <Switch v-model="enabled" :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
      <span class="sr-only">Use setting</span>
      <span aria-hidden="true" :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
    </Switch>
  </SwitchGroup>
</template>

<script>
import { ref } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

export default {
  components: {
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  setup() {
    const enabled = ref(false)

    return {
      enabled,
    }
  },
}
</script>
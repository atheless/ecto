<template>
  <div>
    <!-- Top Navigation -->
    <header class="bg-gray shadow sticky top-0" style="z-index: 1000">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
      >
        <h1 class="text-lg leading-6 font-semibold text-green py-6 transition duration-40 ease-in-out hover:text-white hover:shadow-md">Ecto</h1>
        <div class="flex items-center">
          <IconField iconPosition="left">
            <InputIcon class="pi pi-search"> </InputIcon>
            <InputText v-model="value1" placeholder="Search in database" />
          </IconField>
        </div>
      </div>
    </header>

    <!-- Main content area  -->
    <div class="bg-gray flex flex-col md:flex-row min-h-screen">
      <!-- Sidebar -->
      <nav>
        <!-- Single Menu Component -->
        <Menu :model="routes" class="w-full md:w-15rem">
          <!-- Menu Start Template -->
          <template #start>
            <span class="inline-flex align-items-center gap-1 px-2 py-2">
              <svg
                width="35"
                height="40"
                viewBox="0 0 35 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="h-2rem"
              >
                <path d="..." fill="var(--primary-color)" />
                <path d="..." fill="var(--text-color)" />
              </svg>
              <span class="font-medium text-xl font-semibold"
                >Cap<span class="text-green">ture</span></span
              >
            </span>
          </template>

          <!-- Template for Submenu Headers -->
          <template #submenuheader="{ item }">
            <span class="text-primary font-bold">{{ item.label }}</span>
          </template>

          <!-- Template for Each Menu Item -->
          <template #item="{ item, props }">
            <NuxtLink :to="item.path">
              <a v-ripple class="flex align-items-center" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                <span
                  v-if="item.shortcut"
                  class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
                  >{{ item.shortcut }}</span
                >
              </a>
            </NuxtLink>
          </template>

          <!-- Menu End Template -->
          <template #end>
            <button
              v-ripple
              class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 hover:surface-200 border-noround"
            ></button>
          </template>
        </Menu>
      </nav>

      <!-- Content Area -->
      <div class="bg-gray flex-1 p-10 text-2xl font-bold">
        <slot />
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white shadow p-4 text-center bottom-0 w-full">
      Footer
    </footer>
  </div>
</template>

<script setup>
const routes = ref([
  { path: "/", label: "Record screen", icon: "pi pi-window-maximize" },
  { path: "/audio", label: "Record audio", icon: "pi pi-microphone" },
  { path: "/saved", label: "Saved", icon: "pi pi-history" },
  { path: "/bookmarks", label: "Bookmarks", icon: "pi pi-star" },
]);
</script>

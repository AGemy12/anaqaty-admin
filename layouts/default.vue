<template>
  <v-app>
    <div>
      <!-- <Header /> -->
      <Sidebar />
      <div
        class="absolute top-0 w-full md:w-[calc(100%-300px)] md:right-[300px] m-[2rem]"
      >
        <slot />
      </div>
    </div>
  </v-app>
</template>

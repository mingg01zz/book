<template>
  <div class='card h-100'>
    <img :src='book.image' class='card-img-top'>
    <div class='card-body d-flex flex-column'>
      <span class='badge bg-secondary align-self-start mb-2'>{{ book.category }}</span>
      <h5>{{ book.title }}</h5>
      <p>{{ book.author }}</p>
      <router-link
        class='btn btn-primary mt-auto'
        :to='`/detail/${book.id}`'
        @click='emit("book-clicked", book.id)'
      >
        상세보기
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ book: Object })
const emit = defineEmits(['book-clicked'])
</script>
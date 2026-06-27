<template>
  <div class='container mt-4'>
    <div class='d-flex justify-content-between align-items-center mb-3'>
      <h1 class='mb-0'>📚 도서 추천 앱</h1>
      <router-link to='/favorite' class='btn btn-warning'>즐겨찾기</router-link>
    </div>

    <input v-model='keyword' class='form-control my-3' placeholder='도서 검색'>

    <div class='mb-4'>
      <h4>✨ 사람들이 많이 클릭한 책 추천</h4>
      <div class='row g-3'>
        <div class='col-md-4' v-for='book in featuredBooks' :key='book.id'>
          <div class='card border-0 shadow-sm h-100'>
            <div class='card-body'>
              <span class='badge bg-primary mb-2'>{{ book.category }}</span>
              <h5 class='card-title'>{{ book.title }}</h5>
              <p class='card-text text-muted small'>{{ book.author }}</p>
              <p class='card-text'>{{ book.description }}</p>
              <p class='card-text text-primary fw-semibold mb-0'>클릭 수: {{ book.clickCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class='mb-4'>
      <div class='d-flex flex-wrap gap-2'>
        <button
          v-for='cat in categories'
          :key='cat'
          type='button'
          class='btn rounded-pill'
          :class='selectedCategory === cat ? "btn-primary" : "btn-outline-primary"'
          @click='selectedCategory = cat'
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class='row'>
      <div class='col-md-3 mb-3' v-for='book in filtered' :key='book.id'>
        <BookCard :book='book' @book-clicked='handleBookClick' />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BookCard from '../components/BookCard.vue'
import { getBooks } from '../api/bookApi'

const keyword = ref('')
const selectedCategory = ref('전체')
const books = ref(getBooks())
const clickCounts = ref(loadGlobalClickCounts())

const categories = computed(() => ['전체', ...new Set(books.value.map((book) => book.category))])

const featuredBooks = computed(() => {
  return [...books.value]
    .map((book) => ({ ...book, clickCount: clickCounts.value[book.id] || 0 }))
    .sort((a, b) => b.clickCount - a.clickCount || a.id - b.id)
    .slice(0, 3)
})

const filtered = computed(() => {
  return books.value.filter((book) => {
    const matchesKeyword = book.title.toLowerCase().includes(keyword.value.toLowerCase()) ||
      book.author.toLowerCase().includes(keyword.value.toLowerCase())
    const matchesCategory = selectedCategory.value === '전체' || book.category === selectedCategory.value
    return matchesKeyword && matchesCategory
  })
})

function loadGlobalClickCounts() {
  if (typeof window === 'undefined') return {}

  const saved = window.localStorage.getItem('global-book-click-counts')
  return saved ? JSON.parse(saved) : {}
}

function handleBookClick(bookId) {
  const nextCounts = { ...clickCounts.value, [bookId]: (clickCounts.value[bookId] || 0) + 1 }
  clickCounts.value = nextCounts

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('global-book-click-counts', JSON.stringify(nextCounts))
  }
}
</script>
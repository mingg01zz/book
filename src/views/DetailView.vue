<template>
  <div class='container mt-4'>
    <div class='row g-4 align-items-start'>
      <div class='col-md-4'>
        <div class='card shadow-sm'>
          <img :src='book.image' class='card-img-top' alt='book cover'>
        </div>
      </div>

      <div class='col-md-8'>
        <div class='card shadow-sm h-100'>
          <div class='card-body'>
            <span class='badge bg-primary mb-3'>{{ book.category }}</span>
            <h2 class='card-title mb-3'>{{ book.title }}</h2>
            <p class='text-muted mb-2'><strong>작가</strong> {{ book.author }}</p>
            <p class='card-text mb-4'>{{ book.description }}</p>

            <div class='border rounded p-3 bg-light mb-4'>
              <h5 class='mb-2'>📖 이 책에 대해</h5>
              <p class='mb-0'>{{ getBookSummary(book) }}</p>
            </div>

            <div class='d-flex flex-wrap gap-2'>
              <button class='btn btn-success' @click='add'>즐겨찾기 추가</button>
              <router-link to='/' class='btn btn-outline-secondary'>메인 화면으로</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getBookById } from '../api/bookApi'
import { useFavoriteStore } from '../stores/favorite'

const route = useRoute()
const book = getBookById(route.params.id)
const store = useFavoriteStore()

const add = () => {
  store.addBook(book)
  alert('즐겨찾기에 추가되었습니다.')
}

const getBookSummary = (selectedBook) => {
  const title = selectedBook?.title || ''
  const description = selectedBook?.description || ''
  const category = selectedBook?.category || ''

  if (!title) return '이 책에 대한 소개를 준비 중입니다.'

  if (category === '과학책') {
    return `${title}는 ${description}로, 난해해 보일 수 있는 과학적 주제를 쉽고 흥미롭게 풀어내는 책입니다.`
  }

  if (category === '에세이') {
    return `${title}는 ${description}로, 삶과 생각을 가볍게 돌아보게 만드는 따뜻한 에세리입니다.`
  }

  if (category === '한국책') {
    return `${title}는 ${description}로, 한국적인 정서와 삶의 분위기를 자연스럽게 느끼게 해주는 작품입니다.`
  }

  return `${title}는 ${description}로, 독자에게 깊은 몰입감과 여운을 남기는 작품입니다.`
}
</script>
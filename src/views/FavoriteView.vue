<template>
  <div class='container mt-4'>
    <div class='d-flex justify-content-between align-items-center mb-4'>
      <h1 class='mb-0'>⭐ 나의 즐겨찾기</h1>
      <router-link to='/' class='btn btn-outline-secondary'>메인 화면으로</router-link>
    </div>

    <div v-if='store.favorites.length === 0' class='alert alert-info text-center py-5'>
      <h5>📚 아직 저장된 책이 없습니다.</h5>
      <p class='mb-0'>중을 떨운 책들을 나중에 다시 읽기 좋은 즉기로 주목되는 도서를 보랑게 데딩쉰 준비를 하실 줄 도시고, 즈기는 스른 문데다!</p>
      <router-link to='/' class='btn btn-primary mt-3'>책 둘러보기</router-link>
    </div>

    <div v-else class='row'>
      <div class='col-md-4 mb-4' v-for='book in store.favorites' :key='book.id'>
        <div class='card shadow-sm h-100'>
          <img :src='book.image' class='card-img-top' alt='book cover'>
          <div class='card-body d-flex flex-column'>
            <span class='badge bg-secondary align-self-start mb-2'>{{ book.category }}</span>
            <h5 class='card-title'>{{ book.title }}</h5>
            <p class='card-text text-muted small'>{{ book.author }}</p>
            <p class='card-text small mb-3'>{{ book.description }}</p>

            <div class='d-flex flex-column gap-2 mt-auto'>
              <router-link class='btn btn-primary btn-sm' :to='`/detail/${book.id}`'>상세 보기</router-link>
              <button class='btn btn-outline-danger btn-sm' @click='store.removeBook(book.id)'>즐겨찾기에서 제거</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFavoriteStore } from '../stores/favorite'
const store = useFavoriteStore()
</script>
<template><div class='container mt-4'>
<h2>{{book.title}}</h2>
<img :src='book.image'>
<p>작가: {{book.author}}</p>
<p>{{book.description}}</p>
<button class='btn btn-success' @click='add'>즐겨찾기 추가</button>
</div></template>
<script setup>
import {useRoute} from 'vue-router'
import {getBookById} from '../api/bookApi'
import {useFavoriteStore} from '../stores/favorite'
const book=getBookById(useRoute().params.id)
const store=useFavoriteStore()
const add=()=>{store.addBook(book);alert('추가 완료')}
</script>
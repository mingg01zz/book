<template><div class='container mt-4'>
<h1>⭐ 즐겨찾기</h1>
<div v-for='book in store.favorites' :key='book.id' class='card p-3 mb-2'>
<b>{{book.title}}</b>
<button class='btn btn-danger mt-2' @click='store.removeBook(book.id)'>삭제</button>
</div></div></template>
<script setup>
import {useFavoriteStore} from '../stores/favorite'
const store=useFavoriteStore()
</script>
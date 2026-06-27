import { defineStore } from 'pinia'
export const useFavoriteStore=defineStore('favorite',{
state:()=>({favorites:[]}),
actions:{
addBook(book){if(!this.favorites.find(v=>v.id===book.id))this.favorites.push(book)},
removeBook(id){this.favorites=this.favorites.filter(v=>v.id!==id)}
}})

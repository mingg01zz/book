import {createRouter,createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import FavoriteView from '../views/FavoriteView.vue'
export default createRouter({
history:createWebHistory(),
routes:[
{path:'/',component:HomeView},
{path:'/detail/:id',component:DetailView},
{path:'/favorite',component:FavoriteView}
]})
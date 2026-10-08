import TicketCreateView from '../views/TicketCreateView.vue'
import TicketDetailView from '../views/TicketDetailView.vue'
import DashboardView from '../views/DashboardView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'dashboard', component: DashboardView},
        {path: '/tickets/new', name: 'new-ticket', component: TicketCreateView},
        {path: '/tickets/:id', name: 'ticket-details', component: TicketDetailView},
    ],
})

export default router
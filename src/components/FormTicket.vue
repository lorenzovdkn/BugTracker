<script setup lang="ts">
import type { TicketDto, TicketFormData, TicketFormErrors } from '../types/api.types.ts';
import { ref, watch } from 'vue';

const props = defineProps<{
    ticket?: TicketDto;
    submitting?: boolean;
    apiErrors?: TicketFormErrors;
}>()

const emit = defineEmits<{ submit: [data: TicketFormData] }>();
const formData = ref<TicketFormData>({
    title: props.ticket?.title ?? '',
    description: props.ticket?.description ?? '',
    status: props.ticket?.status ?? 'open',
    priority: props.ticket?.priority ?? 'medium',
});

const errors = ref<TicketFormErrors>({});

watch(() => props.apiErrors, (apiErrors) => {
    errors.value = apiErrors ?? {};
});

const validate = () => {
    const title = formData.value.title.trim();
    const description = formData.value.description.trim();

    errors.value = {};

    if (title.length < 3) {
        errors.value.title = `Le titre doit contenir au moins 3 caractères (${title.length} actuellement).`;
    } else if (title.length > 255) {
        errors.value.title = `Le titre ne doit pas dépasser 255 caractères (${title.length} actuellement).`;
    }

    if (description.length < 15) {
        errors.value.description = `La description doit contenir au moins 15 caractères (${description.length} actuellement).`;
    }

    return !errors.value.title && !errors.value.description;
};

const onSubmit = () => {
    if (!validate()) return;

    emit('submit', {
        title: formData.value.title.trim(),
        description: formData.value.description.trim(),
        status: formData.value.status,
        priority: formData.value.priority,
    });
};
</script>

<template>
    <div class="card col-md-6 mx-auto">
        <div class="card-body">
            <form novalidate @submit.prevent="onSubmit">
                <div class="mb-3">
                    <label for="title" class="form-label">Title:</label>
                    <input id="title" v-model.trim="formData.title" class="form-control" :class="{ 'is-invalid': errors.title }" :disabled="!!props.ticket" />
                    <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
                    <div v-else class="form-text">Entre 3 et 255 caractères.</div>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description:</label>
                    <textarea id="description" v-model.trim="formData.description" class="form-control" :class="{ 'is-invalid': errors.description }" rows="4" :disabled="!!props.ticket"></textarea>
                    <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
                    <div v-else class="form-text">15 caractères minimum.</div>
                </div>
                <div v-if="props.ticket" class="mb-3">
                    <label for="status" class="form-label">Status:</label>
                    <select id="status" v-model="formData.status" class="form-select" :class="{ 'is-invalid': errors.status }">
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <div v-if="errors.status" class="invalid-feedback">{{ errors.status }}</div>
                </div>
                <div class="mb-3">
                    <label for="priority" class="form-label">Priority:</label>
                    <select id="priority" v-model="formData.priority" class="form-select" :class="{ 'is-invalid': errors.priority }">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <div v-if="errors.priority" class="invalid-feedback">{{ errors.priority }}</div>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="props.submitting">
                    {{ props.submitting ? 'Submitting...' : 'Submit' }}
                </button>
            </form>
        </div>
    </div>
</template>
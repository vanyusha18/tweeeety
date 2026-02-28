// frontend/js/api.js
const API_URL = 'http://localhost:5000/api';

const api = {
    // Utility for making authenticated requests
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers
        };

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (err) {
            console.error('API Error:', err);
            throw err;
        }
    },

    // Auth endpoints
    login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },

    register(name, email, password) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
    },

    // Event endpoints
    getEvents(search = '', category = '') {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (category) queryParams.append('category', category);

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.request(`/events${queryString}`);
    },

    getEventById(id) {
        return this.request(`/events/${id}`);
    },

    getUserEvents() {
        return this.request('/events/user/me');
    },

    createEvent(eventData) {
        return this.request('/events', {
            method: 'POST',
            body: JSON.stringify(eventData)
        });
    },

    deleteEvent(id) {
        return this.request(`/events/${id}`, {
            method: 'DELETE'
        });
    },

    rsvpEvent(id) {
        return this.request(`/events/${id}/rsvp`, {
            method: 'POST'
        });
    }
};

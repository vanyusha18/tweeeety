// frontend/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.getElementById('eventsContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    if (!eventsContainer) return;

    let debounceTimer;

    // Helper to format date
    const formatDate = (dateString) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // WOW Feature logic: Get smart badges
    const getBadges = (event) => {
        let badgesHtml = '';

        // Happening soon badge (within 48 hours)
        const eventDate = new Date(event.date);
        const now = new Date();
        const hoursDifference = (eventDate - now) / (1000 * 60 * 60);

        if (hoursDifference > 0 && hoursDifference <= 48) {
            badgesHtml += `<span class="badge badge-soon">🔥 Happening Soon</span>`;
        }

        // Trending badge (High RSVPs, e.g. > 10)
        if (event.rsvpCount >= 10) {
            badgesHtml += `<span class="badge badge-trending">⭐ Trending</span>`;
        }

        return badgesHtml;
    };

    // Render events to DOM
    const renderEvents = (events) => {
        if (events.length === 0) {
            eventsContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No events found. Be the first to create one!</h3>
                </div>
            `;
            return;
        }

        const fallbackImages = {
            'Tech': 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=500&q=80',
            'Arts': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&q=80',
            'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607fa8211?w=500&q=80',
            'Education': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80',
            'Other': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80'
        };

        eventsContainer.innerHTML = events.map(event => {
            const imgUrl = event.coverImageUrl || fallbackImages[event.category] || fallbackImages['Other'];

            return `
                <div class="event-card glass-card">
                    <div style="position: relative;">
                        <img src="${imgUrl}" alt="${event.name}" class="event-card-img">
                        <div class="badges-container">
                            ${getBadges(event)}
                            <span class="badge badge-category">${event.category}</span>
                        </div>
                    </div>
                    <div class="event-card-content">
                        <h3 class="event-card-title">${event.name}</h3>
                        <div class="event-card-meta">
                            <span><i>⌛</i>${formatDate(event.date)}</span>
                            <span><i>📍</i>${event.location}</span>
                            <span><i>👤</i>By ${event.organizerName}</span>
                        </div>
                        <p>${event.description.length > 100 ? event.description.substring(0, 100) + '...' : event.description}</p>
                        
                        <div class="event-card-footer">
                            <span style="font-weight:600; color:var(--text-light); font-size: 0.9rem;">
                                ${event.rsvpCount} Attending
                            </span>
                            <a href="event.html?id=${event._id}" class="btn btn-outline" style="padding: 6px 16px; font-size: 0.9rem;">View Details</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    };

    // Load Events from API
    const loadEvents = async () => {
        try {
            const search = searchInput ? searchInput.value : '';
            const category = categoryFilter ? categoryFilter.value : '';

            const events = await api.getEvents(search, category);
            renderEvents(events);
        } catch (err) {
            eventsContainer.innerHTML = `
                <div class="empty-state">
                    <h3>Oops! Something went wrong</h3>
                    <p>${err.message}</p>
                </div>
            `;
        }
    };

    // Filter Logic - Debounced backend search
    const filterEvents = () => {
        // Show loading state for instant feedback
        eventsContainer.innerHTML = `
            <div class="empty-state" style="opacity: 0.7;">
                <h3>Searching events... 🔍</h3>
            </div>
        `;

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            loadEvents();
        }, 300); // 300ms debounce
    };

    if (searchInput) searchInput.addEventListener('input', filterEvents);
    if (categoryFilter) categoryFilter.addEventListener('change', filterEvents);

    // Initial load
    loadEvents();
});

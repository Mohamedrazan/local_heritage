/**
 * IPTV Information Page Script
 * 
 * Logic handles:
 * 1. Initial fade-in for smooth user experience on TV.
 * 2. Basic key listener placeholders (optional future IPTV remote support).
 */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth fade in
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1.5s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);

    // Placeholder for remote control navigation (Up/Down) if needed in future
    // TV Remote Scrolling Logic
    document.addEventListener('keydown', (e) => {
        var SCROLL_STEP = 300; // Optimized for large TV text readability

        // Key detection (Standard words + KeyCodes 38/40 for older middleware)
        var isUp = e.key === 'ArrowUp' || e.keyCode === 38;
        var isDown = e.key === 'ArrowDown' || e.keyCode === 40;

        if (isDown) {
            e.preventDefault(); // Disable default browser scrolling
            window.scrollBy({ top: SCROLL_STEP, behavior: 'smooth' });
        } else if (isUp) {
            e.preventDefault(); // Disable default browser scrolling
            window.scrollBy({ top: -SCROLL_STEP, behavior: 'smooth' });
        }
    });

    // --- Mouse Drag Scrolling (Air Mouse / Pointer / Touchpad) ---
    let isDragging = false;
    let startY, startX, scrollTop, scrollLeft;

    document.addEventListener('mousedown', (e) => {
        // Only trigger for primary button (Left Click)
        if (e.button !== 0) return;

        isDragging = true;
        document.body.style.cursor = 'grabbing'; // Visual feedback

        // Capture start positions
        startY = e.clientY;
        startX = e.clientX;
        scrollTop = window.scrollY;
        scrollLeft = window.scrollX;

        e.preventDefault(); // Prevent text selection during drag
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();

        // Calculate distance moved
        const y = e.clientY - startY;
        const x = e.clientX - startX;

        // update scroll position
        window.scrollTo({
            top: scrollTop - y,
            left: scrollLeft - x,
            behavior: 'auto' // Instant response for direct manipulation
        });
    });

    const stopDrag = () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    };

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mouseleave', stopDrag);

    // Note: Touch events generally handled natively with momentum, 
    // but Mouse Drag is added here for Air Mouse/Pointer Remote compatibility.

    console.log("IPTV Interface Loaded - Font Scale optimized for TV");
});

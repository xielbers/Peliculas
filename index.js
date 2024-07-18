function showVideo(videoId) {
    var modal = document.getElementById('videoModal');
    var video = document.getElementById('modalVideo');
    video.src = 'https://pixeldrain.com/api/file/' + videoId;
    modal.style.display = 'block';
}

function closeVideoModal() {
    var modal = document.getElementById('videoModal');
    modal.style.display = 'none';
    var video = document.getElementById('modalVideo');
    video.pause();
    video.src = '';
}
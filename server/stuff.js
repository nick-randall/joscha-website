document.getElementById('leftbutton').addEventListener('click', function() {
    req.send('<h1>You found diamonds</h1>');
});

document.getElementById('rightbutton').addEventListener('click', function() {
    req.send('<h1>You found nothing</h1>');
});
if (document.getElementById('img')) {
    document.getElementById('img').addEventListener('change', function (e) {
        var formData = new FormData();
        console.log(this, this.files);
        formData.append('img', this.files[0]);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status === 200) {
                var url = JSON.parse(xhr.responseText).url;
                document.getElementById('img-url').value = url;
                document.getElementById('img-preview').src = url;
                document.getElementById('img-preview').style.display = 'inline';
            } else {
                console.error(xhr.responseText);
            }
        };
        xhr.open('POST', '/post/img');
        xhr.send(formData);
    });
}

[].forEach.call(document.querySelectorAll('.twit-follow'), function (tag) {
    tag.addEventListener('click', function () {
        var isLoggedIn = document.querySelector('#my-id');
        if (isLoggedIn) {
            var userId = tag.parentNode.querySelector('.twit-user-id').value;
            var myId = isLoggedIn.value;
            if (userId !== myId) {
                if (confirm('팔로잉하시겠습니까?')) {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            location.reload();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('POST', '/user/' + userId + '/follow');
                    xhr.send();
                }
            }
        }
    });
});
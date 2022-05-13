API_URL = 'https://api.lanyard.rest/v1';
USERID = '374220001743208459';

async function fetchResponse(userId) {
    try {
        const url = await fetch(`${API_URL}/users/${userId}`);
        const response = await url.json();
        return response;
    } catch (error) {
        console.error(error);
    }

    setTimeout(fetchResponse(), 1);
}

async function setAvatar() {
    const response = await fetchResponse(USERID);

    var avatarId = response.data.discord_user.avatar;
    var fullUrl = `https://cdn.discordapp.com/avatars/${USERID}/${avatarId}`;

    document.getElementById('avatar').src = fullUrl;
}

async function setAvatarFrame() {
    const response = await fetchResponse(USERID);

    if (response.data.discord_status == 'online') {
        document.getElementById('status-dot').style.background = '#3ba45d';
    }

    switch (response.data.discord_status) {
        case 'online':
            document.getElementById('status-dot').style.background = '#3ba45d';
            break;

        case 'dnd':
            document.getElementById('status-dot').style.background = '#ed4245';
            break;

        case 'idle':
            document.getElementById('status-dot').style.background = '#faa81a';
            break;

        case 'offline':
            document.getElementById('status-dot').style.background = '#747e8c'
            break;
    }
}

async function setUsername() {
    const response = await fetchResponse(USERID);

    var user = response.data.discord_user.username;
    var discriminator = response.data.discord_user.discriminator;
    var fullName = `${user}#${discriminator}`;

    document.getElementById('username').innerHTML = fullName;
}

async function setStatus() {
    const response = await fetchResponse(USERID);

    if (response.data.discord_status == 'offline') {
        document.getElementById('status').innerHTML = 'offline';
        return;
    }

    var status = response.data.activities[0].state;
    if (!status) {
        return;
    }
    document.getElementById('status').innerHTML = status;
}

async function isSpotify() {
    const response = await fetchResponse(USERID);
    var spotify = document.getElementById('spotify');
    if (response.data.listening_to_spotify == true) {
        spotify.style.display = 'flex';
    }
    else {
        spotify.style.display = 'none';
    }
}

async function setSpotifyBar() {
    const response = await fetchResponse(USERID);

    var bar = document.getElementById('spotify-bar');

    if (response.data.listening_to_spotify == false) {
        bar.style.display = "none";
        return
    };

    const date = new Date().getTime();

    const v1 =
        response.data.spotify.timestamps.end -
        response.data.spotify.timestamps.start;
    const v2 = date - response.data.spotify.timestamps.start;

    prcnt = (v2 / v1) * 100;

    precentage = Math.trunc(prcnt);

    prccc = Math.round((prcnt + Number.EPSILON) * 100) / 100;
    i = 1;

    bar.style.display = 'block';
    bar.style.width = prccc + '%';
}

async function setSpotifySongName() {
    const response = await fetchResponse(USERID);
    var par = document.getElementById('spotify-song');

    if (response.data.listening_to_spotify == false) {
        par.style.display = "none";
        return
    };

    var artistName = response.data.spotify.artist;
    var songName = response.data.spotify.song;

    var fullName = `${artistName} - ${songName}`;

    par.style.display = 'block';
    par.innerHTML = fullName;
}

async function setSpotifyAlbumCover() {
    const response = await fetchResponse(USERID);
    var par = document.getElementById('spotify-cover');

    if (response.data.listening_to_spotify == false) {
        par.style.display = "none";
        return
    };

    var albumcover = response.data.spotify.album_art_url;
    par.style.display = 'block';
    par.src = albumcover;
}

async function setSpotifyAlbumName() {
    const response = await fetchResponse(USERID);
    var par = document.getElementById('spotify-album');

    if (response.data.listening_to_spotify == false) {
        par.style.display = "none";
        return
    };

    var albumName = response.data.spotify.album;

    par.style.display = 'block';
    par.innerHTML = albumName;
}

async function presenceInvoke() {
    isSpotify();
    setSpotifyAlbumCover();
    setSpotifyAlbumName();
    setSpotifySongName();
    setSpotifyBar();
}

async function statusInvoke() {
    setStatus();
    setAvatarFrame();
}

async function invoke() {
    setInterval(presenceInvoke, 1000);
    setAvatar();
    setUsername();
    setInterval(statusInvoke, 1000);
}

invoke();

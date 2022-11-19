const peer = new Peer();
const socket = io();
const videoGrid = document.querySelector('div#video-grid');
const screenShareBtn = document.querySelector('button#screen-share');
const ROOM_ID = document.querySelector('input#room-id').value;
const muteBtn = document.querySelector('button#mute');

peer.on('open', id => {
    socket.emit('join room', ROOM_ID, id);
});

screenShareBtn.addEventListener('click', e => {
    e.preventDefault();
    screenShare();
});

navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then(stream => {
    const video = document.createElement('video');
    video.id = 'video-stream';
    console.log(video)
    video.srcObject = stream;
    video.onloadedmetadata = () => {
        video.play();
    }
    videoGrid.append(video);
    peer.on('call', call => {
        call.answer(stream);
        call.on('stream', remoteStream => {
            const video = document.createElement('video');
            video.srcObject = remoteStream;
            video.onloadedmetadata = () => {
                video.play();
            };
        });
    });
    socket.on('user joined', id => {
        const call = peer.call(id, stream);
        call.on('stream', remoteStream => {
            const video = document.createElement('video');
            video.srcObject = remoteStream;
            video.onloadedmetadata = () => {
                video.play();
            }
        })
    })
});

function screenShare() {
    navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true
    }).then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
        }
    }).catch(err => {
        console.error(err);
    });
}

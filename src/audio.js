const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export { audioContext };
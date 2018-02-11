console.log('I am a child');

if (process.send) {
	process.send('Hello I am the child');
}

process.on('message', message => {
    console.log('message from parent:', message);
    // close the IPC
    process.disconnect();
});

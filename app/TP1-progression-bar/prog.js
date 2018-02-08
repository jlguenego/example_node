class ProgressionBar {
    constructor(start, end, prefix) {
        this.start = start;
        this.end = end;
        this.prefix = prefix;
        this.update(this.start);
    }
	update(n) {
        let percentage = (n - this.start) / (this.end - this.start);
        percentage = Math.max(Math.min(1, percentage), 0);
        const total = 40;
        const r = Math.floor(percentage * total);
        const p = total - r;
        const rc = (new Array(r + 1)).join('=');
        const pc = (new Array(p + 1)).join(' ');
		process.stdout.clearLine(); // clear current text
		process.stdout.cursorTo(0); // move cursor to beginning of line
		process.stdout.write(this.prefix + `[${rc}${pc}] ${Math.ceil(percentage*100)}%`); // write text
	}
}

let progressionBar = new ProgressionBar(30, 80, 'downloading');
let n = 30;

function iteration() {
	setTimeout(() => {
        n++;
        progressionBar.update(n);
		if (n > 80) {
            progressionBar.update(70);
			return;
		}
		iteration();
	}, 100);
}

iteration();

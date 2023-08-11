const fs = require('fs');
const moment = require('moment');

function shiftTimestamps(srt, duration) {
    const lines = srt.split('\\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // const test = moment(line.split(' --> ')[0], 'HH:mm:ss,SSS').clone().add(5, 'seconds')
        console.log(line.split(' --> ')[0])
        // if (/^\d{2}:\d{2}:\d{2},\d{3}\s*-->.*$/.test(line)) {
        //     const timestamps = line.split(' --> ');

        //     const shiftedStart = moment(timestamps[0], 'HH:mm:ss,SSS').add(duration);
        //     const shiftedEnd = moment(timestamps[1], 'HH:mm:ss,SSS').add(duration);

        //     const shiftedLine = `${shiftedStart.format('HH:mm:ss,SSS')} --> ${shiftedEnd.format('HH:mm:ss,SSS')}`;

        //     lines[i] = shiftedLine;
        // }

        const timestamps = line.split(' --> ');

        const shiftedStart = moment(timestamps[0], 'HH:mm:ss,SSS').add(duration);
        const shiftedEnd = moment(timestamps[1], 'HH:mm:ss,SSS').add(duration);

        const shiftedLine = `${shiftedStart.format('HH:mm:ss,SSS')} --> ${shiftedEnd.format('HH:mm:ss,SSS')}`;

        lines[i] = shiftedLine;
    }

    const shiftedSrt = lines.join('\\n');

    return shiftedSrt;
}

fs.readFile('input.srt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const shiftDuration = moment.duration(5, 'seconds');

    const shiftedSrt = shiftTimestamps(data, shiftDuration);

    fs.writeFile('output.srt', shiftedSrt, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('SRT file with shifted timestamps has been saved.');
    });
});

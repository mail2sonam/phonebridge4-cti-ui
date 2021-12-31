import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";

function demo() {

    // const recordScreen = require('record-screen')

    // const recording = recordScreen('/tmp/test.mp4', {
    //     resolution: '1440x900' // Display resolution
    // })

    // recording.promise
    //     .then(result => {
    //         // Screen recording is done
    //         process.stdout.write(result.stdout)
    //         process.stderr.write(result.stderr)
    //     })
    //     .catch(error => {
    //         // Screen recording has failed
    //     })

    // // As an example, stop the screen recording after 5 seconds:
    // setTimeout(() => recording.stop(), 5000)

    return (
        <div>
            {/* <ReactMediaRecorder
                video
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl} controls autoPlay loop />
                    </div>
                )}
            /> */}
        </div>
    );
};

export default demo;
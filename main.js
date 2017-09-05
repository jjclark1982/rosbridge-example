// connect to ROS

var ros = new ROSLIB.Ros({
    url: "ws://insanity.local:9090/"
});

ros.on('error', function(error) {
    console.log('Error connecting to ROS', error);
});

ros.on('connection', function connected() {
    console.log(`Connected to ROSBridge ${ros.socket.url}`);
    init();
});

ros.on('close', function() {
    console.log('ROS Connection closed.');
});


function init(){
    // subscribe to a topic
    var rosoutTopic = ros.Topic({
        name: '/rosout',
        messageType: '/rosgraph_msgs/Log'
    });

    rosoutTopic.subscribe((msg)=>{console.log(msg)})

    // publish to a topic

    var pepperMonitor = ros.Topic({
        name: '/pepper_monitor/message',
        messageType: 'std_msgs/String'
    });
    pepperMonitor.subscribe((msg)=>{console.log(msg)})


    window.showText = function (){
        var input = document.querySelector('[name="text_to_show"]');
        messages = [{
            name: "exampleText",
            dialog: {
                text: input.value
            },
            timeout: 5
        }];
        pepperMonitor.publish({
            data: JSON.stringify(messages),
            eaosuntehoa: "ousnthoe"
        });
    }
}

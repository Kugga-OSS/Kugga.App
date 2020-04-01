export const msgType = {
    heartBeat: "4",
    friendRequest: "5"
};
export const heartBeat = {
    content: "heartbeat:ping",
    msgType: msgType.heartBeat
};
export const friendReqStruct = {
    content: null,
    msgType: msgType.friendRequest
};
export const hbStr = JSON.stringify(heartBeat);
export const heartCheck = {
    // 每15秒发送一次心跳
    sendSpace: 15 * 1000,
    // 服务端回应超时时间
    timeout: 30 * 1000,
    timer: null,
    serverTimer: null,
    reset() {
        this.timer && clearTimeout(this.timer);
        this.serverTimer && clearTimeout(this.serverTimer);
    },
    start(ws) {
        this.reset();
        this.timer = setTimeout(() => {
            // 发送心跳
            ws.send(hbStr);
            this.serverTimer = setTimeout(() => {
                // 超过响应时间后端没有回应，说明连接已经断开了, 这个时候就断开连接
                ws.close();
            }, this.timeout);
        }, this.sendSpace);
    }
};
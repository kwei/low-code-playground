import '../../css/party.scss';
import React, {useEffect, useRef, useState} from "react";
import { webrtcHandler } from "../../module/webrtc";
import { Logger } from "../../module/logger";
import { shallowEqual, useSelector } from "react-redux";
import { initBroadcastChannel } from "../../module/broadcastChannel";

const logger = Logger({className: "PartyPage"});


const PartyPage = () => {
    const [peerConnection, setPeerConnection] = useState(null);
    const userName = useSelector(state => state.userReducer.name, shallowEqual);
    // const roomID = useSelector(state => state.partyPageReducer.roomID, shallowEqual);
    const role = useSelector(state => state.partyPageReducer.role, shallowEqual);

    const signaling = useRef(null);
    const isMount = useRef(false);

    useEffect(() => {
        if (isMount.current) {
            onIceCandidate(peerConnection).then();
        }
        isMount.current = true;
    }, [peerConnection]);

    const onIceCandidate = async (peerConnection) => {
        logger.info("Set listener on ice candidate");
        peerConnection.onicecandidate = e => {
            const message = {
                type: 'candidate',
                candidate: null,
            };
            if (e.candidate) {
                message.candidate = e.candidate.candidate;
                message.sdpMid = e.candidate.sdpMid;
                message.sdpMLineIndex = e.candidate.sdpMLineIndex;
            }
            logger.info("Send candidate");
            signaling.current.postMessage(JSON.parse(JSON.stringify(message)));
        };
        if (role === "host") {
            const offer = await webrtcHandler.createOffer(peerConnection);
            logger.info("Send offer");
            signaling.current.postMessage({type: 'offer', sdp: JSON.parse(JSON.stringify(offer))});
        }
    };


    const initPeerConnection = async () => {
        const pc = await webrtcHandler.createPeer();
        signaling.current = initBroadcastChannel(pc, "webrtc");
        setPeerConnection(pc);
    };

    return (
        <div className="container-party">
            <div className="info-block">
                Hello {userName} ({role})!
            </div>
            <div className="downloader">
                <div className="download-block">
                    <div className="initPeerConnection" onClick={initPeerConnection}>Generate</div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(PartyPage);
import { useRef } from "react";

function PopUp() {
    const modalRef = useRef();

    return(
        <div className="popUp1">
            <div className="popUp2">
                <button
                onClick={() => modalRef.current.showModal()}
                className="popUp3">click me</button>
                <button
                onClick={() => alert("alert opened")}
                className="popUp4">trigger</button>
            </div>

            <dialog
            ref={modalRef}
            className="popUp5">
                <h1>this is modal</h1>
                <button onClick={()=>modalRef.current.close()} className="popup6">close</button>
            </dialog>
        </div>
    );
}

export default PopUp;
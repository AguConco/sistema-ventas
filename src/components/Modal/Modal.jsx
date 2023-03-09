import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Modal.css'

const Modal = ({ children, setModalVisible, height}) => {

    return (
        <div className="containerModal" >
            <div className="backgroundModal" onClick={() => setModalVisible(false)}></div>
            <div style={{height: height}} className="modal">
                <div>
                    <FontAwesomeIcon onClick={() => setModalVisible(false)} icon={faTimes} />
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
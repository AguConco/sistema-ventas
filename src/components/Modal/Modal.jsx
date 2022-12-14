import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Modal.css'

const Modal = ({ children, setModalVisible }) => {

    return (
        <div className="containerModal">
            <div className="modal">
                <div>
                    <FontAwesomeIcon onClick={() => setModalVisible(false)} icon={faTimes} />
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
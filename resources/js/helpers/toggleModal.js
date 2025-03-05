import { Modal } from "bootstrap"

export const toggleModal = (id, toggle = false) => {
    
    const element = document.querySelector(`#${id}`)
    if (!element) {
        return
    }

    const modal = Modal.getOrCreateInstance(element)
    
    if (toggle) {
        modal.show()
    } else {
        modal.hide()
    }

}
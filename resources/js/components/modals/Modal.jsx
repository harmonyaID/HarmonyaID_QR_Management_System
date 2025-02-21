import { toggleModal } from "@/helpers/toggleModal"
import { useEffect, useRef } from "react"

export const Modal = ({
    id,
    title       = '',
    subTitle    = '',
    className   = '',
    size,
    onHide,
    onShow,
    preventClose    = false,
    open            = false,
    children
}) => {
    const modalRef = useRef(null)

    let width = ''
    switch (size) {
        case 'large':
            width = 'modal-lg'
            break
    
        case 'small':
            width = 'modal-sm'
            break
    }

    useEffect(() => {
        if (typeof onShow != 'function') {
            return
        }

        if (!modalRef.current) {
            return
        }

        modalRef.current.addEventListener('show.bs.modal', onShow)

        return () => {
            modalRef.current?.removeEventListener('show.bs.modal', onShow)
        }
    }, [onShow])

    useEffect(() => {
        if (typeof onHide != 'function') {
            return
        }

        if (!modalRef.current) {
            return
        }

        modalRef.current.addEventListener('hidden.bs.modal', onHide)

        return () => {
            modalRef.current?.removeEventListener('hidden.bs.modal', onHide)
        }
    }, [onHide])

    useEffect(() => {
        toggleModal(id, open)

        return () => {
            toggleModal(id, false)
        }
    }, [])

    return (
        <div 
            ref={modalRef}
            className={`modal fade ${ className }`}
            id={id}
            tabIndex={-1}
            aria-labelledby={ title ? `${id}-title` : undefined }
            aria-hidden={true}
            role="dialog"
            data-bs-keyboard={ !preventClose }
            data-bs-backdrop={ preventClose ? 'static' : 'true' }
        >
            <div 
                className={`modal-dialog modal-dialog-centered ${width}`}
                role="dialog"
            >
                <div className="modal-content">
                    { title || !preventClose ? (
                        <div className="modal-header">
                            { title ? (
                                <h3 className="modal-title">
                                    { title }
                                    { subTitle ? (
                                        <p className="text-grey-600">
                                            { subTitle }
                                        </p>
                                    ) : (<></>) }
                                </h3>
                            ) : (<></>) }
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id={`button_${id}`}
                                hidden={ preventClose }
                            />
                        </div>
                    ) : (<></>) }
                    <div className="modal-body">
                        { children }
                    </div>
                </div>
            </div>
        </div>   
    )
}
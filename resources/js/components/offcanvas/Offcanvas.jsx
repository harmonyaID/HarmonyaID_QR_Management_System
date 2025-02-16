import { useEffect, useRef } from "react"
import { Offcanvas as BsOffcanvas } from "bootstrap"

export const Offcanvas = ({
    title= '',
    open    = false,
    onHide  = () => {},
    children
}) => {
    const offcanvasRef = useRef(null)
    const bsOffCanvasRef = useRef(null)

    useEffect(() => {
        if (typeof onHide != 'function' || !offcanvasRef.current) {
            return
        }

        offcanvasRef.current?.addEventListener('hide.bs.offcanvas', onHide)

        return () => {
            offcanvasRef.current?.removeEventListener('hide.bs.offcanvas', onHide)
        }
    }, [onHide]);

    useEffect(() => {
        bsOffCanvasRef.current = new BsOffcanvas(offcanvasRef.current)
    }, [])

    useEffect(() => {
        if (open) {
            bsOffCanvasRef.current.show()
        } else {
            bsOffCanvasRef.current.hide()
        }
    }, [open])

    return (
        <div 
            ref={offcanvasRef}
            className={`${
                "offcanvas offcanvas-end"
            }`}
            tabIndex="-1"
        >
            <div className="offcanvas-header">
                <h5 
                    className="offcanvas-title"
                >
                    { title }
                </h5>
                <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="offcanvas" 
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">
                { children }
            </div>
        </div>
    )
}
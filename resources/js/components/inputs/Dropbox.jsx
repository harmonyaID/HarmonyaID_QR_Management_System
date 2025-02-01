import { Upload } from "@/icons/Upload"
import { Button } from "../buttons/Button"
import { useRef, useState } from "react"

const DropOverlay = ({
    active      = false,
    multiple    = false
}) => (
    <div
        className={`${
            "d-flex flex-column align-items-center justify-content-center"
        } ${
            "position-absolute top-0 start-0 bottom-0 end-0"
        } ${
            "transition-transform duration-fast"
        } ${
            "transform"
        } ${
            active ? "translate-y-0" : "translate-y-full"
        } ${
            "bg-white"
        } ${
            "text-center"
        }`}
    >
        <strong>DROP TO UPLOAD</strong>
        <p className="fw-light">Only WEBP, JPG, PNG, and JPEG {multiple ? 'files' : 'file'} will be processed</p>
        <Upload size={64} className="text-primary"/>
    </div>
)

const EmptyDropBanner = ({
    onClick = () => {},
    multiple = false
}) => (
    <div
        className={`${
            "d-flex flex-column align-items-center justify-content-center"
        } ${
            "p-5.5"
        }`}
    >
        <p><strong>DROP YOUR {multiple ? 'FILES' : 'FILE'} HERE</strong></p>
        <p className="fw-light mb-3">Drop your WEBP, JPG, PNG, or JPEG {multiple ? 'files' : 'file'} here</p>
        <Button onClick={onClick}>BROWSE</Button>
    </div>
)

export const Dropbox = ({
    images      = [],
    onDropped   = (dropped = []) => {},
    multiple    = false,
}) => {
    const [isDragOver, setIsDragOver] = useState(false)
    const dragOverTimeoutRef = useRef(null)

    const inputRef = useRef(null)

    const handleDrop = (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (typeof onDropped == 'function') {
            onDropped([...event.dataTransfer.files])
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault()
        clearTimeout(dragOverTimeoutRef.current)
        if (!isDragOver) {
            setIsDragOver(true)
        }

        dragOverTimeoutRef.current = setTimeout(() => {
            setIsDragOver(false)
        }, 300)
    }

    const handleClick = () => {
        inputRef.current.click()
    }

    const handleChange = (event) => {
        const target = event.target

        console.log(target.files)

        if (typeof onDropped == 'function') {
            onDropped([...target.files])
        }
    }

    return (
        <div 
            className={`${
                "dropbox"
            } ${
                "overflow-hidden position-relative"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input 
                ref={inputRef}
                type="file" 
                accept="webp,png,jpg,jpeg" 
                multiple={multiple}
                onChange={handleChange}
                hidden
            />
            <EmptyDropBanner
                multiple={multiple}
                onClick={handleClick}
            />
            <DropOverlay
                multiple={multiple}
                active={isDragOver}
            />
        </div>
    )
}

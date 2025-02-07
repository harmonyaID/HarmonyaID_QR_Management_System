import { Upload } from "@/icons/Upload"
import { Button } from "../buttons/Button"
import { createContext, useContext, useLayoutEffect, useRef, useState } from "react"
import { fileUpload } from "@/services/api/file"
import { Loader } from "../misc/Loader"
import { Plus } from "@/icons/Plus"
import { route } from "ziggy-js"
import { GetFileRoute } from "@/routes/file"
import { storage_url } from "@/helpers/url"

export const DropboxContext = createContext(null)

export const DropboxProvider = ({children}) => {
    const [files, setFiles] = useState([])
    const resetDropbox = () => {
        setFiles((prevState) => [])
    }

    return (
        <DropboxContext value={{files, setFiles, resetDropbox}}>
            { children }
        </DropboxContext>
    )
}

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
        <Button type="button" onClick={onClick}>BROWSE</Button>
    </div>
)

const ImageDisplay = ({
    multiple    = false,
    onAdd       = () => {},
    onRemove    = (index) => {},
}) => {
    const { files } = useContext(DropboxContext)
    const containerRef = useRef(null)
    const lastWidthRef = useRef(0)
    const [cols, setCols] = useState('')

    useLayoutEffect(() => {
        const width = containerRef.current.offsetWidth
        if (lastWidthRef == width) {
            return
        }

        console.count('Dropbox recols')

        lastWidthRef.current = width
        setCols((prevState) => {
            if (width >= 1400) {
                return 'grid-cols-6'
            }

            if (width >= 1200) {
                return 'grid-cols-4'
            }

            if (width >= 992) {
                return 'grid-cols-3'
            }

            if (width >= 768) {
                return 'grid-cols-2'
            }

            return ''
        })
    })


    return (
        <section 
            ref={containerRef}
            className={`${
                "d-grid gap-2"
            } ${
                cols
            }`}
        >
            { files.map((image, index) => (
                <div 
                    key={`upload-img-${index}`}
                    className={`${
                        "position-relative"
                    } ${
                        "d-flex justify-content-center align-items-center"
                    } ${
                        "display-container"
                    } ${
                        "border border-neutral-100 rounded"
                    } ${
                        "overflow-hidden"
                    }`}
                >
                    { image.loading ? (
                        <Loader
                            small
                        />
                    ) : (
                        <img
                            src={image.storageRoute ? storage_url(image.url) : `${route(GetFileRoute, '')}/${image.url}`}
                            alt="Uploaded image"
                            className="w-100 h-100 image-cover"
                        />
                    ) }
                    { typeof onRemove == 'function' ? (
                        <div 
                            className={`${
                                "bg-crimson text-white"
                            } ${
                                "position-absolute top-0 end-0 p-1"
                            } ${
                                "border border-crimson rounded-circle"
                            } ${
                                "cursor-pointer"
                            }`}
                            onClick={() => onRemove(index)}
                        >
                            <Plus size={24} className="transform rotate-45"/>
                        </div>
                    ) : (<></>) }
                </div>
            )) }
            { multiple ? (
                <div 
                    className={`${
                        "d-flex d-flex justify-content-center align-items-center flex-column"
                    } ${
                        "border border-neutral-200 rounded"
                    } ${
                        "cursor-pointer"
                    }`}
                    onClick={onAdd}
                >
                    <Plus size={24}/>
                    Add new image
                </div>
            ) : (<></>) }
        </section>
    )
}

export const Dropbox = ({
    multiple    = false,
    webp        = false,
    group       = 'random',
}) => {
    const { files, setFiles } = useContext(DropboxContext)
    const [isDragOver, setIsDragOver] = useState(false)
    const dragOverTimeoutRef    = useRef(null)
    const changeTimeoutRef      = useRef(null)

    const inputRef = useRef(null)

    const handleUpload = (file, index) => {
        const formData = new FormData
        formData.append('group', group)
        formData.append('file', file)
        formData.append('toWebp', webp ? 1 : 0)

        fileUpload(formData).then(response => {
            if (!response?.result?.file) {
                return
            }

            setFiles((prevState) => {
                const newImages     = [...prevState]
                newImages[index]    = {
                    ...newImages[index],
                    url: response.result.file
                }

                return newImages
            })
        })
        .finally(() => {
            setFiles((prevState) => {
                const newImages     = [...prevState]
                newImages[index]    = {
                    ...newImages[index],
                    loading: false,
                }

                return newImages
            })
        })
    }

    const handleFile = (file) => {
        setFiles((prevState) => {
            const newImages = [...prevState]
            const index = newImages.length

            if (!multiple && index > 0) {
                return newImages
            }

            newImages.push({
                loading : true,
                url     : ''
            });

            handleUpload(file, index)

            return newImages
        })
    }

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        [...event.dataTransfer.files].forEach((file) => {
            handleFile(file)
        })
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
        const target = event.target;

        [...target.files].forEach(file => {
            handleFile(file)
        })
    }

    const handleRemove = (index) => {
        setFiles((prevState) => {
            const newImage = [...prevState]
            newImage.splice(index, 1)

            return newImage
        })
    }

    return (
        <div 
            className={`${
                "dropbox"
            } ${
                "overflow-hidden position-relative"
            } ${
                files.length ? 'filled' : ''
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
            { files.length ? (
                <ImageDisplay
                    multiple={multiple}
                    onAdd={handleClick}
                    onRemove={handleRemove}
                />
            ) : (
                <EmptyDropBanner
                    multiple={multiple}
                    onClick={handleClick}
                />
            ) }
            <DropOverlay
                multiple={multiple}
                active={isDragOver}
            />
        </div>
    )
}

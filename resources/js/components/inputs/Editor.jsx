'use client';

import Quill from "quill"
import { memo, useEffect, useLayoutEffect, useRef } from "react";

const EditorComponent = ({
    name,
    value = '',
    onChange,
    onType,
    ref,
}) => {
    const quillRef          = useRef(null)
    const containerRef      = useRef(null)
    const nameRef           = useRef(name)
    const onChangeRef       = useRef(onChange)
    const onTypeRef         = useRef(onType)
    const changeTimeoutRef  = useRef()

    useLayoutEffect(() => {
        onChangeRef.current = onChange
        onTypeRef.current = onType
        nameRef.current = name
    })

    useEffect(() => {
        
        const quill = quillRef.current
        if (!quill) {
            return
        }

        const converted = quill.clipboard.convert({html: value})
        quill.setContents(converted)

    }, [value])

    useEffect(() => {
        const container = containerRef.current
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement('div')
        )

        const formats = [
            'header',
            'bold', 
            'italic',
            'underline',
            'strike',
        ];

        const quill = new Quill(editorContainer, {
            formats: formats,
            theme: 'snow',
        })

        quillRef.current = quill
        if (typeof ref != 'undefined') {
            ref.current = quill
        }

        if (value && typeof value == 'string') {
            const converted = quill.clipboard.convert({html: value})
            quill.setContents(converted);
        }


        quill.on(Quill.events.TEXT_CHANGE, () => {
            const typeHandler = onTypeRef.current
            if (typeof typeHandler == 'function') {
                typeHandler()
            }

            const changeHandler = onChangeRef.current
            if (typeof changeHandler != 'function') {
                return
            }

            clearTimeout(changeTimeoutRef.current)
            
            changeTimeoutRef.current = setTimeout(() => {
                const value = quill.getSemanticHTML()
                changeHandler({
                    name: nameRef.current, 
                    value: value
                })
            }, 750)
        })

        return () => {
            quillRef.current = null
            container.innerHTML = ''
            clearTimeout(changeTimeoutRef.current)
        }
    }, [])

    return (
        <div ref={containerRef}/>
    )
}

export const Editor = memo(EditorComponent)
Editor.displayName = 'Editor'
import { useEffect, useMemo, useRef } from "react"
import { Card } from "./Card"
import { More } from "@/icons/More"
import { Delete } from "@/icons/Delete"
import { Edit } from "@/icons/Edit"
import { Tooltip } from "bootstrap"
import { Link } from "@inertiajs/react"

export const DataCard = ({
    onClick,
    onDelete,
    onEdit,
    children,
    customButton,
    buttonPosition = 'relative',
}) => {
    const handleEdit = (event) => {
        event.stopPropagation()

        if (typeof onEdit == 'function') {
            onEdit()
        }
    }
    
    const handleDelete = (event) => {
        event.stopPropagation()

        if (typeof onDelete == 'function') {
            onDelete()
        }
    }

    return (
        <Card
            className={`${ typeof onClick == 'function' ? 'cursor-pointer clickable' : '' }`}
            onClick={onClick}
        >
            <div className="d-flex flex-wrap flex-column align-items-stretch justify-content-between h-100">
                <div className="w-100 max-w-100">
                    { children }
                </div>
                <div 
                    className={`${
                        "w-100 max-w-100 d-flex flex-wrap align-items-center justify-content-end gap-1"
                    } ${
                        buttonPosition == 'top' ? 'position-absolute top-0 start-0 end-0 p-2' : ''
                    }`}
                > 
                    { customButton }
                    { onEdit ? (
                        <DataCardButton
                            onClick={handleEdit}
                            className="btn-small btn-neutral-100"
                            icon={Edit}
                            title="Edit"
                        />
                    ) : (<></>) }
                    { onDelete ? (
                        <DataCardButton
                            onClick={handleDelete}
                            className="btn-small btn-crimson"
                            icon={Delete}
                            title="Delete"
                        />
                    ) : (<></>) }
                </div>
            </div>
        </Card>
    )
}

const DefaultButton = (props) => (
    <button {...props}/>
)

const Anchor = (props) => (
    <a {...props}/>
)

const DefaultLink = (props) => (
    <Link {...props} />
)

export const DataCardButton = ({
    className = '',
    onClick,
    title,
    icon,
    as = 'button',
    ...props
}) => {
    const Icon = icon
    const btnRef = useRef(null)
    const tooltipRef = useRef()

    const Component = useMemo(() => {
        switch (as.toLowerCase()) {
            case 'button':
                return DefaultButton
        
            case 'link':
                return DefaultLink
        
            case 'download':
                return Anchor
        }
    }, [as])


    useEffect(() => {
        if (!title || !btnRef.current) {
            return
        }

        tooltipRef.current = Tooltip.getOrCreateInstance(btnRef.current)

        return () => {
            tooltipRef.current?.dispose()
        }

    }, [title, Component])

    return (
        <Component
            ref={btnRef}
            className={`${
                "btn btn-icon"
            } ${
                className
            }`}
            title={title}
            onClick={onClick}
            data-bs-toggle={title ? 'tooltip' : ''}
            data-bs-placement={title ? 'top' : ''}
            data-bs-title={title}
            {...props}
        >
            <Icon size="1.5rem"/>
        </Component>
    )
}

export const DataCardPicture = ({
    src,
    squared = false,
}) => (
    <div 
        className={`${
            "data-card-picture"
        } ${
            squared ? 'squared' : ''
        }`}
    >
        <img 
            className="image-cover w-100 h-100"
            src={src}
        />
    </div>
)

export const DataCardDropdown = ({
    items
}) => (
    <div className="dropdown">
        <DataCardButton
            className="btn-icon-grey"
            data-bs-toggle="dropdown"
            icon={More}
            title="More"
        />
        <ul className="dropdown-menu dropdown-menu-end">
            { items.map(({ onClick, icon: Icon, label, className = '' }, index) => (
                <li
                    key={index}
                >
                    <a
                        href="#"
                        onClick={onClick}
                        className={`${
                            "dropdown-item d-flex gap-2 align-items-center justify-content-start"
                        } ${
                            className
                        }`}
                    >
                        <Icon size="1.5rem"/>
                        <span>{ label }</span>
                    </a>
                </li>
            )) }
        </ul>
    </div>
)

import { useMemo } from "react";

export const Pagination = ({
    label = 'Data page navigation',
    currentPage,
    maxPages,
    onClick,
    disabled = false,
    className = '',
}) => {
    const pages = useMemo(() => {
        if (maxPages == 1) {
            return []
        }

        const output = []
        for (let i = 1; i <= maxPages; i++) {
            if (i == currentPage) {
                output.push({
                    number  : i,
                    type    : 'page',
                    active  : true
                })
                continue
            }

            if (i == 1 || i == maxPages) {
                output.push({
                    number  : i,
                    type    : 'page',
                    active  : false
                })
                continue
            }

            if (i == currentPage - 3 || i == currentPage + 3) {
                output.push({
                    number  : i,
                    type    : 'truncated'
                })
                continue
            }

            if (i > currentPage - 3 && i < currentPage + 3) {
                output.push({
                    number  : i,
                    type    : 'page',
                })
                continue
            }

            if (i < currentPage - 3) {
                i = currentPage - 4
                continue
            }
            
            if (i > currentPage + 3) {
                i = maxPages - 1
                continue
            }
        }

        return output
    }, [currentPage, maxPages])

    if (maxPages <= 1) {
        return <></>
    }

    return (
        <nav aria-label={label}>
            <ul 
                className={`${
                    "pagination gap-1 justify-content-center"
                } ${
                    className
                }`}
            >
                <li className={`page-item ${ currentPage == 1 || disabled ? 'disabled' : '' }`}>
                    <a 
                        href="#" 
                        onClick={currentPage != 1 && !disabled && typeof onClick == 'function' ? () => onClick(currentPage - 1) : undefined} 
                        className="page-link"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                { pages.map((page) => (
                    <li 
                        key={page.number}
                        className={`${
                            "page-item"
                        } ${
                            page.type == 'truncated' || disabled ? 'disabled' : ''
                        } ${
                            page.active ? 'active' : ''
                        }`}
                    >
                        <a 
                            href="#"
                            onClick={page.type != 'truncated' && !disabled && typeof onClick == 'function' ? () => onClick(page.number) : undefined}
                            className="page-link"
                        >
                            { page.type == 'page' ? page.number : <>&hellip;</> }
                        </a>
                    </li>
                )) }
                <li className={`page-item ${ currentPage == maxPages ? 'disabled' : '' }`}>
                    <a 
                        href="#" 
                        onClick={currentPage != maxPages && !disabled && typeof onClick == 'function' ? () => onClick(currentPage + 1) : undefined} 
                        className="page-link"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
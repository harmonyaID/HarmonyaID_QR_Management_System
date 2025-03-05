import { Card } from "@/components/cards/Card";
import { ErrorMsg } from "@/components/misc/ErrorMsg";
import { Loader } from "@/components/misc/Loader";
import { upperCaseFirst } from "@/helpers/formatter";
import { storage_url } from "@/helpers/url";
import { useGetQrTypes } from "@/services/swr/qr";
import { createContext, Fragment, useCallback, useContext, useMemo, useState } from "react";

export const QrTypeSelectFormContext    = createContext()
export const QrTypeSelectFormProvider   = ({children}) => {
    const state = useState(null)

    return (
        <QrTypeSelectFormContext value={state}>
            { children }
        </QrTypeSelectFormContext>
    )
}

export const QrTypeSelectForm = () => {
    const [selected, setSelected] = useContext(QrTypeSelectFormContext)
    const { data, isLoading } = useGetQrTypes({ groupDynamic: true })

    const handleSelect = useCallback((selected) => {
        setSelected((prevState) => selected)
    }, [])

    const items = useMemo(() => {
        const output = []

        if (!data?.result) {
            return output
        }

        for (const type in data.result) {
            if (!Object.prototype.hasOwnProperty.call(data.result, type)) {
                continue
            }

            const types = data.result[type]

            if (!types?.length) {
                output.push(<Fragment key={type}/>)
                continue
            }

            output.push(
                <section 
                    key={type}
                    className={`${
                        "qr-type-select mb-4"
                    }`}
                >
                    <p className="fs-3">{ upperCaseFirst(type) }</p>
                    <div className="d-grid grid-cols-md-2 gap-3">
                        { types.map(item => (
                            <Card 
                                key={`qr-types-${item.id}`}
                                className={`${
                                    "selectable"
                                } ${
                                    selected?.id == item.id ? 'selected' : '' 
                                }`}
                                onClick={() => handleSelect(item)}
                            >
                                <div className="d-flex gap-3 justify-content-center align-items-center h-100">
                                    <div className="flex-shrink-0">
                                        <img 
                                            src={ storage_url(item.icon) }
                                            alt={`${item.name} icon`}
                                            height="auto"
                                            width={32}
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="fw-bold mb-1">
                                            { item.name }
                                        </p>
                                        <p className="mb-0">
                                            { item.description }
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )) }
                    </div>
                </section>
            )
        }

        return output
    }, [data, handleSelect, selected])

    return (
        <section>
            { isLoading ? (
                <div className="text-center">
                    <Loader/> Loading...
                </div>
            ) : !data?.result ? (
                <ErrorMsg message="No Qr Code type found"/>
            ) : (
                items
            )}
        </section>
    )
}

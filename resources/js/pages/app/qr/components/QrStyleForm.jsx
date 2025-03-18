import { Card } from "@/components/cards/Card";
import { qrStyleTypes } from "@/configs/qrStyleTypes";
import { base_url } from "@/helpers/url";
import { usePage } from "@inertiajs/react";
import { createContext, Fragment, useContext, useState } from "react";

export const QrStyleFormContext = createContext()
export const QrStyleFormProvider = ({children}) => {
    const state = useState('square')

    return (
        <QrStyleFormContext value={state}>
            { children }
        </QrStyleFormContext>
    )
}

export const QrStyleForm = () => {
    const [selected, setSelected] = useContext(QrStyleFormContext)

    const { props } = usePage()

    const handleSelect = (selected) => {
        setSelected(selected)
    }

    return (
        <section>
            <label className="form-label">
                Qr Style
            </label>
            <div className="d-grid grid-cols-sm-2 grid-cols-md-3 grid-cols-lg-2 gap-3">
                { qrStyleTypes.map(style => props.generator == 'php' && style.value != 'square' ? (
                    <Fragment key={style.value}/>
                ) : (
                    <Card
                        className={`${
                            "selectable"
                        } ${
                            selected == style.value ? 'selected' : ''
                        }`}
                        key={style.value}
                        onClick={() => handleSelect(style.value)}
                    >
                        <div className="d-flex align-items-center gap-1">
                            <img
                                className="rounded"
                                src={style.src}
                                alt={`${style.name} sample`}
                                width={64}
                                height={64}
                            />
                            <span>
                                { style.name }
                            </span>
                        </div>
                    </Card>
                ) ) }
            </div>
        </section>
    )
}
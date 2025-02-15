import { Card } from "@/components/cards/Card";
import { base_url } from "@/helpers/url";
import { createContext, useContext, useState } from "react";

export const QrStyleFormContext = createContext()
export const QrStyleFormProvider = ({children}) => {
    const state = useState('square')

    return (
        <QrStyleFormContext value={state}>
            { children }
        </QrStyleFormContext>
    )
}

const styles = [
    { name: 'Square', value: 'square', src: base_url('images/samples/square.png') },
    { name: 'Rounded', value: 'rounded', src: base_url('images/samples/rounded.png') },
    { name: 'Pixel', value: 'pixel', src: base_url('images/samples/pixel.png') },
    { name: 'Circle', value: 'circle', src: base_url('images/samples/circle.png') },
    { name: 'Vertical Bars', value: 'v-bars', src: base_url('images/samples/vbar.png') },
    { name: 'Horizontal Bars', value: 'h-bars', src: base_url('images/samples/hbar.png') },
]

export const QrStyleForm = () => {
    const [selected, setSelected] = useContext(QrStyleFormContext)

    const handleSelect = (selected) => {
        setSelected(selected)
    }

    return (
        <section>
            <label className="form-label">
                Qr Style
            </label>
            <div className="d-grid grid-cols-sm-2 grid-cols-md-3 grid-cols-lg-2 gap-3">
                { styles.map(style => (
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
                )) }
            </div>
        </section>
    )
}
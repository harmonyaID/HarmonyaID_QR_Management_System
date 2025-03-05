import { Button } from "@/components/buttons/Button";
import { Form } from "@/components/forms/Form";
import { Editor } from "@/components/inputs/Editor";
import { Input } from "@/components/inputs/Input";
import { Loader } from "@/components/misc/Loader";
import { Offcanvas } from "@/components/offcanvas/Offcanvas";
import { notifySuccess } from "@/helpers/notification";
import { faqCreate, faqUpdate } from "@/services/api/misc";
import { createContext, useCallback, useContext, useState } from "react";

export const FaqFormContext = createContext(null)
export const FaqFormProvider = ({children}) => {
    const [form, setForm] = useState({
        question        : '',
        answer          : '',
        persistedAnswer : '',
    });
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <FaqFormContext 
            value={{
                form, setForm,
                open, setOpen,
                loading, setLoading,
            }}
        >
            {children}
        </FaqFormContext>
    )
}

export const FaqForm = ({
    id = '',
    onSuccess = () => {}
}) => {
    const { 
        form, setForm, 
        open, setOpen,
        loading, setLoading,
    } = useContext(FaqFormContext)

    const reset = () => {
        setForm({
            question    : '',
            answer      : '',
        })
    }

    const handleHide = useCallback(() => {
        setOpen(false)
        reset()
    }, [])

    const handleChange = ({name, value}) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        if (loading) {
            return
        }

        setLoading(true)

        let service
        if (id) {
            service = faqUpdate(id, form)
        } else {
            service = faqCreate(form)
        }

        service.then(response => {
            if (response.status.code != 200) {
                return
            }

            notifySuccess('Data successfully saved');
            reset()
            if (typeof onSuccess == 'function') {
                onSuccess()
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return (
        <Offcanvas
            title={id ? 'Edit FAQ' : 'Create FAQ'}
            open={open}
            onHide={handleHide}
        >
            <Form
                onSubmit={handleSubmit}
                className="d-flex flex-column justify-content-between align-items-stretch"
            >
                <section>
                    <Input
                        name="question"
                        label="Question"
                        placeholder="How do I get my generated QR Code?"
                        value={form.question}
                        onChange={handleChange}
                        className="mb-4"
                        required
                    />
                    <div className="mb-4">
                        <Editor
                            name="answer"
                            value={form.persistedAnswer}
                            onChange={handleChange}
                        />
                    </div>
                </section>
                <Button
                    type="submit"
                    disabled={loading}
                >
                    { loading ? (
                        <Loader small className="me-2"/>
                    ) : (<></>) }
                    <span>Save</span>
                </Button>
            </Form>
        </Offcanvas>
    )
}

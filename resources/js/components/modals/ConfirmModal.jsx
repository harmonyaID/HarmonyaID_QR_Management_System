import { MDConfirm } from "@/configs/modalId";
import { Button } from "../buttons/Button";
import { Loader } from "../misc/Loader";
import { Modal } from "./Modal";

export const ConfirmModal = ({
    id = MDConfirm,
    onCancel,
    onConfirm,
    negativeFlow = false,
    loading = false,
    message = 'Are you sure doing this action?',
    hint = '',
    ...props
}) => (
    <Modal
        id={id}
        preventClose
        {...props}
    >
        <div className="text-center p-2">
            <div className="mb-3">
                <h6 
                    className={`${
                        "fw-normal fs-5"
                    } ${
                        hint ? 'mb-2' : 'mb-0'
                    }`}
                >
                    { message }
                </h6>
                { hint ? (
                    <p className="mb-0 text-grey-700">
                        { hint }
                    </p>
                ) : <></> }
            </div>
            <div className="d-flex justify-content-center gap-3 pt-2">
                <Button
                    outline={!negativeFlow}
                    disabled={loading}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    outline={negativeFlow}
                    disabled={loading}
                    onClick={onConfirm}
                >
                    <Loader
                        hidden={!loading} 
                        small
                    />
                    {' '}
                    Continue
                </Button>
            </div>
        </div>
    </Modal>
)

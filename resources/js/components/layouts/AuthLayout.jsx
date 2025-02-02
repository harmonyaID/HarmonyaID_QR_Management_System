import { Logo } from "../brandings/Logo"

export const AuthLayout = ({
    children
}) => (
    <main className="auth">
        <FormSection>
            { children }
        </FormSection>
        <BackdropSection/>
    </main>
)

const FormSection = ({
    children
}) => (
    <section className="form-panel">
        <div className="wrapper">
            <Logo size={60}/>
        </div>
        { children }
        <div className="wrapper text-center fs-8">
            Version <span className="text-primary fw-semibold">1.0.0</span>
        </div>
        <footer
            className="border-top border-grey-800 d-flex justify-content-between align-items-center py-4 fs-8"
        >
            <div 
                className="text-grey-600 py-1"
                title="copyright"
            >
                &copy; { new Date().getFullYear() } SynChat
            </div>
            <div 
                className="text-grey-400 py-1 text-end"
                title="credit"
            >
                Design & Development By Harmonya Indonesia
            </div>
        </footer>
    </section>
)

export const BackdropSection = () => (
    <section className="image-panel">
        <div className="img-wrapper">
            <img src="/images/splash-screen/bg-login.svg"/>
        </div>
        {/* <div className="quote">
            <p className="mb-3">- Gordon B. Hinckley</p>
            <p className="mb-0 fs-2 fw-normal">"Without hard work, nothing grows but weeds."</p>
        </div> */}
    </section>
)

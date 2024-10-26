import Header from "../components/header/Header"
import Banner from "../components/banner/Banner"
import Footer from "../components/footer/Footer"
import SignInForm from "../components/signinform/SignInForm"

function SignIn(){
    return(
        <>
            <Banner></Banner>
            <Header></Header>
            <SignInForm></SignInForm>
            <Footer></Footer>
        </>
    )
}

export default SignIn
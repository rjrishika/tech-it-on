import React,{useState} from 'react'
import {Link, useNavigate,useLocation} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {setDoc,getDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'
import googleIcon from '../assets/svg/googleIcon.svg'


function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    
    password: '' 
  }) 
  const {name,email,number, password} = formData

  const navigate = useNavigate()
  const location = useLocation()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }) )
  }
  const onGoogleClick = async() => {
    try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if(!docSnap.exists()){
           await setDoc(doc(db, 'users', user.uid), {
               name: user.displayName,
               email: user.email,
               
               timestamp: serverTimestamp()
           })
        }
        navigate('/')
    } catch (error) {
        toast.error('Could not authorize with Google')
    }
 }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp= serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
       toast.error('Someting went wrong with registration')
    }

  }

  return (
  
      <>
<div className='index'>
  <div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card" style={{height:400}}>
			<div class="card-header">
				<h3>Sign Up</h3>
				<div class="d-flex justify-content-end social_icon">
					<span><i class="fab fa-facebook-square"></i></span>
					<span><i class="fab fa-google-plus-square" onClick={onGoogleClick}></i></span>
					<span><i class="fab fa-twitter-square"></i></span>
				</div>
			</div>
			<div class="card-body">
				<form onSubmit={onSubmit}>
        <div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>

						<input type="text" class="form-control" id='name' placeholder="username" value={name} onChange={onChange} />
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fa fa-envelope"></i></span>
						</div>

						<input type="text" class="form-control" id='email' placeholder="email" value={email} onChange={onChange} />
						
					</div>
          
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type={showPassword ? 'text' : 'password'} class="form-control" id="password" placeholder="password" value={password} onChange={onChange} />
            <img src={visibilityIcon} alt="show password" className="showPassword" onClick={()=> setShowPassword((prevState)=>!prevState)} />
					</div>
					<div class="form-group">
						<input type="submit" value="Sign Up" class="btn float-right login_btn"/>
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Don't have an account?<a className='forgetPass' href="/sign-in">Sign In</a>
				</div>
				<div class="d-flex justify-content-center">
					<a className='forgetPass' href="/forgot-password">Forgot your password?</a>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</>
  )
}

export default SignUp
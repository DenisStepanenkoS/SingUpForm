import styles from "./css/styles.module.css"
import {useState} from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";

function Form(){
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [checkboxPrivacy, setCheckboxPrivacy] = useState(false);

    function togglePasswordVisibility(e){
        setPasswordIsVisible(!passwordIsVisible);
        e.preventDefault();
    }
    function handleChangeName({target:{value}}){
        setFullName(value);
    }
    function handleChangeEmail({target:{value}}){
        setEmail(value);
    }
    function handleChangePassword({target:{value}}){
        setPassword(value);
    }
    function handleChangeConfirmPassword({target:{value}}){
        setConfirmPassword(value);
    }
    function toggleCheckbox(){
        setCheckboxPrivacy(!checkboxPrivacy);
    }
    function handleSubmit(e){
        e.preventDefault();
        if(checkboxPrivacy){
            setFullName('');
            setPassword('');
        }else{
            alert("You need Agree All Statements in Terms Of Service");
        }
    }

    const REGULAR_EXP={
        name: /^[A-Z][a-z]{2,10} [A-Z][a-z]{2,10}$/,
        email: /^.+@.+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/
    }
    
    const FullNameClass = `${styles.inputField} ${REGULAR_EXP.name.test(fullName) ? styles.valid : styles.inValid}`
    const emailClass = `${styles.inputField} ${REGULAR_EXP.email.test(email) ? styles.valid : styles.inValid}`;
    const passwordClass = `${styles.inputField} ${REGULAR_EXP.password.test(password) ? styles.valid : styles.inValid}`;
    const confirmPasswordClass = `${styles.inputField} ${password === confirmPassword ? styles.valid : styles.inValid}`;
    return(
        <form className={styles.SingUpForm}>
            <header className={styles.formHeader}>
                <HiOutlinePencilSquare className={styles.pencil}/>
                <h3>Create Your Account</h3>
            </header>
            
            <main className={styles.inputFields}>
                <label className={styles.formLabel}>
                    <p className={styles.formText}>FULL NAME</p>
                    <input className={FullNameClass} required autoFocus type='text' name='name' placeholder='John Doy' value={fullName} onChange={handleChangeName}/>
                </label>

                <label className={styles.formLabel}>
                    <p className={styles.formText}>EMAIL ADDRESS</p>
                    <input className={emailClass} required type='email' name='email' placeholder='your@mail' value={email} onChange={handleChangeEmail}/>
                </label>

                <label className={styles.formLabel + " " +styles.passwordSpace}>
                    <p className={styles.formText}>PASSWORD</p>
                    <input className={passwordClass} required type={passwordIsVisible ? 'text' : 'password'  } name='password' placeholder='*********' value={password} onChange={handleChangePassword}/>
                    {passwordIsVisible ? <IoIosEyeOff className={styles.eyeButton} onClick={togglePasswordVisibility}/> : <IoIosEye className={styles.eyeButton} onClick={togglePasswordVisibility}/>}
                </label>

                <label className={styles.formLabel}>
                    <p className={styles.formText}>CONFIRM PASSWORD</p>
                    <input className={confirmPasswordClass} required type={passwordIsVisible ? 'text' : 'password'} name='confirmPassword' placeholder='*********' value={confirmPassword} onChange={handleChangeConfirmPassword}/>
                </label>

                <label className={styles.termsOfServiceField}>
                    <input required type='checkbox' name='termsOfService' checked={checkboxPrivacy} onChange={toggleCheckbox}/>
                    <p>I Agree All Statements in Terms Of Service</p>
                </label>

                <button className={styles.singUpButton} type='submit' onClick={handleSubmit}>Sing Up</button>

            </main>
        </form>
    );
}




export default Form;
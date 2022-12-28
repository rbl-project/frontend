import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { 
    Container,
    Box,
    CircularProgress
} from '@mui/material';
import decode from "jwt-decode";

// icons
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

// styled components
import { 
    Section,
    FormHeader,
    CustomFormField,
    CustomLable,
    CustomInputField,
    SunmitButton,
    CustomCheckBox,
    SocialButtonWrapper,
    SocialLoginBUtton,
    CustomHr,
    FormFooter,
    FormFooterElement,

} from "./AuthStyles";

// actions
import { login } from "/store/authSlice"
import { REQUEST_STATUS_FAILED, REQUEST_STATUS_LOADING, REQUEST_STATUS_SUCCEEDED } from '../../constants/Constants';

const LoginMainSection = () => {

    const initialLoginFormData = {
        email: "",
        password: ""
    };
    const [formLoginData, setFormLoginData] = useState(initialLoginFormData);

    const dispatch = useDispatch();
    const router = useRouter();
    const authState = useSelector((state) => state.auth);

    useEffect(() => {
        const current_user = JSON.parse(localStorage.getItem('profile'));
        const token = current_user?.access_token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 > new Date().getTime()){
                router.replace('/dashboard');
            } 
        }
        // console.log(authState); 
    }, [authState.authenticationStatus])

    
    const handleLoginChange = (e) => {
        setFormLoginData({ ...formLoginData, [e.target.name]: e.target.value });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(formLoginData));
    }

    return (
        <Section >
           <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <Box sx = {{
                    bgcolor : "rgba(226,232,240,1)",
                    color : "rgba(100,116,139,1)",
                    borderRadius: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.5rem 2rem",
                    width: "70%",

                }}>
                    <h4 style={{textAlign: "center"}}>Sign in with</h4>
                    <FormHeader>
                        <SocialButtonWrapper>
                            <SocialLoginBUtton>
                                <GoogleIcon fontSize='small' sx={{marginRight: "0.5rem"}} /> Google
                            </SocialLoginBUtton>
                            <SocialLoginBUtton>
                                <GitHubIcon fontSize='small' sx={{marginRight: "0.5rem"}}/>GitHub
                            </SocialLoginBUtton>
                        </SocialButtonWrapper>

                    </FormHeader>
                    
                    <CustomHr />

                    <FormHeader>
                        <h5 style={{textAlign: "center", margin: "1rem 0"}}>Or sign in with credentials</h5>
                    </FormHeader>

                    <form>
                        <CustomFormField>
                            <CustomLable>Email</CustomLable>
                            <CustomInputField placeholder='Email' name='email' type="email" onChange={handleLoginChange} value={formLoginData['email']}/>
                        </CustomFormField>

                        <CustomFormField>
                            <CustomLable>Password</CustomLable>
                            <CustomInputField placeholder='Password' name='password' type="password" onChange={handleLoginChange} value={formLoginData['password']}/>
                        </CustomFormField>

                        <CustomFormField>
                            <CustomCheckBox type="checkbox"/>
                            <CustomLable>Remember Me</CustomLable>
                        </CustomFormField>

                        {
                            authState.errorMessage ?
                            <CustomFormField>
                                <CustomLable style={{color: "red"}}>{authState.errorMessage}</CustomLable>
                            </CustomFormField>
                            : null
                        }


                        <CustomFormField style={{marginTop: "2rem"}}>
                            <SunmitButton type="submit" onClick={handleLogin}>
                                {
                                    authState.authenticationStatus === REQUEST_STATUS_LOADING
                                    ? <CircularProgress size="1rem" color="inherit" />
                                    : "Login"
                                }
                            </SunmitButton>
                        </CustomFormField>
                    </form>
                </Box>
                <Box sx = {{width: "70%"}}>
                    <FormFooter>
                        <FormFooterElement href="/auth/forget-password">
                            Forget Password?
                        </FormFooterElement>
                        <FormFooterElement href='/auth/register'>
                            Create new account
                        </FormFooterElement>
                    </FormFooter>
                </Box>
           </Container>
        </Section>
    )
}

export default LoginMainSection;



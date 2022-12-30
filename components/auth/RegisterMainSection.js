import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { 
    Container,
    Box,
    CircularProgress
} from '@mui/material';

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
import { register } from '../../store/authSlice';

// constants
import { REQUEST_STATUS_FAILED, REQUEST_STATUS_LOADING, REQUEST_STATUS_SUCCEEDED } from '../../constants/Constants';

const RegisterMainSection = () => {

    const initialLoginFormData = {
        name: "",
        email: "",
        password: ""
    };
    const [formRegisterData, setFormRegisterData] = useState(initialLoginFormData);

    const dispatch = useDispatch();
    const router = useRouter();
    const authState = useSelector((state) => state.auth);
    
    useEffect(() => {
        if(authState.requestStatus === REQUEST_STATUS_SUCCEEDED){
           router.replace('/auth/login');
        } 
    }, [authState.requestStatus])

    
    const handleRegisterChange = (e) => {
        setFormRegisterData({ ...formRegisterData, [e.target.name]: e.target.value });
    }

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(formRegisterData));
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
                    width: "100%",

                }}>
                    <h4 style={{textAlign: "center"}}>Sign up with</h4>
                    <FormHeader>
                        <SocialButtonWrapper>
                            <SocialLoginBUtton>
                                <GoogleIcon fontSize='small' />Google
                            </SocialLoginBUtton>
                            <SocialLoginBUtton>
                                <GitHubIcon fontSize='small'/>GitHub
                            </SocialLoginBUtton>
                        </SocialButtonWrapper>

                    </FormHeader>
                    
                    <CustomHr />

                    <FormHeader>
                        <h5 style={{textAlign: "center", margin: "1rem 0"}}>Or sign up with credentials</h5>
                    </FormHeader>

                    <form>
                        <CustomFormField>
                            <CustomLable>Name</CustomLable>
                            <CustomInputField placeholder='Name' type="name" name='name' onChange={handleRegisterChange} value={formRegisterData['name']}/>
                        </CustomFormField>
                        <CustomFormField>
                            <CustomLable>Email</CustomLable>
                            <CustomInputField placeholder='Email' type="email" name='email' onChange={handleRegisterChange} value={formRegisterData['email']}/>
                        </CustomFormField>

                        <CustomFormField>
                            <CustomLable>Password</CustomLable>
                            <CustomInputField placeholder='Password' type="password" name='password' onChange={handleRegisterChange} value={formRegisterData['password']}/>
                        </CustomFormField>

                        <CustomFormField>
                            <CustomCheckBox type="checkbox"/>
                            <CustomLable>I agree with <a style={{color: "blue"}}>Privacy Policy</a> </CustomLable>
                        </CustomFormField>

                        {
                            authState.errorMessage ?
                            <CustomFormField>
                                <CustomLable style={{color: "red"}}>{authState.errorMessage}</CustomLable>
                            </CustomFormField>
                            : null
                        }

                        <CustomFormField style={{marginTop: "2rem"}}>
                            <SunmitButton type="submit" onClick={handleRegister}>
                                {
                                    authState.requestStatus === REQUEST_STATUS_LOADING
                                    ? <CircularProgress size="1rem" color="inherit" />
                                    : "Create Account"
                                }
                            </SunmitButton>
                        </CustomFormField>
                    </form>
                </Box>
                <Box sx = {{width: "100%"}}>
                    <FormFooter style={{justifyContent: "center"}}>
                        <FormFooterElement href='/auth/login' >
                            Already have an account?
                        </FormFooterElement>
                    </FormFooter>
                </Box>
           </Container>
        </Section>
    )
}

export default RegisterMainSection;



import React from 'react'
import { 
    Container,
    Box,
    FormControl
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

const LoginMainSection = () => {
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
                            <CustomInputField placeholder='Name' type="name"/>
                        </CustomFormField>
                        <CustomFormField>
                            <CustomLable>Email</CustomLable>
                            <CustomInputField placeholder='Email' type="email"/>
                        </CustomFormField>

                        <CustomFormField>
                            <CustomLable>Password</CustomLable>
                            <CustomInputField placeholder='Password' type="password"/>
                        </CustomFormField>

                        <CustomFormField>
                            <CustomCheckBox type="checkbox"/>
                            <CustomLable>I agree with <a style={{color: "blue"}}>Privacy Policy</a> </CustomLable>
                        </CustomFormField>


                        <CustomFormField style={{marginTop: "2rem"}}>
                            <SunmitButton type="submit">Create Account</SunmitButton>
                        </CustomFormField>
                    </form>
                </Box>
                <Box sx = {{width: "100%"}}>
                    <FormFooter style={{justifyContent: "center"}}>
                        <FormFooterElement >
                            Already have an account?
                        </FormFooterElement>
                    </FormFooter>
                </Box>
           </Container>
        </Section>
    )
}

export default LoginMainSection;



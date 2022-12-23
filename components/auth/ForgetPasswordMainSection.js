import React from 'react'
import { 
    Container,
    Box
} from '@mui/material';

// styled components
import { 
    Section,
    FormHeader,
    CustomFormField,
    CustomLable,
    CustomInputField,
    SunmitButton,
    CustomHr,

} from "./AuthStyles";

const ForgetPasswordMainSection = () => {
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
                    width: "90%",

                }}>
                    <h4 style={{textAlign: "center"}}>Forget Password</h4>
                    
                    <CustomHr />

                    <FormHeader>
                        <h5 style={{textAlign: "center", margin: "1rem 0"}}>Enter your registered email to receive the password reset link</h5>
                    </FormHeader>

                    <form>
                        <CustomFormField>
                            <CustomLable>Email</CustomLable>
                            <CustomInputField placeholder='Enter Registered Email' type="email"/>
                        </CustomFormField>

                        <CustomFormField style={{marginTop: "2rem"}}>
                            <SunmitButton type="submit">Send Email</SunmitButton>
                        </CustomFormField>
                    </form>
                </Box>
           </Container>
        </Section>
    )
}

export default ForgetPasswordMainSection;



import React from "react";
import styled from "styled-components";
import MountainImage from "./mountains.png";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LoginInput = styled.input`
  font-size: 20px;
  padding: 0.5rem;
  color: #35147D;
  width: 300px;
  text-align: center;
  border-radius: 0.5rem;
`;

const LoginImage = styled.img`
  width: 170px;
  height: auto;
  display: block;
  margin: 0 1rem 1rem 0;
`;

const LoginLabel = styled.label`
  color: #fff;
  font-size: 0.8rem;
  margin: 0 0 0.25rem;
  padding: 0;
  width: 300px;
`;

const Login = ({pass, setPass}) => (
    <Wrapper>
        <LoginImage src={MountainImage} alt="mountains" />
        <LoginLabel htmlFor="login">Password</LoginLabel>
        <LoginInput id="login" type="password" value={pass} onChange={e => setPass(e.target.value)} />
    </Wrapper>
);

export default Login;

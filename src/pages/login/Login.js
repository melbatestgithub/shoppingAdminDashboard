import styled from "styled-components";
import { mobile } from "../../responsive";
import { useState } from "react";
import { publicRequest } from "../../requestMethods";
import { loginStart, loginSuccess, loginFailure } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.div`
  font-size: 1.5rem;
  color: red;
  font-weight: bold;
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (dispatch, data) => {
    console.log("FUNCTION IS NOT CALLED");
    dispatch(loginStart());
    try {
      const res = await publicRequest.post(
        "http://localhost:9000/api/auth/login",
        data
      );
      if (res.data.isAdmin) {
        dispatch(loginSuccess(res.data));
        navigate("/");
      } else {
        console.log("You are not admin");
      }
      console.log(res.data);
    } catch (error) {
      dispatch(loginFailure());
      console.log("error", error);
    }
  };
  const handleSubmit = (e) => {
    setUsername("");
    setPassword("");
    console.log("plssss");
    e.preventDefault();
    try {
      handleLogin(dispatch, { username, password });
    } catch (error) {}
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN yeah</Title>
        <Form>
          <Input
            placeholder="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            LOGIN
          </Button>

          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          {/* <Link to="/register">CREATE A NEW ACCOUNT</Link> */}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

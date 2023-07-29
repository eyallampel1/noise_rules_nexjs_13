"use client";
import Link from "next/link";
//import login.css
import styles from "./styles.module.css";

const Login = (props) => {
  return (
    <div>
      <Link href={"/help"}>Click me {props.fromParent}</Link>
      <button className={`btn btn-primary ${styles.bla}`}>My Button</button>
    </div>
  );
};
export default Login;
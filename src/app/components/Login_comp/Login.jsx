"use client";
import Link from "next/link";
//import login.css
import styles from "./styles.module.css";
import { State } from "../../State";
import { reactive, useObservable, Reactive } from "@legendapp/state/react";

const Login = (props) => {
  const state$ = useObservable(State.user.profile.name);
  const client = reactive(state$);

  return (
    <div>
      <Link href={"/help"}>Click me {client.get()}</Link>
      <button className={`btn btn-primary ${styles.bla}`}>My Button</button>
    </div>
  );
};
export default Login;
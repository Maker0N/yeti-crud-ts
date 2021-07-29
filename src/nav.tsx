import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { currentCaseId } from "./redux/mainReducer";
import { StateType } from "./types/types";
import store from './redux/store'

const Nav: FC<StateType> = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation()

  return (
    <nav className="bg-blue-300 w-1/3 px-3 pt-20 text-sm font-mono">
      {pathname === "/result" ? <div>Результаты поиска...</div> : null}
      {pathname === "/result"
        ? props.findArr.map((it) => {
            return (
              <Link to="/main" key={it.id}>
                <article
                  className={
                    it.id === props.currentCaseId
                      ? "border p-3 transition duration-300 bg-blue-200 transform translate-x-4 border-r-0 hover:scale-110"
                      : "border p-3 bg-gray-300 transition hover:bg-blue-300 transform hover:scale-110"
                  }
                  onClick={(e) => {
                    dispatch(currentCaseId(it.id));
                  }}
                >
                  <div>{it.id}</div>
                  <div>{it.date}</div>
                  <div>{it.name}</div>
                  <div>{it.phone}</div>
                </article>
              </Link>
            );
          })
        : props.base.map((it) => {
            return (
              <Link to="/main" key={it.id}>
                <article
                  className={
                    it.id === props.currentCaseId
                      ? "border p-3 transition duration-300 bg-blue-200 transform translate-x-5 border-r-0 hover:scale-110"
                      : "border p-3 bg-gray-300 transition hover:bg-blue-300 transform hover:scale-110"
                  }
                  onClick={(e) => {
                    dispatch(currentCaseId(it.id));
                    if (store) {
                      localStorage.setItem(
                        "localInitialState",
                        JSON.stringify(store.getState().mainReducer)
                      );
                    }
                  }}
                >
                  <div>{it.id}</div>
                  <div>{it.date}</div>
                  <div>{it.name}</div>
                  <div>{it.phone}</div>
                </article>
              </Link>
            );
          })}
    </nav>
  );
};

export default Nav;

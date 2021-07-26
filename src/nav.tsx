import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { currentCaseId } from "./redux/mainReducer";
import { StateType } from "./types/types";

const Nav: FC<StateType> = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation()

  return (
    <nav className="bg-blue-300 min-h-screen w-2/5 p-3 text-sm font-mono overflow-visible">
      {pathname === "/result"
        ? <div>Результаты поиска...</div>
        : null}
      {pathname === "/result"
        ? props.findArr.map((it) => {
            return (
              <>
                <Link to="/main">
                  <article
                    key={it.id}
                    className={
                      it.id === props.currentCaseId
                        ? "border p-3 bg-blue-200 transition hover:bg-blue-300 transform translate-x-3 border-r-0 hover:scale-110"
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
              </>
            );
          })
        : props.base.map((it) => {
            return (
              <Link to="/main">
                <article
                  key={it.id}
                  className={
                    it.id === props.currentCaseId
                      ? "border p-3 bg-blue-200 transition hover:bg-blue-300 transform translate-x-3 border-r-0 hover:scale-110"
                      : "border p-3 bg-gray-300 transition hover:bg-blue-300 transform hover:scale-110"
                  }
                  onClick={(e) => {
                    dispatch(currentCaseId(it.id));
                    console.log(it.date);
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

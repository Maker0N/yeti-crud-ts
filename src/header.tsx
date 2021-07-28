import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { findCase } from "./redux/mainReducer";

const Header: FC = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [request, setRequest] = useState("");

  return (
    <header className="fixed w-full flex p-5 justify-center bg-blue-300 text-sm font-mono z-10">
      <div className="w-full"></div>
      <div className="flex justify-center w-full">
        {pathname === '/edit'
        ? <Link to="/edit" className="bg-gray-400 hover:bg-gray-400 px-3">
          Создать заявку
        </Link>
        : <Link to="/form" className="bg-green-500 hover:bg-green-700 px-3">
          Создать заявку
        </Link>}
      </div>
      <div className="flex justify-end w-full">
        <input
          type="search"
          className="outline-none px-1"
          onChange={(e) => {
            setRequest(e.target.value);
          }}
        />
        <Link to={request ? "/result" : '/main'}>
          <input
            type="submit"
            value="Найти"
            className="outline-none px-3"
            onClick={e => {
              dispatch(findCase(request))
            }
            }
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;

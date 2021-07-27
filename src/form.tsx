import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { addCase, editCase } from "./redux/mainReducer";
import { CaseType } from "./types/types";

interface FormProps {
  base: Array<CaseType>;
  currentCaseId: number | null;
}

const Form: FC<FormProps> = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [currentCase] = props.base.filter(
    (it) => it.id === props.currentCaseId
  );

  let formOrEditObj;
  pathname === "/form"
    ? (formOrEditObj = {
        id:
          props.base.length === 0
            ? 1
            : props.base[props.base.length - 1].id + 1,
        date: currentTime(),
        name: "",
        driverName: "",
        phone: "",
        comments: "",
        ati: "",
      })
    : (formOrEditObj = currentCase);

  const [form, setForm] = useState(formOrEditObj);

  const { id, date, name, driverName, phone, comments, ati } = form;

  const changeInput = (e) => {
    const { name, value } = e.target;
    setForm(() => ({ ...form, [name]: value }));
  };

  function currentTime(): string {
    const zero = (arg: number): string => {
      return arg.toString().length === 1 ? `0${arg}` : `${arg}`;
    };
    const date = new Date();
    return `${zero(date.getDate())}.${zero(
      date.getMonth()
    )}.${date.getFullYear()} ${zero(date.getHours())}:${zero(
      date.getMinutes()
    )}`;
  }

  return (
    <form className="w-full p-5 text-sm font-mono bg-blue-200">
      <div className="text-red-500">
        {pathname === "/edit" && "Редактирование заявки"}
      </div>
      <div className="mb-5">
        <div>Номер заявки: {id}</div>
        <div>Время получения заявки: {date}</div>
      </div>
      <label htmlFor="">
        Название фирмы
        <input
          type="text"
          className={
            form.name === ""
              ? "block w-1/3 border border-red-500 p-1 mb-1 bg-white outline-none"
              : "block w-1/3 border p-1 mb-1 bg-white outline-none"
          }
          name="name"
          value={name}
          onChange={changeInput}
        />
      </label>
      <label htmlFor="">
        ФИО перевозчика
        <input
          type="text"
          className={
            form.driverName === ""
              ? "block w-1/3 border border-red-500 p-1 mb-1 bg-white outline-none"
              : "block w-1/3 border p-1 mb-1 bg-white outline-none"
          }
          name="driverName"
          value={driverName}
          onChange={changeInput}
        />
      </label>
      <label htmlFor="">
        Контактный телефон перевозчика
        <input
          type="number"
          className={
            form.phone === ""
              ? "block w-1/3 border border-red-500 p-1 mb-1 bg-white outline-none"
              : "block w-1/3 border p-1 mb-1 bg-white outline-none"
          }
          name="phone"
          value={phone}
          onChange={changeInput}
        />
      </label>
      <label htmlFor="">
        Комментарии
        <textarea
          className="block w-1/3 border p-1 mb-1 bg-white outline-none"
          name="comments"
          value={comments}
          onChange={changeInput}
        ></textarea>
      </label>
      <label htmlFor="">
        ATI код сети перевозчика
        <input
          type="number"
          className={
            form.ati === ""
              ? "block w-1/3 border border-red-500 p-1 mb-1 bg-white outline-none"
              : "block w-1/3 border p-1 mb-1 bg-white outline-none"
          }
          name="ati"
          value={ati}
          onChange={changeInput}
        />
      </label>
      <div className="flex justify-center my-10">
        {pathname === "/form" ? (
          <Link
            to={
              form.name === "" ||
              form.driverName === "" ||
              form.phone === "" ||
              form.ati === ""
                ? "/form"
                : "/main"
            }
          >
            <button
              type="button"
              className={
                form.name === "" ||
                form.driverName === "" ||
                form.phone === "" ||
                form.ati === ""
                  ? "border px-3 mx-3 bg-gray-400"
                  : "border px-3 mx-3 bg-green-400 hover:bg-green-500"
              }
              onClick={(e) => {
                if (
                  form.name !== "" &&
                  form.driverName !== "" &&
                  form.phone !== "" &&
                  form.ati !== ""
                ) {
                  dispatch(addCase(form));
                  setForm(() => ({
                    ...form,
                    date: currentTime(),
                    name: "",
                    driverName: "",
                    phone: "",
                    comments: "",
                    ati: "",
                  }));
                }
              }}
            >
              Создать
            </button>
          </Link>
        ) : (
          <Link
            to={
              form.name === "" ||
              form.driverName === "" ||
              form.phone === "" ||
              form.ati === ""
                ? "/edit"
                : "/main"
            }
          >
            <button
              type="button"
              className={
                form.name === "" ||
                form.driverName === "" ||
                form.phone === "" ||
                form.ati === ""
                  ? "border px-3 mx-3 bg-gray-400"
                  : "border px-3 mx-3 bg-green-400 hover:bg-green-500"
              }
              onClick={(e) => {
                if (
                  form.name !== "" &&
                  form.driverName !== "" &&
                  form.phone !== "" &&
                  form.ati !== ""
                ) {
                dispatch(editCase(form));
                setForm(() => ({
                  ...form,
                  id: "",
                  date: currentTime(),
                  name: "",
                  driverName: "",
                  phone: "",
                  comments: "",
                  ati: "",
                }))};
              }}
            >
              Сохранить
            </button>
          </Link>
        )}
      </div>
    </form>
  );
};

export default Form;

import React, {FC} from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { deleteCase } from "./redux/mainReducer";
import { CaseType } from "./types/types";

interface MainProps {base: Array<CaseType>, currentCaseId: number | null}

const Main: FC<MainProps> = (props) => {
  const dispatch = useDispatch();
  const [currentCase] = props.base.filter(
    (it) => it.id === props.currentCaseId
  );

  if (props.base.length === 0) {
    return (
      <main className="w-full p-5 text-sm font-mono bg-blue-200">
        База пуста.
      </main>
    );
  }
  if (typeof currentCase === "undefined") {
    return (
      <main className="w-full p-5 text-sm font-mono bg-blue-200">
        Заявка № {props.currentCaseId} удалена.
      </main>
    );
  }

  let atiUrl: undefined | string
  if (props.base.length !== 0) {
    atiUrl = `https://ati.su/firms/${currentCase.ati}/info`;
    console.log(atiUrl);
  }

  return (
    <main className="w-full p-5 text-sm font-mono bg-blue-200">
      <section>
        <article>Номер заявки: {props.currentCaseId}</article>
        <article>Время получения заявки: {currentCase.date}</article>
        <article>Название фирмы: {currentCase.name}</article>
        <article>ФИО перевозчика: {currentCase.driverName}</article>
        <article>Телефон: {currentCase.phone}</article>
        <article>Комментарии: {currentCase.comments}</article>
        <article>
          ATI код сети перевозчика: <a className='underline' href={atiUrl}>{currentCase.ati}</a>
        </article>
      </section>
      <div className="flex justify-center my-10 ">
        <Link to='/edit' className="mx-3 px-3 bg-yellow-400 hover:bg-yellow-500">
          Редактировать
        </Link>
        <button
          className="mx-3 px-3 bg-red-400 hover:bg-red-500"
          onClick={(e) => {
            e.preventDefault();
            dispatch(deleteCase(currentCase.id));
          }}
        >
          Удалить
        </button>
      </div>
    </main>
  );
};

export default Main;

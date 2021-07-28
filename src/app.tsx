import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import Auth from "./auth";
import Main from "./main";
import Header from "./header";
import Nav from "./nav";
import Form from "./form";
import { ReducersType } from "./redux/store";

const App: FC = () => {
  const useTypedSelector: TypedUseSelectorHook<ReducersType> = useSelector;
  const { base, currentCaseId, findArr } = useTypedSelector(
    (s) => s.mainReducer
  );
  const { isLogin } = useTypedSelector((s) => s.authReducer);

  return (
    <>
      {!isLogin ? (
        <div className='z-40'>
          <Auth isLogin={isLogin} />
        </div>
      ) : (
        <>
          <Header />
          <div className="absolute flex inset-x-0 top-14">
            <Route
              render={() => (
                <Nav
                  base={base}
                  currentCaseId={currentCaseId}
                  findArr={findArr}
                />
              )}
            />
            <Switch>
              <Route
                exact
                path="/main"
                render={() => (
                  <Main base={base} currentCaseId={currentCaseId} />
                )}
              />
              <Route
                exact
                path="/form"
                render={() => (
                  <Form base={base} currentCaseId={currentCaseId} />
                )}
              />
              <Route
                exact
                path="/edit"
                render={() => (
                  <Form base={base} currentCaseId={currentCaseId} />
                )}
              />
              <Route
                exact
                path="/result"
                render={() => (
                  <Main base={base} currentCaseId={currentCaseId} />
                )}
              />
            </Switch>
          </div>
        </>
      )}
    </>
  );
};

export default App;
